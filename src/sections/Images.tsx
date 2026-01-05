"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import Link from "next/link"
import Graph1 from '@/assets/images/Graph1.png';
import Graph2 from '@/assets/images/Graph2.png';
import Graph3 from '@/assets/images/Graph3.png';
import Graph4 from '@/assets/images/Graph4.png';
import Graph5 from '@/assets/images/Graph5.png';
import Graph6 from '@/assets/images/Graph6.png';
import Graph7 from '@/assets/images/Graph7.png';
import Graph8 from '@/assets/images/Graph8.png';

import Floating, {
  FloatingElement,
} from "@/components/ui/parallax-floating"
import { Button } from "@/components/ui/button"

const exampleImages = [
  { url: Graph1.src },
  { url: Graph2.src },
  { url: Graph3.src },
  { url: Graph4.src },
  { url: Graph5.src },
  { url: Graph6.src },
  { url: Graph7.src },
  { url: Graph8.src}
]

const Preview = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [animate])

  return (
    <div
      className="relative flex w-full h-full min-h-screen py-16 mb-24 justify-center items-center overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-10 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl text-white font-calendas font-bold">
          Our beautiful graphs
        </p>
        <p className="text-sm md:text-base text-white/70 max-w-2xl px-4">
          Discover stunning graphs and charts that Datavanta can create. Transform your data into visually captivating and insightful visualizations that tell your story with clarity and elegance.
        </p>
        <Link href="/graphs">
          <Button className="mt-4 bg-white text-black hover:bg-white/90">
            Check out our graphs
          </Button>
        </Link>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            className="w-40 h-40 md:w-56 md:h-56 object-contain hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[1].url}
            className="w-32 h-32 md:w-44 md:h-44 object-contain hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            className="w-44 h-60 md:w-64 md:h-80 object-contain hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[0%] left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[3].url}
            className="w-36 h-36 md:w-48 md:h-48 object-contain hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[40%] left-[2%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[4].url}
            className="w-40 h-40 md:w-52 md:h-52 object-contain hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[70%] left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[6].url}
            className="w-56 h-56 md:w-72 md:h-80 object-contain hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[73%] left-[15%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[7].url}
            className="w-90 md:w-80 h-full object-contain hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[50%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            className="w-36 h-36 md:w-48 md:h-48 object-contain hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
      </Floating>
    </div>
  )
}

export { Preview }
