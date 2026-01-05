import { Contact2 } from "@/components//contact2";
import { NewHeader } from "@/components/header-2";
import FooterSection from "@/components/footer";
const DemoOne = () => {
  return (
    <Contact2 
      title="Contact Us"
      description="We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!"
      email="email@example.com"
      web={{ label: "shadcnblocks.com", url: "https://shadcnblocks.com" }}
    />
  );
};

export default function () {
    return ( <>
        <NewHeader/>
        <Contact2/>
        <FooterSection/>
    </> )
} ;
