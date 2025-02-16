"use client";

import { type ReactNode, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "next-themes";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function FancyModal({ isOpen, onClose, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const modalBackgroundColor =
    theme === "dark" ? "bg-[hsl(220,50%,20%)]" : "bg-white";
  const modalTextColor = theme === "dark" ? "text-gray-200" : "text-gray-800";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`relative w-full max-w-2xl rounded-xl ${modalBackgroundColor} p-8 shadow-2xl ${modalTextColor}`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute right-4 top-4 z-10 text-gray-400 transition-colors hover:text-gray-200"
            >
              <X className="h-8 w-8" />
            </motion.button>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
