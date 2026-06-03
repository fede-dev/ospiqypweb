import { Hero } from "@/components/home/Hero";
import { ConcursoNotice } from "@/components/home/ConcursoNotice";
import { ServiceCards } from "@/components/home/ServiceCards";
import { QuickContact } from "@/components/home/QuickContact";
import { DelegationsPreview } from "@/components/home/DelegationsPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <ConcursoNotice />
      <ServiceCards />
      <QuickContact />
      <DelegationsPreview />
    </>
  );
}
