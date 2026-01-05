import NavBar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import LogoTicker from "@/sections/LogoTicker";
import Introduction from "@/sections/Introduction";
import Features from "@/sections/Features";

import CallToAction from "@/sections/CallToAction";
import FeaturesSection1 from "@/components/features-5";
import FeaturesSection2 from "@/components/features-6";

import FooterSection from "@/components/footer";
import { SectionMockupDemoPage } from "@/sections/Features1";
import TestimonialSection from "@/sections/Testimonials";
import DisplayCards from "@/components/ui/display-cards";
import CoreValueStatsDemo from "@/sections/CoreValue";
import { Header } from "@/components/header-3";
import { Features5 } from "@/components/features-11";
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
     

     <TestimonialSection />
     <CallToAction />
     <FooterSection />

    </>;
}
