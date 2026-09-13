export interface ProjectLink {
  href: string
  /** 'live' renders as the primary action, everything else as a secondary icon. */
  type: 'live' | 'repo' | 'youtube' | 'review' | 'external'
  label?: string
}

/**
 * The spec block is the core of the design: four fixed rows of mono metadata.
 * It is scannable in three seconds and states authorship explicitly, which
 * matters because several projects are inherited or co-authored.
 */
export interface ProjectSpec {
  /** Authorship, stated plainly. "Sole developer", "Co-authored", "Contributor". */
  role: string
  /** Verified scale figures only. Never estimates. */
  scale?: string
  capabilities?: string
  /** Primary stack, 3 to 4 items max. */
  stack: string
  /** "Live", "Private", "Internal deployment", "Archived". */
  status: string
}

/** Controls which of the four layout families the row renders with. */
export type RowVariant = 'wide' | 'split' | 'immersive' | 'split-reverse'

export interface Project {
  slug: string
  index: string
  title: string
  subtitle: string
  /** One paragraph, 25 words max. Depth belongs on the case study page. */
  summary: string
  spec: ProjectSpec
  variant: RowVariant
  image?: string | null
  /** Shown when no screenshot exists yet. Keeps the row intentional, not broken. */
  imageBg: string
  monogram: string
  /** Public domain rendered in the placeholder panel, when the project is live. */
  domain?: string | null
  origin: '4d' | 'freelance' | 'academic' | 'restricted'
  confidential?: boolean
  videoId?: string
  links: ProjectLink[]
}

/** Compact secondary entries. No individual case study, one line each. */
export interface SecondaryProject {
  title: string
  blurb: string
  stack: string
  year: string
  videoId?: string
  href?: string
}
