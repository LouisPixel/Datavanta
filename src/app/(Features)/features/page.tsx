import { TuringLanding } from "@/app/(Features)/features/hero-landing-page";
import { NewHeader } from "@/components/header-2";
import Casestudies from "@/components/case-studies";
import FooterSection from "@/components/footer";


export default function DemoOne() {
  return (
    <div className="w-full">
        <NewHeader/>
      <TuringLanding />
      <Casestudies/>
      <FooterSection/>
    </div>
  );
}
