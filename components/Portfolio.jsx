"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, ExternalLink, X, Search,
  ArrowUpRight, GraduationCap, Trophy, Play
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* DATA — sourced from resume + project notes                          */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Nithishvar S",
  role: "Software Engineer / Business Analyst / AI Developer",
  tagline:
    "I build systems that reason over data — RAG pipelines, agentic AI, graph recommenders.",
  email: "nithishvars03@gmail.com",
  phone: "+91-9965766677",
  linkedin: "https://www.linkedin.com/in/nithishvar-srinivasan-696461250",
  github: "https://github.com/nithishvarsrinivasan",
};

const EXPERIENCE = [
  {
    role: "Operations",
    org: "TideFX",
    duration: "Feb 2023 — Present",
    location: "Chennai",
    points: [
      "Scaled a social media content agency from 0 to multiple paying clients, using generative AI models for end-to-end project delivery.",
      "Led a cross-functional team of editors and marketers, coordinating deliverables and quality under tight deadlines.",
    ],
  },
  {
    role: "Fitness & Nutrition Instructor",
    org: "Assisi Gym",
    duration: "May 2026 — Present",
    location: "Chennai",
    points: [
      "Coached individuals toward their health and fitness goals through personalised guidance in strength training, nutrition fundamentals, and sustainable lifestyle habits.",
      "Converted prospects into personal training and fitness programmes through effective communication and client engagement.",
    ],
  },
];

const EDUCATION = {
  institution: "VIT Chennai",
  degree: "Integrated M.Tech, CSE — Business Analytics",
  duration: "2022 — 2027",
  location: "Chennai, Tamil Nadu",
  detail: "CGPA: 8.26 / 10",
  coursework: [
    "Algorithms & Data Structures", "DBMS", "Computer Systems",
    "Data Analysis", "Operating Systems", "OOP", "Software Engineering",
  ],
};

const ACHIEVEMENTS = [
  { title: "Rank 37 — Techxlerate National Hackathon", org: "BITS Goa", detail: "RAG-based User Manual Query Tool" },
  { title: "Top 20 — National Intel GenAI Hackathon", org: "KPRIET, Coimbatore", detail: "Computer-vision bus announcement system for the visually impaired" },
];

const SKILLS = [
  { group: "Programming", items: ["Python", "JavaScript", "R", "SQL", "Data Structures", "Algorithms", "Design Patterns", "OOP"] },
  { group: "AI & Machine Learning", items: ["RAG pipelines", "LLM evaluation", "Agentic AI (CrewAI)", "Embeddings", "Graph ML (Node2Vec)"] },
  { group: "Data & Analytics", items: ["Data Analytics", "Statistical Modelling", "Business Analytics"] },
  { group: "Databases", items: ["Neo4j", "PostgreSQL", "SQL Server"] },
  { group: "Cloud & Platforms", items: ["Azure AI Foundry", "Git / GitHub"] },
  { group: "Tools", items: ["VS Code", "Jupyter", "Playwright"] },
  { group: "Soft Skills", items: ["Cross-functional leadership", "Client communication", "Coaching & feedback delivery"] },
];

const CATEGORIES = ["All", "AI & ML", "Data & Analytics", "Research", "Business Analytics"];

const PROJECTS = [
  {
    title: "RAG-Based Auto Paper Correction System",
    subtitle: "Evaluating handwritten student answers with OCR + RAG + LLM scoring",
    categories: ["AI & ML"],
    description:
      "An automated grading system for handwritten answer sheets. OCR digitises handwriting, a RAG framework retrieves relevant model answers by semantic similarity, and an LLM scores step-by-step partial credit alongside overall answer quality.",
    features: ["OCR extraction pipeline for handwritten text", "RAG retrieval over reference answer banks", "LLM-based step-wise and holistic scoring", "Confidence-check flagging for human review", "Manual override option for teachers"],
    contribution: "Designed and built the full pipeline — OCR extraction, embedding generation, RAG retrieval, and automated scoring — and validated it against curated grading benchmarks.",
    outcome: "Reached grading accuracy close to human evaluators while cutting grading time substantially.",
    tech: ["Python", "OCR", "RAG", "LLM Evaluation", "Embeddings"],
    video: "pVcD-14Uh9M", github: null, demo: null,
  },
  {
    title: "Campus-Confined Graph-Based Student Helper Recommender",
    subtitle: "Trusted peer-to-peer campus pickups, powered by graph ML",
    categories: ["AI & ML", "Data & Analytics"],
    description:
      "A campus platform that connects students to products and services through trusted peers. A Neo4j graph models relationships between students, products, and locations; Node2Vec and Personalized PageRank generate recommendations based on proximity, interests, and social ties.",
    features: ["Neo4j graph modelling students, products, and locations", "Node2Vec graph embeddings for similarity", "Personalized PageRank for ranked recommendations", "Registration-number lookup for bus stop, department, batch", "Custom proximity equation to minimise travel time"],
    contribution: "Built the graph schema, proximity scoring logic, and the embedding + ranking pipeline end-to-end.",
    outcome: "Makes campus pickups faster and more reliable by combining location data with collaborative filtering.",
    tech: ["Neo4j", "Node2Vec", "Personalized PageRank", "Python"],
    video: "s5IdSC2nEtA", github: "https://github.com/nithishvarsrinivasan/student-helper-recommender", demo: null,
  },
  {
    title: "GenAI Real-Time Investment Advisory System",
    subtitle: "Automated market news, alerts, and agentic analysis",
    categories: ["AI & ML", "Business Analytics"],
    description:
      "A real-time investment advisory system combining foundational analytics with agentic AI. Autonomous agents scrape financial news and market data, process it with NLP, and respond to user investment queries with personalised advice.",
    features: ["Autonomous agentic pipelines (CrewAI)", "Real-time scraping of financial news & market sources", "NLP-based analysis of unstructured news", "Personalised, query-driven investment guidance"],
    contribution: "Established the multi-step agentic pipelines for data extraction, transformation, and analysis, and documented model design and reproducibility notes.",
    outcome: "Demonstrates agentic AI initiating research and recommendations independently, rather than just responding.",
    tech: ["CrewAI", "Python", "NLP", "Agentic AI"],
    video: "QgjSC6-tB8c", github: "https://github.com/nithishvarsrinivasan/AgenticAI-Investment-Adivisor", demo: null,
  },
  {
    title: "AI-Driven Behavioural Fitness Intelligence Assistant",
    subtitle: "Learns habits, predicts unhealthy actions, nudges intelligently",
    categories: ["AI & ML"],
    description:
      "A behavioural intelligence system that learns a user's habits, detects patterns, predicts unhealthy actions before they happen, and delivers smart, context-aware interventions — built at the intersection of my coaching work and AI interests.",
    features: ["Habit identification from behavioural data", "Prediction of unhealthy-behaviour patterns", "Context-aware, AI-generated nudges", "Data sanitisation & conversion workflows for model reliability"],
    contribution: "Built the data gathering, cleaning, and conversion workflows, and developed the ML processes behind habit detection and nudge generation.",
    outcome: "A working assistant that turns raw behavioural signals into timely, personalised interventions.",
    tech: ["JavaScript", "HTML/CSS", "Statistical Modelling"],
    video: "dbrlQloNjp8", github: "https://github.com/nithishvarsrinivasan/UltiFitAI", demo: null,
  },
  {
    title: "Adolescent Idiopathic Scoliosis Gene Analysis",
    subtitle: "Bioinformatics & interactive visualisation platform",
    categories: ["Research", "Data & Analytics"],
    description:
      "A bioinformatics platform analysing five genes associated with Adolescent Idiopathic Scoliosis (IS1, LBX1, ESR1, ADGRG6, BNC2) — extracting genomic data from FASTA datasets and running sequence analysis, differential expression, statistical modelling, and gene regulatory network analysis in Python.",
    features: ["FASTA-based genomic & proteomic extraction", "Differential gene expression analysis", "Gene regulatory network inference", "3D visualisations, interactive heatmaps, and network diagrams"],
    contribution: "Built the Python analysis pipeline and the React-based visualisation layer for exploring gene interactions.",
    outcome: "An accessible platform for exploring molecular mechanisms behind AIS, supporting future precision-medicine research.",
    tech: ["Python", "React", "Bioinformatics", "Data Visualisation"],
    video: "pNLiTrj9QCY", github: null, demo: null,
  },
  {
    title: "Lean Six Sigma Ticket Resolution Simulator",
    subtitle: "Traditional vs. LSS-optimised help desk, simulated head-to-head",
    categories: ["Business Analytics", "Research"],
    description:
      "An interactive simulator comparing a traditional help-desk ticket system against a Lean Six Sigma optimised system. Both process identical incoming tickets under different operational strategies for a real-time comparison of resolution time, queue length, throughput, and resource utilisation.",
    features: ["Side-by-side simulation of two operating strategies", "Live metrics: resolution time, queue length, throughput", "Models standardised triage & waste reduction", "Built to support DMAIC-style process analysis"],
    contribution: "Designed and built the simulation logic and comparative metrics dashboard.",
    outcome: "Gives quantitative evidence for Lean Six Sigma process improvements using the DMAIC methodology.",
    tech: ["Simulation", "DMAIC", "Process Analytics"],
    video: null, github: "https://github.com/nithishvarsrinivasan/Lean-6-Ticket-resolution-simulator", demo: null,
  },
];

/* ------------------------------------------------------------------ */
/* TOKENS — near-black canvas, one volt accent, editorial numbering    */
/* (direction: Kinetic Typography + Exaggerated Minimalism)            */
/* ------------------------------------------------------------------ */

const BG = "#111110";
const BG_ALT = "#181817";
const PANEL = "#1B1B19";
const BORDER = "#2E2E2B";
const FG = "#F4F2EA";
const MUTED = "#8C897F";
const VOLT = "#D6FF3F";

const fontDisplay = "'Archivo', sans-serif";
const fontBody = "'Inter', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

function Marquee({ text, speed = 28 }) {
  const row = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className="inline-flex items-center gap-6 px-6">
      <span style={{ color: VOLT }}>●</span>
      <span>{text}</span>
    </span>
  ));
  return (
    <div className="overflow-hidden whitespace-nowrap border-y" style={{ borderColor: BORDER }}>
      <div className="marquee-track inline-flex" style={{ animationDuration: `${speed}s` }}>
        <div className="inline-flex">{row}</div>
        <div className="inline-flex" aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}

function Eyebrow({ n, label }) {
  return (
    <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-[0.15em]" style={{ color: MUTED }}>
      <span style={{ color: VOLT }}>●</span>
      <span>Nº{n} / {label}</span>
    </div>
  );
}

function Badge({ children, tone = "muted" }) {
  return (
    <span
      className="px-2.5 py-1 text-xs"
      style={{
        fontFamily: fontMono,
        background: tone === "volt" ? "rgba(214,255,63,0.1)" : BG_ALT,
        color: tone === "volt" ? VOLT : MUTED,
        border: `1px solid ${tone === "volt" ? VOLT : BORDER}`,
      }}
    >
      {children}
    </span>
  );
}

function ArrowLink({ children, href, onClick, filled }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
      style={{
        fontFamily: fontBody,
        background: filled ? VOLT : "transparent",
        color: filled ? "#0E0E0C" : FG,
        border: `1px solid ${filled ? VOLT : BORDER}`,
      }}
    >
      {children} <ArrowUpRight size={15} />
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN                                                                 */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openProject, setOpenProject] = useState(null);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const inCategory = activeCategory === "All" || p.categories.includes(activeCategory);
      const q = query.trim().toLowerCase();
      const inQuery = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tech.some((x) => x.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [query, activeCategory]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpenProject(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{ background: BG, color: FG, fontFamily: fontBody, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation-name: marquee-scroll; animation-timing-function: linear; animation-iteration-count: infinite; }
        .display { font-family: ${fontDisplay}; font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; }
        .hoverline { position: relative; }
        .hoverline::after { content: ''; position: absolute; left: 0; bottom: -2px; width: 0; height: 1px; background: currentColor; transition: width .25s ease; }
        .hoverline:hover::after { width: 100%; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
          *, *::before, *::after { transition-duration: .001ms !important; animation-duration: .001ms !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-40 backdrop-blur-md" style={{ background: `${BG}E6`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="display text-lg cursor-pointer">
            N.S <span style={{ color: VOLT }}>●</span>
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-mono" style={{ color: MUTED }}>
            {["about", "skills", "work", "experience", "contact"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="hoverline uppercase cursor-pointer" style={{ color: MUTED }}>{id}</button>
            ))}
          </div>
          <button onClick={() => scrollTo("contact")} className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium cursor-pointer" style={{ color: VOLT }}>
            Get in touch <ArrowUpRight size={14} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="pt-6">
        <Marquee text={`${PROFILE.name} — ${PROFILE.role}`} speed={32} />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="font-mono text-xs tracking-[0.15em] mb-6" style={{ color: VOLT }}>
              ● OPEN TO INTERNSHIPS &amp; FULL-TIME ROLES — 2027
            </div>
            <h1 className="display text-[13vw] md:text-[6.2vw] leading-[0.92] mb-8">
              Help Turn Data<br />Into Decisions.<br />And Turning Models<br />Into Systems.
            </h1>
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <p className="max-w-md leading-relaxed" style={{ color: MUTED }}>{PROFILE.tagline}</p>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <ArrowLink onClick={() => scrollTo("work")} filled>View Work</ArrowLink>
                <ArrowLink onClick={(e) => e.preventDefault()}>Download CV</ArrowLink>
              </div>
            </div>
          </motion.div>
        </div>
        <Marquee text="RAG · AGENTIC AI · GRAPH ML · DATA ANALYTICS · COACHING" speed={24} />
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <Eyebrow n="001" label="About" />
        <div className="grid md:grid-cols-3 gap-10">
          <h2 className="display text-3xl md:text-4xl leading-[1.05] md:col-span-1">Two disciplines, one method.</h2>
          <div className="md:col-span-2 space-y-4 leading-relaxed" style={{ color: MUTED }}>
            <p>I'm an Integrated M.Tech student in Computer Science with a Business Analytics specialisation at VIT Chennai, building at the intersection of AI/ML, data analytics, and applied software engineering — from RAG-based grading systems to graph-powered recommenders and agentic investment advisors.</p>
            <p>Alongside my studies, I coach clients as a Fitness &amp; Nutrition Instructor and run operations for a social-media content agency. Both taught me what my technical projects rely on: measure honestly, iterate in small steps, design systems that hold up under real, messy conditions.</p>
            <p>Looking for internship and full-time opportunities across AI/ML, Data Analytics, Software Engineering, and Product tracks.</p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
        <Eyebrow n="002" label="Skills" />
        <h2 className="display text-3xl md:text-4xl mb-12">What I build with.</h2>
        <div className="divide-y" style={{ borderColor: BORDER }}>
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="grid md:grid-cols-4 gap-4 py-6 border-t"
              style={{ borderColor: BORDER }}
            >
              <span className="font-mono text-xs" style={{ color: MUTED }}>Nº{String(i + 1).padStart(3, "0")}</span>
              <span className="font-semibold md:col-span-1" style={{ fontFamily: fontDisplay }}>{s.group}</span>
              <div className="md:col-span-2 flex flex-wrap gap-2">
                {s.items.map((it) => <Badge key={it}>{it}</Badge>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK / PROJECTS */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-24">
        <Eyebrow n="003" label="Work" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2 className="display text-3xl md:text-4xl">Selected projects.</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex items-center gap-2 px-4 py-2 border" style={{ borderColor: BORDER }}>
              <Search size={15} style={{ color: MUTED }} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="bg-transparent outline-none text-sm w-40" style={{ color: FG }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setActiveCategory(c)} className="cursor-pointer px-3 py-2 text-xs font-mono uppercase"
                  style={{ background: activeCategory === c ? VOLT : "transparent", color: activeCategory === c ? "#0E0E0C" : MUTED, border: `1px solid ${activeCategory === c ? VOLT : BORDER}` }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: BORDER }}>
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setOpenProject(p)}
                className="cursor-pointer p-7 group"
                style={{ background: BG }}
              >
                <div
                  className="w-full h-40 mb-5 bg-cover bg-center flex items-center justify-center"
                  style={{
                    background: p.video ? `url(https://img.youtube.com/vi/${p.video}/hqdefault.jpg) center/cover` : BG_ALT,
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  {p.video && <Play size={28} style={{ color: VOLT }} />}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.categories.map((c) => <Badge key={c} tone="volt">{c}</Badge>)}
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: fontDisplay }}>{p.title}</h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: MUTED }}>{p.subtitle}</p>
                <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: VOLT }}>
                  View project <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && <p className="text-center py-16" style={{ color: MUTED }}>No projects match that search.</p>}
      </section>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {openProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)" }}
            onClick={() => setOpenProject(null)}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
              onClick={(e) => e.stopPropagation()} className="max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
              style={{ background: PANEL, border: `1px solid ${BORDER}` }}>
              <div className="flex items-start justify-between mb-5">
                <div className="flex flex-wrap gap-1.5">{openProject.categories.map((c) => <Badge key={c} tone="volt">{c}</Badge>)}</div>
                <button onClick={() => setOpenProject(null)} className="cursor-pointer" aria-label="Close"><X size={18} style={{ color: MUTED }} /></button>
              </div>
              <h3 className="display text-2xl mb-2">{openProject.title}</h3>
              <p className="mb-5 text-sm" style={{ color: VOLT }}>{openProject.subtitle}</p>
              {openProject.video && (
                <div className="mb-5" style={{ aspectRatio: "16/9", border: `1px solid ${BORDER}` }}>
                  <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${openProject.video}`} title={openProject.title}
                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              )}
              <p className="text-sm leading-relaxed mb-5" style={{ color: MUTED }}>{openProject.description}</p>
              <div className="mb-5">
                <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: VOLT }}>Key features</div>
                <ul className="space-y-1.5 text-sm" style={{ color: MUTED }}>{openProject.features.map((f, i) => <li key={i}>— {f}</li>)}</ul>
              </div>
              <div className="mb-5">
                <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: VOLT }}>My contribution</div>
                <p className="text-sm" style={{ color: MUTED }}>{openProject.contribution}</p>
              </div>
              <div className="mb-6">
                <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: VOLT }}>Outcome</div>
                <p className="text-sm" style={{ color: MUTED }}>{openProject.outcome}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-6">{openProject.tech.map((tc) => <Badge key={tc}>{tc}</Badge>)}</div>
              <div className="flex flex-wrap gap-3">
                {openProject.github && <ArrowLink href={openProject.github}>GitHub</ArrowLink>}
                {openProject.demo && <ArrowLink href={openProject.demo} filled>Live demo</ArrowLink>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
        <Eyebrow n="004" label="Experience" />
        <h2 className="display text-3xl md:text-4xl mb-12">Where I've worked.</h2>
        <div className="space-y-px" style={{ background: BORDER }}>
          {EXPERIENCE.map((e) => (
            <div key={e.org} className="p-7 grid md:grid-cols-4 gap-4" style={{ background: BG }}>
              <span className="font-mono text-xs" style={{ color: MUTED }}>{e.duration}<br />{e.location}</span>
              <div className="md:col-span-1">
                <h3 className="font-semibold" style={{ fontFamily: fontDisplay }}>{e.role}</h3>
                <p className="text-sm" style={{ color: VOLT }}>{e.org}</p>
              </div>
              <ul className="md:col-span-2 space-y-1.5 text-sm" style={{ color: MUTED }}>{e.points.map((pt, j) => <li key={j}>— {pt}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION + ACHIEVEMENTS */}
      <section id="education" className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
        <div>
          <Eyebrow n="005" label="Education" />
          <div className="p-7" style={{ border: `1px solid ${BORDER}` }}>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs" style={{ color: MUTED }}>
              <GraduationCap size={14} style={{ color: VOLT }} /> {EDUCATION.duration} · {EDUCATION.location}
            </div>
            <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: fontDisplay }}>{EDUCATION.institution}</h3>
            <p className="text-sm mb-1" style={{ color: VOLT }}>{EDUCATION.degree}</p>
            <p className="text-sm mb-4" style={{ color: MUTED }}>{EDUCATION.detail}</p>
            <div className="flex flex-wrap gap-2">{EDUCATION.coursework.map((c) => <Badge key={c}>{c}</Badge>)}</div>
          </div>
        </div>
        <div>
          <Eyebrow n="006" label="Achievements" />
          <div className="space-y-px" style={{ background: BORDER }}>
            {ACHIEVEMENTS.map((a) => (
              <div key={a.title} className="p-7" style={{ background: BG }}>
                <Trophy size={16} style={{ color: VOLT }} className="mb-2" />
                <h3 className="font-semibold mb-1" style={{ fontFamily: fontDisplay }}>{a.title}</h3>
                <p className="text-sm mb-1" style={{ color: VOLT }}>{a.org}</p>
                <p className="text-sm" style={{ color: MUTED }}>{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-28">
        <Eyebrow n="007" label="Contact" />
        <h2 className="display text-[9vw] md:text-6xl leading-[0.95] mb-12">Let's build<br />something.</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-px" style={{ background: BORDER }}>
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 p-5 hoverline" style={{ background: BG, color: FG }}><Mail size={16} style={{ color: VOLT }} />{PROFILE.email}</a>
            <a href={`tel:${PROFILE.phone}`} className="flex items-center gap-3 p-5 hoverline" style={{ background: BG, color: FG }}><Phone size={16} style={{ color: VOLT }} />{PROFILE.phone}</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-5 hoverline" style={{ background: BG, color: FG }}><Linkedin size={16} style={{ color: VOLT }} />LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-5 hoverline" style={{ background: BG, color: FG }}><Github size={16} style={{ color: VOLT }} />GitHub</a>
          </div>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input required placeholder="Your name" className="w-full px-4 py-3 text-sm outline-none" style={{ background: PANEL, border: `1px solid ${BORDER}`, color: FG }} />
            <input required type="email" placeholder="Your email" className="w-full px-4 py-3 text-sm outline-none" style={{ background: PANEL, border: `1px solid ${BORDER}`, color: FG }} />
            <textarea required placeholder="Message" rows={4} className="w-full px-4 py-3 text-sm outline-none resize-none" style={{ background: PANEL, border: `1px solid ${BORDER}`, color: FG }} />
            <button type="submit" className="cursor-pointer w-full py-3 text-sm font-medium" style={{ background: VOLT, color: "#0E0E0C" }}>Send message ↗</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: BORDER }}>
        <Marquee text={PROFILE.name} speed={20} />
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono" style={{ color: MUTED }}>
          <span>CHENNAI, TAMIL NADU · GMT +05:30</span>
          <div className="flex gap-4">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"><Github size={16} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /></a>
            <a href={`mailto:${PROFILE.email}`}><Mail size={16} /></a>
          </div>
          <span>Designed &amp; developed by {PROFILE.name}</span>
        </div>
      </footer>
    </div>
  );
}
