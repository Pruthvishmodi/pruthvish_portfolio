'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Media, Portfolio as PortfolioType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/media'
import {
  X,
  Smartphone,
  Globe,
  Sparkles,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Custom interface for the block props to keep it robust and independent
export interface PortfolioBlock {
  blockType: 'portfolio'
  title: string
  subtitle?: string | null
  selectedProjects?: (number | PortfolioType)[] | null
  webProjects?: {
    project: number | PortfolioType
    customTitle?: string | null
    customDescription?: string | null
    id?: string | null
  }[] | null
  mobileProjects?: {
    project: number | PortfolioType
    customTitle?: string | null
    customDescription?: string | null
    id?: string | null
  }[] | null
  aiVideos?: {
    project: number | PortfolioType
    customTitle?: string | null
    customDescription?: string | null
    id?: string | null
  }[] | null
}

const ITEMS_PER_PAGE = 6

const getYouTubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : url
}

const isYouTube = (url: string) =>
  url.includes('youtu.be') || url.includes('youtube.com')

export interface ResolvedProjectItem<T extends 'web' | 'mobile' | 'ai' = 'web' | 'mobile' | 'ai'> {
  project: PortfolioType
  customTitle?: string | null
  customDescription?: string | null
  id?: string | null
  type: T
}

export interface ProjectCardProps {
  project: PortfolioType
  customTitle?: string | null
  customDescription?: string | null
  types: ('web' | 'mobile' | 'ai')[]
  index: number
  /** Explicit back URL to store in sessionStorage. If not provided, uses window.location.pathname. */
  backUrl?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, customTitle, customDescription, types, index, backUrl }) => {
  const coverImage = (project.videoThumbnail || project.screenshots?.[0]?.image) as Media
  const displayTitle = customTitle || project.title || ''
  const displayDescription = customDescription || project.shortDescription || ''
  const categories = (() => {
    const domains = Array.isArray(project.domain) ? project.domain : project.domain ? [project.domain] : []
    return domains.map((d) => (d === 'Other' && project.customDomain ? project.customDomain : d)).filter(Boolean)
  })()
  // Always link to the new portfolio detail page
  const href = `/portfolio/${project.slug}`

  // Check for youtube video thumbnail if cover image doesn't exist
  const youtubeVideoId = project.youtubeVideoUrl && isYouTube(project.youtubeVideoUrl)
    ? getYouTubeId(project.youtubeVideoUrl)
    : null
  const fallbackThumbnailUrl = youtubeVideoId
    ? `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`
    : null

  const coverImageUrl = coverImage?.url ? getMediaUrl(coverImage.url) : ''
  const hasImage = !!coverImageUrl || !!fallbackThumbnailUrl
  const imageUrl = coverImageUrl || fallbackThumbnailUrl || ''
  const isFallback = !coverImageUrl && !!fallbackThumbnailUrl

  return (
    <motion.div
      key={project.id || index}
      className="bg-background border border-border rounded-[24px] overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        href={href}
        className="flex flex-col flex-grow"
        onClick={() => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('portfolio_back_url', backUrl ?? window.location.pathname)
          }
        }}
      >
        <div className="relative h-56 overflow-hidden bg-slate-100/50 dark:bg-slate-900/50 flex items-center justify-center p-3">
          {hasImage ? (
            isFallback ? (
              <Image
                src={imageUrl}
                alt={coverImage?.alt || displayTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={isFallback}
              />
            ) : (
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src={imageUrl}
                  alt={coverImage?.alt || displayTitle}
                  fill
                  className="object-contain p-1.5 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )
          ) : (
            <div className="text-foreground/20 text-xs">No Cover Image</div>
          )}
          {/* Type badges */}
          <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end max-w-[90%] pointer-events-none">
            {types.includes('web') && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                <Globe className="w-3 h-3 text-white" />
                <span className="text-[10px] text-white font-semibold">Web</span>
              </div>
            )}
            {types.includes('mobile') && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                <Smartphone className="w-3 h-3 text-white" />
                <span className="text-[10px] text-white font-semibold">Mobile</span>
              </div>
            )}
            {types.includes('ai') && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] text-white font-semibold">AI Solutions</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {categories && categories.slice(0, 2).map((category, catIdx) => (
              <span
                key={catIdx}
                className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase border border-primary/20"
              >
                {category}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight font-merriweather">{displayTitle}</h3>
          <p className="text-foreground/85 text-sm leading-relaxed flex-grow line-clamp-3">
            {displayDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}


// ─── Pagination Component ─────────────────────────────────────────────────────
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background text-foreground/70 hover:text-foreground hover:border-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm min-h-[44px] min-w-[44px]"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 min-h-[44px] min-w-[44px] ${
            currentPage === page
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
              : 'border border-border bg-background text-foreground/70 hover:text-foreground hover:border-primary hover:bg-primary/5'
          }`}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background text-foreground/70 hover:text-foreground hover:border-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm min-h-[44px] min-w-[44px]"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

// ─── Main Portfolio Component ─────────────────────────────────────────────────
export const Portfolio: React.FC<PortfolioBlock> = (props) => {
  const { title = 'Our Portfolio', subtitle, selectedProjects, webProjects, mobileProjects, aiVideos } = props
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'mobile' | 'ai'>('all')
  const [selectedDomain, setSelectedDomain] = useState<string>('All')
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)

  // 1. Initial load from URL and sessionStorage on mount
  useEffect(() => {
    let initialTab: 'all' | 'web' | 'mobile' | 'ai' | null = null
    let initialDomain: string | null = null
    let initialPage: number | null = null

    // Check query parameters first for shareable link support
    const searchParams = new URLSearchParams(window.location.search)
    const urlTab = searchParams.get('tab')
    if (urlTab === 'all' || urlTab === 'web' || urlTab === 'mobile' || urlTab === 'ai') {
      initialTab = urlTab
    }

    // Check sessionStorage if returning from detail
    const fromDetail = sessionStorage.getItem('portfolio_from_detail')
    if (fromDetail === 'true') {
      const savedTab = sessionStorage.getItem('portfolio_activeTab')
      const savedDomain = sessionStorage.getItem('portfolio_selectedDomain')
      const savedPage = sessionStorage.getItem('portfolio_currentPage')

      if (!initialTab && savedTab) {
        initialTab = savedTab as 'all' | 'web' | 'mobile' | 'ai'
      }
      if (savedDomain) {
        initialDomain = savedDomain
      }
      if (savedPage) {
        const pageNum = parseInt(savedPage, 10)
        if (!isNaN(pageNum)) {
          initialPage = pageNum
        }
      }
      // Use a short timeout to clear the flag to prevent React 18 double-mount from clearing the state
      setTimeout(() => {
        sessionStorage.removeItem('portfolio_from_detail')
      }, 100)
    } else {
      sessionStorage.removeItem('portfolio_activeTab')
      sessionStorage.removeItem('portfolio_selectedDomain')
      sessionStorage.removeItem('portfolio_currentPage')
    }

    // Apply resolved initial states
    if (initialTab) {
      setActiveTab(initialTab)
    }
    if (initialDomain) {
      setSelectedDomain(initialDomain)
    }
    if (initialPage) {
      setCurrentPage(initialPage)
    }

    setIsInitialized(true)
  }, [])

  // 2. Save state to sessionStorage when states change (only after initialization)
  useEffect(() => {
    if (!isInitialized) return
    sessionStorage.setItem('portfolio_activeTab', activeTab)
    sessionStorage.setItem('portfolio_selectedDomain', selectedDomain)
    sessionStorage.setItem('portfolio_currentPage', String(currentPage))
  }, [activeTab, selectedDomain, currentPage, isInitialized])

  // 3. Synchronize active tab with URL query parameters for shareable links
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

  // Map project ID to all types (web, mobile, ai) it belongs to
  const projectTypesMap = useMemo(() => {
    const map: Record<string, ('web' | 'mobile' | 'ai')[]> = {}

    const addTypes = (
      items: { project: number | PortfolioType; customTitle?: string | null; customDescription?: string | null; id?: string | null }[] | null | undefined,
      type: 'web' | 'mobile' | 'ai'
    ) => {
      items?.forEach((item) => {
        const proj = item.project
        if (proj && typeof proj === 'object' && proj.id) {
          if (!map[proj.id]) {
            map[proj.id] = []
          }
          if (!map[proj.id].includes(type)) {
            map[proj.id].push(type)
          }
        }
      })
    }

    addTypes(webProjects, 'web')
    addTypes(mobileProjects, 'mobile')
    addTypes(aiVideos, 'ai')

    return map
  }, [webProjects, mobileProjects, aiVideos])

  // Build the "all" combined list (web + mobile + ai as project cards), deduplicated by project ID
  const allProjectItems = useMemo(() => {
    const selected = (selectedProjects ?? [])
      .filter((proj): proj is PortfolioType => proj !== null && typeof proj === 'object')

    const web = (webProjects ?? [])
      .map((item) => ({ ...item, type: 'web' as const }))
      .filter((item): item is ResolvedProjectItem<'web'> =>
        !!(item.project && typeof item.project === 'object')
      )
    const mobile = (mobileProjects ?? [])
      .map((item) => ({ ...item, type: 'mobile' as const }))
      .filter((item): item is ResolvedProjectItem<'mobile'> =>
        !!(item.project && typeof item.project === 'object')
      )
    const ai = (aiVideos ?? [])
      .map((item) => ({ ...item, type: 'ai' as const }))
      .filter((item): item is ResolvedProjectItem<'ai'> =>
        !!(item.project && typeof item.project === 'object')
      )

    const mixed: ResolvedProjectItem[] = []
    const seenIds = new Set<string | number>()

    // 1. Add all selected items first, resolving their types and overrides from the category arrays if available
    selected.forEach((proj) => {
      const projId = proj.id
      if (projId && !seenIds.has(projId)) {
        seenIds.add(projId)
        
        // Find if this project exists in web/mobile/ai to preserve its original type and overrides
        const originalWeb = web.find((w) => w.project.id === projId)
        const originalMobile = mobile.find((m) => m.project.id === projId)
        const originalAi = ai.find((a) => a.project.id === projId)

        const resolvedType = originalWeb ? 'web' : (originalMobile ? 'mobile' : (originalAi ? 'ai' : 'web'))
        const resolvedTitle = originalWeb?.customTitle || originalMobile?.customTitle || originalAi?.customTitle || proj.title
        const resolvedDescription = originalWeb?.customDescription || originalMobile?.customDescription || originalAi?.customDescription || proj.shortDescription

        mixed.push({
          project: proj,
          customTitle: resolvedTitle,
          customDescription: resolvedDescription,
          type: resolvedType,
        })
      }
    })

    // 2. Add remaining items using original alternating logic
    let webIdx = 0
    let mobileIdx = 0
    let aiIdx = 0

    const pushUnique = (item: ResolvedProjectItem) => {
      const projId = item.project?.id
      if (projId && !seenIds.has(projId)) {
        seenIds.add(projId)
        mixed.push(item)
      }
    }

    while (webIdx < web.length || mobileIdx < mobile.length || aiIdx < ai.length) {
      // Try to add up to 2 web
      for (let i = 0; i < 2 && webIdx < web.length; i++) {
        pushUnique(web[webIdx++])
      }
      // Try to add up to 2 mobile
      for (let i = 0; i < 2 && mobileIdx < mobile.length; i++) {
        pushUnique(mobile[mobileIdx++])
      }
      // Try to add up to 2 ai
      for (let i = 0; i < 2 && aiIdx < ai.length; i++) {
        pushUnique(ai[aiIdx++])
      }
    }

    return mixed
  }, [selectedProjects, webProjects, mobileProjects, aiVideos])

  const webItems = useMemo(() => {
    return (webProjects ?? [])
      .map((item) => ({ ...item, type: 'web' as const }))
      .filter((item): item is ResolvedProjectItem<'web'> =>
        !!(item.project && typeof item.project === 'object')
      )
  }, [webProjects])

  const mobileItems = useMemo(() => {
    return (mobileProjects ?? [])
      .map((item) => ({ ...item, type: 'mobile' as const }))
      .filter((item): item is ResolvedProjectItem<'mobile'> =>
        !!(item.project && typeof item.project === 'object')
      )
  }, [mobileProjects])

  const aiItems = useMemo(() => {
    return (aiVideos ?? [])
      .map((item) => ({ ...item, type: 'ai' as const }))
      .filter((item): item is ResolvedProjectItem<'ai'> =>
        !!(item.project && typeof item.project === 'object')
      )
  }, [aiVideos])

  // Get active tab projects list
  const activeTabItems = useMemo(() => {
    if (activeTab === 'all') return allProjectItems
    if (activeTab === 'web') return webItems
    if (activeTab === 'mobile') return mobileItems
    if (activeTab === 'ai') return aiItems
    return []
  }, [activeTab, allProjectItems, webItems, mobileItems, aiItems])

  // Get all unique domains/categories present in the active tab's items
  const uniqueDomains = useMemo(() => {
    const domainsSet = new Set<string>()
    const caseMapping: Record<string, string> = {}

    activeTabItems.forEach((item) => {
      const proj = item.project as PortfolioType
      if (!proj) return
      const domains = Array.isArray(proj.domain) ? proj.domain : proj.domain ? [proj.domain] : []
      domains.forEach((d) => {
        const domainLabel = d === 'Other' && proj.customDomain ? proj.customDomain : d
        if (domainLabel) {
          const trimmed = domainLabel.trim()
          if (trimmed) {
            const lower = trimmed.toLowerCase()
            if (!caseMapping[lower]) {
              caseMapping[lower] = trimmed
            }
            domainsSet.add(lower)
          }
        }
      })
    })

    return Array.from(domainsSet).map((lower) => caseMapping[lower])
  }, [activeTabItems])

  // Filter items by selected domain
  const filteredItems = useMemo(() => {
    if (selectedDomain === 'All') return activeTabItems
    return activeTabItems.filter((item) => {
      const proj = item.project as PortfolioType
      if (!proj) return false
      const domains = Array.isArray(proj.domain) ? proj.domain : proj.domain ? [proj.domain] : []
      return domains.some((d) => {
        const domainLabel = d === 'Other' && proj.customDomain ? proj.customDomain : d
        return domainLabel?.trim().toLowerCase() === selectedDomain.toLowerCase()
      })
    })
  }, [activeTabItems, selectedDomain])

  // Paginated items
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredItems.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredItems, currentPage])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  }, [filteredItems.length])

  const closeModal = () => setActiveVideoId(null)

  const tabs: { key: 'all' | 'web' | 'mobile' | 'ai'; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
    { key: 'web', label: 'Web Development', icon: <Globe className="w-4 h-4" /> },
    { key: 'mobile', label: 'Mobile Apps', icon: <Smartphone className="w-4 h-4" /> },
    { key: 'ai', label: 'AI Solutions', icon: <Sparkles className="w-4 h-4" /> },
  ]

  return (
    <section className="relative text-foreground py-24 px-4" id="portfolio">
      {/* Background Color Layer */}
      <div className="absolute -top-[200px] left-0 right-0 bottom-0 -z-20 bg-background" />

      {/* Background glow effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Pattern */}
      <div className="absolute -top-[200px] left-0 right-0 bottom-0 -z-10 opacity-80 dark:opacity-40 pointer-events-none">
        <Image
          src="/images/Pattern.png"
          alt="Background pattern"
          title="Background pattern"
          role="presentation"
          fill
          priority
          className="object-cover object-center dark:hidden"
          sizes="100vw"
        />
        <Image
          src="/images/DarkPattern.png"
          alt="Dark background pattern"
          title="Dark background pattern"
          role="presentation"
          fill
          priority
          className="object-cover object-center hidden dark:block"
          sizes="100vw"
        />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-merriweather [text-shadow:0_2px_4px_rgba(0,0,0,0.08)]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="max-w-2xl mx-auto text-foreground/85 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div
          className="transition-opacity duration-300 ease-out"
          style={{ opacity: isInitialized ? 1 : 0 }}
        >
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-background/80 backdrop-blur-xl p-1.5 rounded-full flex items-center border border-border shadow-lg relative flex-wrap gap-1 justify-center">
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
                      ? 'bg-primary text-primary-foreground font-semibold shadow-md'
                      : 'text-foreground/70 hover:text-foreground'
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
                      className={`group px-5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 uppercase flex items-center justify-center select-none hover:scale-[1.02] active:scale-95 border ${
                        isSelected
                          ? 'bg-primary text-primary-foreground border-transparent shadow-md shadow-primary/10'
                          : 'bg-slate-100/70 border-slate-200 text-slate-700 hover:bg-primary/10 hover:border-primary/20 hover:text-primary dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-primary/20 dark:hover:border-primary/30 dark:hover:text-primary shadow-sm'
                      }`}
                    >
                      <span>{domain}</span>
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
                    <ProjectCard
                      key={`${item.type}-${(item.project as PortfolioType)?.id || index}`}
                      project={item.project as PortfolioType}
                      customTitle={item.customTitle}
                      customDescription={item.customDescription}
                      types={projectTypesMap[(item.project as PortfolioType)?.id] || [item.type]}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
                    {activeTabItems.length === 0
                      ? `No ${
                          activeTab === 'all'
                            ? ''
                            : activeTab === 'web'
                              ? 'web '
                              : activeTab === 'mobile'
                                ? 'mobile '
                                : 'AI '
                        }projects added yet. Add them in the CMS.`
                      : `No projects matching "${selectedDomain}" found in this category.`}
                  </div>
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page)
                  const section = document.getElementById('portfolio')
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Video Lightbox Player Modal */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:scale-105 transition-all text-white min-h-[44px] z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
