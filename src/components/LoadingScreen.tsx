"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy dark:bg-black text-white"
        >
          {/* Glowing Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-light/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Centered Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.05, 1], 
              opacity: 1,
              transition: { duration: 1, ease: "easeOut" }
            }}
            className="relative flex flex-col items-center justify-center p-8 rounded-2xl glass-panel border border-white/5 shadow-2xl"
          >
            <div className="relative w-28 h-28 mb-6">
              {/* Outer Golden Glow Circle */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold via-transparent to-gold/50 blur-lg"
              />
              <Image
                src="/logo.png"
                alt="AS NEXTGEN Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                priority
              />
            </div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.5, duration: 0.6 }
              }}
              className="font-display text-2xl font-bold tracking-widest text-white flex items-center"
            >
              A/S NEXT<span className="text-gold">GEN</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 0.8, duration: 0.6 }
              }}
              className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-2 font-light"
            >
              Pvt Ltd
            </motion.p>
          </motion.div>

          {/* Loading Indicator */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ 
                  x: "100%",
                  transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-full h-full bg-gradient-to-r from-navy via-gold to-navy-light"
              />
            </div>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xs font-light tracking-widest text-gold uppercase"
            >
              Initialising digital experience
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
