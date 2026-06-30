"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, Globe, Laptop, Smartphone, GraduationCap,
  Award, Briefcase, Calendar, Info, Mail, Send, Phone, MapPin,
  Search, ShieldAlert, CheckCircle2, ChevronRight, Cpu,
  Database, Users, Sparkles, Building2
} from "lucide-react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import InternshipApplyModal from "@/components/InternshipApplyModal";

// Project Data Type
interface Project {
  title: string;
  category: "Enterprise" | "Utility" | "Platform";
  description: string;
  tech: string[];
  status: "Planning" | "In Development" | "Designing" | "Researching";
  progress: number;
}

const projectsData: Project[] = [
  {
    title: "AI Business Platform",
    category: "Platform",
    description: "An automated workflow builder utilizing deep learning models to streamline operational business tasks.",
    tech: ["Next.js", "Python", "Tailwind CSS", "FastAPI"],
    status: "Researching",
    progress: 20
  },
  {
    title: "Hospital Management System",
    category: "Enterprise",
    description: "A secure electronic health record manager incorporating automated billing and digital doctor-patient scheduling.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    status: "In Development",
    progress: 55
  },
  {
    title: "School ERP",
    category: "Enterprise",
    description: "Comprehensive education management covering attendance tracking, online exams, grading books, and parent portals.",
    tech: ["Next.js", "Express.js", "MongoDB", "Redux"],
    status: "Designing",
    progress: 35
  },
  {
    title: "Restaurant Management System",
    category: "Utility",
    description: "Point of Sale (POS) and table reservation tool with digital kitchen displays and automated receipt printings.",
    tech: ["React Native", "Node.js", "Socket.io", "MySQL"],
    status: "Planning",
    progress: 10
  },
  {
    title: "Portfolio Builder",
    category: "Platform",
    description: "A drag-and-drop landing page generator allowing students to assemble digital resumes with custom domains.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase"],
    status: "In Development",
    progress: 80
  },
  {
    title: "Smart Attendance System",
    category: "Utility",
    description: "Facial-recognition based attendance monitoring designed for classrooms and enterprise workforce checkins.",
    tech: ["Python", "OpenCV", "TensorFlow", "React"],
    status: "In Development",
    progress: 60
  },
  {
    title: "E-Commerce Platform",
    category: "Platform",
    description: "High-concurrency storefront matching global payment processing with advanced inventory syncing systems.",
    tech: ["Next.js", "GraphQL", "Node.js", "Stripe API"],
    status: "Planning",
    progress: 5
  },
  {
    title: "Learning Management System",
    category: "Platform",
    description: "Course delivery workspace featuring video rendering, progress tracking, and interactive programming sandboxes.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma"],
    status: "Researching",
    progress: 15
  }
];

// Careers Positions
const jobOpenings = [
  {
    title: "Frontend Developer Intern",
    type: "Internship",
    location: "Remote / Hybrid",
    description: "Build interactive client-side platforms using React and Tailwind CSS. Translate visual prototypes to code.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
  },
  {
    title: "Backend Developer Intern",
    type: "Internship",
    location: "Remote / Hybrid",
    description: "Architect application services, configure RESTful API pathways, and coordinate schema designs.",
    tags: ["Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    title: "UI/UX Designer",
    type: "Full-Time / Associate",
    location: "Remote",
    description: "Develop screen blueprints, sketch navigation wireframes, and outline interactive components design paths.",
    tags: ["Figma", "Design Systems", "Prototyping"]
  },
  {
    title: "Mobile App Developer",
    type: "Internship",
    location: "Remote",
    description: "Build robust cross-platform mobile apps for Android and iOS using React Native or Flutter frameworks.",
    tags: ["React Native", "Flutter", "Mobile APIs"]
  }
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  // Projects State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Contact Form State
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactData, setContactData] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const validateContact = () => {
    const errs: Record<string, string> = {};
    if (!contactData.name.trim()) errs.name = "Name is required";
    if (!contactData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactData.email)) {
      errs.email = "Invalid email";
    }
    if (!contactData.message.trim()) errs.message = "Message cannot be empty";
    setContactErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSubmitted(true);
      setContactData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setContactSubmitted(false), 5000);
    }, 1500);
  };

  // Filter projects based on inputs
  const filteredProjects = projectsData.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <LoadingScreen />

      {/* Layout Wrapper */}
      <div className="flex flex-col min-h-screen">
        <Navbar onApplyClick={() => setModalOpen(true)} />

        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white dark:bg-black"
        >
          {/* Animated Background Lights */}
          <div className="absolute top-1/4 left-1/10 w-[450px] h-[450px] bg-navy-light/10 dark:bg-navy-light/15 rounded-full blur-[120px] animate-float-slow pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-gold/10 dark:bg-gold/5 rounded-full blur-[120px] animate-float-fast pointer-events-none" />

          {/* Grid Background Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#0b1f45_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-left space-y-8">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10"
              >
                <Sparkles size={14} className="text-gold" />
                <span className="text-xs font-semibold tracking-wider uppercase text-navy dark:text-gold-light">
                  A/S NEXTGEN Pvt Ltd
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="space-y-4"
              >
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-navy dark:text-white">
                  Turning Dreams <br />
                  Into <span className="gradient-text font-black">Digital Reality</span>
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
                  We engineer top-tier digital ecosystems including premium website design, high-performance mobile apps, and custom web applications. Empowering students and enterprises to excel in the next generation.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-8 py-4 rounded-full bg-navy text-white dark:bg-gold dark:text-black font-bold text-sm tracking-wide shadow-lg hover:shadow-gold/20 dark:hover:shadow-gold/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Apply Internship
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-300" />
                </button>
                <a
                  href="#opportunities"
                  className="px-8 py-4 rounded-full border border-border bg-card hover:bg-muted text-foreground font-bold text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Opportunities
                </a>
              </motion.div>

              {/* Quick stats counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="grid grid-cols-3 gap-6 pt-6 border-t border-border"
              >
                <div className="space-y-1">
                  <span className="font-display text-2xl sm:text-3xl font-black text-navy dark:text-white">2+</span>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Global Offices</p>
                </div>
                <div className="space-y-1">
                  <span className="font-display text-2xl sm:text-3xl font-black text-navy dark:text-white">50+</span>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Students Mentored</p>
                </div>
                <div className="space-y-1">
                  <span className="font-display text-2xl sm:text-3xl font-black text-navy dark:text-white">10+</span>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Active Projects</p>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Visuals */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 w-full aspect-square rounded-full flex items-center justify-center p-8 bg-gradient-to-tr from-navy/5 via-gold/10 to-transparent dark:from-white/5 dark:via-gold/5 dark:to-transparent border border-navy/5 dark:border-white/5 shadow-inner">
                {/* Spinning Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-gold/30 animate-[spin_40s_linear_infinite]" />

                {/* Floating Tech Badges */}
                <div className="absolute top-10 right-4 p-3 bg-white dark:bg-card border border-border shadow-md rounded-2xl animate-float-slow">
                  <Globe className="text-blue-500" size={24} />
                </div>
                <div className="absolute bottom-16 left-2 p-3 bg-white dark:bg-card border border-border shadow-md rounded-2xl animate-float-fast">
                  <Smartphone className="text-green-500" size={24} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden glass-panel border border-border shadow-2xl flex flex-col items-center justify-center p-6 text-center">
                  <div className="relative w-20 h-20 mb-4 animate-pulse">
                    <Image src="/logo.png" alt="Branding logo" fill className="object-contain" />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-md text-navy dark:text-white">NEXT-GEN TECH</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Innovation First</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDENT OPPORTUNITIES SECTION */}
        {/* ========================================================================= */}
        <section
          id="opportunities"
          className="py-24 bg-muted/30 relative border-t border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-6">

            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                For College Students
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy dark:text-white tracking-tight">
                Kickstart Your Tech Career
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AS NEXTGEN Pvt Ltd offers highly selective student programs designed to transition academy knowledge into production-ready software engineering workflows.
              </p>
            </div>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Internship Domain details */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                    <Laptop size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy dark:text-white">
                    Internship Domains
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Choose your pathway. Apply to specialize in high-growth frontend & backend ecosystems or cross-platform mobile frameworks.
                  </p>

                  <ul className="space-y-3.5 pt-2">
                    <li className="flex items-center gap-3 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span><strong>Website Development</strong> (React, Next.js, APIs)</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span><strong>App Development</strong> (Flutter, React Native)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 border-t border-border mt-8 flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wide">
                  <span>Structured Learning</span>
                  <Globe size={16} className="text-muted-foreground" />
                </div>
              </motion.div>

              {/* Card 2: Eligibility Criteria */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy dark:text-white">
                    Eligibility Criteria
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Our student tracks are strictly structured around current tertiary academics to ensure proper mentorship coordination.
                  </p>

                  <div className="p-4 bg-muted rounded-2xl border border-border flex items-center gap-3.5">
                    <Info size={16} className="text-navy dark:text-gold" />
                    <span className="text-xs font-semibold">
                      College Students Only
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-normal">
                    Requires enrollment in a recognized Computer Science or engineering degree. Candidate must commit to at least 20 hours per week.
                  </p>
                </div>

                <div className="pt-8 border-t border-border mt-8 flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wide">
                  <span>College Track Only</span>
                  <CheckCircle2 size={16} className="text-green-500" />
                </div>
              </motion.div>

              {/* Card 3: Internship Benefits */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center border border-green-500/20">
                    <Award size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-navy dark:text-white">
                    Internship Benefits
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Build credentials that stand out. We provide real enterprise product exposure that goes beyond boilerplate tutorials.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Real-Time Project Experience</strong>: Build live user environments.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Performance-Based Certificate</strong>: Standardized project work verification.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Full-Time Onboarding Priority</strong>: Top performers are prioritized.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 border-t border-border mt-8 flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wide">
                  <span>Certified Output</span>
                  <Award size={16} className="text-gold" />
                </div>
              </motion.div>
            </div>

            {/* Compensation Policy Notice - Unpaid Stipend highlight */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-6 rounded-3xl bg-amber-500/5 dark:bg-gold/5 border border-amber-500/20 dark:border-gold/20 flex flex-col md:flex-row items-center md:items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <ShieldAlert size={22} className="text-amber-500 dark:text-gold" />
              </div>
              <div className="space-y-1.5 text-center md:text-left">
                <h4 className="font-display font-bold text-sm text-navy dark:text-gold flex items-center justify-center md:justify-start gap-2">
                  Compensation Policy Alert
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Please Note:</strong> This is a <strong>Non-Stipend (Unpaid)</strong> learning-focused internship. The program focuses entirely on knowledge transfer, technical mentoring, and career preparation. Certified credentials and real-world project portfolios are issued upon successful completion.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* CAREERS SECTION */}
        {/* ========================================================================= */}
        <section id="career" className="py-24 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-6">

            {/* Header Text */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                Join Our Team
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy dark:text-white tracking-tight">
                Current Openings
              </h2>
              <p className="text-sm text-muted-foreground">
                Apply for open internships or associate developer roles. Help us build high-performance products.
              </p>
            </div>

            {/* Careers List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="p-8 rounded-3xl bg-muted/20 hover:bg-muted/40 border border-border flex flex-col justify-between gap-6 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Header tags */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-navy dark:text-gold">
                        {job.type}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                        <Globe size={12} /> {job.location}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-navy dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {job.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] bg-card px-2.5 py-1 rounded-lg border border-border text-foreground font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-3.5 rounded-2xl bg-card hover:bg-navy hover:text-white dark:hover:bg-gold dark:hover:text-black border border-border text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Apply for Position
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* UPCOMING PROJECTS SECTION */}
        {/* ========================================================================= */}
        <section
          id="projects"
          className="py-24 bg-muted/30 border-t border-b border-border relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">

            {/* Header Text */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4 max-w-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                  Product Roadmap
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy dark:text-white tracking-tight">
                  Upcoming Tech Projects
                </h2>
                <p className="text-sm text-muted-foreground">
                  A preview of custom application services and software environments we are designing for internal testing and commercial deployment.
                </p>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap gap-2.5">
                {["All", "Platform", "Enterprise", "Utility"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all border cursor-pointer ${selectedCategory === category
                        ? "bg-navy text-white border-navy dark:bg-gold dark:text-black dark:border-gold"
                        : "bg-card text-foreground border-border hover:bg-muted"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input bar */}
            <div className="relative max-w-md mb-8">
              <Search className="absolute left-4 top-3 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search projects by name, description, or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>

            {/* Projects Cards Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((proj, idx) => (
                  <motion.div
                    layout
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl bg-white dark:bg-card border border-border flex flex-col justify-between gap-5 transition-all shadow-sm"
                  >
                    <div className="space-y-4">
                      {/* Status header */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest font-black text-slate-500">
                          {proj.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${proj.status === "In Development"
                            ? "bg-green-500/10 text-green-600 border-green-500/20"
                            : proj.status === "Designing"
                              ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                              : proj.status === "Researching"
                                ? "bg-purple-500/10 text-purple-600 border-purple-500/20"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          }`}>
                          {proj.status}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-md text-navy dark:text-white leading-tight">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    {/* Progress & Tech Bar */}
                    <div className="space-y-3.5 pt-2 border-t border-border/50">
                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((t, tIdx) => (
                          <span key={tIdx} className="text-[8px] font-bold px-2 py-0.5 bg-muted rounded-md border border-border/40">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Progress Line */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                          <span>Build Progress</span>
                          <span className="font-bold">{proj.progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-navy to-gold dark:from-navy-light dark:to-gold rounded-full"
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-muted-foreground flex flex-col items-center justify-center gap-3 bg-white dark:bg-card border border-border rounded-3xl">
                  <Search size={32} className="text-slate-400" />
                  <span className="text-sm font-semibold">No matching roadmap projects found</span>
                  <p className="text-xs text-muted-foreground">Try refining your search keyword or selected category.</p>
                </div>
              )}
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ABOUT US SECTION */}
        {/* ========================================================================= */}
        <section id="about" className="py-24 bg-white dark:bg-black overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6">

            {/* Split Screen layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

              {/* Left Column: Text intro */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                    About The Company
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy dark:text-white tracking-tight">
                    Innovative Tech Engineering & Digital Solutions
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AS NEXTGEN Pvt Ltd is a premium software engineering firm operating global initiatives to build robust, high-performance applications. We specialize in launching premium website portfolios, secure business enterprise databases, customized ERP frameworks, and structured student-to-associate engineering pipelines.
                  </p>
                </div>

                {/* Core focus pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 border border-border text-gold flex items-center justify-center shrink-0">
                      <Cpu size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm">Digital Transformation</h4>
                      <p className="text-[11px] text-muted-foreground mt-1">Converting legacy infrastructure to containerized modern web architectures.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 border border-border text-gold flex items-center justify-center shrink-0">
                      <Database size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm">ERP & SaaS Engineering</h4>
                      <p className="text-[11px] text-muted-foreground mt-1">Designing relational data tables and point-of-sale terminal modules.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 border border-border text-gold flex items-center justify-center shrink-0">
                      <Users size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm">Career Development</h4>
                      <p className="text-[11px] text-muted-foreground mt-1">Providing college track candidates access to structured project modules.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/5 border border-border text-gold flex items-center justify-center shrink-0">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm">Global Coordination</h4>
                      <p className="text-[11px] text-muted-foreground mt-1">Structuring development coordination from our offices in Europe and Asia.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Mission, Vision, Values interactive cards */}
              <div className="lg:col-span-5 space-y-6">

                {/* Mission Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-6 rounded-3xl bg-muted/20 border border-border hover:border-gold/30 transition-all duration-300"
                >
                  <span className="text-[9px] font-bold text-gold uppercase tracking-wider">01 . Our Mission</span>
                  <h3 className="font-display font-bold text-md text-navy dark:text-white mt-1">Empowerment Through Code</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Build accessible, performant software systems that solve operational inefficiencies for our commercial clients, while providing students direct avenues to engineering excellence.
                  </p>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-6 rounded-3xl bg-muted/20 border border-border hover:border-gold/30 transition-all duration-300"
                >
                  <span className="text-[9px] font-bold text-gold uppercase tracking-wider">02 . Our Vision</span>
                  <h3 className="font-display font-bold text-md text-navy dark:text-white mt-1">The Digital Catalyst</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Setting the global standard for cloud-focused web platforms, bridging the gap between student educational foundations and high-scale commercial production.
                  </p>
                </motion.div>

                {/* Core Values Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-6 rounded-3xl bg-muted/20 border border-border hover:border-gold/30 transition-all duration-300"
                >
                  <span className="text-[9px] font-bold text-gold uppercase tracking-wider">03 . Core Values</span>
                  <h3 className="font-display font-bold text-md text-navy dark:text-white mt-1">Innovation, Integrity & Quality</h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Engineering clean codebase repositories, enforcing code testing benchmarks, and prioritizing transparent developer relations.
                  </p>
                </motion.div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTACT SECTION */}
        {/* ========================================================================= */}
        <section id="contact" className="py-24 bg-muted/30 border-t border-border relative">

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Contact Information Column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                    Get In Touch
                  </span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy dark:text-white tracking-tight">
                    Let's Connect
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Have questions about our enterprise development services or looking to apply for the career acceleration track? Reach out directly.
                  </p>
                </div>

                {/* Info List */}
                <div className="space-y-6">

                  {/* Address */}
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-card border border-border text-gold flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Office Address</span>
                      <p className="text-xs font-semibold text-navy dark:text-white mt-1">Őcsény, Reptér, 7143 (Hungary)</p>
                    </div>
                  </div>

                  {/* Phone EU */}
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-card border border-border text-gold flex items-center justify-center shrink-0 shadow-sm">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Hungary Contact</span>
                      <p className="text-xs font-semibold text-navy dark:text-white mt-1">
                        <a href="tel:+36302694207" className="hover:underline">+36 302694207</a>
                      </p>
                    </div>
                  </div>

                  {/* Phone India */}
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-card border border-border text-gold flex items-center justify-center shrink-0 shadow-sm">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">India Contact</span>
                      <p className="text-xs font-semibold text-navy dark:text-white mt-1">
                        <a href="tel:+917339011916" className="hover:underline">+91 7339011916</a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-card border border-border text-gold flex items-center justify-center shrink-0 shadow-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-muted-foreground">Email Communications</span>
                      <p className="text-xs font-semibold text-navy dark:text-white mt-1">
                        <a href="mailto:asnextgenpvtltd@gmail.com" className="hover:underline">asnextgenpvtltd@gmail.com</a>
                      </p>
                    </div>
                  </div>

                </div>

                {/* Map Mock/Aesthetic Widget */}
                <div className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-gold">HQ Location Coordinates</span>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div className="h-28 rounded-2xl bg-muted border border-border/80 relative overflow-hidden flex flex-col justify-end p-4">
                    {/* Abstract grid lines mimicking a map */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_24px] opacity-[0.03] dark:opacity-[0.1]" />
                    <div className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-gold/60 border border-gold animate-ping" />
                    <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-gold shadow-md" />

                    <span className="relative z-10 text-[10px] font-bold text-navy dark:text-white">Őcsény, Reptér Airfield Area</span>
                    <span className="relative z-10 text-[8px] text-muted-foreground">7143 Tolna County, Hungary</span>
                  </div>
                </div>

              </div>

              {/* Contact Form Column */}
              <div className="lg:col-span-7 bg-white dark:bg-card border border-border rounded-3xl p-8 shadow-sm">

                {contactSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-navy dark:text-white">Message Sent Successfully!</h3>
                    <p className="text-xs text-muted-foreground max-w-sm">
                      Thank you for contacting AS NEXTGEN Pvt Ltd. Our operations coordinator will review your inquiry and reply within 24 business hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-lg text-navy dark:text-white">Inquiry Form</h3>
                      <p className="text-xs text-muted-foreground">Complete the form below to send an encrypted direct message to our support desk.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase text-navy/70 dark:text-slate-400">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          className={`px-4 py-3 rounded-xl border ${contactErrors.name ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30`}
                        />
                        {contactErrors.name && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.name}</span>}
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase text-navy/70 dark:text-slate-400">Email Address</label>
                        <input
                          type="email"
                          placeholder="you@domain.com"
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          className={`px-4 py-3 rounded-xl border ${contactErrors.email ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30`}
                        />
                        {contactErrors.email && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.email}</span>}
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase text-navy/70 dark:text-slate-400">Inquiry Subject</label>
                      <input
                        type="text"
                        placeholder="Project development, Partnership, student inquiry..."
                        value={contactData.subject}
                        onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                        className="px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                      />
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase text-navy/70 dark:text-slate-400">Detailed Message</label>
                      <textarea
                        placeholder="Write your inquiry message here..."
                        rows={4}
                        value={contactData.message}
                        onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        className={`px-4 py-3 rounded-xl border ${contactErrors.message ? "border-red-500" : "border-border"} bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none`}
                      />
                      {contactErrors.message && <span className="text-[9px] text-red-500 font-semibold">{contactErrors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full py-4 rounded-xl bg-navy text-white dark:bg-gold dark:text-black font-bold text-xs tracking-widest uppercase transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {contactSubmitting ? (
                        <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>

            </div>
          </div>
        </section>

        <Footer />

        {/* Application Modal Popup */}
        <InternshipApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  );
}
