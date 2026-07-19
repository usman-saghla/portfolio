"use client";

import React, { useState, useEffect } from "react";
import ClassGrid from "@/components/ClassGrid";
import BackgroundParticles from "@/components/BackgroundParticles";
import ScrollReveal from "@/components/ScrollReveal";
import ResearchConsole from "@/components/ResearchConsole";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const PROJECTS = [
  {
    tag: "COMPUTER VISION · MS THESIS",
    title: "Multi-Temporal Land Cover Classification",
    description:
      "Swin Transformer-based architecture for classifying land cover across multi-temporal satellite imagery, capturing how terrain changes over time rather than a single snapshot.",
    stack: ["Swin Transformer", "PyTorch/TensorFlow", "Remote Sensing"],
  },
  {
    tag: "CYBERSECURITY · RESEARCH DIRECTION",
    title: "Transformer-Based Intrusion Detection",
    description:
      "Emerging research track applying transformer architectures to network intrusion detection, with an eye toward privacy-preserving and federated learning setups.",
    stack: ["IDS", "Federated Learning", "VANETs"],
  },
  {
    tag: "MOBILE + BACKEND",
    title: "MediFinder",
    description:
      "A Flutter and Firebase pharmacy-locator app that helps people find nearby pharmacies stocking the medicine they need.",
    stack: ["Flutter", "Firebase"],
  },
  {
    tag: "DEEP LEARNING",
    title: "Audiobook Churn Prediction",
    description:
      "A deep learning pipeline predicting customer churn for an audiobook service from usage and engagement data.",
    stack: ["TensorFlow/Keras", "Scikit-learn"],
  },
];

const SKILLS = [
  {
    group: "Languages & Frameworks",
    items: ["Python", "TensorFlow", "Keras", "Scikit-learn"],
  },
  {
    group: "Tools & Infrastructure",
    items: ["Git", "MySQL", "Firebase"],
  },
  {
    group: "Domains",
    items: [
      "Computer Vision",
      "Deep Learning",
      "Cybersecurity / IDS",
      "Remote Sensing",
    ],
  },
];

const PHRASES = [
  "Multi-Temporal Land Cover Classification",
  "Transformer-Driven Intrusion Detection",
  "Privacy-Preserving Federated Learning",
  "Deep Learning & Computer Vision"
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typewrittenText, setTypewrittenText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    let timer: any;
    const currentPhrase = PHRASES[phraseIndex];
    
    const handleType = () => {
      if (!isDeleting) {
        setTypewrittenText(currentPhrase.substring(0, typewrittenText.length + 1));
        if (typewrittenText.length === currentPhrase.length) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
        } else {
          timer = setTimeout(handleType, 60);
        }
      } else {
        setTypewrittenText(currentPhrase.substring(0, typewrittenText.length - 1));
        if (typewrittenText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          timer = setTimeout(handleType, 300);
        } else {
          timer = setTimeout(handleType, 30);
        }
      }
    };

    timer = setTimeout(handleType, isDeleting ? 30 : 60);
    return () => clearTimeout(timer);
  }, [typewrittenText, isDeleting, phraseIndex]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-bg text-text antialiased">
      {/* High-tech interactive background canvas particles */}
      <BackgroundParticles />

      {/* Ambient background glow orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 nav-glass">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#top" className="font-display font-semibold tracking-tight text-text text-xl">
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

          {/* Hamburger button for mobile */}
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

        {/* Mobile drawer overlay */}
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

      {/* Hero */}
      <section id="top" className="relative overflow-hidden border-b border-border pt-36 pb-32 px-6">
        <ClassGrid />
        <div className="relative max-w-3xl mx-auto text-center z-10">
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            <div className="hero-badge">
              <span className="pulse-dot" />
              <span>MS Computer Science</span>
            </div>
            <div className="hero-badge border-accent2/45 text-accent2">
              <span>COMSATS UNIVERSITY SAHIWAL</span>
            </div>
          </div>
          
          <h1 className="font-display font-semibold text-4xl sm:text-5xl leading-tight text-text mb-6">
            Classifying the world, <span className="gradient-text">one pixel</span> — and one packet — at a time.
          </h1>

          {/* Subtitle typewriter terminal */}
          <div className="font-mono text-xs sm:text-sm text-accent max-w-xl mx-auto mb-10 h-6 flex justify-center items-center gap-1 bg-bg-surface border border-border/40 rounded px-3 py-1 bg-surface/40 backdrop-blur-sm">
            <span>&gt; {typewrittenText}</span>
            <span className="typewriter-cursor" />
          </div>

          <p className="text-dim text-lg leading-relaxed max-w-xl mx-auto mb-10">
            I build transformer-based models for satellite image land cover
            classification, and I&apos;m extending that work toward
            transformer-driven intrusion detection and network security.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#research" className="btn-primary font-mono">
              View Research
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
          <p className="eyebrow mb-4">COORDINATES // ABOUT</p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-6">
            Grounded in classic ML, moving into research.
          </h2>
          <p className="text-dim leading-relaxed mb-4">
            I completed my BS in Computer Science at the University of Sahiwal
            and I&apos;m now in my first semester of an MS in Computer Science
            at COMSATS University, Sahiwal Campus. My thesis work centers on
            Swin Transformer architectures for multi-temporal satellite image
            land cover classification.
          </p>
          <p className="text-dim leading-relaxed">
            Alongside that, my supervisor is directing part of my research
            toward cybersecurity and deep learning — specifically transformer-
            based intrusion detection, with potential extensions into VANETs
            and federated, privacy-preserving learning. I care about work that
            holds up outside a notebook: reproducible, well-evaluated, and
            useful to someone who isn&apos;t the person who built it.
          </p>

          {/* High-tech Timeline */}
          <div className="timeline mt-12 border-t border-border/20 pt-10">
            <div className="timeline-item">
              <h4 className="font-display font-semibold text-text text-base">MS Computer Science</h4>
              <p className="font-mono text-xs text-accent mb-2">COMSATS University Sahiwal Campus // 2026 - Present</p>
              <p className="text-dim text-sm leading-relaxed">
                Specializing in deep learning applications. Research focus: Swin Transformer models for multi-temporal satellite remote sensing grids and attention-based IDS vectors.
              </p>
            </div>
            <div className="timeline-item">
              <h4 className="font-display font-semibold text-text text-base">BS Computer Science</h4>
              <p className="font-mono text-xs text-accent2 mb-2">University of Sahiwal // Graduated</p>
              <p className="text-dim text-sm leading-relaxed">
                Acquired foundational experience in database systems, computer vision libraries, and supervised model optimization workflows.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* Research */}
      <section id="research" className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <ScrollReveal animation="reveal">
          <p className="eyebrow mb-4">MODEL // RESEARCH</p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-10">
            Two tracks, one method.
          </h2>
        </ScrollReveal>
        
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <ScrollReveal animation="reveal-left" delay={100} className="h-full">
            <div className="glass-card h-full flex flex-col justify-between">
              <div className="glow-ring" />
              <div>
                <p className="font-mono text-xs text-classA mb-3">CURRENT · MS THESIS</p>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Swin Transformer Land Cover Classification
                </h3>
                <p className="text-dim text-sm leading-relaxed">
                  Applying hierarchical Swin Transformer architectures to
                  multi-temporal satellite imagery, to classify land cover more
                  accurately across time rather than from a single frame.
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="reveal-right" delay={200} className="h-full">
            <div className="glass-card h-full flex flex-col justify-between">
              <div className="glow-ring" />
              <div>
                <p className="font-mono text-xs text-classB mb-3">EMERGING · ADDITIONAL DIRECTION</p>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Transformer-Based Intrusion Detection
                </h3>
                <p className="text-dim text-sm leading-relaxed">
                  Exploring transformer architectures for network threat
                  detection, with interest in federated and privacy-preserving
                  learning setups and potential VANET applications.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Dynamic Interactive Research Console */}
        <ScrollReveal animation="reveal-scale" delay={300}>
          <ResearchConsole />
        </ScrollReveal>
      </section>

      <div className="section-divider max-w-5xl mx-auto" />

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <ScrollReveal animation="reveal">
          <p className="eyebrow mb-4">DATASET // PROJECTS</p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-10">
            Things I&apos;ve built.
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => (
            <ScrollReveal
              key={project.title}
              animation={idx % 2 === 0 ? "reveal-left" : "reveal-right"}
              delay={idx * 100}
              className="h-full"
            >
              <div className="glass-card flex flex-col h-full">
                <div className="glow-ring" />
                <p className="font-mono text-xs text-accent mb-3">{project.tag}</p>
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

      {/* Skills */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <ScrollReveal animation="reveal">
          <p className="eyebrow mb-4">STACK // SKILLS</p>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-10">
            What I work with.
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-8">
          {SKILLS.map((group, groupIdx) => (
            <ScrollReveal
              key={group.group}
              animation="reveal-scale"
              delay={groupIdx * 100}
            >
              <div className="skill-group">
                <h3 className="font-mono text-xs text-accent2 mb-6 uppercase tracking-wider font-semibold border-b border-border pb-2">
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
      <section id="contact" className="relative overflow-hidden scanline max-w-3xl mx-auto px-6 py-24 text-center z-10">
        <ScrollReveal animation="reveal-scale">
          <div className="contact-card p-10 backdrop-blur bg-bg-glass">
            <p className="eyebrow mb-4">UPLINK // CONTACT</p>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl mb-6">
              Let&apos;s talk.
            </h2>
            <p className="text-dim leading-relaxed mb-10 max-w-md mx-auto">
              Open to research collaboration, internships, and roles at the
              intersection of ML, computer vision, and cybersecurity.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap font-mono text-sm">
              <a href="mailto:your.email@example.com" className="contact-link">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>your.email@example.com</span>
              </a>
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="border-t border-border py-8 px-6 text-center footer-gradient relative z-10">
        <p className="font-mono text-xs text-dim">
          Built and deployed for free · Next.js on Vercel
        </p>
      </footer>
    </main>
  );
}

