"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

const technologies = [
  {
    name: "HTML",
    slug: "html",
  },
  {
    name: "CSS",
    slug: "css",
  },
  {
    name: "JavaScript",
    slug: "js",
  },
  {
    name: "React",
    slug: "react",
  },
  {
    name: "Vite",
    slug: "vite",
  },
  {
    name: "Vitest",
    slug: "vitest",
  },
  {
    name: "Next.js",
    slug: "nextjs",
  },
  {
    name: "Docker",
    slug: "docker",
  },
  {
    name: "Prisma",
    slug: "prisma",
  },
  {
    name: "Express",
    slug: "express",
  },
  {
    name: "Node.js",
    slug: "nodejs",
  },
  {
    name: "Git",
    slug: "git",
  },
  {
    name: "GitHub",
    slug: "github",
  },
  {
    name: "Postman",
    slug: "postman",
  },
  {
    name: "Postgres",
    slug: "postgres",
  },
  {
    name: "MongoDB",
    slug: "mongodb",
  },
  {
    name: "AWS",
    slug: "aws",
  },
  {
    name: "CI/CD",
    slug: "github",
  },
];

const firstRow = technologies.slice(0, Math.ceil(technologies.length / 2));
const secondRow = technologies.slice(Math.ceil(technologies.length / 2));

const TechCard = ({ name, slug }: { name: string; slug: string }) => {
  return (
    <div
      className={cn(
        "relative flex h-full cursor-pointer items-center gap-2 overflow-hidden rounded-xl border p-3 py-2 2xl:gap-3 2xl:p-4",
        // light styles
        "border-gray-950/10 bg-gray-950/5 hover:bg-gray-950/5",
        // dark styles
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15"
      )}
    >
      <Image
        className="h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8"
        alt={name}
        src={`https://skillicons.dev/icons?i=${slug}`}
        width={32}
        height={32}
      />
      <span className="text-[10px] font-medium sm:text-xs 2xl:text-sm dark:text-white">{name}</span>
    </div>
  );
};

export function SkillsSection() {
  return (
    <section
      id="skills_section"
      className="relative w-full overflow-hidden bg-black/5 py-12 lg:py-12"
    >
      <div className="relative z-10 container mx-auto max-w-full px-6 md:px-12">
        {/* Header */}
        <div className="mb-8 text-center lg:mb-12 2xl:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-2xl font-bold tracking-wide sm:text-3xl 2xl:text-4xl">
              <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                My Tech Arsenal
              </span>
            </h2>
            <p className="text-muted-foreground/80 mx-auto max-w-xl text-xs tracking-wide sm:text-xs 2xl:text-base">
              I don't just know these tools; I build with them. From frontend finesse to backend
              robustness, this is the stack that powers my work.
            </p>
          </motion.div>
        </div>

        {/* Marquee Section */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((tech) => (
              <TechCard key={tech.slug} {...tech} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="mt-4 [--duration:30s]">
            {secondRow.map((tech) => (
              <TechCard key={tech.slug} {...tech} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
        </div>
      </div>
    </section>
  );
}
