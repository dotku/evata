import { NextResponse } from "next/server";

const templates = [
  {
    id: "franchise",
    name: "UNI&CORE Franchise Opportunity",
    subject: "Exclusive UNI&CORE Beauty Franchise Opportunity - Bay Area",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;">
        <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:24px;">Evata × UNI&CORE</h1>
          <p style="color:#e0d4ff;margin:8px 0 0;">Korean Beauty Technology</p>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #e5e7eb;">
          <p>Hi {{name}},</p>
          <p>I'm reaching out from <strong>Evata</strong>, the authorized UNI&CORE dealer for the San Francisco Bay Area.</p>
          <p>We're expanding our franchise network and I thought your business could be a great fit for our <strong>Korean beauty device</strong> line, including:</p>
          <ul>
            <li><a href="https://unincore.us/products/derma-home" style="color:#7c3aed;text-decoration:underline;"><strong>Derma10 Professional Device</strong></a> — salon-grade treatments</li>
            <li><a href="https://unincore.us/products/derma-home" style="color:#7c3aed;text-decoration:underline;"><strong>Derma Home Device</strong></a> — at-home beauty solutions</li>
            <li><a href="https://unincore.us/products/hyperloop-scalp-serum-set" style="color:#7c3aed;text-decoration:underline;"><strong>Hyperloop Series</strong></a> — advanced scalp & skin care</li>
          </ul>
          <p>We provide full training, marketing support, and after-sales service.</p>
          <p>Would you be open to a quick 15-minute call this week?</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://evata.us/en#contact" style="background:#7c3aed;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;">Learn More</a>
          </div>
          <p>Best regards,<br/><strong>Evata Team</strong><br/>info@unincore.us | 415-923-1212</p>
        </div>
        <div style="padding:16px;text-align:center;color:#9ca3af;font-size:12px;">
          <p>Evata | 1718 Union St, San Francisco, CA 94123</p>
        </div>
      </div>`,
  },
  {
    id: "product-intro",
    name: "Product Introduction",
    subject: "Discover Premium Korean Beauty & Wellness Products",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;">
        <div style="background:linear-gradient(135deg,#059669,#0d9488);padding:32px;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:24px;">Evata Products</h1>
          <p style="color:#d1fae5;margin:8px 0 0;">Korean Beauty, Wellness & Ginseng</p>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #e5e7eb;">
          <p>Hi {{name}},</p>
          <p>We'd love to introduce you to our curated collection of premium Korean products:</p>
          <h3 style="color:#059669;">🧴 Skincare</h3>
          <ul>
            <li><a href="https://unincore.us/products/vita-c-13-5-super-whitening-serum" style="color:#059669;">Vita C 13.5 Super Brightening Ampoule</a> — $176</li>
            <li><a href="https://unincore.us/products/deep-repair-activating-nutrition-cream-30ml" style="color:#059669;">Deep Repair Activating Nutrition Cream</a> — $141</li>
            <li><a href="https://unincore.us/products/vita-c-super-brightening-mask-5-sheets" style="color:#059669;">Vita C Super Brightening Mask</a> — $58</li>
          </ul>
          <h3 style="color:#059669;">💊 Wellness</h3>
          <ul>
            <li><a href="https://unincore.us/products/glow-beauty-collagen-jelly-tart-cherry-flavor-20g-x-30-packets" style="color:#059669;">Glow Beauty Collagen Jelly</a> — $140</li>
            <li><a href="https://unincore.us/products/slimming-mega-probiotics" style="color:#059669;">Slimming Mega Probiotics</a> — $122</li>
            <li><a href="https://unincore.us/products/bone-joint-active-mega-formula-60-capsules" style="color:#059669;">Bone & Joint Active Mega Formula</a> — $117</li>
          </ul>
          <h3 style="color:#059669;">🌿 Korean Ginseng</h3>
          <p>Premium 6-year red ginseng extract, tea gift sets, and sliced roots.</p>
          <p>All products are sourced directly from Korea with guaranteed authenticity.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://unincore.us/collections/all" style="background:#059669;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;">Shop All Products</a>
          </div>
          <p>Best regards,<br/><strong>Evata Team</strong><br/>info@unincore.us | 415-923-1212</p>
        </div>
        <div style="padding:16px;text-align:center;color:#9ca3af;font-size:12px;">
          <p>Evata | 1718 Union St, San Francisco, CA 94123</p>
        </div>
      </div>`,
  },
  {
    id: "guizhou-crafts",
    name: "Guizhou Ethnic Crafts & Jewelry",
    subject: "Handcrafted Guizhou Ethnic Jewelry & Clothing — Now in the Bay Area",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;">
        <div style="background:linear-gradient(135deg,#b45309,#d97706);padding:32px;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:24px;">Guizhou Heritage</h1>
          <p style="color:#fef3c7;margin:8px 0 0;">Ethnic Crafts & Silver Jewelry</p>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #e5e7eb;">
          <p>Hi {{name}},</p>
          <p>We're excited to share our exclusive collection of <strong>Guizhou ethnic crafts</strong>, handmade by Miao and Dong artisans:</p>
          <ul>
            <li><a href="https://union-french-cleaners.jytech.us" style="color:#b45309;"><strong>Miao Silver Phoenix Necklace</strong></a> — $460</li>
            <li><a href="https://union-french-cleaners.jytech.us" style="color:#b45309;"><strong>Guizhou Silver Filigree Bracelet</strong></a> — $280</li>
            <li><a href="https://union-french-cleaners.jytech.us" style="color:#b45309;"><strong>Miao Embroidered Earrings</strong></a> — $95</li>
            <li><a href="https://union-french-cleaners.jytech.us" style="color:#b45309;"><strong>Miao Silver Embroidered Jacket</strong></a> — $580</li>
            <li><a href="https://union-french-cleaners.jytech.us" style="color:#b45309;"><strong>Guizhou Batik Silk Scarf</strong></a> — $168</li>
          </ul>
          <p>Each piece carries centuries of cultural heritage and is one-of-a-kind.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://union-french-cleaners.jytech.us" style="background:#b45309;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;">View Collection</a>
          </div>
          <p>Best regards,<br/><strong>Evata Team</strong><br/>info@unincore.us | 415-923-1212</p>
        </div>
        <div style="padding:16px;text-align:center;color:#9ca3af;font-size:12px;">
          <p>Evata | 1718 Union St, San Francisco, CA 94123</p>
        </div>
      </div>`,
  },
];

export async function GET() {
  return NextResponse.json(templates);
}
