import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";

import { Demo } from "@/components/home/demo";

import { ProblemSolution } from "@/components/home/problem-solution";
import { Features } from "@/components/home/features";

import { Testimonials } from "@/components/home/testimonials";
import { Pricing } from "@/components/home/pricing";

import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Demo />
        <ProblemSolution />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
