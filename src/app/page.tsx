import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import CallToAction from "@/sections/CallToAction";
import FeaturesSection1 from "@/components/features-5";
import FeaturesSection2 from "@/components/features-6";
import FooterSection from "@/components/footer";
import { Preview } from "@/sections/Images";
import { NewHeader } from "@/components/header-2";


export default function Home() {
    return <>
     <NewHeader />
     <Hero />

     <Introduction />

     <FeaturesSection1 />
     
     <FeaturesSection2 />


     
     <Preview/>
     


     <CallToAction />
     <FooterSection />

    </>;
}
