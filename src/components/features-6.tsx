import { Cpu, Lock, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'

import GraphExample from '@/assets/images/GraphDashboard2.png';

export default function FeaturesSection2() {
    return (
     <section className="relative py-24 md:py-48 overflow-hidden bg-[#070707] text-foreground z-20">
            <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
                
                <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12 mb-5">
                    <h2 className="text-4xl font-semibold text-foreground">Everything you need to create stunning visualizations</h2>
                    <p className="max-w-sm sm:ml-auto text-foreground/70">From simple bar charts to complex interactive dashboards, Datavanta provides all the tools you need to transform your data into beautiful, professional graphs.</p>
                </div>
                <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
                    <div className="aspect-88/36 relative">
                        <div className="bg-linear-to-t z-1 from-background absolute inset-0 to-transparent"></div>
                        <div className="border-border/80 relative p-5 lg:col-span-3">
                            <Image src={GraphExample} className="absolute inset-0 z-10" alt="payments illustration dark" width={2797} height={1137} />
                            <Image src={GraphExample} className="hidden dark:block" alt="payments illustration dark" width={2797} height={1137} />
                            </div>
                
                    </div>
                </div>
                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4 mt-5">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-foreground">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Fast</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Create and customize charts in seconds with our intuitive interface and real-time preview.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-foreground">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Powerful</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Access a wide range of chart types and advanced styling options to bring your data to life.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-foreground">
                            <Lock className="size-4" />
                            <h3 className="text-sm font-medium">Flexible</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Export your charts in multiple formats and integrate seamlessly with your workflow.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-foreground">
                            <Sparkles className="size-4" />
                            <h3 className="text-sm font-medium">Beautiful</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Design modern, clean graphs with professional styling options and custom color schemes.</p>
                    </div>
                </div>
            </div>
                                    <div
                className="absolute w-full h-px bottom-0 left-0 z-0"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
                }}
            />
        </section>
    )
}
