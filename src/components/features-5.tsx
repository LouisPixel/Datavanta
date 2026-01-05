import { Activity, DraftingCompass, Mail, Zap } from 'lucide-react'
import Image from 'next/image'
import Dashboard from '@/assets/images/NewDashboard.png';


export default function FeaturesSection1() {
    return (
     <section className="relative py-24 md:py-48 overflow-hidden bg-[#070707] text-foreground">
            <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                    <div className="lg:col-span-2">
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-semibold lg:text-5xl text-foreground">Create Clean, Modern, and Amazing Graphs</h2>
                            <p className="mt-6 text-foreground/70">Transform your data into stunning visualizations with Datavanta. Our intuitive platform empowers you to design beautiful, professional charts that tell your story with clarity and style.</p>
                        </div>
                        <ul className="mt-8 divide-y border-y border-border *:flex *:items-center *:gap-3 *:py-3 text-foreground">
                            <li>
                                <Mail className="size-5" />
                                Multiple chart types
                            </li>
                            <li>
                                <Zap className="size-5" />
                                Real-time customization
                            </li>
                            <li>
                                <Activity className="size-5" />
                                Advanced styling options
                            </li>
                            <li>
                                <DraftingCompass className="size-5" />
                                Professional design tools
                            </li>
                        </ul>
                    </div>
                    <div className="border-border/80 relative rounded-3xl border p-3 lg:col-span-3">
                        <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <Image src={Dashboard} className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1207} height={929} />
                            <Image src="/payments-light.png" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1207} height={929} />
                        </div>
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
