"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { AnalyticsStatCards } from "@/components/analytics/StatCards";
import { ChartSkeleton } from "@/components/analytics/AnalyticsSkeleton";

const TrafficChart = dynamic(() => import("@/components/analytics/TrafficChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

export const FunStatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <section className="relative z-10 w-full overflow-hidden px-6 py-12 lg:px-12 lg:py-12 2xl:py-20">
      <div className="container mx-auto max-w-4xl 2xl:max-w-7xl">
        <div className="mb-8 flex flex-col items-center text-center lg:mb-12 2xl:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-bree mb-4 text-2xl font-bold tracking-wide sm:text-3xl 2xl:text-4xl">
              <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Website Traffic Overview
              </span>
            </h2>

            <p className="text-muted-foreground mx-auto max-w-xl text-xs sm:text-xs 2xl:text-base">
              A snapshot of real user traffic, engagement metrics, and month-over-month growth
              across the platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div ref={ref} className="order-2 col-span-1 min-h-[350px] lg:order-1 lg:col-span-9">
            {isInView ? <TrafficChart /> : <ChartSkeleton />}
          </div>

          <div className="order-1 col-span-1 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:order-2 lg:col-span-3 lg:grid-cols-1 lg:gap-6">
            <AnalyticsStatCards />

            {/* <InteractiveCard /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
