"use client";

import dynamic from "next/dynamic";

/**
 * Client-side wrappers that defer heavy below-fold components.
 * Each uses `ssr: false` to skip server rendering and defer JS execution,
 * reducing Total Blocking Time (TBT) on initial page load.
 */
const FunStatsSectionDeferred = dynamic(
  () =>
    import("@/components/home/stats/FunStatsSection").then((mod) => ({
      default: mod.FunStatsSection,
    })),
  { ssr: false }
);

const SkillsSectionDeferred = dynamic(
  () =>
    import("@/components/home/skills/SkillsSection").then((mod) => ({
      default: mod.SkillsSection,
    })),
  { ssr: false }
);

const ExperienceSectionDeferred = dynamic(
  () =>
    import("@/components/home/experience/ExperienceSection").then((mod) => ({
      default: mod.ExperienceSection,
    })),
  { ssr: false }
);

const ProjectsSectionDeferred = dynamic(
  () =>
    import("@/components/home/projects/ProjectsSection").then((mod) => ({
      default: mod.ProjectsSection,
    })),
  { ssr: false }
);

const AchievementsSectionDeferred = dynamic(
  () =>
    import("@/components/home/achievements/AchievementsSection").then((mod) => ({
      default: mod.AchievementsSection,
    })),
  { ssr: false }
);

export {
  FunStatsSectionDeferred,
  SkillsSectionDeferred,
  ExperienceSectionDeferred,
  ProjectsSectionDeferred,
  AchievementsSectionDeferred,
};
