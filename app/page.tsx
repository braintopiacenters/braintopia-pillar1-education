import Link from "next/link";
import { ArrowRight, Brain, Compass } from "lucide-react";
import braintopiaLogo from "@/assets/braintopia-logo.png";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="flex justify-center mb-6 md:mb-8">
          <img
            src={braintopiaLogo.src}
            alt="Braintopia"
            className="h-[7.5rem] sm:h-36 md:h-[10.5rem] w-auto max-w-[min(100%,420px)] sm:max-w-[480px] md:max-w-[540px] object-contain"
          />
        </div>

        <div className="flex justify-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium">
            <Brain className="w-4 h-4 shrink-0" />
            Pillar One: Education and Family Support
          </div>
        </div>

        <h1 className="max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-brand-dark mb-8 leading-[1.2]">
          For those who carry the weight of teaching and family life — educators, parents, and students navigating focus, regulation, and daily demands.
        </h1>

        <Link
          href="/find-your-pillar"
          className="btn-accent inline-flex items-center justify-center gap-2.5 max-w-xl mx-auto mb-10 px-6 py-4 rounded-2xl text-base sm:text-[17px] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all ring-2 ring-brand-yellow/40 ring-offset-2 ring-offset-brand-light"
        >
          <Compass className="w-5 h-5 shrink-0" />
          Not sure this fits? Take the quiz to find which pillar matches you.
        </Link>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/education-family-support-quiz" 
            className="btn-primary px-8 py-4 rounded-full text-lg inline-flex items-center justify-center gap-2"
          >
            Discover Your Class <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/classes" 
            className="px-8 py-4 rounded-full text-lg border border-brand-dark/20 hover:bg-white font-medium inline-flex items-center justify-center gap-2"
          >
            Browse the 7 Classes
          </Link>
        </div>

        <p className="mt-6 text-sm text-brand-dark/60">
          Warm • Professional • Grounded in brain science
        </p>
      </div>

      {/* Intro / Value Prop */}
      <div className="bg-white py-16 border-t border-b">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl font-medium tracking-tight mb-8">
            You show up every day for others.<br />Braintopia helps you show up for yourself too.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
            {[
              {
                title: "The 7 Classes",
                desc: "See which group you most closely identify with — from Guides and Caregivers to Different Thinkers and Supporters.",
                href: "/classes",
              },
              {
                title: "Thoughtful Discovery",
                desc: "Take a respectful 7-question quiz that surfaces your primary class and meaningful affinities.",
                href: "/education-family-support-quiz",
              },
              {
                title: "Clear Next Steps",
                desc: "Learn how neurofeedback supports your specific challenges and book a QEEG assessment with ease.",
                href: "https://www.braintopiacenters.com/contact",
                external: true,
              },
            ].map((item, i) => {
              const cardClassName =
                "card p-6 block h-full group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

              const content = (
                <>
                  <div className="font-semibold text-lg mb-2 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </div>
                  <p className="text-brand-dark/70 text-[15px] group-hover:text-brand-dark/80 transition-colors">
                    {item.desc}
                  </p>
                </>
              );

              if (item.external) {
                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link key={i} href={item.href} className={cardClassName}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick CTA Strip */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="text-brand-dark/70 mb-4">Ready to understand how your brain carries the load?</div>
        <Link href="/education-family-support-quiz" className="btn-accent inline-flex px-8 py-3.5 rounded-full text-lg">
          Take the Class Discovery Quiz
        </Link>
      </div>
    </div>
  );
}
