import lighthouse from 'lighthouse';
import {launch } from 'chrome-launcher';
import fs from 'fs';
// import  puppeteer from "puppeteer";  // use puppeteer for local testing 

const url = process.env.TARGET_URL || "https://left-shift-performance-git-main-kartick-dhalis-projects.vercel.app/";

async function runLighthouse() {
  // const chromePath = puppeteer.executablePath();
  const chrome = await launch({ chromeFlags: ["--headless", "--no-sandbox"] }); //chromePath: puppeteer.executablePath(), 
  const options = { logLevel: "info", output: "json", port: chrome.port };
  const runnerResult = await lighthouse(url, options);

  const metrics = {
    performance: runnerResult.lhr.categories.performance.score,
    fcp: runnerResult.lhr.audits["first-contentful-paint"].numericValue,
    lcp: runnerResult.lhr.audits["largest-contentful-paint"].numericValue,
    cls: runnerResult.lhr.audits["cumulative-layout-shift"].numericValue,
    tbt: runnerResult.lhr.audits["total-blocking-time"].numericValue,
    si: runnerResult.lhr.audits["speed-index"].numericValue,
    timestamp: new Date().toISOString()
  };

  // save to history
  const historyPath = "metrics-history.json";
  let history = [];
  if (fs.existsSync(historyPath)) {
    history = JSON.parse(fs.readFileSync(historyPath, "utf8"));
  }
  history.push({ url, ...metrics });
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

  console.log("Metrics collected:", metrics);

  await chrome.kill();
  return metrics;
}

(async () => {
  try {
    await runLighthouse();
  } catch (err) {
    console.error("Lighthouse run failed:", err);
    process.exit(1); // exit with failure
  }
})();
