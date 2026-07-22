import { NextRequest, NextResponse } from "next/server";
import { DATA } from "@/data/resume";

const SYSTEM_INSTRUCTION = `You are "Vedant's AI Assistant", a friendly, smart, and helpful AI assistant representing Vedant Patil on his personal portfolio website.

Your task is to answer visitor questions accurately, concisely, and enthusiastically about Vedant Patil based strictly on the following information:

---
NAME: ${DATA.name} (${DATA.initials})
LOCATION: ${DATA.location}
EMAIL: ${DATA.contact.email}
PHONE: ${DATA.contact.tel}
WEBSITE: ${DATA.url}
DESCRIPTION: ${DATA.description}
SUMMARY: ${DATA.summary}

EDUCATION:
${DATA.education.map((e) => `- ${e.degree} from ${e.school} (${e.start || ""} ${e.end})`).join("\n")}

WORK EXPERIENCE:
${DATA.work.map((w) => `- ${w.title} at ${w.company} (${w.start || ""} ${w.end}): ${w.description}`).join("\n")}

SKILLS:
${DATA.skills.map((s) => s.name).join(", ")}

TOOLS & UTILITIES:
${DATA.tools.map((t) => t.name).join(", ")}

FEATURED PROJECTS:
${DATA.projects
  .map(
    (p) =>
      `- ${p.title}: ${p.description} (Built using: ${p.technologies.join(", ")})${p.href ? ` [Live Link: ${p.href}]` : ""}`
  )
  .join("\n")}

CERTIFICATIONS:
${DATA.certifications.map((c) => `- ${c.title} by ${c.issuer} (${c.dates}): ${c.description}`).join("\n")}

SOCIAL LINKS:
- GitHub: ${DATA.contact.social.GitHub.url}
- LinkedIn: ${DATA.contact.social.LinkedIn.url}
- Email: mailto:${DATA.contact.email}
---

BEHAVIOR RULES:
1. Always be polite, professional, and engaging.
2. If asked in Marathi, Hindi, or English, respond naturally in that language.
3. Keep answers concise, clear, and well-formatted using bolding and bullet points.
4. Emphasize Vedant's strengths in Full Stack Web Development (React, Next.js, Node.js, Express, MongoDB, Tailwind CSS).
5. Provide relevant project links or email links when requested.
`;

function getSmartEngineResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim();

  // Helper for keyword checking
  const matches = (...words: string[]) => words.some((w) => lower.includes(w));

  // --- CHECK 1: SPECIFIC PROJECT INQUIRY ---
  const foundProject = DATA.projects.find((p) => {
    const titleLower = p.title.toLowerCase();
    const words = titleLower.split(/[\s\-_–]+/);
    // Check if whole title or key project words are in query
    if (lower.includes(titleLower)) return true;
    if (words.some((w) => w.length > 3 && lower.includes(w))) return true;
    return false;
  });

  if (foundProject) {
    const techList = foundProject.technologies.join(", ");
    return `🚀 **Project Details: ${foundProject.title}**\n\n📌 **Description**:\n${foundProject.description}\n\n💻 **Technologies Used**:\n${techList}${
      foundProject.href ? `\n\n🌐 **Live Demo**: [${foundProject.href}](${foundProject.href})` : ""
    }`;
  }

  // --- CHECK 2: MOBILE / PHONE NUMBER ---
  if (matches("mo no", "mono", "mobile", "phone", "number", "tel", "call", "contact number", "whatsapp")) {
    return `📞 **Vedant's Contact Number**:\n\n• **Phone / WhatsApp**: ${DATA.contact.tel}\n• **Email**: [${DATA.contact.email}](mailto:${DATA.contact.email})\n\nFeel free to call or message!`;
  }

  // --- CHECK 3: ADDRESS / LOCATION ---
  if (matches("address", "location", "city", "live", "where", "rhenar", "rahato", "place", "jalgaon", "state", "maharashtra")) {
    return `📍 **Vedant's Location & Address**:\n\n• **Location**: ${DATA.location}\n• 🗺️ **Google Maps Link**: [View Jalgaon on Map](${DATA.locationLink})`;
  }

  // --- CHECK 4: EMAIL / SOCIAL LINKS ---
  if (matches("email", "mail", "linkedin", "github", "social", "contact", "reach", "sampark")) {
    return ` You can contact **Vedant Patil** via:\n\n• 📧 **Email**: [${DATA.contact.email}](mailto:${DATA.contact.email})\n• 📞 **Phone**: ${DATA.contact.tel}\n• 🔗 **LinkedIn**: [Vedant's LinkedIn Profile](${DATA.contact.social.LinkedIn.url})\n• 🐙 **GitHub**: [Vedant's GitHub Profile](${DATA.contact.social.GitHub.url})`;
  }

  // --- CHECK 5: EDUCATION & EXPERIENCE COMBINED ---
  const isEdu = matches("education", "degree", "college", "school", "bca", "shikshan", "padvi", "study", "university");
  const isExp = matches("experience", "intern", "job", "anubhav", "work experience", "company", "worked");

  if (isEdu && isExp) {
    const edu = DATA.education[0];
    const expText = DATA.work
      .map((w) => `• **${w.title}** at **${w.company}** (${w.end})\n  ${w.description}`)
      .join("\n\n");

    return `🎓 **Education**:\n• **${edu.degree}** from **${edu.school}** (${edu.end})\n\n💼 **Work Experience**:\n${expText}`;
  }

  // --- CHECK 6: EDUCATION ONLY ---
  if (isEdu) {
    const edu = DATA.education[0];
    return `🎓 **Education**:\n\nVedant completed his **${edu.degree}** from **${edu.school}** (${edu.end}).`;
  }

  // --- CHECK 7: WORK EXPERIENCE ONLY ---
  if (isExp) {
    const expText = DATA.work
      .map((w) => `• **${w.title}** at **${w.company}** (${w.end})\n  ${w.description}`)
      .join("\n\n");
    return `💼 **Work Experience**:\n\n${expText}`;
  }

  // --- CHECK 8: SKILLS & TOOLS ---
  if (matches("skill", "technolog", "language", "stack", "tool", "kaay yet", "yeth", "know", "code", "dev", "react", "next", "node", "express", "mongodb", "tailwind", "typescript", "javascript")) {
    const techSkills = DATA.skills.map((s) => s.name).join(", ");
    const toolSkills = DATA.tools.map((t) => t.name).join(", ");
    return `💻 **Vedant's Technical Skills & Stack**:\n\n• **Core Stack**: ${techSkills}\n\n🛠️ **AI Tools & Utilities**: ${toolSkills}`;
  }

  // --- CHECK 9: GENERAL PROJECTS LIST ---
  if (matches("project", "built", "apps", "application", "website", "keli", "kam", "kaam", "portfolio", "detail", "detaile")) {
    const projectList = DATA.projects
      .slice(0, 5)
      .map(
        (p) =>
          `• **${p.title}**\n  ${p.description.slice(0, 95)}...${p.href ? ` ([Live Demo](${p.href}))` : ""}`
      )
      .join("\n\n");

    return `🚀 **Vedant's Top Featured Projects**:\n\n${projectList}\n\n*(Tip: Ask me about any specific project name like **QuickBlog**, **DoctorOnCall**, or **GreenCart** for detailed info!)*`;
  }

  // --- CHECK 10: CERTIFICATIONS ---
  if (matches("certif", "deloitte", "ea", "certificate")) {
    const certList = DATA.certifications
      .map((c) => `• **${c.title}** by **${c.issuer}** (${c.dates})`)
      .join("\n");
    return `📜 **Certifications**:\n\n${certList}`;
  }

  // --- CHECK 11: ABOUT / BIO / GREETING ---
  if (matches("who", "about", "vedant", "vedu", "intro", "namaskar", "hi", "hello", "hey", "kon", "sang")) {
    return `Hello! 👋 I'm **Vedu's AI Assistant**.\n\n**${DATA.name}** is a **Full Stack Web Developer** based in ${DATA.location}.\n\n${DATA.summary}\n\nFeel free to ask me about his **Skills**, **Projects**, **Experience**, or **Contact Info**!`;
  }

  // DEFAULT FALLBACK
  return `**Vedant Patil** is a Full Stack Web Developer based in ${DATA.location}.\n\n• 📧 **Email**: [${DATA.contact.email}](mailto:${DATA.contact.email})\n• 📞 **Phone**: ${DATA.contact.tel}\n• 📍 **Location**: ${DATA.location}`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const userMessage = messages[messages.length - 1]?.content || "";

    // If API key is missing or invalid format (not starting with AIza), use local smart engine
    if (!apiKey || apiKey.trim() === "" || !apiKey.startsWith("AIza")) {
      return NextResponse.json({
        reply: getSmartEngineResponse(userMessage),
      });
    }

    // Try calling Gemini API if valid key is set
    const contents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am ready to answer any questions about Vedant Patil." }],
      },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply && reply.trim()) {
            return NextResponse.json({ reply });
          }
        }
      } catch (err) {
        console.warn(`Gemini API Model (${model}) call failed:`, err);
      }
    }

    // Fallback if API response was unavailable
    return NextResponse.json({
      reply: getSmartEngineResponse(userMessage),
    });
  } catch (error) {
    console.error("API Chat Error:", error);
    return NextResponse.json({
      reply: getSmartEngineResponse("about"),
    });
  }
}
