"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./LandHero.css";
import NeuralBackground from "@/components/ui/flow-field-background";
import { DATA } from "@/data/resume";
import FallingText from "@/components/FallingText";

export default function LandHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Stats Counters
  const [projectsCount, setProjectsCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);

  const photoWrapRef = useRef<HTMLDivElement>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    const roles = [
      "Full Stack Dev",
      "React.js Dev",
      "Next.js Dev",
      "Node.js Dev",
      "API Builder",
      "Web Developer",
    ];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (typedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timer = setTimeout(() => {}, 400);
      } else {
        timer = setTimeout(() => {
          setTypedText((prev) => prev.slice(0, -1));
        }, 48);
      }
    } else {
      const currentWord = roles[roleIndex];
      if (typedText === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      } else {
        timer = setTimeout(() => {
          setTypedText((prev) => currentWord.slice(0, prev.length + 1));
        }, 85);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Count Up animation on mount
  useEffect(() => {
    const duration = 1600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad helper
      const easeProgress = progress * (2 - progress);

      setProjectsCount(Math.floor(easeProgress * 9));
      setExperienceCount(Math.floor(easeProgress * 9));
      setSkillsCount(Math.floor(easeProgress * 14));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Parallax tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = photoWrapRef.current;
    const frame = photoFrameRef.current;
    if (!wrap || !frame) return;

    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    frame.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) scale(1.02)`;
    frame.style.boxShadow = `${x * -20}px ${y * -20}px 60px rgba(124,58,237,0.3), 0 40px 80px rgba(0,0,0,0.55)`;

    const badges = wrap.querySelectorAll(".badge-float");
    badges.forEach((b: any, i) => {
      const depth = (i % 3 + 1) * 0.25;
      b.style.transform = `translate(${x * -20 * depth}px, ${y * -14 * depth}px)`;
    });
  };

  const handleMouseLeave = () => {
    const wrap = photoWrapRef.current;
    const frame = photoFrameRef.current;
    if (frame) {
      frame.style.transform = "";
      frame.style.boxShadow = "";
    }
    if (wrap) {
      const badges = wrap.querySelectorAll(".badge-float");
      badges.forEach((b: any) => {
        b.style.transform = "";
      });
    }
  };

  return (
    <section className="land-hero-wrapper" id="home">
      {/* NeuralBackground flow field layer */}
      <div className="absolute inset-0 pointer-events-none opacity-85" style={{ zIndex: 1 }}>
        <NeuralBackground
          color="#a855f7"
          trailOpacity={0.08}
          particleCount={250}
          speed={0.6}
        />
      </div>

      {/* Background Orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Noise Texture */}
      <div className="noise"></div>

      <div className="hero-inner">
        {/* LEFT: Content */}
        <div className="hero-content">
          {/* Title */}
          <h1 className="hero-title">
            <span className="title-line name-line">
              <span className="title-inner name-text">Vedant Patil</span>
            </span>
          </h1>

          {/* Badge */}
          <div className="badge-available" style={{ marginBottom: "18px", marginTop: "14px" }}>
            <span className="badge-dot"></span>
            Available for work
          </div>

          {/* Typed Role */}
          <div className="hero-role-line">
            <span className="gradient-text role-text">{typedText}</span>
            <span className="typed-cursor"></span>
          </div>

          {/* Description */}
          <FallingText
            text={DATA.description}
            highlightWords={["React.js", "Next.js", "JavaScript", "Tailwind", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Supabase", "REST"]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="17px"
            mouseConstraintStiffness={0.9}
            className="hero-desc text-left!"
          />

          {/* CTA Buttons */}
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">
              View My Work
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="mailto:vedantpatil182@gmail.com" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">{projectsCount}+</span>
              <span className="stat-lbl">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">{experienceCount}mo</span>
              <span className="stat-lbl">Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">{skillsCount}+</span>
              <span className="stat-lbl">Skills</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div
          className="hero-photo-wrap"
          id="photoWrap"
          ref={photoWrapRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glow */}
          <div className="photo-glow"></div>

          {/* Orbit Rings */}
          <div className="rings">
            <div className="ring ring-a"></div>
            <div className="ring ring-b"></div>
            <div className="ring ring-c"></div>
          </div>

          {/* Orbit Dots */}
          <div className="orbit-container oc-1">
            <div className="orbit-dot"></div>
          </div>
          <div className="orbit-container oc-2">
            <div className="orbit-dot"></div>
          </div>
          <div className="orbit-container oc-3">
            <div className="orbit-dot"></div>
          </div>

          {/* Photo Frame */}
          <div className="photo-frame" id="photoFrame" ref={photoFrameRef}>
            <Image
              src="/vedant_photo.jpg"
              alt="Vedant Patil — Full Stack Developer"
              id="photoImg"
              width={300}
              height={360}
              priority
            />
            <div className="photo-shine"></div>
            <div className="photo-bottom-fade"></div>
          </div>

          {/* Floating Tech Badges */}
          <div className="badge-float bf-react">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              width="22"
              height="22"
              alt="React"
            />
            React.js
          </div>
          <div className="badge-float bf-next">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
              width="22"
              height="22"
              alt="Next.js"
              style={{ filter: "invert(1)" }}
            />
            Next.js
          </div>
          <div className="badge-float bf-node">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
              width="22"
              height="22"
              alt="Node.js"
            />
            Node.js
          </div>
          <div className="badge-float bf-mongo">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
              width="22"
              height="22"
              alt="MongoDB"
            />
            MongoDB
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}
