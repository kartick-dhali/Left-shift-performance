import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Increased number of high-resolution images
const images = [
  "https://picsum.photos/2400/1200?random=1",
  "https://picsum.photos/2400/1200?random=2",
  "https://picsum.photos/2400/1200?random=3",
  "https://picsum.photos/2400/1200?random=4",
  "https://picsum.photos/2400/1200?random=5"
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layoutShift, setLayoutShift] = useState(0);

  // Heavy computation to increase Total Blocking Time
  const heavyComputation = () => {
    let result = 0;
    for(let i = 0; i < 10000000; i++) {
      result += Math.sqrt(i);
    }
    return result;
  };

  useEffect(() => {
    // Reduced interval time causing more frequent updates
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      heavyComputation(); // Block main thread
    }, 1000);

    // Random layout shifts
    const layoutTimer = setInterval(() => {
      setLayoutShift(Math.random() * 50);
    }, 2000);

    // Delayed product fetching
    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Artificial delay
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // Load all products instead of limiting to 6
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      clearInterval(timer);
      clearInterval(layoutTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section with dynamic height causing CLS */}
      <div style={{ height: `calc(100vh + ${layoutShift}px)` }} className="relative flex items-center justify-center overflow-hidden">
        {images.map((img, index) => (
          <motion.div
            key={index}
            animate={{ 
              opacity: currentImage === index ? 1 : 0,
              scale: currentImage === index ? 1.2 : 0.8,
              rotate: currentImage === index ? 360 : 0
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Remove width and height attributes to cause CLS */}
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="object-cover"
              loading="eager" // Force eager loading instead of lazy
            />
          </motion.div>
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              Welcome to <span className="text-blue-400">Demo Site</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Experience the power of modern web development
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition-colors shadow-lg text-lg"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentImage === index ? 'bg-blue-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Products Section with no image dimensions */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.1 }} // Excessive animation
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gray-50 flex items-center justify-center p-6">
                  {/* Remove image dimensions and lazy loading */}
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section with heavy animations */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.div
                key={index}
                whileInView={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, 360],
                  y: [-100, 0]
                }}
                transition={{ duration: 1 }}
                className="p-8 bg-gray-50 rounded-2xl shadow-lg"
              >
                <h3>Feature {index + 1}</h3>
                <p>{heavyComputation()}</p> {/* Force computation on render */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
