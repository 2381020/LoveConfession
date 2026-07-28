"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PolaroidPhotoProps {
  src: string;
  caption?: string;
}

export function PolaroidPhoto({ src, caption }: PolaroidPhotoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -5, scale: 0.8 }}
      animate={{ opacity: 1, rotate: 2, scale: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      className="inline-block"
    >
      <div className="bg-white p-3 pb-10 shadow-xl rounded-sm">
        <Image
          src={src}
          alt="Our moment"
          width={288}
          height={288}
          className="w-64 h-64 md:w-72 md:h-72 object-cover"
          loading="lazy"
        />
        <p className="text-center text-sm text-gray-500 mt-2 italic">
          {caption} 
        </p>
      </div>
    </motion.div>
  );
}
