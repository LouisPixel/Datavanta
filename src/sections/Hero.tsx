"use client";
import ProductImage from "@/assets/images/graphs.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}


export default function Hero() {
    return <section className="py-24 bg-[#070707]">
        <div className="container">
             <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className=" max-w-2xl text-balance text-5xl font-medium md:text-6xl">
                    Impactful graphs, created effortlessly
             </TextEffect>
             <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mt-8 max-w-2xl text-pretty text-lg text-white/70">
                  Datavanta makes data visualization effortless. Create stunning, customizable graphs in seconds—no coding required. 
                  Fast, intuitive, and powerful for all your charting needs.
             </TextEffect>
             
             <AnimatedGroup
                    variants={{
                        container: {
                            visible: {
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                    ...transitionVariants,
                                    }}
                                    >
                <Image src={ProductImage} alt="Product Image" className="min-w-[750px]" />     
             </AnimatedGroup>
        </div>
        
    </section>;
}

