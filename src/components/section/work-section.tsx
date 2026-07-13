/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ElectricBorder from "@/components/ElectricBorder";

function LogoImage({ src, alt, icon: Icon }: { src?: string; alt: string; icon?: React.ElementType }) {
  const [imageError, setImageError] = useState(false);

  if (src && !imageError) {
    return (
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
        onError={() => setImageError(true)}
      />
    );
  }

  if (Icon) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none flex items-center justify-center">
        <Icon className="size-4 md:size-5 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
  );
}

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.work.map((work) => (
        <ElectricBorder
          key={work.company}
          color="#a855f7"
          speed={0.6}
          chaos={0.09}
          borderRadius={16}
          style={{ borderRadius: 16 }}
        >
          <AccordionItem
            value={work.company}
            className="w-full border-b-0 grid gap-2 p-4 rounded-2xl bg-background/60 backdrop-blur-sm"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
              <div className="flex items-center gap-x-3 justify-between w-full text-left">
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  <LogoImage src={work.logoUrl} alt={work.company} icon={(work as any).icon} />
                  <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                    <div className="font-semibold leading-none flex items-center gap-2">
                      {work.company}
                      <span className="relative inline-flex items-center w-3.5 h-3.5">
                        <ChevronRight
                          className={cn(
                            "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                            "translate-x-0 opacity-0",
                            "group-hover:translate-x-1 group-hover:opacity-100",
                            "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                            "opacity-0 rotate-0",
                            "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                          )}
                        />
                      </span>
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">
                      {work.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                  <span>
                    {work.start} - {work.end ?? "Present"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground">
              {work.description}
            </AccordionContent>
          </AccordionItem>
        </ElectricBorder>
      ))}
    </Accordion>
  );
}
