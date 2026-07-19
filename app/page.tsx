"use client";

import React, { useState, useEffect } from "react";
import ClassGrid from "@/components/ClassGrid";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollReveal from "@/components/ScrollReveal";
import ResearchConsole from "@/components/ResearchConsole";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const PROJECTS = [
  {
    tag: "FULL-STACK · THIS SITE",
    title: "Personal Portfolio (v2)",
    description:
      "A Next.js and Tailwind portfolio with interactive research visualizations — classification grids, scroll motion, and a dual focus on product engineering and AI research.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
  },
  {
    tag: "MOBILE + BACKEND",
    title: "MediFinder",
    description:
      "A Flutter and Firebase pharmacy-locator app that helps people find nearby pharmacies stocking the medicine they need.",
    stack: ["Flutter", "Firebase"],
  },
  {
    tag: "COMPUTER VISION · MS THESIS",
    title: "Multi-Temporal Land Cover Classification",
    description:
      "Swin Transformer-based architecture for classifying land cover across multi-temporal satellite imagery, capturing how terrain changes over time rather than a single snapshot.",
    stack: ["Swin Transformer", "PyTorch / TensorFlow", "Remote Sensing"],
  },
  {
    tag: "DEEP LEARNING",
    title: "Audiobook Churn Prediction",
    description:
      "A deep learning pipeline predicting customer churn for an audiobook service from usage and engagement data.",
    stack: ["TensorFlow / Keras", "Scikit-learn"],
  },
  {
    tag: "CYBERSECURITY · RESEARCH DIRECTION",
    title: "Transformer-Based Intrusion Detection",
    description:
      "Emerging research track applying transformer architectures to network intrusion detection, with interest in privacy-preserving and federated learning setups.",
    stack: ["IDS", "Federated Learning", "VANETs"],
  },
];

const SKILLS = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Firebase", "MySQL", "REST APIs"],
  },
  {
    group: "AI / ML",
    items: [
      "Python",
      "TensorFlow / Keras",
      "Scikit-learn",
      "Computer Vision",
    ],
  },
  {
    group: "Tools",
    items: ["Git", "Flutter", "Vercel", "Research tooling"],
  },
];

const PHRASES = [
  "Full-Stack Web Development",
  "AI Research & Computer Vision",
  "React · Next.js · TypeScript",
  "Swin Transformers & Deep Learning",
  "Products that ship, models that hold up",
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typewrittenText, setTypewrittenText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentPhrase = PHRASES[phraseIndex];

    const handleType = () => {
      if (!isDeleting) {
        setTypewrittenText(currentPhrase.substring(0, typewrittenText.length + 1));
        if (typewrittenText.length === currentPhrase.length) {
          timer = setTimeout(() => setIsDeleting(true), 2400);
        } else {
          timer = setTimeout(handleType, 55);
        }
      } else {
        setTypewrittenText(currentPhrase.substring(0, typewrittenText.length - 1));
        if (typewrittenText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          timer = setTimeout(handleType, 280);
        } else {
          timer = setTimeout(handleType, 28);
        }
      }
    };

    timer = setTimeout(handleType, isDeleting ? 28 : 55);
    return () => clearTimeout(timer);
  }, [typewrittenText, isDeleting, phraseIndex]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-text antialiased">
      <BackgroundParticles />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <header className="fixed top-0 left-0 right-0 z-50 nav-glass">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="font-display font-semibold tracking-tight text-text text-xl"
          >
            Usman<span className="text-accent">.</span>
          </a>

          <ul className="hidden sm:flex gap-8 font-mono text-sm text-dim">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`hamburger sm:hidden ${mobileMenuOpen ? "open" : ""}`}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      {/* Hero — brand first, one composition */}
      <section
        id="top"
        className="relative overflow-hidden border-b border-border min-h-[100svh] flex items-center pt-24 pb-20 px-6"
      >
        <ClassGrid />
        <div className="relative max-w-3xl mx-auto text-center z-10 w-full">
          <div className="hero-brand mb-8">
            <p className="hero-role mb-5">
              Full-Stack Developer · AI Researcher
            </p>
            <p className="font-display font-bold text-5xl sm:text-7xl tracking-tight text-text leading-none">
              Usman<span className="text-accent">.</span>
            </p>
          </div>

          <div className="hero-copy">
            <h1 className="font-display font-semibold text-2xl sm:text-3xl leading-snug text-text mb-5 max-w-2xl mx-auto">
              I ship full-stack products and research{" "}
              <span className="gradient-text">AI systems</span> that hold up
              outside the notebook.
            </h1>

            <div className="font-mono text-xs sm:text-sm text-accent max-w-lg mx-auto mb-6 h-6 flex justify-center items-center gap-1">
              <span>&gt; {typewrittenText}</span>
              <span className="typewriter-cursor" />
            </div>

            <p className="text-dim text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Building with React and Next.js by day; training transformers for
              satellite vision and security research by night.
            </p>
          </div>

          <div className="hero-actions flex items-center justify-center gap-4 flex-wrap">
            <a href="#work" className="btn-primary font-mono">
              View Work
            </a>
            <a href="#contact" className="btn-outline font-mono">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-3xl mx-auto px-6 py-24 relative z-10">
        <ScrollReveal animation="reveal-left">
          <p className="eyebrow mb-4">About</p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-6">
            Product engineer. Research mind.
          </h2>
          <p className="text-dim leading-relaxed mb-4">
            I&apos;m a full-stack web developer and MS Computer Science student
            at COMSATS University, Sahiwal Campus. I build end-to-end web and
            mobile experiences — from React and Next.js frontends to Firebase
            backends — and I research deep learning for computer vision and
            network security.
          </p>
          <p className="text-dim leading-relaxed">
            My thesis centers on Swin Transformer architectures for
            multi-temporal satellite land-cover classification. Alongside that,
            I&apos;m exploring transformer-based intrusion detection. I care
            about work that ships cleanly and evaluates honestly — whether
            it&apos;s a product UI or a model paper.
          </p>

          <div className="timeline mt-12 border-t border-border/30 pt-10">
            <div className="timeline-item">
              <h4 className="font-display font-semibold text-text text-base">
                MS Computer Science
              </h4>
              <p className="font-mono text-xs text-accent mb-2">
                COMSATS University Sahiwal Campus // 2026 – Present
              </p>
              <p className="text-dim text-sm leading-relaxed">
                Deep learning research: Swin Transformers for multi-temporal
                remote sensing, plus attention-based intrusion detection.
              </p>
            </div>
            <div className="timeline-item">
              <h4 className="font-display font-semibold text-text text-base">
                BS Computer Science
              </h4>
              <p className="font-mono text-xs text-accent2 mb-2">
                University of Sahiwal // Graduated
              </p>
              <p className="text-dim text-sm leading-relaxed">
                Foundations in software systems, databases, and applied machine
                learning — the base for both product work and research.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* Work */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <ScrollReveal animation="reveal">
          <p className="eyebrow mb-4">Work</p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-10">
            Products and research builds.
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => (
            <ScrollReveal
              key={project.title}
              animation={idx % 2 === 0 ? "reveal-left" : "reveal-right"}
              delay={idx * 80}
              className="h-full"
            >
              <div className="glass-card flex flex-col h-full">
                <div className="glow-ring" />
                <p className="font-mono text-xs text-accent mb-3">
                  {project.tag}
                </p>
                <h3 className="font-display font-semibold text-lg mb-3">
                  {project.title}
                </h3>
                <p className="text-dim text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tech-tag font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* Research */}
      <section
        id="research"
        className="max-w-5xl mx-auto px-6 py-24 relative z-10"
      >
        <ScrollReveal animation="reveal">
          <p className="eyebrow mb-4">Research</p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-10">
            Two tracks, one method.
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <ScrollReveal
            animation="reveal-left"
            delay={100}
            className="h-full"
          >
            <div className="glass-card h-full flex flex-col justify-between">
              <div className="glow-ring" />
              <div>
                <p className="font-mono text-xs text-classA mb-3">
                  CURRENT · MS THESIS
                </p>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Swin Transformer Land Cover Classification
                </h3>
                <p className="text-dim text-sm leading-relaxed">
                  Hierarchical Swin Transformer architectures on multi-temporal
                  satellite imagery — classifying land cover across time, not
                  just a single frame.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            animation="reveal-right"
            delay={200}
            className="h-full"
          >
            <div className="glass-card h-full flex flex-col justify-between">
              <div className="glow-ring" />
              <div>
                <p className="font-mono text-xs text-classB mb-3">
                  EMERGING · DIRECTION
                </p>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Transformer-Based Intrusion Detection
                </h3>
                <p className="text-dim text-sm leading-relaxed">
                  Exploring transformers for network threat detection, with
                  interest in federated, privacy-preserving setups and VANET
                  applications.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="reveal-scale" delay={300}>
          <ResearchConsole />
        </ScrollReveal>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* Skills */}
      <section
        id="skills"
        className="max-w-5xl mx-auto px-6 py-24 relative z-10"
      >
        <ScrollReveal animation="reveal">
          <p className="eyebrow mb-4">Skills</p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-10">
            What I work with.
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((group, groupIdx) => (
            <ScrollReveal
              key={group.group}
              animation="reveal-scale"
              delay={groupIdx * 80}
            >
              <div className="skill-group">
                <h3 className="font-mono text-xs text-accent2 mb-5 uppercase tracking-wider font-semibold border-b border-border pb-2">
                  {group.group}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item} className="skill-item text-text text-sm">
                      <span className="skill-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* Contact */}
      <section
        id="contact"
        className="relative overflow-hidden max-w-3xl mx-auto px-6 py-24 text-center z-10"
      >
        <ScrollReveal animation="reveal-scale">
          <div className="contact-card p-10 backdrop-blur bg-bg-glass">
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-6">
              Let&apos;s build something.
            </h2>
            <p className="text-dim leading-relaxed mb-10 max-w-md mx-auto">
              Open to full-stack roles, internships, and research collaboration
              across web products, computer vision, and applied ML.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap font-mono text-sm">
              <a
                href="mailto:usmansaghla.dev@gmail.com"
                className="contact-link"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span>usmansaghla.dev@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/usman-saghla/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/usman-saghla"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="border-t border-border py-8 px-6 text-center footer-gradient relative z-10">
        <p className="font-mono text-xs text-dim">
          Usman Saghla · Portfolio v2 · Next.js on Vercel
        </p>
      </footer>
    </main>
  );
}
