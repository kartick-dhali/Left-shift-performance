import fs from "fs";
import { Octokit } from "@octokit/rest";
import { GoogleGenerativeAI } from "@google/generative-ai";

const {
  GITHUB_TOKEN,
  PR_NUMBER,
  REPO_OWNER,
  REPO_NAME,
  GEMINI_API_KEY
} = process.env;

function compareMetrics(base, pr) {
  const diffs = {};
  for (const key of ["performance", "fcp", "lcp", "cls", "tbt", "si"]) {
    diffs[key] = {
      base: base[key],
      pr: pr[key],
      delta: pr[key] - base[key]
    };
  }
  return diffs;
}

async function generateSuggestionsWithGemini(diffs) {
  if (!GEMINI_API_KEY) {
    console.warn("No GEMINI_API_KEY found, skipping AI suggestions.");
    return ["⚠️ No AI suggestions available (missing GEMINI_API_KEY)."];
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a web performance expert. Analyze these metrics diffs:

${JSON.stringify(diffs, null, 2)}

Give 3–5 concise bullet point suggestions for developers to improve performance.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.split("\n").filter(l => l.trim());
  } catch (err) {
    console.error("Gemini API failed:", err);
    return ["⚠️ Failed to generate AI suggestions."];
  }
}

async function main() {
  const history = JSON.parse(fs.readFileSync("metrics-history.json", "utf8"));

  const base = history.find(h => h.url.includes("main"));
  const pr = history[history.length - 1];

  if (!base || !pr) {
    console.log("Not enough data to compare.");
    return;
  }

  const diffs = compareMetrics(base, pr);
  const suggestions = await generateSuggestionsWithGemini(diffs);

  const body = `
### ⚡ Performance Report
| Metric | Base (main) | PR | Δ |
|--------|-------------|----|---|
${Object.keys(diffs)
  .map(
    k =>
      `| ${k} | ${diffs[k].base} | ${diffs[k].pr} | ${diffs[k].delta.toFixed(
        2
      )} |`
  )
  .join("\n")}

#### 💡 Suggestions from AI
${suggestions.join("\n")}
`;

  const octokit = new Octokit({ auth: GITHUB_TOKEN });
  await octokit.issues.createComment({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    issue_number: PR_NUMBER,
    body
  });

  console.log("Comment posted to PR:", PR_NUMBER);
}

main();
