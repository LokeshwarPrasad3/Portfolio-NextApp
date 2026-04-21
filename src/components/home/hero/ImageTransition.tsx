"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

// Importing images directly assuming they are in the assets folder relative to project root
// Adjusting path to navigate up from src/components/home/hero to assets
// hero -> home -> components -> src -> root -> assets
// import img1 from "@/assets/images/transition/image-1.jpg";
import img2 from "@/assets/images/transition/image-2.jpg";
import img3 from "@/assets/images/transition/image-3.jpg";
import img4 from "@/assets/images/transition/image-4.jpg";

const images = [img2, img3, img4];

export const ImageTransition = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-3/4 h-full w-full overflow-hidden rounded-2xl">
      <div className="pointer-events-none absolute inset-0 z-20 bg-linear-to-tr from-pink-600/30 via-transparent to-transparent mix-blend-overlay" />

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1], // Custom ease curve
          }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={images[index]}
            alt={`Slideshow Image ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 300px, 350px"
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            placeholder="blur"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
