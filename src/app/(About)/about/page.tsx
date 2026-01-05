"use client";

import { NewHeader } from "@/components/header-2";
import FooterSection from "@/components/footer";
import { Target, Zap, Users, Heart } from "lucide-react";

export default function AboutPage() {
  const principles = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're committed to making data visualization accessible, beautiful, and powerful for everyone.",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "We continuously push the boundaries of what's possible in data visualization and design.",
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature we build starts with understanding our users' needs and pain points.",
    },
    {
      icon: Heart,
      title: "Quality Focus",
      description: "We believe in crafting exceptional experiences, not just functional tools.",
    },
  ];


  return (
    <div className="min-h-screen bg-[#020202]">
      <NewHeader />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6">
              Building the future of{" "}
              <span className="bg-gradient-to-r from-[#ec3e52] to-[#2b6ac4] inline-block text-transparent bg-clip-text">
                data visualization
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We're on a mission to make beautiful, powerful data visualizations accessible to everyone, 
              regardless of technical expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Our Story
              </h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Datavanta was born from a simple observation: creating beautiful, effective data visualizations 
                shouldn't require a degree in design or weeks of learning complex tools. We saw talented people 
                struggling with clunky interfaces, limited customization options, and tools that prioritized 
                functionality over aesthetics.
              </p>
              <p>
                We set out to change that. Louis Dang 
                built a platform that combines the power of professional data visualization tools with the 
                simplicity and beauty of modern design.
              </p>
              <p>
                Today, Datavanta empowers thousands of users worldwide to create stunning visualizations that 
                tell compelling stories, drive decisions, and inspire action. We're just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Principles
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                The core values that guide our decisions and shape our product.
              </p>
            </div>
            <div className="space-y-0">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="py-8 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 mt-1">
                      <principle.icon className="w-5 h-5 text-foreground/60" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-foreground mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-6">
                How We Work
              </h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We embrace challenges and see failures as opportunities to learn and improve. This growth mindset 
                drives us to continuously push boundaries and explore new possibilities in data visualization.
              </p>
              <p>
                We build for a diverse, global audience with different needs and perspectives. Our global perspective 
                ensures that Datavanta works beautifully for users everywhere, regardless of their background or 
                technical expertise.
              </p>
              <p>
                We maintain high standards for code quality, performance, and reliability. Technical excellence isn't 
                just a goal—it's a requirement. Every feature we ship is built to last, perform flawlessly, and 
                scale with our users' needs.
              </p>
              <p>
                We empower users to express their data in unique and meaningful ways. Creative expression is at the 
                heart of what we do. We believe that data visualization is an art form, and we give you the tools 
                to create something truly exceptional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}

