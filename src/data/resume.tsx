import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Java } from "@/components/ui/svgs/java";
import { Python } from "@/components/ui/svgs/python";
import { Sparkles, Bot, BrainCircuit, Rocket, Wand2, Blocks, GitBranch, Figma, Send, Building2, GraduationCap } from "lucide-react";

export const DATA = {
  name: "Vedant Patil",
  initials: "VP",
  url: "https://vedantpatil.dev",
  location: "Jalgaon, Maharashtra, India",
  locationLink: "https://www.google.com/maps/place/jalgaon",
  description:
    "Full Stack Web Developer with strong fundamentals in React.js, Next.js, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3, React Native, Node.js, Express.js, MongoDB, PostgreSQL, Supabase, and REST APIs.",
  summary:
    "Motivated Full Stack Web Developer seeking an entry-level software development role where I can apply my skills in building scalable web applications, RESTful APIs, and database-driven solutions. Currently pursuing a [Bachelor of Computer Applications (BCA)](/#education) from KCES's Institute of Management & Research, Jalgaon. I have hands-on experience with modern web technologies and a passion for continuously learning and contributing to organizational growth.",
  avatarUrl: "/avatar_new.jpg",
  skills: [
    { name: "HTML5", icon: ReactLight },
    { name: "CSS3", icon: ReactLight },
    { name: "JavaScript", icon: Typescript },
    { name: "React.js", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Tailwind CSS", icon: ReactLight },
    { name: "Bootstrap", icon: ReactLight },
    { name: "Node.js", icon: Nodejs },
    { name: "Express.js", icon: Nodejs },
    { name: "MongoDB", icon: Java },
    { name: "RESTful APIs", icon: Nodejs },
    { name: "Git & GitHub", icon: Java },
    { name: "AWS (Basics)", icon: Java },
    { name: "TypeScript", icon: Typescript },
  ],
  tools: [
    { name: "Gemini", icon: Sparkles },
    { name: "Claude", icon: Bot },
    { name: "OpenAI", icon: BrainCircuit },
    { name: "Antigravity", icon: Rocket },
    { name: "Stitch", icon: Wand2 },
    { name: "Google Studio", icon: Blocks },
    { name: "Git", icon: GitBranch },
    { name: "Figma", icon: Figma },
    { name: "Postman", icon: Send },
    { name: "GitHub", icon: Icons.github },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "vedantpatil182@gmail.com",
    tel: "+919405796393",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/vedantpatil182",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/vedant-patil-876972288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "#",
        icon: Icons.x,
        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "#",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:vedantpatil182@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Miracle IT Soft",
      href: "",
      badges: [],
      icon: Building2,
      location: "Remote",
      title: "Freelance Developer",
      logoUrl: "",
      start: "",
      end: "6 Months",
      description:
        "Developed and maintained web and mobile applications for clients. Worked remotely on feature development, bug fixing, and UI improvements. Collaborated with team members using version control and delivered projects within deadlines.",
    },
    {
      company: "Flastech",
      href: "",
      badges: [],
      icon: Building2,
      location: "",
      title: "Software Developer Intern",
      logoUrl: "",
      start: "",
      end: "3 Months",
      description:
        "Worked on web and mobile application development using modern technologies. Assisted in building UI components and fixing bugs. Collaborated with the development team to improve application performance and participated in testing, debugging, and deployment processes.",
    },
  ],
  education: [
    {
      school: "KCES's Institute of Management & Research, Jalgaon",
      href: "",
      icon: GraduationCap,
      degree: "Bachelor of Computer Applications (BCA)",
      logoUrl: "",
      start: "",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "DoctorOnCall",
      href: "",
      dates: "",
      active: true,
      description:
        "Full-stack doctor appointment platform revamped with a modern, high-quality design. Features include a clean medical aesthetic, smooth animations, responsive dashboards for patients and doctors, and a streamlined booking flow.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "Node.js",
        "Express",
        "Prisma",
        "SQLite",
      ],
      links: [],
      image: "/doctor-on-call-full.png",
      video: "",
    },
    {
      title: "E-commerce App",
      href: "",
      dates: "",
      active: true,
      description:
        "Built a cross-platform mobile application using Expo and React Native. The project follows a clean structure with file-based routing using Expo Router, enabling scalable navigation and organized code. Supports development and testing on Android, iOS, and web platforms.",
      technologies: [
        "React Native",
        "Expo",
        "Expo Router",
      ],
      links: [],
      image: "/ecommerce-preview.jpeg",
      video: "",
    },
    {
      title: "SET-KROP Business Professional Website",
      href: "https://demo-set-korp-business-professional.vercel.app",
      dates: "",
      active: true,
      description:
        "Developed a modern and responsive business website for showcasing professional services and company information. The website features a clean UI design, structured sections for services, about, and contact, ensuring a smooth user experience. Focused on responsive design, professional layout, and optimized performance for better usability across devices. Designed to represent a business brand with a clear and professional online presence.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Responsive Design"
      ],
      links: [
        {
          type: "Website",
          href: "https://demo-set-korp-business-professional.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/set_krop_full_page.png",
      video: "",
    },
    {
      title: "KhelkudAI Business Solutions Private Limited – Website",
      href: "https://khelkud-ai-business-solutions-priva.vercel.app",
      dates: "",
      active: true,
      description:
        "Developed a responsive business website for KhelkudAI Business Solutions Private Limited using React and Vite. The site showcases sports management services with a clean UI and modern responsive design.",
      technologies: [
        "React",
        "Vite",
        "Responsive Design"
      ],
      links: [
        {
          type: "Website",
          href: "https://khelkud-ai-business-solutions-priva.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/khelkud_full_page.png",
      video: "",
    },
    {
      title: "QuickBlog - AI Blogging Platform",
      href: "https://quick-blog-vedant-patil.vercel.app/",
      dates: "May 2026",
      active: true,
      description:
        "Full-stack AI-powered blogging platform where users can generate blog posts using Google Gemini AI. Features include secure JWT authentication, rich text editing with Quill, and ImageKit integration.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "Gemini AI",
        "ImageKit",
      ],
      links: [
        {
          type: "Website",
          href: "https://quick-blog-vedant-patil.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/quickblog-full.png",
      video: "",
    },
    {
      title: "GreenCart - Vegetable E-commerce",
      href: "https://green-cart-client-ten.vercel.app",
      dates: "May 2026",
      active: true,
      description:
        "A modern MERN stack e-commerce platform for fresh vegetables. Includes Stripe payment gateway, Cloudinary image management, and a dedicated seller dashboard for inventory control.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "Stripe",
        "Cloudinary",
      ],
      links: [
        {
          type: "Website",
          href: "https://green-cart-client-ten.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/greencart-full.png",
      video: "",
    },
  ],
  certifications: [
    {
      title: "Technology Job Simulation",
      dates: "Feb 2026",
      issuer: "Deloitte",
      description: "Deloitte Certificate",
      image: "/deloitte.png",
    },
    {
      title: "Software Engineering Job Simulation",
      dates: "Feb 2026",
      issuer: "Electronic Arts",
      description: "Forage Certificate",
      image: "/ea.png",
    }
  ],
} as const;
