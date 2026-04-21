"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { motion, useTransform, useSpring, useMotionValue } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ImageTransition } from "./ImageTransition";
import { ToolButton } from "./ToolButton";
import { FeaturedBadge } from "./FeaturedBadge";
import { ShineBorder } from "@/components/ui/shine-border";
import DecorativeImage1 from "@/assets/images/transition/decorative-bg-1.jpeg";
import DecorativeImage2 from "@/assets/images/transition/decorative-bg-2.jpeg";

const CometPath = dynamic(() => import("./CometPath"), { ssr: false });

export const HeroSection = () => {
  const typedEl = useRef(null);
  const typed = useRef<Typed | null>(null);
  const [gradientClass, setGradientClass] = useState("from-pink-500 to-yellow-500");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  // Parallax Transforms
  const moveBack = useTransform(smoothX, (x) => x * 0.015);

  const tiltImg = useTransform(smoothX, [-800, 800], [-2, 2]);

  useEffect(() => {
    const options = {
      strings: ["Developer", "Programmer", "Engineer"],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
      preStringTyped: (arrayPos: number) => {
        // Change gradient based on word index
        if (arrayPos === 0)
          setGradientClass("from-pink-500 to-yellow-500"); // Developer
        else if (arrayPos === 1)
          setGradientClass("from-purple-500 to-pink-500"); // Programmer
        else if (arrayPos === 2) setGradientClass("from-green-400 to-cyan-500"); // Engineer
      },
    };

    typed.current = new Typed(typedEl.current, options);
    return () => {
      typed.current?.destroy();
    };
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="scale_layout relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden px-6 pt-16 pb-20 md:pt-20 lg:px-12 lg:pt-14 lg:pb-0 xl:pt-0"
    >
      {/* --- Subtle Background Noise/Gradient --- */}
      {/* <div className="absolute inset-0 -z-50 pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-[140px]" />
            </div> */}

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col-reverse items-center justify-center lg:flex-row lg:justify-between lg:gap-12">
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6 text-center lg:w-[55%] lg:items-start lg:pr-10 lg:text-left">
          <CometPath />

          <div className="font-bree relative flex min-h-[100px] flex-col justify-center gap-2 sm:min-h-[120px] lg:min-h-[140px]">
            <span className="text-foreground block text-xl font-bold sm:text-2xl lg:text-3xl">
              Hey,
            </span>
            <h1 className="text-foreground text-3xl leading-tight font-medium tracking-wide sm:text-4xl lg:text-5xl">
              I am{" "}
              <span
                ref={typedEl}
                style={{ fontFamily: "var(--font-bree-serif)" }}
                className={`bg-linear-to-r bg-clip-text text-transparent ${gradientClass}`}
              />
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg"
          >
            I’m Lokeshwar Prasad Dewangan, a full-stack developer building modern, scalable web
            experiences with a strong focus on UI, performance, and thoughtful interactions.
          </motion.p>

          <FeaturedBadge />

          {/* 3. CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4 lg:justify-start"
          >
            <ToolButton icon={Mail}>Hire Me</ToolButton>
            <ToolButton variant="secondary" icon={ArrowRight}>
              Message
            </ToolButton>

            <div className="bg-border/40 mx-2 hidden h-8 w-px sm:block" />
          </motion.div>
        </div>

        <div className="perspective-1000 relative flex h-[400px] w-full max-w-[300px] items-center justify-center sm:h-[550px] sm:w-[400px] sm:max-w-xl lg:left-0 lg:h-[600px] lg:w-[45%] lg:max-w-none lg:justify-center">
          <div className="relative flex items-center justify-center">
            {/* SVG Background Animations */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <svg
                className="text-primary absolute h-[180%] max-h-[700px] w-[180%] max-w-[700px] transform-gpu animate-[spin_40s_linear_infinite] opacity-30 will-change-transform"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.2"
                  strokeDasharray="1 3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.2"
                  strokeDasharray="2 6"
                />
              </svg>

              <svg
                className="absolute h-[200%] max-h-[800px] w-[200%] max-w-[800px] transform-gpu animate-[spin_50s_linear_infinite_reverse] text-pink-500 opacity-20 will-change-transform"
                viewBox="0 0 100 100"
              >
                <ellipse
                  cx="50"
                  cy="50"
                  rx="45"
                  ry="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  transform="rotate(30 50 50)"
                />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="45"
                  ry="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  transform="rotate(-30 50 50)"
                />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="45"
                  ry="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  transform="rotate(90 50 50)"
                />
              </svg>

              <motion.div
                animate={{ y: [-20, 20, -20], rotate: [0, 90, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 text-yellow-500/50 md:-right-16"
                style={{ willChange: "transform" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ y: [20, -20, 20], rotate: [0, -90, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-44 -left-12 text-cyan-500/50 md:-left-16"
                style={{ willChange: "transform" }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </motion.div>
            </div>

            {/* Stacked Image 1 (Left) */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-8, -4, -8] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: moveBack, willChange: "transform" }}
              className="pointer-events-none absolute -top-3 -left-10 z-10 hidden aspect-3/4 w-[200px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:block xl:-left-20 xl:w-[160px]"
            >
              <Image
                src={DecorativeImage1}
                alt="Decorative background"
                fill
                sizes="(max-width: 1280px) 220px, 160px"
                placeholder="blur"
                priority
                fetchPriority="high"
                className="object-cover opacity-80 grayscale transition-opacity duration-500 hover:grayscale-0"
              />
              <div className="from-background/90 via-background/40 absolute inset-0 bg-linear-to-tr to-transparent" />
            </motion.div>

            {/* Stacked Image 2 (Right) */}
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [8, 4, 8] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              style={{ x: moveBack, willChange: "transform" }}
              className="pointer-events-none absolute -right-10 -bottom-8 z-10 hidden aspect-3/4 w-[220px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:block xl:-right-20 xl:w-[160px]"
            >
              <Image
                src={DecorativeImage2}
                alt="Decorative background"
                fill
                sizes="(max-width: 1280px) 220px, 160px"
                placeholder="blur"
                className="object-cover opacity-80 mix-blend-multiply grayscale dark:mix-blend-screen"
                priority
                fetchPriority="high"
              />
              <div className="from-background/90 via-background/40 absolute inset-0 bg-linear-to-bl to-transparent" />
            </motion.div>

            {/* Main Center Image */}
            <motion.div
              style={{ rotateX: tiltImg, rotateY: tiltImg }}
              className="group relative z-20 aspect-3/4 w-[200px] overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] sm:w-[240px] md:w-[260px] lg:w-[280px] xl:w-[300px] 2xl:w-[320px]"
            >
              {/* Shine Border specific implementation */}
              <ShineBorder
                className="absolute inset-0 z-0 p-px"
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                duration={10}
                borderWidth={1.5}
              />

              {/* Inner content wrapper */}
              <div className="bg-background absolute inset-[2px] overflow-hidden rounded-[14px]">
                <ImageTransition />
              </div>

              <div className="pointer-events-none absolute inset-[2px] rounded-[14px] border border-white/5 opacity-30 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
