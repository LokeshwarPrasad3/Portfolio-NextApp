import {
  FullStackProjectsArray,
  ReactFrontendProjectsArray,
  FrontendProjectsArray,
  Project,
} from "@/components/home/projects/project-data";

export const allProjects: Project[] = [
  ...FullStackProjectsArray,
  ...ReactFrontendProjectsArray,
  ...FrontendProjectsArray,
];

// Tech Normalization Mapping
const techMapping: Record<string, string> = {
  nextjs: "next.js",
  next: "next.js",
  node: "node.js",
  nodejs: "node.js",
  expressjs: "express",
  express: "express",
  ts: "typescript",
  js: "javascript",
  mongodb: "mongodb",
  mongo: "mongodb",
  socket: "socket.io",
  socketio: "socket.io",
  "web socket": "socket.io",
  websocket: "socket.io",
  "web sockets": "socket.io",
  websockets: "socket.io",
  reactjs: "react",
  react: "react",
  tailwind: "tailwind",
  tailwindcss: "tailwind",
  "tailwind css": "tailwind",
  postgres: "postgresql",
  postgresql: "postgresql",
  sql: "postgresql",
  fullstack: "fullstack",
  "full stack": "fullstack",
  "full-stack": "fullstack",
  frontend: "frontend",
  "front end": "frontend",
  "front-end": "frontend",
  "google auth": "googleauth",
  googleauth: "googleauth",
  oauth: "googleauth",
  "otp signup": "otp",
  otp: "otp",
  gemini: "google gemini api",
  "ai sdk": "ai sdk",
  firebase: "firebase",
  docker: "docker",
  prisma: "prisma",
  redux: "redux",
  zustand: "zustand",
  zod: "zod",
  graphql: "graphql",
  "framer motion": "framer motion",
  framer: "framer motion",
  razorpay: "razorpay",
  payment: "razorpay",
  bootstrap: "bootstrap",
  "real-time": "socket.io",
  "real time": "socket.io",
  realtime: "socket.io",
  chat: "socket.io",
  database: "mongodb",
  db: "mongodb",
  api: "express",
  rest: "express",
  "rest api": "express",
  auth: "googleauth",
  authentication: "googleauth",
  css: "css",
  html: "html",
  bun: "bun",
  aws: "aws",
  vercel: "vercel",
};

function normalizeTech(tech: string): string {
  const lower = tech.toLowerCase().trim();
  return techMapping[lower] || lower;
}

// Canonical tech keywords for message analysis
export const TECH_KEYWORDS = [
  "full stack",
  "full-stack",
  "front end",
  "front-end",
  "google auth",
  "otp signup",
  "ai sdk",
  "tailwind css",
  "framer motion",
  "web socket",
  "web sockets",
  "real-time",
  "real time",
  "rest api",
  "react",
  "reactjs",
  "next",
  "next.js",
  "nextjs",
  "node",
  "node.js",
  "nodejs",
  "express",
  "expressjs",
  "mongodb",
  "mongo",
  "socket",
  "socket.io",
  "socketio",
  "websocket",
  "websockets",
  "realtime",
  "tailwind",
  "tailwindcss",
  "typescript",
  "ts",
  "javascript",
  "js",
  "html",
  "css",
  "postgresql",
  "postgres",
  "sql",
  "redux",
  "zustand",
  "prisma",
  "fullstack",
  "frontend",
  "zod",
  "otp",
  "googleauth",
  "oauth",
  "auth",
  "authentication",
  "gemini",
  "firebase",
  "docker",
  "graphql",
  "framer",
  "razorpay",
  "payment",
  "bootstrap",
  "database",
  "db",
  "api",
  "rest",
  "chat",
  "bun",
  "aws",
  "vercel",
];

function findAllMatchingKeywords(message: string): string[] {
  const lower = message.toLowerCase();
  const matched = new Set<string>();

  for (const keyword of TECH_KEYWORDS) {
    if (lower.includes(keyword)) {
      matched.add(normalizeTech(keyword));
    }
  }

  return Array.from(matched);
}

export function getProjectsByTech(techKeyword: string, limit = 3): Project[] {
  const normalizedKeyword = normalizeTech(techKeyword);
  const matched: Project[] = [];
  const seenIds = new Set<string>();

  for (const project of allProjects) {
    if (matched.length >= limit) break;
    if (project.liveLink === "#") continue;

    let isCategoryMatch = false;
    if (normalizedKeyword === "fullstack" && project.category === "fullstack") {
      isCategoryMatch = true;
    } else if (
      normalizedKeyword === "frontend" &&
      (project.category === "react" || project.category === "js")
    ) {
      isCategoryMatch = true;
    } else if (normalizedKeyword === "react" && project.category === "react") {
      isCategoryMatch = true;
    }

    const hasTechMatch = project.techStack.some((tech) => {
      const normalizedStackTech = normalizeTech(tech);
      return (
        normalizedStackTech.includes(normalizedKeyword) ||
        normalizedKeyword.includes(normalizedStackTech)
      );
    });

    if ((isCategoryMatch || hasTechMatch) && !seenIds.has(project.id)) {
      matched.push(project);
      seenIds.add(project.id);
    }
  }

  return matched;
}

function getProjectsByMultipleTechs(keywords: string[], limit = 5): Project[] {
  const seen = new Set<string>();
  const result: Project[] = [];

  for (const kw of keywords) {
    for (const project of getProjectsByTech(kw, limit)) {
      if (!seen.has(project.id) && result.length < limit) {
        result.push(project);
        seen.add(project.id);
      }
    }
  }

  return result;
}

// Formatting utilities
export function formatProjectsDetailed(projects: Project[]): string {
  if (projects.length === 0) return "No specific projects found for this technology.";
  return projects
    .map(
      (p, i) =>
        `${i + 1}) ${p.title}\n   ${p.description}\n   Tech Used: ${p.techStack.join(", ")}\n   Live: ${p.liveLink}\n   Repo: ${p.repoLink}`
    )
    .join("\n\n");
}

function formatProjectsSummary(projects: Project[]): string {
  return projects
    .map(
      (p, i) =>
        `${i + 1}. **${p.title}** — ${p.description} | Tech: ${p.techStack.join(", ")} | Live: ${p.liveLink} | Repo: ${p.repoLink}`
    )
    .join("\n");
}

// Build final system prompt with dynamic context
export function buildSystemPrompt(lastUserMessage: string, basePrompt: string): string {
  const allValidProjects = allProjects.filter((p) => p.liveLink !== "#");
  let finalPrompt =
    basePrompt +
    `\n\n### COMPLETE PROJECT PORTFOLIO ###\nBelow is Lokeshwar's full project portfolio. Use this data to answer ANY project-related question.\n\n` +
    formatProjectsSummary(allValidProjects);

  const matchedKeywords = findAllMatchingKeywords(lastUserMessage);
  if (matchedKeywords.length > 0) {
    const highlightedProjects = getProjectsByMultipleTechs(matchedKeywords, 5);
    if (highlightedProjects.length > 0) {
      const keywordList = matchedKeywords.join(", ");
      finalPrompt +=
        `\n\n### HIGHLIGHTED PROJECTS FOR THIS QUERY ###\nThe user mentioned: ${keywordList}. Prioritize these projects:\n\n` +
        formatProjectsDetailed(highlightedProjects);
    }
  }

  return finalPrompt;
}
