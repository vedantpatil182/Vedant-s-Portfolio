/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import CertificationsSection from "@/components/section/certifications-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";
import NeuralBackground from "@/components/ui/flow-field-background";
import SkillsOrbitSection from "@/components/section/skills-orbit-section";
import LandHero from "@/components/LandHero";

const BLUR_FADE_DELAY = 0.04;


export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col relative">
      <LandHero />
      <div className="full-bleed relative py-14 bg-background">
        {/* NeuralBackground flow field layer */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-90 dark:opacity-85 bg-black">
          <NeuralBackground
            color="#a855f7"
            trailOpacity={0.08}
            particleCount={70}
            speed={0.5}
          />
        </div>

        {/* Centered content layout */}
        <div className="max-w-2xl mx-auto px-6 relative z-10 flex flex-col gap-14 w-full">
          <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <ScrollFloat
              animationDuration={0.8}
              ease="back.out(1.5)"
              scrollStart="top bottom+=85%"
              scrollEnd="bottom top+=15%"
              stagger={0.03}
              textClassName="text-xl font-bold text-foreground"
            >
              About
            </ScrollFloat>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <Image
                        src={education.logoUrl}
                        alt={education.school}
                        width={40}
                        height={40}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (education as any).icon ? (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none flex items-center justify-center">
                        {(() => {
                          const Icon = (education as any).icon;
                          return <Icon className="size-4 md:size-5 text-muted-foreground" />;
                        })()}
                      </div>
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
          <section id="skills">
            <div className="flex min-h-0 flex-col gap-y-4">
              <BlurFade delay={BLUR_FADE_DELAY * 9}>
                <h2 className="text-xl font-bold">Skills &amp; Tools</h2>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 10}>
                <SkillsOrbitSection />
              </BlurFade>
            </div>
          </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="certifications">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <CertificationsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
        </div>
      </div>
    </main>
  );
}
