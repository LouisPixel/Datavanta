"use client";

import { Monitor, LayoutDashboard, Users, Palette } from "lucide-react"; // ✅ Lucide icons
import Image from "next/image";
import DisplayCards from "./ui/display-cards";
import Feature1 from '@/assets/images/Feature1.png';
import Feature2 from '@/assets/images/Feature2.png';
import Feature3 from '@/assets/images/Feature3.png';
import Feature4 from '@/assets/images/Feature4.png';



export default function Casestudies() {
  const features = [
    {
      id: 1,
      title: "Customization",
      description:
        "Extensive customization options let you tailor every chart to match your brand perfectly. Control layouts, dimensions, spacing, and more to create visualizations that align with your design system.",
      image: Feature3,
      icon: Monitor,
    },
    {
      id: 2,
      title: "Styling",
      description:
        "Complete styling control at your fingertips. Customize colors, fonts, borders, shadows, and visual effects to create beautiful, professional-looking charts that match your aesthetic preferences.",
      image: Feature2,
      icon: Palette,
    },
    {
      id: 3,
      title: "Various Chart Styles",
      description:
        "Choose from a wide variety of chart styles including bar charts, line graphs, pie charts, scatter plots, and more. Each chart type is optimized for different data visualization needs.",
      image: Feature1,
      icon: LayoutDashboard,
  
    },
    {
      id: 4,
      title: "Import & Add Data Points",
      description:
        "Effortlessly import data points from various sources, and dynamically add new data points to keep your charts up-to-date in real-time. Seamless data management for all your visualization needs.",
      image: Feature4,
      icon: Users,
      display: <DisplayCards/>
    },
  ];

  return (
    <section
      className="py-32 bg-[#020202]"
      aria-labelledby="case-studies-heading"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <h2
            id="case-studies-heading"
            className="text-4xl font-semibold md:text-5xl text-foreground"
          >
            Powerful features with Datavanta
          </h2>
          <p className="text-muted-foreground">
            Create stunning data visualizations with customization, styling, and seamless data management.
          </p>
        </div>

        {/* Features */}
        <div className="mt-20 flex flex-col gap-20">
          {features.map((feature, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={feature.id}
                className="grid gap-12 lg:grid-cols-5 xl:gap-24 items-center border-b border-white/10 pb-12"
              >
                {/* Left: Feature Description */}
                <div
                  className={[
                    "flex flex-col gap-10 lg:col-span-2 lg:border-r lg:pr-12 xl:pr-16 text-left",
                    reversed
                      ? "lg:order-2 lg:border-r-0 lg:border-l border-white/10 lg:pl-12 xl:pl-16 lg:pr-0"
                      : "border-white/10",
                  ].join(" ")}
                >
                  <div className="flex flex-col justify-between gap-8 text-left">
                    <div className="text-lg sm:text-xl text-foreground leading-relaxed text-left">
                      <h3 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-gray-900 dark:text-white leading-relaxed text-left">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg lg:text-xl mt-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Image */}
                <div
                  className={[
                    "flex items-center justify-center self-center w-full lg:col-span-3",
                    reversed ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
