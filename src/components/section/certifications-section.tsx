/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";
import StarBorder from "@/components/StarBorder";

export default function CertificationsSection() {
    if (!DATA.certifications) return null;

    return (
        <section id="certifications" className="overflow-hidden">
            <div className="flex min-h-0 flex-col gap-y-8 w-full">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                        <StarBorder as="div" color="#c084fc" speed="2s" className="rounded-full shadow-lg shadow-purple-500/20">
                            <div className="bg-neutral-900/90 border border-purple-500/30 text-purple-200 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                <span>Certifications</span>
                            </div>
                        </StarBorder>
                        <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Continuous Learning</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                            A showcase of my professional certifications and continuous learning journey.
                        </p>
                    </div>
                </div>
                <Timeline>
                    {DATA.certifications.map((certification) => (
                        <TimelineItem key={certification.title + certification.dates} className="w-full flex items-start justify-between gap-10">
                            <TimelineConnectItem className="flex items-start justify-center">
                                {certification.image ? (
                                    <Image
                                        src={certification.image}
                                        alt={certification.title}
                                        width={48}
                                        height={48}
                                        className="size-12 bg-card z-10 shrink-0 overflow-hidden p-2 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                                    />
                                ) : (
                                    <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
                                )}
                            </TimelineConnectItem>
                            <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                                {certification.dates && (
                                    <time className="text-xs text-muted-foreground">{certification.dates}</time>
                                )}
                                {certification.title && (
                                    <h3 className="font-semibold leading-none">{certification.title}</h3>
                                )}
                                {certification.issuer && (
                                    <p className="text-sm text-foreground font-medium">{certification.issuer}</p>
                                )}
                                {certification.description && (
                                    <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                                        {certification.description}
                                    </p>
                                )}
                            </div>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>
        </section>
    );
}
