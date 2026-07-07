import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Code2, 
  GraduationCap, 
  Award, 
  Terminal, 
  Database, 
  Cpu, 
  Send, 
  Sparkles, 
  Trophy, 
  MapPin, 
  Briefcase,
  Menu,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { portfolioData } from "@/data/portfolio"
import ParticleBackground from "@/components/ParticleBackground"

export default function App() {
  const [activeTab, setActiveTab] = useState("all")
  const [typedText, setTypedText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [contactSuccess, setContactSuccess] = useState<boolean | null>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const taglines = [
    "Full-Stack Developer",
    "Competitive Programmer",
    "AI Tech Enthusiast",
    "GDSC Core Team Member"
  ]

  // Typing effect
  useEffect(() => {
    let timer: number
    const currentWord = taglines[typingIndex]
    const speed = isDeleting ? 30 : 80

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false)
      setTypingIndex((prev) => (prev + 1) % taglines.length)
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentWord.substring(0, typedText.length - 1)
            : currentWord.substring(0, typedText.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timer)
  }, [typedText, isDeleting, typingIndex])

  // Mouse move glow effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Handle contact form submission via Web3Forms
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    if (!formData.get("name") || !formData.get("email") || !formData.get("message")) {
      setContactSuccess(false)
      setTimeout(() => setContactSuccess(null), 3000)
      return
    }

    // Append Web3Forms access key
    // You can get a free key at https://web3forms.com/
    formData.append("access_key", "f10f05a1-c85c-4392-b6b9-5fea613ac2e2")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        setContactSuccess(true)
        form.reset()
        setTimeout(() => setContactSuccess(null), 5000)
      } else {
        setContactSuccess(false)
        setTimeout(() => setContactSuccess(null), 3000)
      }
    } catch (error) {
      setContactSuccess(false)
      setTimeout(() => setContactSuccess(null), 3000)
    }
  }

  const filteredProjects = activeTab === "all" 
    ? portfolioData.projects
    : activeTab === "fullstack"
      ? portfolioData.projects.filter(p => p.technologies.some(t => ["Node.js", "Express.js", "MongoDB"].includes(t)))
      : activeTab === "ai"
        ? portfolioData.projects.filter(p => p.technologies.some(t => t.toLowerCase().includes("gemini") || t.toLowerCase().includes("or-tools")))
        : portfolioData.projects.filter(p => !p.featured)

  return (
    <TooltipProvider>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen radial-glow mesh-grid overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-300"
        style={{
          "--x": `${coords.x}px`,
          "--y": `${coords.y}px`
        } as React.CSSProperties}
      >
        {/* Animated Cyber Grid */}
        <div className="cyber-grid" />

        {/* Particle Network Background */}
        <ParticleBackground />

        {/* Header / Nav */}
        <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <motion.a 
              href="#" 
              className="text-purple-400 hover:text-purple-300 p-2 border border-white/5 hover:border-purple-500/30 rounded-xl bg-white/5 transition-all flex items-center justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Code2 className="size-5" />
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
              {["About", "Skills", "Projects", "Experience", "Contact"].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-purple-400 transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
              <a 
                href={portfolioData.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 gap-1.5 px-3 border border-purple-500/30 hover:border-purple-500/80 hover:bg-purple-500/10 text-purple-300 inline-flex shrink-0 items-center justify-center rounded-lg bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none"
              >
                <Github className="size-4" /> Github
              </a>
            </nav>

            {/* Mobile Nav */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger 
                  render={
                    <Button variant="ghost" size="icon" className="text-gray-300">
                      <Menu className="size-5" />
                    </Button>
                  }
                />
                <SheetContent side="right" className="bg-[#050515] border-l border-white/5 text-gray-300">
                  <div className="flex flex-col gap-6 mt-12 text-lg font-medium">
                    {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-purple-400 transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                    <hr className="border-white/5" />
                    <div className="flex flex-col gap-3">
                      <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400">
                        <Github className="size-5" /> GitHub
                      </a>
                      <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400">
                        <Linkedin className="size-5" /> LinkedIn
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="about" className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 min-h-[90vh]">
          <div className="flex-1 flex flex-col items-start text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 text-xs text-purple-300 mb-6"
            >
              <Sparkles className="size-3.5 text-purple-400 animate-spin" />
              <span>Actively Seeking SDE / Full-Time Roles (2027 Batch)</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500">
                {portfolioData.name}
              </span>
            </motion.h1>

            <motion.h2 
              className="text-xl md:text-3xl font-medium text-gray-300 mb-6 h-10 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I am a&nbsp;<TypingText />
            </motion.h2>

            <motion.p 
              className="text-gray-400 text-lg max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {portfolioData.bio}
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a 
                href="#projects"
                className="h-9 gap-1.5 px-4 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 inline-flex shrink-0 items-center justify-center rounded-lg bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none"
              >
                View Projects
              </a>
              <a 
                href="#contact"
                className="h-9 gap-1.5 px-4 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 text-white inline-flex shrink-0 items-center justify-center rounded-lg bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-4 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 p-2 border border-white/5 hover:border-purple-500/30 rounded-xl bg-white/5 transition-all">
                <Github className="size-5" />
              </a>
              <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 p-2 border border-white/5 hover:border-purple-500/30 rounded-xl bg-white/5 transition-all">
                <Linkedin className="size-5" />
              </a>
              <a href={portfolioData.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 p-2 border border-white/5 hover:border-purple-500/30 rounded-xl bg-white/5 transition-all flex items-center justify-center font-bold text-xs size-9">
                LC
              </a>
              {portfolioData.gfg && (
                <a href={portfolioData.gfg} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 p-2 border border-white/5 hover:border-purple-500/30 rounded-xl bg-white/5 transition-all flex items-center justify-center font-bold text-xs size-9">
                  GFG
                </a>
              )}
              <a href={`mailto:${portfolioData.email}`} className="hover:text-purple-400 p-2 border border-white/5 hover:border-purple-500/30 rounded-xl bg-white/5 transition-all">
                <Mail className="size-5" />
              </a>
              <a href={`tel:${portfolioData.phone}`} className="hover:text-purple-400 p-2 border border-white/5 hover:border-purple-500/30 rounded-xl bg-white/5 transition-all">
                <Phone className="size-5" />
              </a>
            </motion.div>
          </div>

          {/* Quick Stats Dashboard Card */}
          <motion.div 
            className="flex-1 w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur-md overflow-hidden glow-card">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy className="size-48 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-6 text-purple-300 flex items-center gap-2">
                <Trophy className="size-5 text-yellow-500" /> Coding Achievements
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0c0c25] border border-white/5 p-4 rounded-xl">
                  <div className="text-3xl font-extrabold text-purple-400">700+</div>
                  <div className="text-xs text-gray-400 mt-1">LeetCode Solved</div>
                </div>
                <div className="bg-[#0c0c25] border border-white/5 p-4 rounded-xl">
                  <div className="text-3xl font-extrabold text-indigo-400">1795</div>
                  <div className="text-xs text-gray-400 mt-1">LeetCode Max Rating</div>
                </div>
                <div className="bg-[#0c0c25] border border-white/5 p-4 rounded-xl">
                  <div className="text-3xl font-extrabold text-cyan-400">200+</div>
                  <div className="text-xs text-gray-400 mt-1">GeeksforGeeks Solved</div>
                </div>
                <div className="bg-[#0c0c25] border border-white/5 p-4 rounded-xl">
                  <div className="text-3xl font-extrabold text-pink-400">5-Star</div>
                  <div className="text-xs text-gray-400 mt-1">HackerRank C++</div>
                </div>
              </div>
              <div className="mt-6 border-t border-white/5 pt-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Award className="size-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">GDSC Core Team Member</h4>
                    <p className="text-xs text-gray-400">Mentored peers and organized technical events</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Technical Skillset
            </h2>
            <p className="text-gray-400">
              Languages, libraries, frameworks, and developer tools I work with daily to engineer full-stack software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Languages */}
            <Card className="bg-[#0c0c25]/40 border-white/5 glow-card">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400">
                  <Code2 className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base text-gray-200">Languages</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {portfolioData.skills.languages.map((skill) => (
                  <div key={skill} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                    <span className="text-gray-300 font-mono">{skill}</span>
                    <Badge variant="outline" className="text-[10px] text-purple-300 border-purple-500/20 bg-purple-500/5">Core</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Frontend */}
            <Card className="bg-[#0c0c25]/40 border-white/5 glow-card">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                  <Cpu className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base text-gray-200">Frontend</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {portfolioData.skills.frontend.map((skill) => (
                  <div key={skill} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                    <span className="text-gray-300 font-mono">{skill}</span>
                    <Badge variant="outline" className="text-[10px] text-indigo-300 border-indigo-500/20 bg-indigo-500/5">Active</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Backend */}
            <Card className="bg-[#0c0c25]/40 border-white/5 glow-card">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded-lg text-pink-400">
                  <Terminal className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base text-gray-200">Backend</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {portfolioData.skills.backend.map((skill) => (
                  <div key={skill} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                    <span className="text-gray-300 font-mono">{skill}</span>
                    <Badge variant="outline" className="text-[10px] text-pink-300 border-pink-500/20 bg-pink-500/5">Advanced</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Databases */}
            <Card className="bg-[#0c0c25]/40 border-white/5 glow-card">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400">
                  <Database className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base text-gray-200">Databases</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {portfolioData.skills.databases.map((skill) => (
                  <div key={skill} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                    <span className="text-gray-300 font-mono">{skill}</span>
                    <Badge variant="outline" className="text-[10px] text-cyan-300 border-cyan-500/20 bg-cyan-500/5">NoSQL</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tools */}
            <Card className="bg-[#0c0c25]/40 border-white/5 glow-card">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400">
                  <Award className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base text-gray-200">Developer Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {portfolioData.skills.tools.map((skill) => (
                  <div key={skill} className="flex items-center justify-between text-sm py-1 border-b border-white/5 last:border-0">
                    <span className="text-gray-300 font-mono">{skill}</span>
                    <Badge variant="outline" className="text-[10px] text-yellow-300 border-yellow-500/20 bg-yellow-500/5">Daily</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-gray-400 max-w-xl">
                Here are some of the full-stack MERN, artificial intelligence, and constraint programming projects I have built.
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex bg-[#0c0c25] border border-white/5 p-1 rounded-xl shrink-0 self-start md:self-auto">
              {[
                { id: "all", label: "All Projects" },
                { id: "fullstack", label: "MERN Stack" },
                { id: "ai", label: "AI & Optimization" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === tab.id 
                      ? "bg-purple-600 text-white shadow" 
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Card className="bg-[#0c0c25]/60 border-white/5 h-full flex flex-col justify-between overflow-hidden glow-card">
                    <div>
                      {/* Top Accent bar */}
                      <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl text-white font-bold">{project.title}</CardTitle>
                          <div className="flex gap-2">
                            <Tooltip>
                              <TooltipTrigger 
                                render={
                                  <a 
                                    href={project.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white p-1 rounded bg-white/5 border border-white/5 transition-all"
                                  />
                                }
                              >
                                <Github className="size-4.5" />
                              </TooltipTrigger>
                              <TooltipContent>GitHub Repo</TooltipContent>
                            </Tooltip>
                            {project.live && project.live !== "#" && (
                              <Tooltip>
                                <TooltipTrigger 
                                  render={
                                    <a 
                                      href={project.live} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-purple-400 hover:text-purple-300 p-1 rounded bg-purple-500/10 border border-purple-500/20 transition-all"
                                    />
                                  }
                                >
                                  <ExternalLink className="size-4.5" />
                                </TooltipTrigger>
                                <TooltipContent>Live Demo</TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                        <CardDescription className="text-gray-400 mt-2 text-sm leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-6">
                        <ul className="list-none space-y-2 mb-6 text-sm text-gray-300">
                          {project.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-2.5 items-start">
                              <span className="mt-1.5 size-1.5 rounded-full bg-purple-500 shrink-0" />
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>

                    <CardContent className="pt-0 border-t border-white/5 bg-[#09091f]/50 py-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="outline" 
                          className="bg-purple-950/20 text-purple-300 border-purple-500/15 text-[10px] font-mono"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Timeline / Experience / Education Section */}
        <section id="experience" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Education Timeline */}
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-10 text-white flex items-center gap-3">
                <GraduationCap className="size-6 text-purple-400" /> Education
              </h3>

              <div className="relative border-l border-purple-500/20 pl-6 ml-3 flex flex-col gap-10">
                {portfolioData.education.map((edu, idx) => (
                  <motion.div 
                    key={edu.institution}
                    className="relative"
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    {/* Circle marker */}
                    <div className="absolute -left-[31px] top-1.5 size-4 rounded-full border border-purple-500 bg-[#030014] flex items-center justify-center">
                      <div className="size-1.5 rounded-full bg-purple-500" />
                    </div>

                    <span className="text-xs text-purple-400 font-mono font-bold bg-purple-500/10 border border-purple-500/20 rounded-full px-2 py-0.5">
                      {edu.duration}
                    </span>
                    <h4 className="text-lg font-bold text-gray-200 mt-3">{edu.degree}</h4>
                    <p className="text-sm font-semibold text-gray-400 mt-1">{edu.institution}</p>
                    {edu.details && (
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{edu.details}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leadership Experience */}
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-10 text-white flex items-center gap-3">
                <Briefcase className="size-6 text-indigo-400" /> Leadership Experience
              </h3>

              <div className="relative border-l border-indigo-500/20 pl-6 ml-3 flex flex-col gap-10">
                {portfolioData.leadership.map((lead, idx) => (
                  <motion.div 
                    key={lead.role}
                    className="relative"
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    {/* Circle marker */}
                    <div className="absolute -left-[31px] top-1.5 size-4 rounded-full border border-indigo-500 bg-[#030014] flex items-center justify-center">
                      <div className="size-1.5 rounded-full bg-indigo-500" />
                    </div>

                    <span className="text-xs text-indigo-400 font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 rounded-full px-2 py-0.5">
                      {lead.duration}
                    </span>
                    <h4 className="text-lg font-bold text-gray-200 mt-3">{lead.role}</h4>
                    <p className="text-sm font-semibold text-gray-400 mt-1">{lead.organization}</p>
                    
                    <ul className="list-none space-y-2 mt-4 text-sm text-gray-400">
                      {lead.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2 items-start">
                          <ChevronRight className="size-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-10 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Certifications & Licenses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.certifications.map((cert, idx) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="border border-white/5 rounded-xl p-6 bg-white/5 backdrop-blur-sm glow-card flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 shrink-0">
                    <Award className="size-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-200">{cert}</h4>
                    <p className="text-xs text-gray-500 mt-1">Verified Credential</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Let's Build Together
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Whether you have an interesting internship opportunity, want to collaborate on a full-stack MERN/AI project, or just want to chat about algorithmic problem-solving, drop me a message!
              </p>

              <div className="flex flex-col gap-4 text-gray-300">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email Address</div>
                    <a href={`mailto:${portfolioData.email}`} className="text-sm font-semibold hover:text-purple-400 transition-colors">
                      {portfolioData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Phone Number</div>
                    <a href={`tel:${portfolioData.phone}`} className="text-sm font-semibold hover:text-indigo-400 transition-colors">
                      {portfolioData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Current Location</div>
                    <div className="text-sm font-semibold">Uttar Pradesh, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-md relative overflow-hidden">
              <h3 className="text-xl font-bold mb-6 text-white">Send a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-400">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="John Doe"
                      className="bg-[#050515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-400">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder="john@example.com"
                      className="bg-[#050515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-gray-400">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="Project Inquiry / Job Opportunity"
                    className="bg-[#050515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-400">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={4}
                    placeholder="Hi Arpit, I loved your ResumeForge and Smart Timetable projects..."
                    className="bg-[#050515] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600 resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-bold">
                  <Send className="size-4" /> Send Message
                </Button>
              </form>

              {/* Contact success / error notifications */}
              <AnimatePresence>
                {contactSuccess === true && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-0 bg-[#050515]/95 flex flex-col items-center justify-center p-6 text-center z-10"
                  >
                    <CheckCircle2 className="size-16 text-green-500 mb-4 animate-bounce" />
                    <h4 className="text-lg font-bold text-white mb-2">Message Sent Successfully!</h4>
                    <p className="text-sm text-gray-400 max-w-xs">
                      Thank you for reaching out. I'll get back to you as soon as possible!
                    </p>
                  </motion.div>
                )}
                {contactSuccess === false && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 right-4 bg-red-950/80 border border-red-500/30 rounded-lg px-4 py-3 flex items-center gap-3 text-red-200 z-10"
                  >
                    <AlertCircle className="size-5 text-red-400 shrink-0" />
                    <div className="text-sm font-semibold">Please fill out all fields first!</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-[#030014]/80 text-gray-500 text-sm text-center px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              &copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href={portfolioData.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LeetCode</a>
              {portfolioData.gfg && (
                <a href={portfolioData.gfg} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GeeksforGeeks</a>
              )}
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

// Typing Text component
function TypingText() {
  const words = [
    "Full-Stack Developer", 
    "Competitive Programmer", 
    "MERN Stack Architect", 
    "GDSC Core Team Member"
  ]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    let timer: number
    const word = words[currentWordIndex]
    const typingSpeed = isDeleting ? 40 : 100
    
    if (!isDeleting && currentText === word) {
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting 
            ? word.substring(0, currentText.length - 1)
            : word.substring(0, currentText.length + 1)
        )
      }, typingSpeed)
    }
    
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex])

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 font-mono font-bold">
      {currentText}
      <span className="animate-pulse text-purple-400 ml-1">|</span>
    </span>
  )
}
