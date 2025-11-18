export type BrandKey = "wildrose" | "kylife" | "kygroup" | "edmontoncars"

export interface BrandConfig {
  key: BrandKey
  displayName: string
  shortName: string
  domain: string
  websiteUrl: string
  supportEmail: string
  defaultFromLabel: string
  supportPhone: string
  responseTime: string
  servicesSummary: string
  portalUrl?: string
  crmUrl?: string
  colors: {
    primary: string
    accent: string
    background: string
  }
}

const brandConfigs: Record<BrandKey, BrandConfig> = {
  wildrose: {
    key: "wildrose",
    displayName: "WildRose Painters",
    shortName: "WildRose",
    domain: "wildrosepainters.ca",
    websiteUrl: "https://www.wildrosepainters.ca",
    supportEmail: "kyoussef6994@gmail.com",
    defaultFromLabel: "WildRose Painters <kyoussef6994@gmail.com>",
    supportPhone: "(587) 501-6994",
    responseTime: "within one business day",
    servicesSummary: "Full-service interior & exterior painting across Calgary and Edmonton.",
    portalUrl: "https://www.wildrosepainters.ca/contractor-portal",
    crmUrl: "https://crm.wildrosepainters.ca",
    colors: {
      primary: "#1e3a8a",
      accent: "#f97316",
      background: "#f6f9fc",
    },
  },
  kylife: {
    key: "kylife",
    displayName: "KYLife Projects",
    shortName: "KYLife",
    domain: "kylife.ca",
    websiteUrl: "https://www.kylife.ca",
    supportEmail: "kyoussef6994@gmail.com",
    defaultFromLabel: "KYLife Projects <kyoussef6994@gmail.com>",
    supportPhone: "(587) 501-6994",
    responseTime: "within one business day",
    servicesSummary: "Digital products, community drops, and personal commissions.",
    portalUrl: "https://admin.kylife.ca",
    crmUrl: "https://crm.kylife.ca",
    colors: {
      primary: "#0f172a",
      accent: "#38bdf8",
      background: "#f8fafc",
    },
  },
  kygroup: {
    key: "kygroup",
    displayName: "KY Group Solutions",
    shortName: "KYGroup",
    domain: "kygroup.ca",
    websiteUrl: "https://www.kygroup.ca",
    supportEmail: "kyoussef6994@gmail.com",
    defaultFromLabel: "KY Group Solutions <kyoussef6994@gmail.com>",
    supportPhone: "(587) 501-6994",
    responseTime: "within one business day",
    servicesSummary: "Engineering, automation, and growth programs for Alberta businesses.",
    portalUrl: "https://dashboard.kygroup.ca",
    crmUrl: "https://crm.kygroup.ca",
    colors: {
      primary: "#0a4d68",
      accent: "#34d399",
      background: "#f0fdfa",
    },
  },
  edmontoncars: {
    key: "edmontoncars",
    displayName: "Edmonton Cars",
    shortName: "YEG Cars",
    domain: "edmonton-cars.ca",
    websiteUrl: "https://edmonton-cars.ca",
    supportEmail: "kyoussef6994@gmail.com",
    defaultFromLabel: "Edmonton Cars <kyoussef6994@gmail.com>",
    supportPhone: "(780) 809-4000",
    responseTime: "within a few business hours",
    servicesSummary: "Boutique vehicle sourcing, detailing, and financing support in Edmonton.",
    portalUrl: "https://dashboard.kygroup.ca",
    crmUrl: "https://crm.edmonton-cars.ca",
    colors: {
      primary: "#111827",
      accent: "#fbbf24",
      background: "#f5f5f4",
    },
  },
}

interface BrandHint {
  brandHint?: string | null
  host?: string | null
  referer?: string | null
  source?: string | null
}

function detectBrandKey(value?: string | null): BrandKey | null {
  if (!value) return null
  const normalized = value.toLowerCase()
  if (normalized.includes("wildrose") || normalized.includes("painter")) {
    return "wildrose"
  }
  if (normalized.includes("edmonton") && normalized.includes("car")) {
    return "edmontoncars"
  }
  if (normalized.includes("kygroup")) {
    return "kygroup"
  }
  if (normalized.includes("kylife")) {
    return "kylife"
  }
  return null
}

export function resolveBrandConfig(hints: BrandHint = {}): BrandConfig {
  const { brandHint, host, referer, source } = hints
  const candidates = [brandHint, host, referer, source]
  for (const candidate of candidates) {
    const detected = detectBrandKey(candidate)
    if (detected) {
      return brandConfigs[detected]
    }
  }
  return brandConfigs.wildrose
}

export function getBrandConfig(key: BrandKey): BrandConfig {
  return brandConfigs[key]
}

export const allBrandConfigs = Object.values(brandConfigs)
