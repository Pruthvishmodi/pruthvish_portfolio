'use client'

import React, { useEffect, useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Globe,
  Smartphone,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Star,
  Briefcase,
  Code2,
  MapPin,
  ExternalLink,
  Layout,
  Server,
  Database,
  Cloud,
  FileText,
  ShoppingBag,
  Search,
  Cpu,
  Zap,
  CreditCard,
  Truck,
  Mail,
  Phone,
  Linkedin,
  Laptop,
  Monitor,
} from 'lucide-react'
import type { Media, Portfolio as PortfolioType } from '@/payload-types'

// ─── Types ───────────────────────────────────────────────────────────────────
export interface PersonalPortfolioBlockProps {
  blockType: 'personalPortfolio'
  hero?: {
    badgeText?: string | null
    titlePreHighlight?: string | null
    titleHighlight?: string | null
    description?: string | null
    experienceYears?: string | null
    experienceLabel?: string | null
    certificationTitle?: string | null
    certificationLabel?: string | null
    stat3Number?: string | null
    stat3Label?: string | null
    stat4Number?: string | null
    stat4Label?: string | null
    sayHiLabel?: string | null
    sayHiLink?: string | null
    downloadCvLabel?: string | null
    downloadCvFile?: number | Media | null
    heroImage: number | Media
    introduction?: string | null
    location?: string | null
    email?: string | null
    phone?: string | null
    linkedinLabel?: string | null
    linkedinLink?: string | null
  } | null
  marqueeSkills?: {
    label: string
    icon?: string | null
    proficiency?: number | null
    id?: string | null
  }[] | null
  skillsTitle?: string | null
  skillsDescription?: string | null
  coreMastery?: {
    title: string
    subtitle?: string | null
    icon?: string | null
    color?: 'primary' | 'secondary' | 'tertiary' | null
    id?: string | null
  }[] | null
  expertise?: {
    title?: string | null
    description?: string | null
    stats?: {
      number: string
      label: string
      color?: 'primary' | 'secondary' | 'tertiary' | null
      id?: string | null
    }[] | null
    cards?: {
      title: string
      description?: string | null
      projectsCountText?: string | null
      icon?: string | null
      color?: 'primary' | 'secondary' | 'tertiary' | null
      id?: string | null
    }[] | null
  } | null
  workExperience?: {
    title?: string | null
    timeline?: {
      company: string
      duration?: string | null
      role: string
      description: string
      color?: 'primary' | 'secondary' | 'tertiary' | null
      id?: string | null
    }[] | null
  } | null
  latestWorks?: {
    title?: string | null
    subtitle?: string | null
    exploreMoreLabel?: string | null
    exploreMoreLink?: string | null
    selectedWorks: (number | PortfolioType)[]
  } | null
  testimonialsSection?: {
    title?: string | null
    subtitle?: string | null
    testimonialsList?: {
      avatar: number | Media
      quote: string
      name: string
      role: string
      color?: 'primary' | 'secondary' | 'tertiary' | null
      isFeatured?: boolean | null
      id?: string | null
    }[] | null
  } | null
  cta?: {
    title?: string | null
    preEmailText?: string | null
    email?: string | null
    addressTitle?: string | null
    address?: string | null
    links?: {
      label: string
      url: string
      id?: string | null
    }[] | null
  } | null
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getYouTubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : url
}

const isYouTube = (url: string) =>
  url && (url.includes('youtu.be') || url.includes('youtube.com'))

// ─── Skill Icon Map (devicon class → icon) ───────────────────────────────────
// Maps every skill name to its devicon CSS class. Falls back to a plain Code2 icon.
const SKILL_ICONS: Record<string, string> = {
  // Frontend
  'HTML5': 'devicon-html5-plain colored',
  'CSS3': 'devicon-css3-plain colored',
  'JavaScript': 'devicon-javascript-plain colored',
  'TypeScript': 'devicon-typescript-plain colored',
  'React 19': 'devicon-react-original colored',
  'Redux Toolkit': 'devicon-redux-original colored',
  'Next.js 15': 'devicon-nextjs-plain',
  'Vue.js': 'devicon-vuejs-plain colored',
  'Tailwind': 'devicon-tailwindcss-plain colored',
  'Material UI': 'devicon-materialui-plain colored',
  'Shadcn': 'devicon-react-original colored',
  // Backend
  'Node.js': 'devicon-nodejs-plain colored',
  'Express': 'devicon-express-original',
  'GraphQL': 'devicon-graphql-plain colored',
  'REST APIs': 'devicon-fastapi-plain colored',
  'WebSockets': 'devicon-socketio-original',
  'Microservices': 'devicon-docker-plain colored',
  // Mobile
  'React Native': 'devicon-react-original colored',
  'Flutter': 'devicon-flutter-plain colored',
  // Databases
  'PostgreSQL': 'devicon-postgresql-plain colored',
  'MongoDB': 'devicon-mongodb-plain colored',
  'Supabase': 'devicon-supabase-plain colored',
  'Redis': 'devicon-redis-plain colored',
  'MySQL': 'devicon-mysql-plain colored',
  'Meilisearch': 'devicon-algolia-plain colored',
  // DevOps & QA
  'Docker': 'devicon-docker-plain colored',
  'Vercel': 'devicon-vercel-original',
  'AWS': 'devicon-amazonwebservices-plain-wordmark colored',
  'GCP': 'devicon-googlecloud-plain colored',
  'CI/CD': 'devicon-githubactions-plain colored',
  'Git': 'devicon-git-plain colored',
  'Jest': 'devicon-jest-plain colored',
  'React Testing Library': 'devicon-react-original colored',
  // Search
  'Algolia': 'devicon-algolia-plain colored',
  'Elastic Search': 'devicon-elasticsearch-plain colored',
  // CMS
  'Strapi': 'devicon-strapi-plain colored',
  'Sanity': 'devicon-sanity-plain colored',
  'Payload CMS': 'devicon-nodejs-plain colored',
  // E-Commerce
  'WooCommerce': 'devicon-wordpress-plain colored',
  'Big Commerce': 'devicon-javascript-plain colored',
  'Medusa.js': 'devicon-nodejs-plain colored',
  'Shopify': 'devicon-shopify-plain colored',
  'Lovable': 'devicon-react-original colored',
  // AI
  'N8N': 'devicon-nodejs-plain colored',
  'Agentic AI': 'devicon-python-plain colored',
  'MCP Implementation': 'devicon-typescript-plain colored',
  'Prompt Engineering': 'devicon-python-plain colored',
  // No-Code
  'Builder.io': 'devicon-react-original colored',
  'Framer': 'devicon-figma-plain colored',
  'Webflow': 'devicon-css3-plain colored',
  // Payments & Logistics (plain fallbacks)
  'MIPS': 'devicon-javascript-plain colored',
  'PagSeguro': 'devicon-javascript-plain colored',
  'RazorPay': 'devicon-javascript-plain colored',
  'PhonePe': 'devicon-javascript-plain colored',
  'Stripe': 'devicon-stripe-original colored',
  'Shippo': 'devicon-nodejs-plain colored',
  'Amazon Shipping': 'devicon-amazonwebservices-plain colored',
  'Delhivery': 'devicon-javascript-plain colored',
  'FedEx': 'devicon-javascript-plain colored',
}

// ─── Tech Categories Data ────────────────────────────────────────────────────
const TECH_CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend',
    iconName: 'layout',
    color: 'from-blue-500/20 to-cyan-500/20',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React 19', 'Redux Toolkit', 'Next.js 15', 'Vue.js', 'Tailwind', 'Material UI', 'Shadcn'],
  },
  {
    id: 'backend',
    title: 'Backend',
    iconName: 'server',
    color: 'from-emerald-500/20 to-teal-500/20',
    skills: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'WebSockets', 'Microservices'],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    iconName: 'smartphone',
    color: 'from-purple-500/20 to-indigo-500/20',
    skills: ['React Native', 'Flutter'],
  },
  {
    id: 'databases',
    title: 'Databases',
    iconName: 'database',
    color: 'from-amber-500/20 to-orange-500/20',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'MySQL', 'Meilisearch'],
  },
  {
    id: 'devops',
    title: 'DevOps & QA',
    iconName: 'cloud',
    color: 'from-rose-500/20 to-pink-500/20',
    skills: ['Docker', 'Vercel', 'AWS', 'GCP', 'CI/CD', 'Git', 'Jest', 'React Testing Library'],
  },
  {
    id: 'cms',
    title: 'CMS',
    iconName: 'file-text',
    color: 'from-indigo-500/20 to-purple-500/20',
    skills: ['Strapi', 'Sanity', 'Payload CMS'],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    iconName: 'shopping-bag',
    color: 'from-sky-500/20 to-indigo-500/20',
    skills: ['WooCommerce', 'Big Commerce', 'Medusa.js', 'Shopify', 'Lovable'],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    iconName: 'cpu',
    color: 'from-fuchsia-500/20 to-pink-500/20',
    skills: ['N8N', 'Agentic AI', 'MCP Implementation', 'Prompt Engineering'],
  },
  {
    id: 'nocode',
    title: 'No-Code',
    iconName: 'zap',
    color: 'from-orange-500/20 to-yellow-500/20',
    skills: ['Builder.io', 'Framer', 'Webflow'],
  },
  {
    id: 'payments',
    title: 'Payments',
    iconName: 'credit-card',
    color: 'from-red-500/20 to-rose-500/20',
    skills: ['MIPS', 'PagSeguro', 'RazorPay', 'PhonePe', 'Stripe'],
  },
  {
    id: 'fulfillment',
    title: 'Logistics',
    iconName: 'truck',
    color: 'from-teal-500/20 to-emerald-500/20',
    skills: ['Shippo', 'Amazon Shipping', 'Delhivery', 'FedEx'],
  },
]

const getCategoryIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case 'layout': return <Layout className={className} />
    case 'server': return <Server className={className} />
    case 'database': return <Database className={className} />
    case 'smartphone': return <Smartphone className={className} />
    case 'cloud': return <Cloud className={className} />
    case 'file-text': return <FileText className={className} />
    case 'shopping-bag': return <ShoppingBag className={className} />
    case 'search': return <Search className={className} />
    case 'cpu': return <Cpu className={className} />
    case 'zap': return <Zap className={className} />
    case 'credit-card': return <CreditCard className={className} />
    case 'truck': return <Truck className={className} />
    default: return <Code2 className={className} />
  }
}

const getServiceIcon = (iconName: string | null | undefined, className = "w-6 h-6") => {
  if (!iconName) return <Sparkles className={className} />
  switch (iconName.toLowerCase()) {
    case 'globe':
      return <Globe className={className} />
    case 'dns':
    case 'server':
      return <Server className={className} />
    case 'smartphone':
    case 'mobile':
      return <Smartphone className={className} />
    case 'code':
    case 'devops':
      return <Code2 className={className} />
    case 'laptop_mac':
    case 'computer':
    case 'consulting':
    case 'monitor':
      return <Laptop className={className} />
    default:
      return <Sparkles className={className} />
  }
}


// ─── Floating Particles Background ───────────────────────────────────────────────────────────
const FloatingParticles: React.FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particles = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 30 }, (_, i) => {
      const opacity = Math.random() * 0.5 + 0.1
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 8,
        opacity,
        driftX: Math.random() * 20 - 10,
      }
    })
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(59,130,246,${p.opacity}), rgba(20,200,212,${p.opacity * 0.6}))`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.driftX, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ─── Animated Section Title ───────────────────────────────────────────────────
interface SectionTitleProps {
  badge?: string
  title: React.ReactNode
  subtitle?: string
  centered?: boolean
  theme?: 'light' | 'dark'
}

const SectionTitle: React.FC<SectionTitleProps> = ({ badge, title, subtitle, centered = true, theme = 'dark' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const titleColor = 'text-foreground'
  const subtitleColor = 'text-muted-foreground'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {badge && (
        <div className={`mb-4 ${centered ? 'flex justify-center' : ''}`}>
          <span className="section-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse inline-block" />
            {badge}
          </span>
        </div>
      )}
      <h2 className={`text-4xl md:text-5xl font-black tracking-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base mt-4 max-w-2xl mx-auto leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: centered ? '80px' : '60px' } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className={`h-1 rounded-full bg-foreground mt-6 ${centered ? 'mx-auto' : ''}`}
      />
    </motion.div>
  )
}

// ─── Animated Stat Counter ────────────────────────────────────────────────────
const StatCard: React.FC<{ number: string; label: string; delay?: number }> = ({ number, label, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="premium-card p-5 rounded-2xl text-center cursor-default w-full"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-4xl font-black text-gradient"
      >
        {number}
      </motion.p>
      <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-wider leading-snug">
        {label}
      </p>
    </motion.div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
interface CustomProjectCardProps {
  project: PortfolioType
  types: ('web' | 'mobile' | 'ai')[]
  index: number
  backUrl?: string
}

const CustomProjectCard: React.FC<CustomProjectCardProps> = ({ project, types, index, backUrl }) => {
  const coverImage = (project.videoThumbnail || project.screenshots?.[0]?.image) as Media
  const displayTitle = project.title || ''
  const href = `/portfolio/${project.slug}`

  const youtubeVideoId = project.youtubeVideoUrl && isYouTube(project.youtubeVideoUrl)
    ? getYouTubeId(project.youtubeVideoUrl)
    : null
  const fallbackThumbnailUrl = youtubeVideoId
    ? `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`
    : null

  const hasImage = !!coverImage?.url || !!fallbackThumbnailUrl
  const imageUrl = coverImage?.url || fallbackThumbnailUrl || ''

  const domains = Array.isArray(project.domain) ? project.domain : project.domain ? [project.domain] : []
  const categories = domains.map((d) => (d === 'Other' && project.customDomain ? project.customDomain : d)).filter(Boolean)
  const categoryText = categories.join(' • ') || (types.includes('mobile') ? 'APP DESIGN' : types.includes('ai') ? 'AI SOLUTIONS' : 'WEB DESIGN')

  return (
    <motion.div
      key={project.id || index}
      className="group flex flex-col gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={href}
        className="relative overflow-hidden rounded-2xl premium-card aspect-[4/3] flex items-center justify-center p-2"
        onClick={() => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('portfolio_back_url', backUrl ?? window.location.pathname)
          }
        }}
      >
        {hasImage ? (
          <Image
            src={imageUrl}
            alt={coverImage?.alt || displayTitle}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-foreground/20 text-xs">No Cover Image</div>
        )}
        {/* Blue overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d1c]/90 via-[#0d2050]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <button className="btn-dark text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-wider hover:scale-105 transition-transform uppercase">
            VIEW CASE STUDY →
          </button>
        </div>
        {/* Glow border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.4)' }} />
      </Link>
      <div className="px-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse"></span>
          <p className="text-[10px] font-bold text-foreground/80 uppercase tracking-widest">{categoryText}</p>
        </div>
        <h4 className="text-xl font-bold text-foreground group-hover:text-gradient transition-colors line-clamp-2">
          {displayTitle}
        </h4>
      </div>
    </motion.div>
  )
}

const getTimelineColor = (color?: string | null) => {
  // Always return the standard brand blue theme to avoid colorful dots
  return {
    text: 'text-foreground',
    dot: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] border-blue-400 ring-blue-500/30',
    border: 'border-blue-500/20',
    glow: 'rgba(59, 130, 246, 0.15)',
  }
}

interface TimelineProject {
  title?: string
  description?: string
  stack?: string[]
}

const parseTimelineDescription = (text: string): TimelineProject[] => {
  if (!text) return []

  const projectBlocks = text.split('\n\n').filter(Boolean)
  const projects: TimelineProject[] = []

  projectBlocks.forEach(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean)
    let title = ''
    let description = ''
    let stack: string[] = []

    lines.forEach(line => {
      if (line.startsWith('Stack:')) {
        stack = line.replace('Stack:', '').split(',').map(t => t.trim()).filter(Boolean)
      } else if (line.startsWith('•') || line.startsWith('-')) {
        const content = line.substring(1).trim()
        const colonIndex = content.indexOf(':')
        if (colonIndex !== -1) {
          title = content.substring(0, colonIndex).trim()
          description = content.substring(colonIndex + 1).trim()
        } else {
          description = content
        }
      } else {
        if (!description) {
          description = line
        } else {
          description += ' ' + line
        }
      }
    })

    if (title || description || stack.length > 0) {
      projects.push({ title, description, stack })
    }
  })

  return projects
}

const renderTimelineDescription = (text: string) => {
  const projects = parseTimelineDescription(text)
  
  if (projects.length === 0) return null

  return (
    <div className="space-y-8">
      {projects.map((project, idx) => (
        <div key={idx} className="flex flex-col space-y-3">
          <div className="text-left space-y-2">
            {project.title && (
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground/60 block">
                  Key Project
                </span>
                <h5 className="font-bold text-foreground text-lg md:text-xl tracking-tight">
                  {project.title}
                </h5>
              </div>
            )}
            {project.description && (
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-2">
                {project.description}
              </p>
            )}
          </div>
          
          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1.5">
              {project.stack.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="px-3 py-1.5 rounded text-xs md:text-sm font-semibold bg-zinc-100 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export const PersonalPortfolioComponent: React.FC<PersonalPortfolioBlockProps> = (props) => {
  const {
    hero,
    marqueeSkills,
    skillsTitle,
    skillsDescription,
    coreMastery,
    expertise,
    workExperience,
    latestWorks,
    testimonialsSection,
    cta,
  } = props

  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('frontend')

  const currentCategoryData = useMemo(() => {
    return TECH_CATEGORIES.find((c) => c.id === activeCategory) || TECH_CATEGORIES[0]
  }, [activeCategory])

  // Track active section on scroll
  useEffect(() => {
    const handleScrollActive = () => {
      const scrollPosition = window.scrollY + 120
      setScrolled(window.scrollY > 20)

      if (window.scrollY < 50) {
        setActiveSection('home')
        return
      }

      const sectionIds = ['home', 'skills', 'services', 'experience', 'portfolio', 'contact']
      let currentSection = 'home'

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top) {
            currentSection = id
          }
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScrollActive, { passive: true })
    handleScrollActive()
    return () => window.removeEventListener('scroll', handleScrollActive)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', '#home')
      return
    }
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  // Hero image
  const heroImageObj = hero?.heroImage as Media
  const heroImageUrl = heroImageObj?.url || ''
  const heroImageAlt = heroImageObj?.alt || 'Profile Image'

  // CV File
  const cvFileObj = hero?.downloadCvFile as Media
  const cvFileUrl = cvFileObj?.url || '#'

  // Scroll parallax
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Testimonials
  const testimonials = testimonialsSection?.testimonialsList || []
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0)

  // Portfolio filtering
  const ITEMS_PER_PAGE = 6
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'mobile' | 'ai'>('all')
  const [selectedDomain, setSelectedDomain] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let initialTab: 'all' | 'web' | 'mobile' | 'ai' | null = null
    let initialDomain: string | null = null
    let initialPage: number | null = null

    const searchParams = new URLSearchParams(window.location.search)
    const urlTab = searchParams.get('tab')
    if (urlTab === 'all' || urlTab === 'web' || urlTab === 'mobile' || urlTab === 'ai') {
      initialTab = urlTab
    }

    const fromDetail = sessionStorage.getItem('portfolio_from_detail')
    if (fromDetail === 'true') {
      const savedTab = sessionStorage.getItem('portfolio_activeTab')
      const savedDomain = sessionStorage.getItem('portfolio_selectedDomain')
      const savedPage = sessionStorage.getItem('portfolio_currentPage')

      if (!initialTab && savedTab) initialTab = savedTab as 'all' | 'web' | 'mobile' | 'ai'
      if (savedDomain) initialDomain = savedDomain
      if (savedPage) {
        const pageNum = parseInt(savedPage, 10)
        if (!isNaN(pageNum)) initialPage = pageNum
      }
      setTimeout(() => sessionStorage.removeItem('portfolio_from_detail'), 100)
    } else {
      sessionStorage.removeItem('portfolio_activeTab')
      sessionStorage.removeItem('portfolio_selectedDomain')
      sessionStorage.removeItem('portfolio_currentPage')
    }

    if (initialTab) setActiveTab(initialTab)
    if (initialDomain) setSelectedDomain(initialDomain)
    if (initialPage) setCurrentPage(initialPage)
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    sessionStorage.setItem('portfolio_activeTab', activeTab)
    sessionStorage.setItem('portfolio_selectedDomain', selectedDomain)
    sessionStorage.setItem('portfolio_currentPage', String(currentPage))
  }, [activeTab, selectedDomain, currentPage, isInitialized])

  useEffect(() => {
    if (!isInitialized) return
    const url = new URL(window.location.href)
    if (activeTab === 'all') {
      url.searchParams.delete('tab')
    } else {
      url.searchParams.set('tab', activeTab)
    }
    window.history.replaceState(null, '', url.pathname + url.search)
  }, [activeTab, isInitialized])

  const populatedWorks = (latestWorks?.selectedWorks || [])
    .filter((w): w is PortfolioType => w !== null && typeof w === 'object')

  const processedProjects = useMemo(() => {
    return populatedWorks.map((project) => {
      const types: ('web' | 'mobile' | 'ai')[] = []
      if (project.techStack?.includes('React Native') || project.techStack?.includes('Flutter')) {
        types.push('mobile')
      }
      if (project.techStack?.includes('AI') || project.domain?.includes('AI')) {
        types.push('ai')
      }
      if (types.length === 0) types.push('web')
      return { project, types }
    })
  }, [populatedWorks])

  const projectTypesMap = useMemo(() => {
    const map: Record<string, ('web' | 'mobile' | 'ai')[]> = {}
    processedProjects.forEach((item) => {
      if (item.project.id) map[item.project.id] = item.types
    })
    return map
  }, [processedProjects])

  const webItems = useMemo(() => processedProjects.filter((item) => item.types.includes('web')), [processedProjects])
  const mobileItems = useMemo(() => processedProjects.filter((item) => item.types.includes('mobile')), [processedProjects])
  const aiItems = useMemo(() => processedProjects.filter((item) => item.types.includes('ai')), [processedProjects])

  const activeTabItems = useMemo(() => {
    if (activeTab === 'all') return processedProjects
    if (activeTab === 'web') return webItems
    if (activeTab === 'mobile') return mobileItems
    if (activeTab === 'ai') return aiItems
    return []
  }, [activeTab, processedProjects, webItems, mobileItems, aiItems])

  const uniqueDomains = useMemo(() => {
    const domainsSet = new Set<string>()
    const caseMapping: Record<string, string> = {}
    activeTabItems.forEach((item) => {
      const proj = item.project
      const domains = Array.isArray(proj.domain) ? proj.domain : proj.domain ? [proj.domain] : []
      domains.forEach((d) => {
        const domainLabel = d === 'Other' && proj.customDomain ? proj.customDomain : d
        if (domainLabel) {
          const trimmed = domainLabel.trim()
          if (trimmed) {
            const lower = trimmed.toLowerCase()
            if (!caseMapping[lower]) caseMapping[lower] = trimmed
            domainsSet.add(lower)
          }
        }
      })
    })
    return Array.from(domainsSet).map((lower) => caseMapping[lower])
  }, [activeTabItems])

  const filteredItems = useMemo(() => {
    if (selectedDomain === 'All') return activeTabItems
    return activeTabItems.filter((item) => {
      const proj = item.project
      const domains = Array.isArray(proj.domain) ? proj.domain : proj.domain ? [proj.domain] : []
      return domains.some((d) => {
        const domainLabel = d === 'Other' && proj.customDomain ? proj.customDomain : d
        return domainLabel?.trim().toLowerCase() === selectedDomain.toLowerCase()
      })
    })
  }, [activeTabItems, selectedDomain])

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredItems.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredItems, currentPage])

  const totalPages = useMemo(() => Math.ceil(filteredItems.length / ITEMS_PER_PAGE), [filteredItems.length])

  const tabs: { key: 'all' | 'web' | 'mobile' | 'ai'; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
    { key: 'web', label: 'Web Development', icon: <Globe className="w-4 h-4" /> },
    { key: 'mobile', label: 'Mobile Apps', icon: <Smartphone className="w-4 h-4" /> },
    { key: 'ai', label: 'AI Solutions', icon: <Sparkles className="w-4 h-4" /> },
  ]

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'skills' },
    { label: 'SERVICES', id: 'services' },
    { label: 'EXPERIENCE', id: 'experience' },
    { label: 'PROJECTS', id: 'portfolio' },
    { label: 'CONTACT', id: 'contact' },
  ]

  return (
    <div className="bg-background text-foreground font-sans selection:bg-blue-500/30 selection:text-blue-300 min-h-screen pt-20 relative">

      {/* ─── Top Navigation Bar ─── */}
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b backdrop-blur-xl"
        style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.85)'
            : 'rgba(255, 255, 255, 0.5)',
          borderColor: scrolled ? 'rgba(59, 130, 246, 0.16)' : 'rgba(59, 130, 246, 0.08)',
          boxShadow: scrolled ? '0 10px 30px rgba(59, 130, 246, 0.04)' : 'none',
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <span className="text-[22px] font-extrabold tracking-tight text-foreground select-none">
              Pruthvish<span className="text-gradient font-black">.</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:flex items-center gap-8"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`relative text-[11px] font-bold tracking-[0.2em] transition-colors py-1 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-blue-400'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-[-6px] left-0 w-full h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #3b82f6, #14c8d4)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground hover:text-blue-400 transition-colors md:hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
            >
              <div className="flex flex-col p-6 gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`text-left py-3.5 text-sm font-bold tracking-widest border-b border-slate-100 transition-colors uppercase ${
                      activeSection === item.id ? 'text-blue-400' : 'text-muted-foreground hover:text-blue-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden px-6 py-20 bg-grid" id="home">
        {/* Radial glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-background to-transparent" />
        </div>

        <FloatingParticles />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            {hero?.badgeText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                  {hero.badgeText}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black leading-tight tracking-tight"
            >
              {hero?.titlePreHighlight || "I'm"}<br />
              <span className="text-gradient">{hero?.titleHighlight || 'Pruthvish Modi'}</span>
            </motion.h1>

            {hero?.introduction && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1"
              >
                {hero.introduction}
              </motion.h2>
            )}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
            >
              {hero?.description}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-8 mt-2"
            >
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-black text-gradient">
                  {(() => {
                    const exp = hero?.experienceYears || '10'
                    return /^\d+$/.test(exp) ? `${exp}+` : exp
                  })()}
                </span>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                  {hero?.experienceLabel || 'YEARS EXPERIENCE'}
                </span>
              </div>
              <div className="h-16 w-[1px] bg-blue-800/50" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-foreground">
                  {(() => {
                    const cert = hero?.certificationTitle || '15'
                    return /^\d+$/.test(cert) ? `${cert}+` : cert
                  })()}
                </span>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  {hero?.certificationLabel || 'PROFESSIONAL UI/UX'}
                </span>
              </div>
            </motion.div>

            {(hero?.location || hero?.email || hero?.phone) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-sm text-slate-600 dark:text-slate-400 font-semibold"
              >
                {hero?.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>{hero.location}</span>
                  </div>
                )}
                {hero?.email && (
                  <a href={`mailto:${hero.email}`} className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>{hero.email}</span>
                  </a>
                )}
                {hero?.phone && (
                  <a href={`tel:${hero.phone}`} className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span>{hero.phone}</span>
                  </a>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-4 mt-4 flex-wrap"
            >
              {hero?.sayHiLabel && (
                <Link
                  href={hero.sayHiLink || '#contact'}
                  className="border border-slate-900 dark:border-slate-100 text-slate-900 dark:text-slate-100 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-100 dark:hover:text-slate-900 px-8 py-3.5 rounded-lg text-base font-bold transition-all inline-flex items-center gap-2"
                >
                  {hero.sayHiLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {hero?.downloadCvLabel && (
                <a
                  href={cvFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/30 px-8 py-3.5 rounded-lg text-base font-bold transition-all inline-flex items-center gap-2"
                >
                  {hero.downloadCvLabel}
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </a>
              )}
              {hero?.linkedinLink && (
                <a
                  href={hero.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/30 px-8 py-3.5 rounded-lg text-base font-bold transition-all inline-flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  {hero.linkedinLabel || 'LinkedIn'}
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] aspect-[3/4]">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full bg-blue-600/15 blur-[80px] animate-pulse" />
              <div
                className="absolute inset-[-20px] rounded-full border border-blue-500/10 animate-pulse"
                style={{ animationDuration: '3s' }}
              />
              <div
                className="absolute inset-[-40px] rounded-full border border-blue-500/5 animate-pulse"
                style={{ animationDuration: '4s', animationDelay: '1s' }}
              />

              <motion.div
                className="relative z-10 w-full h-full rounded-full overflow-hidden glass-panel border border-blue-600/20 p-2"
                style={{
                  transform: `translateY(${scrollY * 0.05}px)`,
                  transition: 'transform 0.1s ease-out',
                  boxShadow: '0 0 60px rgba(59,130,246,0.15), 0 0 100px rgba(59,130,246,0.05)',
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {heroImageUrl && (
                  <Image
                    src={heroImageUrl}
                    alt={heroImageAlt}
                    fill
                    className="w-full h-full object-cover rounded-full"
                    sizes="(max-width: 768px) 100vw, 340px"
                    priority
                  />
                )}
                {/* Blue tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-full pointer-events-none" />
              </motion.div>

              {/* Floating badge: Experience */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-4 -left-4 glass-panel px-4 py-3 rounded-2xl border border-blue-500/20 z-20 glow-blue"
              >
                <p className="text-xs font-bold text-blue-400">✦ AVAILABLE FOR WORK</p>
              </motion.div>

              {/* Floating badge: Projects */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-4 -right-4 glass-panel px-4 py-3 rounded-2xl border border-cyan-500/20 z-20"
              >
                <p className="text-xs font-bold text-cyan-400">50+ Projects Done</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-blue-700/40 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-blue-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Tech Skills Section ─── */}
      <section
        className="py-28 relative overflow-hidden"
        id="skills"
        style={{ background: 'linear-gradient(180deg, #f0f6ff 0%, #e8f0fe 100%)' }}
      >
        {/* Subtle dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #1e3a8a 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Top-center glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Section heading */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-black text-[#0d1f3d] tracking-tight"
            >
              Technical Skills
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-[#4a6080] text-base"
            >
              My expertise across various technologies and tools
            </motion.p>
          </div>

          {/* Tab Bar */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {TECH_CATEGORIES.map((category) => {
                const isActive = activeCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap select-none ${
                      isActive
                        ? 'bg-[#1e3a8a] text-white border border-[#1e3a8a] shadow-md'
                        : 'text-[#4a6080] hover:text-[#1e3a8a] hover:bg-white border border-transparent hover:border-[#bfdbfe]'
                    }`}
                  >
                    {category.title}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Skills Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[rgba(191,213,245,0.9)] overflow-hidden"
              style={{ background: '#ffffff', boxShadow: '0 4px 24px rgba(30,60,120,0.07)' }}
            >
              <div className="p-6 md:p-8 flex flex-wrap gap-3 justify-center">
                {currentCategoryData.skills.map((skill, i) => {
                  const iconClass = SKILL_ICONS[skill]
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-[rgba(191,213,245,0.8)] cursor-default select-none transition-all duration-200 hover:border-[rgba(59,130,246,0.5)] hover:bg-[#eff6ff] group"
                      style={{ background: '#f8faff' }}
                    >
                      {iconClass ? (
                        <i className={`${iconClass} text-xl leading-none`} style={{ fontSize: '1.2rem' }} />
                      ) : (
                        <Code2 className="w-5 h-5 text-[#4a6080]" />
                      )}
                      <span className="text-sm font-medium text-[#1e3a8a] group-hover:text-[#1e40af] transition-colors duration-150 whitespace-nowrap">
                        {skill}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      {expertise && (
        <section className="py-24 max-w-7xl mx-auto px-6 relative" id="services">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Section: Badge, Title, Description, Stats */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="section-badge mb-4 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Services
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black leading-tight mt-4 text-[#0d1f3d]"
              >
                {expertise.title || 'Services to navigate your Growth'}
              </motion.h2>
              {expertise.description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-muted-foreground text-lg mt-6 leading-relaxed"
                >
                  {expertise.description}
                </motion.p>
              )}

              {/* Stats */}
              {expertise.stats && expertise.stats.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-8 w-full border-t border-slate-200/60 pt-6">
                  {expertise.stats.map((stat, idx) => (
                    <motion.div
                      key={stat.id || idx}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="flex flex-col"
                    >
                      <span className="text-2xl md:text-3xl font-black text-gradient leading-none">
                        {stat.number.endsWith('+') ? stat.number : `${stat.number}+`}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-bold text-muted-foreground mt-1.5 uppercase tracking-wider leading-snug">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Section: Vertical Stack of Rectangle Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6 w-full">
              {expertise.cards && expertise.cards.length > 0 && (
                expertise.cards.map((card, idx) => {
                  return (
                    <motion.div
                      key={card.id || idx}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ x: 6 }}
                      className="group relative rounded-2xl overflow-hidden cursor-default w-full"
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid rgba(191, 213, 245, 0.9)',
                        boxShadow: '0 2px 16px rgba(30, 60, 120, 0.06)',
                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.boxShadow = '0 16px 48px rgba(59, 130, 246, 0.12), 0 2px 8px rgba(30, 60, 120, 0.06)'
                        el.style.borderColor = 'rgba(59, 130, 246, 0.45)'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.boxShadow = '0 2px 16px rgba(30, 60, 120, 0.06)'
                        el.style.borderColor = 'rgba(191, 213, 245, 0.9)'
                      }}
                    >
                      {/* Left border accent — grows in on hover */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-full scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500"
                        style={{ background: 'linear-gradient(180deg, #bfdbfe, #3b82f6, #bfdbfe)' }}
                      />

                      {/* Hover blue tint overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: 'linear-gradient(90deg, rgba(239,246,255,0.6) 0%, transparent 60%)' }}
                      />

                      <div className="relative z-10 py-4 px-5 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        
                        {/* Left part: Icon & Title/Description */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {/* Icon Container */}
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                            style={{
                              background: 'rgba(239, 246, 255, 1)',
                              border: '1.5px solid rgba(147, 197, 253, 0.6)',
                              color: '#1e40af',
                            }}
                          >
                            {getServiceIcon(card.icon, "w-5 h-5")}
                          </div>

                          {/* Content */}
                          <div className="min-w-0">
                            <h3
                              className="text-base font-black leading-tight mb-1 transition-colors duration-300 group-hover:text-blue-700"
                              style={{ color: '#0d1f3d' }}
                            >
                              {card.title}
                            </h3>
                            {card.description && (
                              <p
                                className="text-xs leading-relaxed"
                                style={{ color: 'rgba(30, 58, 138, 0.6)' }}
                              >
                                {card.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right part: Number & CTA Button */}
                        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-blue-100/50">
                          <div className="flex items-center gap-3">
                            {card.projectsCountText && card.projectsCountText !== 'READ MORE' && (
                              <span
                                className="text-xs font-bold tracking-wider"
                                style={{ color: '#3b82f6' }}
                              >
                                {card.projectsCountText}
                              </span>
                            )}
                            <span
                              className="text-xs font-black tracking-wider select-none"
                              style={{ color: 'rgba(59, 130, 246, 0.25)' }}
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                          </div>

                          <motion.div
                            whileHover={{ x: 3 }}
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                            style={{
                              background: 'rgba(239, 246, 255, 1)',
                              border: '1.5px solid rgba(147, 197, 253, 0.7)',
                              color: '#1e40af',
                            }}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </motion.div>
                        </div>

                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── Work Experience Section ─── */}
      {workExperience && workExperience.timeline && workExperience.timeline.length > 0 && (
        <section className="py-24 relative overflow-hidden" id="experience">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Standardized Section Badge & Heading */}
            <div className="mb-16 text-left">
              <span className="section-badge mb-4 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Experience
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black tracking-tight mt-4 text-[#0d1f3d] dark:text-foreground"
              >
                {workExperience.title || 'My Work Experience'}
              </motion.h2>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
              {workExperience.timeline.map((item, idx) => {
                const [companyName, ...locationParts] = item.company.split(',')
                const companyLocation = locationParts.join(',').trim()

                return (
                  <div
                    key={item.id || idx}
                    className="py-12 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                  >
                    {/* Left Column: Company Info (5/12 cols, aligns with Services left column) */}
                    <div className="lg:col-span-5 flex flex-col space-y-1 text-left">
                      <h4 className="text-xl md:text-2xl font-black text-foreground tracking-tight leading-tight">
                        {companyName}
                      </h4>
                      {companyLocation && (
                        <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                          {companyLocation}
                        </p>
                      )}
                      {item.duration && (
                        <p className="text-sm text-muted-foreground/60 font-semibold tracking-wider uppercase mt-1">
                          {item.duration}
                        </p>
                      )}
                    </div>

                    {/* Right Column: Role & Content (7/12 cols, aligns with Services right cards column) */}
                    <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight">
                          {item.role}
                        </h3>
                      </div>

                      {/* Content Description */}
                      <div className="relative z-10">
                        {renderTimelineDescription(item.description)}
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── Selected Projects Section ─── */}
      {latestWorks && populatedWorks.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6 relative" id="portfolio">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="section-badge mb-4 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Portfolio
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black tracking-tight mt-4"
              >
                {latestWorks.title || 'Selected Projects'}
              </motion.h2>
              {latestWorks.subtitle && (
                <p className="text-muted-foreground text-base mt-2">{latestWorks.subtitle}</p>
              )}
            </div>
            {latestWorks.exploreMoreLabel && (
              <Link
                href={latestWorks.exploreMoreLink || '#'}
                className="text-blue-400 hover:text-blue-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group transition-colors"
              >
                {latestWorks.exploreMoreLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <div className="transition-opacity duration-300 ease-out" style={{ opacity: isInitialized ? 1 : 0 }}>
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="glass-panel p-1.5 rounded-full flex items-center border border-slate-200 shadow-lg relative flex-wrap gap-1 justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key)
                      setSelectedDomain('All')
                      setCurrentPage(1)
                    }}
                    className={`relative z-10 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.key
                        ? 'btn-dark text-white font-semibold shadow-md'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain Sub-filters */}
            {uniqueDomains.length > 0 && (
              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap gap-2.5 justify-center items-center max-w-5xl">
                  {uniqueDomains.map((domain) => {
                    const isSelected = selectedDomain.toLowerCase() === domain.toLowerCase()
                    return (
                      <button
                        key={domain}
                        onClick={() => {
                          setSelectedDomain(isSelected ? 'All' : domain)
                          setCurrentPage(1)
                        }}
                        className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 uppercase border select-none hover:scale-[1.02] active:scale-95 ${
                          isSelected
                            ? 'btn-dark text-white border-transparent shadow-md'
                            : 'glass-panel border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                        }`}
                      >
                        {domain}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tab Contents */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${selectedDomain}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedItems.length > 0 ? (
                    paginatedItems.map((item, index) => (
                      <CustomProjectCard
                        key={`${item.types.join('-')}-${item.project.id || index}`}
                        project={item.project}
                        types={projectTypesMap[item.project.id] || item.types}
                        index={index}
                        backUrl={pathname}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center text-muted-foreground glass-panel border border-blue-900/20 rounded-2xl">
                      {activeTabItems.length === 0
                        ? `No ${activeTab === 'all' ? '' : activeTab === 'web' ? 'web ' : activeTab === 'mobile' ? 'mobile ' : 'AI '}projects added yet.`
                        : `No projects matching "${selectedDomain}" found in this category.`}
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    className="flex items-center justify-center gap-2 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-full glass-panel border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page)
                          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                          currentPage === page
                            ? 'btn-dark text-white'
                            : 'glass-panel border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400'
                        }`}
                        aria-label={`Page ${page}`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-full glass-panel border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ─── Testimonials Section ─── */}
      {testimonials.length > 0 && (
        <section className="py-24 text-center relative overflow-hidden" id="testimonials">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <SectionTitle
              badge="Testimonials"
              title={<>{testimonialsSection?.title || 'What Clients Say'}</>}
              subtitle={testimonialsSection?.subtitle ?? undefined}
              theme="light"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {testimonials.map((item, idx) => {
                const avatarObj = item.avatar as Media
                const avatarUrl = avatarObj?.url || ''
                const avatarAlt = avatarObj?.alt || item.name

                const accentColor = '#0d1f3d'

                return (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`premium-card p-8 rounded-2xl relative flex flex-col justify-between ${
                      item.isFeatured ? 'md:scale-[1.03] !border-primary/30 shadow-[0_12px_40px_rgba(13,31,61,0.05)]' : ''
                    } ${idx === activeTestimonialIdx ? 'flex' : 'hidden md:flex'}`}
                  >
                    <div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 bg-card"
                      style={{ borderColor: accentColor }}
                    >
                      {avatarUrl && (
                        <Image src={avatarUrl} alt={avatarAlt} width={48} height={48} className="w-full h-full object-cover" />
                      )}
                    </div>

                    <div className="mt-4 mb-4 text-3xl" style={{ color: accentColor }}>❝</div>

                    <p className="text-muted-foreground italic text-sm leading-relaxed flex-grow">
                      {item.quote}
                    </p>

                    <div className="mt-8 pt-4 border-t border-border">
                      <div className="flex justify-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, si) => (
                          <Star key={si} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h5 className="text-base font-bold" style={{ color: accentColor }}>{item.name}</h5>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.role}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {testimonials.length > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                <button
                  onClick={() => setActiveTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full btn-dark flex items-center justify-center text-white hover:scale-105 transition-transform"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── CTA / Contact Section ─── */}
      {cta && (
        <section className="py-20 px-6 max-w-7xl mx-auto" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-blue-800/30 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3d 50%, #0a1628 100%)',
              boxShadow: '0 0 80px rgba(59,130,246,0.12), 0 0 120px rgba(20,200,212,0.06)',
            }}
          >
            {/* Background glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            {/* Animated border shimmer */}
            <div className="absolute inset-0 rounded-3xl animate-shimmer pointer-events-none" />

            <div className="relative z-10 p-12 md:p-16 flex flex-col items-center justify-center text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                <span className="section-badge">Let's Work Together</span>
                <h2 className="text-3xl md:text-5xl font-black leading-tight uppercase tracking-wide text-white mt-4">
                  {cta.title || "OK. LET'S CREATE SOMETHING GREAT TOGETHER."}
                </h2>
                <div className="space-y-3">
                  <p className="text-blue-200/70 text-lg">{cta.preEmailText || 'Start by saying hi'}</p>
                  {cta.email && (
                    <a
                      href={`mailto:${cta.email}`}
                      className="text-2xl md:text-3xl font-bold text-gradient hover:scale-105 transition-transform block"
                    >
                      {cta.email}
                    </a>
                  )}
                </div>
              </motion.div>

              <div className="flex flex-col items-center gap-6 pt-6 border-t border-blue-800/40 w-full max-w-md">
                {cta.address && (
                  <div className="space-y-1 text-center flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold tracking-widest text-blue-400/60 uppercase">{cta.addressTitle || 'INFORMATION'}</p>
                      <p className="text-blue-100/70 text-sm">{cta.address}</p>
                    </div>
                  </div>
                )}
                {cta.links && cta.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {cta.links.map((link) => (
                      <a
                        key={link.id || link.label}
                        href={link.url}
                        className="px-4 py-1.5 rounded-full glass-panel border border-blue-700/30 hover:border-blue-400/50 hover:bg-blue-900/20 transition-all text-[10px] font-bold tracking-wider uppercase text-blue-200/70 hover:text-blue-200"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── Footer ─── */}
      <footer className="py-12 border-t border-border bg-background2 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-black text-lg text-gradient">{hero?.titleHighlight || 'Pruthvish Modi'}</span>
            <span className="text-blue-900">|</span>
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {['portfolio', 'services', 'contact'].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="text-xs text-muted-foreground hover:text-blue-400 transition-colors capitalize hover-underline"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Crafted with <span className="text-blue-400">♥</span> & precision
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const PersonalPortfolio: React.FC<PersonalPortfolioBlockProps> = (props) => {
  return <PersonalPortfolioComponent {...props} />
}
