import { HeroSection } from "@/components/home/hero/HeroSection";
import { StatsSticker } from "@/components/home/hero/StatsSticker";
import dynamic from "next/dynamic";
import {
  FunStatsSectionDeferred,
  SkillsSectionDeferred,
  ExperienceSectionDeferred,
  ProjectsSectionDeferred,
  AchievementsSectionDeferred,
} from "@/components/home/DeferredSection";

// Below-fold components: lazy-loaded via dynamic import to reduce TBT
// Code-splitting defers JS parsing/execution off the critical path
const ProofSection = dynamic(() =>
  import("@/components/home/proof/ProofSection").then((mod) => ({ default: mod.ProofSection }))
);
const WorkSection = dynamic(() =>
  import("@/components/home/work/WorkSection").then((mod) => ({ default: mod.WorkSection }))
);
const OneLastThing = dynamic(() =>
  import("@/components/home/footer/OneLastThing").then((mod) => ({ default: mod.OneLastThing }))
);

import { Footer } from "@/components/layouts/Footer";
import ClickSpark from "@/components/ClickSpark";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <main className="relative z-10 w-full flex-1">
          <HeroSection />
          <StatsSticker />
          {/* Heavy sections: deferred via client-side wrapper with ssr:false to free main thread */}
          <FunStatsSectionDeferred />
          <SkillsSectionDeferred />
          <ExperienceSectionDeferred />
          <ProjectsSectionDeferred />
          <AchievementsSectionDeferred />
          {/* Lighter sections: lazy-loaded with SSR preserved */}
          <ProofSection />
          <WorkSection />
          {/* <RealityCheckSection /> */}
          <OneLastThing />
          <Footer />
        </main>
      </ClickSpark>
    </div>
  );
}
