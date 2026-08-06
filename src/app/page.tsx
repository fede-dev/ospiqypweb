import { Hero } from "@/components/home/Hero";
import { ServiceCards } from "@/components/home/ServiceCards";
import { QuickContact } from "@/components/home/QuickContact";
import { DelegationsPreview } from "@/components/home/DelegationsPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <QuickContact />
      <DelegationsPreview />
    </>
  );
}
