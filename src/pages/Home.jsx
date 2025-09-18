import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const images = [
  "https://picsum.photos/1200/600?random=1",
  "https://picsum.photos/1200/600?random=2",
  "https://picsum.photos/1200/600?random=3"
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Image slider interval
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
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

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          Featured Products
        </motion.h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover our carefully curated selection of premium products
        </p>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="h-52 bg-gray-50 flex items-center justify-center p-6">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="max-h-40 max-w-[140px] object-contain"
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
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Built with Vite for optimal performance"
              },
              {
                icon: "🎨",
                title: "Beautiful Design",
                description: "Crafted with Tailwind CSS for modern aesthetics"
              },
              {
                icon: "🚀",
                title: "Easy to Deploy",
                description: "Ready for production with minimal setup"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-8 bg-gray-50 rounded-2xl shadow-lg text-center"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
