import FeatureCard from "@/components/FeatureCard";
import Image from "next/image";
import avatar1 from '@/assets/images/avatar-ashwin-santiago.jpg';
import avatar2 from '@/assets/images/avatar-lula-meyers.jpg';
import avatar3 from '@/assets/images/avatar-florence-shaw.jpg';
import Avatar from "@/components/Avatar";
import Key from "@/components/Key";

const features = [
    "Asset Library",
    "Code Preview",
    "Flow Mode",
    "Smart Sync",
    "Auto Layout",
    "Fast Search",
    "Smart Guides",
];

export default function Features() {
    return <section className="py-24">
        <div className="container">
            <h2 className="text-6xl font-medium text-center mt-6 max-w-2xl mx-auto">
                Where power meets {" "}
                <span className="bg-gradient-to-r from-[#ec3e52] to-[#2b6ac4] inline-block text-transparent bg-clip-text">simplicity</span>
            </h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
                <FeatureCard 
                title="Real-Time Collaboration" 
                description="Work together seamlessly with conflict-free editing"
                className="md:col-span-2 lg:col-span-1"> 

                <div className="aspect-video flex items-center justify-center">
                    <Avatar>
                        <Image 
                        src={avatar1} 
                        alt="avatar1" 
                        className="rounded-full" />
                    </Avatar>

                    <Avatar className="-ml-6 border-indigo-500">
                        <Image
                        src={avatar2} 
                        alt="avatar2" 
                        className="rounded-full" />
                    </Avatar>

                    <Avatar className="-ml-6 border-amber-500">
                        <Image 
                        src={avatar3} 
                        alt="avatar3" 
                        className="rounded-full" />
                    </Avatar>

                    <Avatar className="-ml-6 border-transparent">
                        <div className="size-full bg-neutral-700 rounded-full inline-flex items-center justify-center gap-1">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <span className="size-1.5 rounded-full bg-white inline-flex"
                                 key={i}>
                                </span>
                            ))}
                        </div>
                    </Avatar>
                </div>
                </FeatureCard>

                <FeatureCard 
                title="Interactive Protoyping" 
                description="Engage your clients with protoypes that react to user actions"
                className="md:col-span-2 lg:col-span-1"> 

                <div className="aspect-video flex items-center justify-center">
                    <p className="text-4xl font-extrabold text-white/20 text-center">
                        We've achieved{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        incredible</span> growth this year</p>
                </div>
                </FeatureCard>

                <FeatureCard 
                title="Keyboard Quick Actions" 
                description="Powerful commands to help you create graphs more quickly"
                className="md:col-span-2 lg:col-span-1 md:col-start-2 lg:col-start-auto"> 

                <div className="aspect-video flex items-center justify-center gap-4">
                    <Key className="w-28">shift</Key>
                    <Key>alt</Key>
                    <Key>C</Key>
                </div>
                </FeatureCard>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {features.map((feature) => (
                    <div key={feature} className="bg-neutral-900 border border-white/10 inline-flex px-3 md:px-5 py-1.5 md:px-2 rounded-2xl gap-3 items-center">
                        <span className="bg-blue-500 text-neutral-950 size-5 rounded-full inline-flex items-center justify-center tectl-xl">
                            &#10038;
                        </span>
                        <span className="font-medium md:text-lg">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
        
    </section>;
}
