import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import StarBorder from "@/components/StarBorder";
import Orb from "@/components/Orb";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    return (
        <div className="pt-16 sm:pt-20">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    {/* Divider lines + robot header */}
                    <div className="flex items-center w-full">
                        <div
                            className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent"
                        />
                        <div className="flex flex-col items-center">
                            {/* Robot — tall enough to show full body */}
                            <div
                                className="relative -mt-16"
                                style={{ width: '320px', height: '500px' }}
                            >
                                <div className="absolute inset-0 z-0 pointer-events-none scale-125 opacity-75">
                                    <Orb
                                        hue={280}
                                        hoverIntensity={0.25}
                                        rotateOnHover={true}
                                        forceHoverState={true}
                                    />
                                </div>
                                <InteractiveRobotSpline
                                    scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                                    className="w-full h-full relative z-10"
                                    canvasWidth={560}
                                    canvasHeight={760}
                                />
                            </div>
                            {/* "My Projects" badge — sits below the robot, no overlap */}
                            <StarBorder as="div" color="#c084fc" speed="4s" className="rounded-full shadow-lg shadow-purple-500/20">
                                <div className="bg-neutral-900/90 border border-purple-500/30 text-purple-200 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                    <span>My Projects</span>
                                </div>
                            </StarBorder>
                        </div>
                        <div
                            className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent"
                        />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Check out my latest work</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                            I&apos;ve worked on a variety of projects, from simple
                            websites to complex web applications. Here are a few of my
                            favorites.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
                    {DATA.projects.map((project, id) => (
                        <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                href={project.href}
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                image={project.image}
                                video={project.video}
                                links={project.links}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </div>
    );
}

