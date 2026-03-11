"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getTranslation,
  languages,
  languageNames,
  Language,
} from "../i18n/translations";

const productUrls: Record<string, string> = {
  "New DERMA Home": "https://unincore.us/products/derma-home",
  "新款 DERMA Home": "https://unincore.us/products/derma-home",
  "Hyperloop Scalp Serum Set": "https://unincore.us/products/hyperloop-scalp-serum-set",
  "Hyperloop 头皮精华套装": "https://unincore.us/products/hyperloop-scalp-serum-set",
  "Hyperloop 두피 세럼 세트": "https://unincore.us/products/hyperloop-scalp-serum-set",
  "Vita C 13.5 Super Brightening Ampoule": "https://unincore.us/products/vita-c-13-5-super-whitening-serum",
  "Vita C 13.5 超级亮白安瓶": "https://unincore.us/products/vita-c-13-5-super-whitening-serum",
  "Vita C 13.5 슈퍼 브라이트닝 앰플": "https://unincore.us/products/vita-c-13-5-super-whitening-serum",
  "Deep Repair Activating Nutrition Cream": "https://unincore.us/products/deep-repair-activating-nutrition-cream-30ml",
  "深层修复活性营养霜": "https://unincore.us/products/deep-repair-activating-nutrition-cream-30ml",
  "딥 리페어 액티베이팅 뉴트리션 크림": "https://unincore.us/products/deep-repair-activating-nutrition-cream-30ml",
  "Vita C Super Brightening Mask": "https://unincore.us/products/vita-c-super-brightening-mask-5-sheets",
  "Vita C 超级亮白面膜": "https://unincore.us/products/vita-c-super-brightening-mask-5-sheets",
  "Vita C 슈퍼 브라이트닝 마스크": "https://unincore.us/products/vita-c-super-brightening-mask-5-sheets",
  "Glow Beauty Collagen Jelly": "https://unincore.us/products/glow-beauty-collagen-jelly-tart-cherry-flavor-20g-x-30-packets",
  "焕彩美容胶原蛋白果冻": "https://unincore.us/products/glow-beauty-collagen-jelly-tart-cherry-flavor-20g-x-30-packets",
  "글로우 뷰티 콜라겐 젤리": "https://unincore.us/products/glow-beauty-collagen-jelly-tart-cherry-flavor-20g-x-30-packets",
  "Slimming Mega Probiotics": "https://unincore.us/products/slimming-mega-probiotics",
  "瘦身益生菌": "https://unincore.us/products/slimming-mega-probiotics",
  "슬리밍 메가 프로바이오틱스": "https://unincore.us/products/slimming-mega-probiotics",
  "Bone & Joint Active Mega Formula": "https://unincore.us/products/bone-joint-active-mega-formula-60-capsules",
  "骨关节活力配方": "https://unincore.us/products/bone-joint-active-mega-formula-60-capsules",
  "본 & 조인트 액티브 메가 포뮬러": "https://unincore.us/products/bone-joint-active-mega-formula-60-capsules",
};

const productImages: Record<string, string> = {
  "New DERMA Home": "https://unincore.us/cdn/shop/files/20250808132546_64c5e5b9-3f2a-4d46-ba8a-e2b8e3ea4fa0.png?v=1757794991&width=600",
  "新款 DERMA Home": "https://unincore.us/cdn/shop/files/20250808132546_64c5e5b9-3f2a-4d46-ba8a-e2b8e3ea4fa0.png?v=1757794991&width=600",
  "Hyperloop Scalp Serum Set": "https://unincore.us/cdn/shop/files/20250808132546_64c5e5b9-3f2a-4d46-ba8a-e2b8e3ea4fa0.png?v=1757794991&width=600",
  "Hyperloop 头皮精华套装": "https://unincore.us/cdn/shop/files/20250808132546_64c5e5b9-3f2a-4d46-ba8a-e2b8e3ea4fa0.png?v=1757794991&width=600",
  "Hyperloop 두피 세럼 세트": "https://unincore.us/cdn/shop/files/20250808132546_64c5e5b9-3f2a-4d46-ba8a-e2b8e3ea4fa0.png?v=1757794991&width=600",
  "Vita C 13.5 Super Brightening Ampoule": "https://unincore.us/cdn/shop/files/20240902133827_1b246f0d-55d9-454b-88a6-ca01fd7add1d_1.png?v=1756773252&width=600",
  "Vita C 13.5 超级亮白安瓶": "https://unincore.us/cdn/shop/files/20240902133827_1b246f0d-55d9-454b-88a6-ca01fd7add1d_1.png?v=1756773252&width=600",
  "Vita C 13.5 슈퍼 브라이트닝 앰플": "https://unincore.us/cdn/shop/files/20240902133827_1b246f0d-55d9-454b-88a6-ca01fd7add1d_1.png?v=1756773252&width=600",
  "Deep Repair Activating Nutrition Cream": "https://unincore.us/cdn/shop/files/20240902114344_b89572d6-dced-47ea-afa3-53e41f35a4c6.png?v=1756773319&width=600",
  "深层修复活性营养霜": "https://unincore.us/cdn/shop/files/20240902114344_b89572d6-dced-47ea-afa3-53e41f35a4c6.png?v=1756773319&width=600",
  "딥 리페어 액티베이팅 뉴트리션 크림": "https://unincore.us/cdn/shop/files/20240902114344_b89572d6-dced-47ea-afa3-53e41f35a4c6.png?v=1756773319&width=600",
  "Vita C Super Brightening Mask": "https://unincore.us/cdn/shop/files/20240902131310_3f59019d-b9c5-4cd8-b0a1-438ce023e5f4.png?v=1756773634&width=600",
  "Vita C 超级亮白面膜": "https://unincore.us/cdn/shop/files/20240902131310_3f59019d-b9c5-4cd8-b0a1-438ce023e5f4.png?v=1756773634&width=600",
  "Vita C 슈퍼 브라이트닝 마스크": "https://unincore.us/cdn/shop/files/20240902131310_3f59019d-b9c5-4cd8-b0a1-438ce023e5f4.png?v=1756773634&width=600",
  "Glow Beauty Collagen Jelly": "https://unincore.us/cdn/shop/files/20241024185854_c5c56882-3dc4-44f8-b75e-0bbf8f40f4ff.png?v=1757822151&width=600",
  "焕彩美容胶原蛋白果冻": "https://unincore.us/cdn/shop/files/20241024185854_c5c56882-3dc4-44f8-b75e-0bbf8f40f4ff.png?v=1757822151&width=600",
  "글로우 뷰티 콜라겐 젤리": "https://unincore.us/cdn/shop/files/20241024185854_c5c56882-3dc4-44f8-b75e-0bbf8f40f4ff.png?v=1757822151&width=600",
  "Slimming Mega Probiotics": "https://unincore.us/cdn/shop/files/20240902132250_1b2a1d9b-ffc4-430e-a4bc-a8c499162ad0.png?v=1757824112&width=600",
  "瘦身益生菌": "https://unincore.us/cdn/shop/files/20240902132250_1b2a1d9b-ffc4-430e-a4bc-a8c499162ad0.png?v=1757824112&width=600",
  "슬리밍 메가 프로바이오틱스": "https://unincore.us/cdn/shop/files/20240902132250_1b2a1d9b-ffc4-430e-a4bc-a8c499162ad0.png?v=1757824112&width=600",
  "Bone & Joint Active Mega Formula": "https://unincore.us/cdn/shop/files/20240902134302_a241699c-473f-4cad-8142-c626d3c5854d.png?v=1757821365&width=600",
  "骨关节活力配方": "https://unincore.us/cdn/shop/files/20240902134302_a241699c-473f-4cad-8142-c626d3c5854d.png?v=1757821365&width=600",
  "본 & 조인트 액티브 메가 포뮬러": "https://unincore.us/cdn/shop/files/20240902134302_a241699c-473f-4cad-8142-c626d3c5854d.png?v=1757821365&width=600",
};

export default function LangPage() {
  const params = useParams();
  const lang = (params.lang as Language) || "en";
  const t = getTranslation(lang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setFormStatus("error");
    } finally {
      setFormLoading(false);
    }
  };

  const htmlLangMap: Record<Language, string> = { en: "en", zh: "zh", kr: "ko" };
  const srNewWindow = { en: "(opens in new tab)", zh: "(在新标签页中打开)", kr: "(새 탭에서 열기)" }[lang];

  return (
    <div className="min-h-screen bg-white text-gray-900" lang={htmlLangMap[lang]}>
      {/* Skip to content */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        {lang === "zh" ? "跳至主要内容" : lang === "kr" ? "주요 콘텐츠로 이동" : "Skip to main content"}
      </a>

      {/* Navigation */}
      <nav aria-label={lang === "zh" ? "主导航" : lang === "kr" ? "기본 탐색" : "Main navigation"} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${lang}`} className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Evata
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                {t.nav.home}
              </a>
              <a href="#services" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                {t.nav.services}
              </a>
              <a href="#products" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                {t.nav.products}
              </a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                {t.nav.about}
              </a>
              <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                {t.nav.contact}
              </a>
            </div>

            {/* Language Switcher + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div role="group" aria-label={lang === "zh" ? "语言切换" : lang === "kr" ? "언어 전환" : "Language switcher"} className="flex items-center bg-gray-100 rounded-full p-1">
                {languages.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    aria-current={lang === l ? "page" : undefined}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                      lang === l
                        ? "bg-primary-600 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {languageNames[l]}
                  </Link>
                ))}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={lang === "zh" ? "导航菜单" : lang === "kr" ? "탐색 메뉴" : "Navigation menu"}
                className="md:hidden p-2 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100">
              <div className="flex flex-col gap-2 pt-4">
                {[
                  { href: "#home", label: t.nav.home },
                  { href: "#services", label: t.nav.services },
                  { href: "#products", label: t.nav.products },
                  { href: "#about", label: t.nav.about },
                  { href: "#contact", label: t.nav.contact },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main>
      <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-6">
              {t.hero.badge}
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-gray-700 mb-4">
              {t.hero.subtitle}
            </p>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-10">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-3.5 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
              >
                {t.hero.cta1}
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-medium rounded-full hover:border-primary-300 hover:text-primary-600 transition-colors"
              >
                {t.hero.cta2}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Divisions */}
      <section id="services" className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.divisions.title}
            </h2>
            <p className="text-gray-500 text-lg">{t.divisions.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Union French Cleaners */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full mb-4">
                {t.divisions.cleaners.tag}
              </span>
              <h3 className="text-2xl font-bold mb-3">{t.divisions.cleaners.title}</h3>
              <p className="text-gray-500 mb-6">{t.divisions.cleaners.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {t.divisions.cleaners.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
                <a
                  href="https://union-french-cleaners.jytech.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors"
                >
                  {t.divisions.cleaners.cta} <span aria-hidden="true">&rarr;</span>
                  <span className="sr-only"> {srNewWindow}</span>
                </a>
                <a href={`tel:${t.divisions.cleaners.phone}`} className="px-5 py-2 border-2 border-emerald-200 text-emerald-600 text-sm font-medium rounded-full hover:bg-emerald-50 transition-colors text-center">
                  {t.divisions.cleaners.callUs} {t.divisions.cleaners.phone} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            {/* UNI&CORE Beauty */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-4">
                {t.divisions.beauty.tag}
              </span>
              <h3 className="text-2xl font-bold mb-3">{t.divisions.beauty.title}</h3>
              <p className="text-gray-500 mb-6">{t.divisions.beauty.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {t.divisions.beauty.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-purple-500 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`https://lounge-franchise-opportunities.unincore.us/${lang === "kr" ? "en" : lang}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-purple-600 text-white text-sm font-medium rounded-full hover:bg-purple-700 transition-colors text-center"
                >
                  {t.divisions.beauty.cta} <span aria-hidden="true">&rarr;</span>
                  <span className="sr-only"> {srNewWindow}</span>
                </a>
                <a
                  href="https://unincore.us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 border-2 border-purple-200 text-purple-600 text-sm font-medium rounded-full hover:bg-purple-50 transition-colors text-center"
                >
                  {t.divisions.beauty.cta2} <span aria-hidden="true">&rarr;</span>
                  <span className="sr-only"> {srNewWindow}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.products.title}
            </h2>
            <p className="text-gray-500 text-lg">{t.products.subtitle}</p>
          </div>

          {/* Category headers */}
          {(["devices", "skincare", "wellness", "ginseng", "ethnicWear", "jewelry"] as const).map((category) => {
            const categoryProducts = t.products.items.filter(
              (p) => p.category === category
            );
            const categoryColors = {
              devices: { bg: "from-slate-50 to-indigo-50", badge: "bg-indigo-100 text-indigo-700" },
              skincare: { bg: "from-rose-50 to-pink-50", badge: "bg-pink-100 text-pink-700" },
              wellness: { bg: "from-emerald-50 to-teal-50", badge: "bg-emerald-100 text-emerald-700" },
              ginseng: { bg: "from-amber-50 to-yellow-50", badge: "bg-amber-100 text-amber-700" },
              ethnicWear: { bg: "from-red-50 to-orange-50", badge: "bg-red-100 text-red-700" },
              jewelry: { bg: "from-violet-50 to-fuchsia-50", badge: "bg-violet-100 text-violet-700" },
            };
            const emojis = { devices: "🔬", skincare: "✨", wellness: "💊", ginseng: "🌿", ethnicWear: "👘", jewelry: "💎" };
            const colors = categoryColors[category];

            return (
              <div key={category} className="mb-12 last:mb-0">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span>{emojis[category]}</span>
                  {t.products.categories[category]}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product, i) => (
                    <a
                      key={i}
                      href={productUrls[product.name] || "https://unincore.us"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      <div className={`h-48 bg-gradient-to-br ${colors.bg} flex items-center justify-center relative overflow-hidden`}>
                        {productImages[product.name] ? (
                          <img
                            src={productImages[product.name]}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <span className="text-4xl opacity-80">{emojis[category]}</span>
                        )}
                        <span className="absolute top-3 right-3 bg-white/90 text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                          {product.price}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-base font-bold group-hover:text-primary-600 transition-colors">{product.name}</h4>
                        </div>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.features.map((f, j) => (
                            <span key={j} className={`px-2 py-0.5 ${colors.badge} text-xs font-medium rounded-full`}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="text-center mt-12">
            <a
              href="https://unincore.us"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
            >
              {t.products.shopAll} <span aria-hidden="true">&rarr;</span>
              <span className="sr-only"> {srNewWindow}</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                {t.about.title}
              </h2>
              <p className="text-primary-600 font-medium mb-6">{t.about.subtitle}</p>
              <p className="text-gray-500 leading-relaxed text-lg">{t.about.story}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {t.about.values.map((value, i) => {
                const icons = ["🌉", "⭐", "💡", "🤝"];
                const colors = [
                  "bg-blue-50 border-blue-200",
                  "bg-amber-50 border-amber-200",
                  "bg-purple-50 border-purple-200",
                  "bg-emerald-50 border-emerald-200",
                ];
                return (
                  <div key={i} className={`${colors[i]} border rounded-xl p-5`}>
                    <span className="text-2xl mb-3 block">{icons[i]}</span>
                    <h4 className="font-bold mb-1">{value.title}</h4>
                    <p className="text-sm text-gray-500">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.contact.title}
            </h2>
            <p className="text-gray-500 text-lg">{t.contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">{t.contact.form.name}</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder={t.contact.form.name}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">{t.contact.form.email}</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder={t.contact.form.email}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">{t.contact.form.phone}</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder={t.contact.form.phone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="sr-only">{t.contact.form.subject}</label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder={t.contact.form.subject}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">{t.contact.form.message}</label>
                  <textarea
                    id="contact-message"
                    placeholder={t.contact.form.message}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formLoading ? "..." : t.contact.form.submit}
                </button>
                {formStatus === "success" && (
                  <p role="alert" className="text-emerald-600 text-sm">{t.contact.form.success}</p>
                )}
                {formStatus === "error" && (
                  <p role="alert" className="text-red-600 text-sm">{t.contact.form.error}</p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">{t.contact.info.title}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📍</span>
                    <span className="text-sm text-gray-600">{t.contact.info.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📞</span>
                    <a href={`tel:${t.contact.info.phone}`} className="text-sm text-gray-600 hover:text-primary-600">
                      {t.contact.info.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✉️</span>
                    <a href={`mailto:${t.contact.info.email}`} className="text-sm text-gray-600 hover:text-primary-600">
                      {t.contact.info.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🕐</span>
                    <span className="text-sm text-gray-600">{t.contact.info.hours}</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-48 border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.8!2d-122.433!3d37.798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580e5f0c0e3c7%3A0x4e1f5c2c5c5c5c5c!2s1718+Union+St%2C+San+Francisco%2C+CA+94123!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Evata Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-3">{t.footer.brand}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
              <div className="flex flex-col gap-2">
                <a href="#home" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.home}</a>
                <a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.services}</a>
                <a href="#products" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.products}</a>
                <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.about}</a>
                <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">{t.nav.contact}</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.contactUs}</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <span>{t.contact.info.address}</span>
                <a href={`tel:${t.contact.info.phone}`} className="hover:text-white transition-colors">{t.contact.info.phone}</a>
                <a href={`mailto:${t.contact.info.email}`} className="hover:text-white transition-colors">{t.contact.info.email}</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
