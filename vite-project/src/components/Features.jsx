import { motion } from "framer-motion";

const FeatureSection = ({ featureRef }) => {
  return (
    <section ref={featureRef} className="w-full min-h-screen bg-[#0a0f1a] text-gray-300 flex flex-col items-center text-center py-20 px-6">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-10"
      >
        Explore Our Features
      </motion.h2>
      <p className="text-lg text-gray-400 max-w-3xl mb-16">
        Unlock powerful tools designed to enhance your understanding of Data Structures & Algorithms.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#111827] p-8 rounded-xl shadow-lg border border-cyan-500 text-left hover:shadow-cyan-400/50"
        >
          <h3 className="text-2xl font-semibold text-cyan-400">Interactive Visualizations</h3>
          <p className="mt-4 text-gray-400">Step-by-step animations bring algorithms to life.</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#111827] p-8 rounded-xl shadow-lg border border-blue-500 text-left hover:shadow-blue-400/50"
        >
          <h3 className="text-2xl font-semibold text-blue-400">Real-Time Execution</h3>
          <p className="mt-4 text-gray-400">Run algorithms and see instant results.</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#111827] p-8 rounded-xl shadow-lg border border-purple-500 text-left hover:shadow-purple-400/50"
        >
          <h3 className="text-2xl font-semibold text-purple-400">AI-Powered Insights</h3>
          <p className="mt-4 text-gray-400">Understand complexity and performance with AI-driven analysis.</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#111827] p-8 rounded-xl shadow-lg border border-green-500 text-left hover:shadow-green-400/50"
        >
          <h3 className="text-2xl font-semibold text-green-400">Code Execution Sandbox</h3>
          <p className="mt-4 text-gray-400">Write, test, and debug code in a live environment.</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#111827] p-8 rounded-xl shadow-lg border border-yellow-500 text-left hover:shadow-yellow-400/50"
        >
          <h3 className="text-2xl font-semibold text-yellow-400">Comprehensive Challenges</h3>
          <p className="mt-4 text-gray-400">Solve problems from beginner to expert levels.</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#111827] p-8 rounded-xl shadow-lg border border-red-500 text-left hover:shadow-red-400/50"
        >
          <h3 className="text-2xl font-semibold text-red-400">Performance Tracking</h3>
          <p className="mt-4 text-gray-400">Monitor progress with detailed analytics and insights.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
