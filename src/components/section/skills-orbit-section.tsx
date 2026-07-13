"use client";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

// All skills with fixed CDN logos — dark logos use simpleicons with /ffffff suffix for white version
const SKILLS = [
  { name: "HTML5",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React.js",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js",     logo: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "Tailwind",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Node.js",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js",  logo: "https://cdn.simpleicons.org/express/ffffff" },
  { name: "MongoDB",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL",  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Git",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "AWS",         logo: "https://api.iconify.design/logos:aws.svg" },
  { name: "Supabase",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "REST API",    logo: "https://api.iconify.design/carbon:api.svg?color=%23ffffff" },
  { name: "SQL",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

const TOOLS = [
  { name: "GitHub",      logo: "https://cdn.simpleicons.org/github/ffffff" },
  { name: "Figma",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Postman",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "OpenAI",      logo: "https://api.iconify.design/simple-icons:openai.svg?color=%23ffffff" },
  { name: "Gemini",      logo: "https://api.iconify.design/simple-icons:googlegemini.svg?color=%23ffffff" },
  { name: "VS Code",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
];

function SkillBadge({
  name,
  logo,
  size = 48,
  showName = true,
}: {
  name: string;
  logo: string;
  size?: number;
  showName?: boolean;
}) {
  return (
    <div
      title={name}
      className="flex flex-col items-center gap-1"
      style={{ width: size + 16 }}
    >
      {/* Icon circle */}
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-xl bg-background/90 border border-orange-500/20 shadow-[0_0_12px_rgba(249,115,22,0.15)] hover:shadow-[0_0_20px_rgba(249,115,22,0.45)] hover:border-orange-500/50 p-2 shrink-0 backdrop-blur-sm transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <img
          src={logo}
          alt={name}
          style={{ width: size * 0.56, height: size * 0.56, objectFit: "contain" }}
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const parent = img.parentElement;
            if (parent && !parent.querySelector("span.fallback")) {
              const span = document.createElement("span");
              span.className = "fallback text-[8px] font-bold text-foreground text-center leading-tight";
              span.textContent = name.slice(0, 3).toUpperCase();
              parent.appendChild(span);
            }
          }}
        />
      </div>
      {/* Name label */}
      {showName && (
        <span
          className="text-center font-medium text-muted-foreground leading-tight"
          style={{ fontSize: 9, maxWidth: size + 16, wordBreak: "break-word" }}
        >
          {name}
        </span>
      )}
    </div>
  );
}

export default function SkillsOrbitSection() {
  const outerRing = SKILLS.slice(0, 9);   // first 9 skills — outer orbit
  const middleRing = SKILLS.slice(9);     // remaining 8 skills — middle orbit

  return (
    <div className="relative flex h-[680px] w-full flex-col items-center justify-center overflow-hidden">

      {/* Center: label + tools inner ring */}
      <div className="z-10 flex flex-col items-center gap-0.5 pointer-events-none select-none text-center">
        <span className="text-xl font-bold text-foreground">My Stack</span>
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Skills &amp; Tools</span>
      </div>

      {/* Outer ring — outer orbit with name labels */}
      <OrbitingCircles iconSize={64} radius={280} duration={75} speed={1}>
        {outerRing.map((s) => (
          <SkillBadge key={s.name} name={s.name} logo={s.logo} size={52} showName />
        ))}
      </OrbitingCircles>

      {/* Middle ring — middle orbit, reversed */}
      <OrbitingCircles iconSize={58} radius={190} duration={55} speed={1} reverse>
        {middleRing.map((s) => (
          <SkillBadge key={s.name} name={s.name} logo={s.logo} size={46} showName />
        ))}
      </OrbitingCircles>

      {/* Inner ring — tools with names */}
      <OrbitingCircles iconSize={50} radius={100} duration={32} speed={1}>
        {TOOLS.map((t) => (
          <SkillBadge key={t.name} name={t.name} logo={t.logo} size={38} showName />
        ))}
      </OrbitingCircles>
    </div>
  );
}
