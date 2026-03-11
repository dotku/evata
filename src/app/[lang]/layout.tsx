import type { Metadata } from "next";
import { getTranslation, languages, type Language } from "../i18n/translations";

const SITE_URL = "https://evata.us";

const htmlLangMap: Record<Language, string> = {
  en: "en",
  zh: "zh-CN",
  kr: "ko",
};

const seoMeta: Record<
  Language,
  { title: string; description: string; keywords: string }
> = {
  en: {
    title: "Evata | Premium Services & Korean Beauty Technology - Bay Area",
    description:
      "Evata brings together premium garment care (Union French Cleaners, est. 1989) and cutting-edge Korean beauty technology (UNI&CORE) in the San Francisco Bay Area. Korean ginseng, Guizhou ethnic crafts & jewelry.",
    keywords:
      "Korean beauty devices Bay Area, premium dry cleaning San Francisco, UNI&CORE dealer USA, Korean ginseng, Guizhou ethnic jewelry, Union French Cleaners, beauty franchise Bay Area",
  },
  zh: {
    title: "Evata | 湾区优质服务与韩国美容科技",
    description:
      "Evata 汇聚旧金山湾区优质服装护理（Union French Cleaners，创立于1989年）与前沿韩国美容科技（UNI&CORE）。韩国人参、贵州民族工艺与首饰。",
    keywords:
      "韩国美容仪器, 旧金山干洗, UNI&CORE 美容, 韩国人参, 贵州民族首饰, 湾区美容加盟",
  },
  kr: {
    title: "Evata | 베이 에어리어 프리미엄 서비스 & 한국 뷰티 기술",
    description:
      "Evata는 샌프란시스코 베이 에어리어에서 프리미엄 의류 관리(Union French Cleaners, 1989년 설립)와 최첨단 한국 뷰티 기술(UNI&CORE)을 제공합니다. 한국 인삼, 구이저우 민족 공예 & 주얼리.",
    keywords:
      "한국 뷰티 기기, 샌프란시스코 드라이클리닝, UNI&CORE 딜러, 한국 인삼, 구이저우 민족 주얼리, 뷰티 프랜차이즈",
  },
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = (languages.includes(langParam as Language)
    ? langParam
    : "en") as Language;
  const meta = seoMeta[lang];
  const canonicalUrl = `${SITE_URL}/${lang}`;

  const alternateLanguages: Record<string, string> = {};
  for (const l of languages) {
    alternateLanguages[htmlLangMap[l]] = `${SITE_URL}/${l}`;
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: "Evata",
      locale: htmlLangMap[lang].replace("-", "_"),
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Evata - Premium Services & Korean Beauty Technology",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function getStructuredData(lang: Language) {
  const t = getTranslation(lang);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Evata",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: seoMeta[lang].description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-415-923-1212",
      contactType: "customer service",
      email: "info@unincore.us",
      availableLanguage: ["English", "Chinese", "Korean"],
    },
    sameAs: [],
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Union French Cleaners",
    image: `${SITE_URL}/og-image.png`,
    url: SITE_URL,
    telephone: "+1-415-923-1212",
    email: "info@unincore.us",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1718 Union St",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94123",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7982,
      longitude: -122.4271,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
    foundingDate: "1989",
    description: t.divisions.cleaners.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dry Cleaning Services",
      itemListElement: t.divisions.cleaners.features.map((feature, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature,
        },
        position: i + 1,
      })),
    },
  };

  const products = t.products.items.slice(0, 6).map((item) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    offers: {
      "@type": "Offer",
      price: item.price.replace(/[$,]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: item.category === "ginseng" ? "Korean Ginseng" : "UNI&CORE",
    },
  }));

  return [organization, localBusiness, ...products];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = (languages.includes(langParam as Language)
    ? langParam
    : "en") as Language;
  const structuredData = getStructuredData(lang);

  return (
    <>
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      {children}
    </>
  );
}
