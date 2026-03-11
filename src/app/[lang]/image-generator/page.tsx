"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type Language } from "../../i18n/translations";

const labels: Record<Language, Record<string, string>> = {
  en: {
    title: "AI Product Image Generator",
    subtitle: "Generate product images for your catalog",
    backToHome: "Back to Home",
    prompt: "Image Description",
    promptPlaceholder: "e.g. Miao silver phoenix necklace, traditional Chinese ethnic jewelry, intricate filigree work, product photography, white background",
    size: "Size",
    generate: "Generate Image",
    generating: "Generating...",
    download: "Download",
    useAsProduct: "Save to Products",
    presetPrompts: "Quick Prompts",
  },
  zh: {
    title: "AI 产品图片生成器",
    subtitle: "为您的产品目录生成图片",
    backToHome: "返回首页",
    prompt: "图片描述",
    promptPlaceholder: "例如：苗族银凤凰项链，中国民族传统首饰，精细花丝工艺，产品摄影，白色背景",
    size: "尺寸",
    generate: "生成图片",
    generating: "生成中...",
    download: "下载",
    useAsProduct: "保存为产品图",
    presetPrompts: "快捷提示",
  },
  kr: {
    title: "AI 제품 이미지 생성기",
    subtitle: "제품 카탈로그용 이미지를 생성하세요",
    backToHome: "홈으로 돌아가기",
    prompt: "이미지 설명",
    promptPlaceholder: "예: 묘족 은 봉황 목걸이, 중국 전통 민족 주얼리, 정교한 세공, 제품 사진, 흰색 배경",
    size: "크기",
    generate: "이미지 생성",
    generating: "생성 중...",
    download: "다운로드",
    useAsProduct: "제품 이미지로 저장",
    presetPrompts: "빠른 프롬프트",
  },
};

const presetPrompts = [
  {
    label: "Miao Silver Jacket",
    prompt: "Miao ethnic silver embroidered jacket displayed on mannequin, traditional Guizhou handcraft, intricate silver ornaments on dark navy blue fabric, elaborate embroidery patterns, studio product photo, white background, professional e-commerce photography, high detail, soft lighting",
  },
  {
    label: "Dong Indigo Dress",
    prompt: "Traditional Dong ethnic indigo-dyed dress, natural deep blue color, handwoven cotton fabric with subtle patterns, full-length traditional Chinese minority clothing, studio product shot, white background, professional lighting, e-commerce style",
  },
  {
    label: "Batik Silk Scarf",
    prompt: "Guizhou batik silk scarf elegantly draped, traditional wax-resist indigo blue and white patterns, geometric and floral motifs, pure silk fabric with natural sheen, product photography, white background, high detail",
  },
  {
    label: "Phoenix Necklace",
    prompt: "Miao ethnic silver phoenix necklace, elaborate traditional Chinese minority jewelry, intricate filigree phoenix motif, sterling silver craftsmanship, statement piece, product photography on white background, close-up detail shot, professional lighting",
  },
  {
    label: "Filigree Bracelet",
    prompt: "Guizhou silver filigree bracelet, delicate traditional Chinese ethnic metalwork, intricate wire patterns, 925 sterling silver, artisan handcrafted, product photography, white background, macro detail shot",
  },
  {
    label: "Embroidered Earrings",
    prompt: "Miao ethnic embroidered earrings, combination of silver metalwork and hand-embroidered colorful textile elements, lightweight dangle style, traditional Chinese minority jewelry, product photography, white background, detail shot",
  },
  {
    label: "Korean Red Ginseng",
    prompt: "Premium Korean red ginseng extract in elegant dark amber glass bottle, traditional Korean herbal supplement, luxury packaging with gold accents, 6-year root extract label, product photography, white background, professional lighting",
  },
  {
    label: "Ginseng Tea Gift Set",
    prompt: "Korean ginseng tea gift set in premium wooden box, individually wrapped tea sachets, elegant traditional Korean packaging design, gold and red colors, luxury gift presentation, product photography, white background",
  },
];

export default function ImageGeneratorPage() {
  const params = useParams();
  const lang = (params.lang as Language) || "en";
  const l = labels[lang];

  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [generating, setGenerating] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedPath, setSavedPath] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setError(null);
    setImageData(null);

    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, size }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setImageData(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!imageData) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageData}`;
    link.download = `evata-product-${Date.now()}.png`;
    link.click();
  };

  const handleSave = async () => {
    if (!imageData) return;
    setSaving(true);
    setSavedPath(null);
    try {
      const filename = prompt.slice(0, 40).replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase() || `product-${Date.now()}`;
      const res = await fetch("/api/image/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData, filename }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setSavedPath(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{l.title}</h1>
            <p className="text-sm text-gray-500">{l.subtitle}</p>
          </div>
          <Link href={`/${lang}`} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            &larr; {l.backToHome}
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="space-y-6">
            {/* Quick Prompts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{l.presetPrompts}</h2>
              <div className="flex flex-wrap gap-2">
                {presetPrompts.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setPrompt(p.prompt)}
                    className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{l.prompt}</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={l.promptPlaceholder}
                rows={6}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none text-sm resize-y"
              />

              <div className="mt-4 flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{l.size}</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary-500 outline-none"
                  >
                    <option value="1024x1024">1024 x 1024 (Square)</option>
                    <option value="1024x1792">1024 x 1792 (Portrait)</option>
                    <option value="1792x1024">1792 x 1024 (Landscape)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="mt-4 w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? l.generating : l.generate}
              </button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[400px] bg-gray-50 flex items-center justify-center">
              {generating ? (
                <div className="text-center text-gray-400">
                  <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full mx-auto mb-3" />
                  <p>{l.generating}</p>
                </div>
              ) : imageData ? (
                <img
                  src={`data:image/png;base64,${imageData}`}
                  alt="Generated product image"
                  className="max-w-full max-h-[500px] object-contain"
                />
              ) : error ? (
                <p className="text-red-500 text-sm px-4 text-center">{error}</p>
              ) : (
                <p className="text-gray-400 text-sm">{l.promptPlaceholder}</p>
              )}
            </div>

            {imageData && (
              <div className="mt-4 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    {l.download}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? "..." : l.useAsProduct}
                  </button>
                </div>
                {savedPath && (
                  <p className="text-sm text-green-600 text-center">
                    Saved to {savedPath}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
