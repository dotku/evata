export type Language = "en" | "zh" | "kr";

export const languages: Language[] = ["en", "zh", "kr"];

export const languageNames: Record<Language, string> = {
  en: "English",
  zh: "中文",
  kr: "한국어",
};

const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      products: "Products",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "San Francisco Bay Area",
      title: "Evata",
      subtitle: "Your Trusted Local Partner for Premium Services",
      description:
        "From professional garment care to cutting-edge Korean beauty technology — Evata brings together the best of lifestyle services in the Bay Area.",
      cta1: "Explore Services",
      cta2: "Contact Us",
      stat1: { value: "35+", label: "Years of Experience" },
      stat2: { value: "10K+", label: "Happy Clients" },
      stat3: { value: "2", label: "Business Lines" },
    },
    divisions: {
      title: "Our Business",
      subtitle: "Two Pillars of Excellence",
      cleaners: {
        tag: "Est. 1989",
        title: "Union French Cleaners",
        description:
          "Premium dry cleaning & garment care serving San Francisco for over 35 years. Where tradition meets excellence.",
        features: [
          "Professional Dry Cleaning",
          "Shirt & Laundry Service",
          "Expert Alterations",
          "Leather & Suede Care",
          "Wedding Gown Preservation",
          "Household Textiles",
        ],
        cta: "Visit Website",
        callUs: "Call",
        address: "1718 Union St, San Francisco, CA 94123",
        phone: "415-923-1212",
      },
      beauty: {
        tag: "Authorized Dealer",
        title: "UNI&CORE Beauty",
        description:
          "Official dealer of UNI&CORE Korean beauty devices and professional skincare solutions for the Bay Area market.",
        features: [
          "Derma10 Professional Device",
          "Derma Home Device",
          "Hyperloop Series",
          "Professional Training",
          "Franchise Opportunities",
          "After-Sales Support",
        ],
        cta: "Franchise Info",
        cta2: "Shop Online",
      },
    },
    products: {
      title: "Our Products",
      subtitle: "Korean Beauty, Wellness, Ginseng & Guizhou Ethnic Crafts",
      shopAll: "Shop All Products",
      categories: {
        devices: "Professional Devices",
        skincare: "Skincare",
        wellness: "Wellness & Health",
        ginseng: "Korean Ginseng",
        ethnicWear: "Guizhou Ethnic Clothing",
        jewelry: "Guizhou Ethnic Jewelry",
      },
      items: [
        {
          name: "New DERMA Home",
          description:
            "Professional-grade home beauty device bringing salon-quality skincare treatments to your daily routine.",
          price: "$8,800",
          category: "devices",
          features: ["Professional Grade", "Home Use", "Korean Technology"],
        },
        {
          name: "Hyperloop Scalp Serum Set",
          description:
            "Premium scalp care set combining advanced serum technology with the Hyperloop delivery system.",
          price: "$1,320",
          category: "devices",
          features: ["Scalp Care", "Serum Included", "Professional Set"],
        },
        {
          name: "Vita C 13.5 Super Brightening Ampoule",
          description:
            "High-concentration Vitamin C ampoule for intensive skin brightening and anti-aging care.",
          price: "$176",
          category: "skincare",
          features: ["Vitamin C", "Brightening", "Anti-Aging"],
        },
        {
          name: "Deep Repair Activating Nutrition Cream",
          description:
            "Intensive nourishing cream that repairs and revitalizes skin with deep hydration technology.",
          price: "$141",
          category: "skincare",
          features: ["Deep Repair", "Nutrition", "30ml"],
        },
        {
          name: "Vita C Super Brightening Mask",
          description:
            "Premium sheet mask infused with Vitamin C for an instant brightening and hydrating boost.",
          price: "$58",
          category: "skincare",
          features: ["5 Sheets", "Brightening", "Hydrating"],
        },
        {
          name: "Glow Beauty Collagen Jelly",
          description:
            "Delicious collagen jelly supplement for radiant skin, hair, and nail health from within.",
          price: "$140",
          category: "wellness",
          features: ["Collagen", "Beauty", "Daily Use"],
        },
        {
          name: "Slimming Mega Probiotics",
          description:
            "Advanced probiotic formula designed to support digestive health and weight management.",
          price: "$122",
          category: "wellness",
          features: ["Probiotics", "Slimming", "Gut Health"],
        },
        {
          name: "Bone & Joint Active Mega Formula",
          description:
            "Comprehensive joint and bone support formula with essential nutrients for active lifestyles.",
          price: "$117",
          category: "wellness",
          features: ["Joint Support", "Bone Health", "Active Formula"],
        },
        {
          name: "Korean Red Ginseng Extract",
          description:
            "Premium 6-year-old Korean red ginseng extract, traditionally processed for maximum potency and vitality.",
          price: "$189",
          category: "ginseng",
          features: ["6-Year Root", "Premium Extract", "Traditional"],
        },
        {
          name: "Korean Ginseng Tea Gift Set",
          description:
            "Elegant gift set of Korean ginseng tea, perfect for daily wellness and as a thoughtful present.",
          price: "$68",
          category: "ginseng",
          features: ["Gift Set", "Daily Wellness", "30 Packets"],
        },
        {
          name: "Korean Ginseng Sliced Root",
          description:
            "Hand-selected sliced Korean ginseng root, ideal for soups, teas, and traditional recipes.",
          price: "$128",
          category: "ginseng",
          features: ["Sliced Root", "Cooking Grade", "Natural"],
        },
        {
          name: "Miao Silver Embroidered Jacket",
          description:
            "Handcrafted Miao ethnic jacket featuring intricate embroidery and traditional silver ornaments from Guizhou.",
          price: "$580",
          category: "ethnicWear",
          features: ["Handcrafted", "Miao Embroidery", "Silver Ornaments"],
        },
        {
          name: "Dong Indigo-Dyed Dress",
          description:
            "Traditional Dong ethnic dress made with natural indigo dyeing techniques passed down for generations.",
          price: "$420",
          category: "ethnicWear",
          features: ["Natural Dye", "Dong Heritage", "Handwoven"],
        },
        {
          name: "Guizhou Batik Silk Scarf",
          description:
            "Artisan batik silk scarf combining traditional Guizhou wax-resist patterns with modern elegance.",
          price: "$168",
          category: "ethnicWear",
          features: ["Batik Art", "Pure Silk", "Artisan Made"],
        },
        {
          name: "Miao Silver Phoenix Necklace",
          description:
            "Statement necklace handcrafted by Miao silversmiths, featuring the iconic phoenix motif symbolizing prosperity.",
          price: "$460",
          category: "jewelry",
          features: ["Handcrafted Silver", "Phoenix Motif", "Miao Heritage"],
        },
        {
          name: "Guizhou Silver Filigree Bracelet",
          description:
            "Delicate silver filigree bracelet showcasing the centuries-old metalworking artistry of Guizhou craftsmen.",
          price: "$280",
          category: "jewelry",
          features: ["Filigree Work", "925 Silver", "Traditional Craft"],
        },
        {
          name: "Miao Embroidered Earrings",
          description:
            "Unique earrings combining Miao silver craftsmanship with hand-embroidered textile elements.",
          price: "$95",
          category: "jewelry",
          features: ["Silver & Textile", "Handmade", "Lightweight"],
        },
      ],
    },
    about: {
      title: "About Evata",
      subtitle: "Rooted in the Bay Area, Connected to the World",
      story:
        "Evata is a Bay Area-based company that bridges premium local services with global beauty innovation. With over 35 years of experience through Union French Cleaners and a partnership with UNI&CORE — a leading Korean beauty technology brand — we deliver quality and trust to our community.",
      values: [
        {
          title: "Local Expertise",
          description:
            "Deep roots in the San Francisco Bay Area community since 1989.",
        },
        {
          title: "Quality First",
          description:
            "Uncompromising standards in every service and product we offer.",
        },
        {
          title: "Innovation",
          description:
            "Bringing cutting-edge Korean beauty technology to the Bay Area.",
        },
        {
          title: "Trust",
          description:
            "10,000+ satisfied clients who rely on us for their needs.",
        },
      ],
    },
    contact: {
      title: "Get in Touch",
      subtitle: "We'd love to hear from you",
      form: {
        name: "Your Name",
        email: "Email Address",
        phone: "Phone Number",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
        success: "Message sent successfully! We'll get back to you soon.",
        error: "Something went wrong. Please try again.",
      },
      info: {
        title: "Contact Information",
        address: "1718 Union St, San Francisco, CA 94123",
        phone: "415-923-1212",
        email: "info@unincore.us",
        hours: "Mon-Fri: 9AM - 6PM PST",
      },
    },
    footer: {
      brand: "Evata",
      tagline: "Premium Services & Korean Beauty Technology in the Bay Area",
      quickLinks: "Quick Links",
      contactUs: "Contact Us",
      copyright: "© 2026 Evata. All rights reserved.",
    },
  },
  zh: {
    nav: {
      home: "首页",
      services: "服务",
      products: "产品",
      about: "关于",
      contact: "联系",
    },
    hero: {
      badge: "旧金山湾区",
      title: "Evata",
      subtitle: "您值得信赖的本地优质服务伙伴",
      description:
        "从专业服装护理到前沿韩式美容科技 —— Evata 为湾区带来最优质的生活服务体验。",
      cta1: "探索服务",
      cta2: "联系我们",
      stat1: { value: "35+", label: "年经验" },
      stat2: { value: "10K+", label: "满意客户" },
      stat3: { value: "2", label: "业务线" },
    },
    divisions: {
      title: "我们的业务",
      subtitle: "双轮驱动，卓越服务",
      cleaners: {
        tag: "创立于1989年",
        title: "Union French Cleaners",
        description:
          "服务旧金山超过35年的高端干洗与服装护理品牌。传统与卓越的完美结合。",
        features: [
          "专业干洗服务",
          "衬衫洗涤熨烫",
          "精工裁缝改制",
          "皮革麂皮护理",
          "婚纱礼服保养",
          "家居纺织品清洁",
        ],
        cta: "访问网站",
        callUs: "致电",
        address: "1718 Union St, San Francisco, CA 94123",
        phone: "415-923-1212",
      },
      beauty: {
        tag: "授权经销商",
        title: "UNI&CORE 美容",
        description:
          "UNI&CORE 韩式美容仪器及专业护肤方案在湾区的官方经销商。",
        features: [
          "Derma10 专业美容仪",
          "Derma Home 家用仪",
          "Hyperloop 系列",
          "专业培训支持",
          "加盟合作机会",
          "完善售后服务",
        ],
        cta: "加盟信息",
        cta2: "在线选购",
      },
    },
    products: {
      title: "我们的产品",
      subtitle: "韩国美容、健康保健、韩国人参 & 贵州民族工艺",
      shopAll: "查看全部产品",
      categories: {
        devices: "专业仪器",
        skincare: "护肤系列",
        wellness: "健康保健",
        ginseng: "韩国人参",
        ethnicWear: "贵州民族服装",
        jewelry: "贵州民族首饰",
      },
      items: [
        {
          name: "新款 DERMA Home",
          description:
            "专业级家用美容仪，将美容院级护肤体验带入日常护理。",
          price: "$8,800",
          category: "devices",
          features: ["专业级别", "家庭使用", "韩国科技"],
        },
        {
          name: "Hyperloop 头皮精华套装",
          description:
            "高端头皮护理套装，结合先进精华技术与 Hyperloop 导入系统。",
          price: "$1,320",
          category: "devices",
          features: ["头皮护理", "含精华液", "专业套装"],
        },
        {
          name: "Vita C 13.5 超级亮白安瓶",
          description:
            "高浓度维C安瓶精华，用于密集美白和抗衰老护理。",
          price: "$176",
          category: "skincare",
          features: ["维生素C", "美白", "抗衰老"],
        },
        {
          name: "深层修复活性营养霜",
          description:
            "深层修复滋养面霜，以深层补水科技修复焕活肌肤。",
          price: "$141",
          category: "skincare",
          features: ["深层修复", "营养滋润", "30ml"],
        },
        {
          name: "Vita C 超级亮白面膜",
          description:
            "注入维C精华的高端面膜，即时提亮补水。",
          price: "$58",
          category: "skincare",
          features: ["5片装", "提亮", "补水"],
        },
        {
          name: "焕彩美容胶原蛋白果冻",
          description:
            "美味胶原蛋白果冻，由内而外呵护肌肤、头发和指甲健康。",
          price: "$140",
          category: "wellness",
          features: ["胶原蛋白", "美容", "每日服用"],
        },
        {
          name: "瘦身益生菌",
          description:
            "先进益生菌配方，支持消化健康和体重管理。",
          price: "$122",
          category: "wellness",
          features: ["益生菌", "纤体", "肠道健康"],
        },
        {
          name: "骨关节活力配方",
          description:
            "全面的关节和骨骼支持配方，含多种必需营养素。",
          price: "$117",
          category: "wellness",
          features: ["关节支持", "骨骼健康", "活力配方"],
        },
        {
          name: "韩国红参精华液",
          description:
            "优质六年根韩国红参精华，传统工艺加工，最大限度保留营养活力。",
          price: "$189",
          category: "ginseng",
          features: ["六年根", "精华提取", "传统工艺"],
        },
        {
          name: "韩国人参茶礼盒",
          description:
            "精美的韩国人参茶礼盒，适合日常养生，也是送礼佳品。",
          price: "$68",
          category: "ginseng",
          features: ["礼盒装", "日常养生", "30包"],
        },
        {
          name: "韩国人参切片",
          description:
            "精选韩国人参切片，适合炖汤、泡茶及传统食谱使用。",
          price: "$128",
          category: "ginseng",
          features: ["切片", "烹饪级", "天然"],
        },
        {
          name: "苗族银饰刺绣上衣",
          description:
            "手工制作的苗族上衣，饰有精美刺绣和传统银饰，来自贵州。",
          price: "$580",
          category: "ethnicWear",
          features: ["手工制作", "苗绣", "银饰点缀"],
        },
        {
          name: "侗族靛蓝染连衣裙",
          description:
            "传统侗族连衣裙，采用世代相传的天然靛蓝染色工艺。",
          price: "$420",
          category: "ethnicWear",
          features: ["天然染色", "侗族传承", "手工编织"],
        },
        {
          name: "贵州蜡染丝巾",
          description:
            "匠心蜡染丝巾，将贵州传统蜡染图案与现代优雅完美结合。",
          price: "$168",
          category: "ethnicWear",
          features: ["蜡染艺术", "真丝", "匠人手作"],
        },
        {
          name: "苗族银凤凰项链",
          description:
            "苗族银匠手工打造的凤凰主题项链，寓意吉祥繁荣。",
          price: "$460",
          category: "jewelry",
          features: ["手工银饰", "凤凰纹样", "苗族传承"],
        },
        {
          name: "贵州银丝花丝手镯",
          description:
            "精美的银花丝手镯，展现贵州匠人数百年的金属工艺传承。",
          price: "$280",
          category: "jewelry",
          features: ["花丝工艺", "925银", "传统技艺"],
        },
        {
          name: "苗族刺绣耳环",
          description:
            "独特的银质耳环，融合苗族银匠工艺与手工刺绣元素。",
          price: "$95",
          category: "jewelry",
          features: ["银饰织绣", "手工制作", "轻盈舒适"],
        },
      ],
    },
    about: {
      title: "关于 Evata",
      subtitle: "扎根湾区，连接世界",
      story:
        "Evata 是一家立足旧金山湾区的公司，将优质本地服务与全球美容创新相结合。凭借 Union French Cleaners 超过35年的运营经验，以及与韩国领先美容科技品牌 UNI&CORE 的合作，我们为社区带来品质与信赖。",
      values: [
        {
          title: "本地专长",
          description: "自1989年起深耕旧金山湾区社区。",
        },
        {
          title: "品质至上",
          description: "对每项服务和产品坚持不妥协的标准。",
        },
        {
          title: "创新驱动",
          description: "将前沿韩国美容科技引入湾区。",
        },
        {
          title: "值得信赖",
          description: "超过10,000位满意客户的选择。",
        },
      ],
    },
    contact: {
      title: "联系我们",
      subtitle: "期待与您沟通",
      form: {
        name: "您的姓名",
        email: "电子邮箱",
        phone: "电话号码",
        subject: "主题",
        message: "留言内容",
        submit: "发送消息",
        success: "消息已发送！我们会尽快回复您。",
        error: "发送失败，请重试。",
      },
      info: {
        title: "联系方式",
        address: "1718 Union St, San Francisco, CA 94123",
        phone: "415-923-1212",
        email: "info@unincore.us",
        hours: "周一至周五: 9AM - 6PM (太平洋时间)",
      },
    },
    footer: {
      brand: "Evata",
      tagline: "湾区优质服务与韩国美容科技",
      quickLinks: "快速链接",
      contactUs: "联系我们",
      copyright: "© 2026 Evata. 保留所有权利。",
    },
  },
  kr: {
    nav: {
      home: "홈",
      services: "서비스",
      products: "제품",
      about: "소개",
      contact: "문의",
    },
    hero: {
      badge: "샌프란시스코 베이 에어리어",
      title: "Evata",
      subtitle: "신뢰할 수 있는 프리미엄 서비스 파트너",
      description:
        "전문 의류 관리부터 최첨단 한국 뷰티 기술까지 — Evata는 베이 에어리어 최고의 라이프스타일 서비스를 제공합니다.",
      cta1: "서비스 보기",
      cta2: "문의하기",
      stat1: { value: "35+", label: "년 경험" },
      stat2: { value: "10K+", label: "만족 고객" },
      stat3: { value: "2", label: "사업 분야" },
    },
    divisions: {
      title: "사업 소개",
      subtitle: "두 가지 핵심 사업",
      cleaners: {
        tag: "1989년 설립",
        title: "Union French Cleaners",
        description:
          "35년 이상 샌프란시스코에서 서비스한 프리미엄 드라이클리닝 & 의류 관리 브랜드. 전통과 탁월함의 만남.",
        features: [
          "전문 드라이클리닝",
          "셔츠 세탁 서비스",
          "전문 수선",
          "가죽 & 스웨이드 관리",
          "웨딩드레스 보존",
          "가정용 섬유",
        ],
        cta: "웹사이트 방문",
        callUs: "전화",
        address: "1718 Union St, San Francisco, CA 94123",
        phone: "415-923-1212",
      },
      beauty: {
        tag: "공식 딜러",
        title: "UNI&CORE 뷰티",
        description:
          "베이 에어리어 UNI&CORE 한국 뷰티 기기 및 전문 스킨케어 솔루션 공식 딜러.",
        features: [
          "Derma10 전문가용 기기",
          "Derma Home 가정용 기기",
          "Hyperloop 시리즈",
          "전문 교육 지원",
          "프랜차이즈 기회",
          "A/S 지원",
        ],
        cta: "프랜차이즈 정보",
        cta2: "온라인 쇼핑",
      },
    },
    products: {
      title: "우리 제품",
      subtitle: "한국 뷰티, 웰니스, 한국 인삼 & 구이저우 민족 공예",
      shopAll: "전체 제품 보기",
      categories: {
        devices: "전문 기기",
        skincare: "스킨케어",
        wellness: "웰니스 & 건강",
        ginseng: "한국 인삼",
        ethnicWear: "구이저우 민족 의상",
        jewelry: "구이저우 민족 주얼리",
      },
      items: [
        {
          name: "New DERMA Home",
          description:
            "전문가급 홈 뷰티 기기로 살롱 수준의 스킨케어를 일상에서 경험하세요.",
          price: "$8,800",
          category: "devices",
          features: ["전문가급", "가정용", "한국 기술"],
        },
        {
          name: "Hyperloop 두피 세럼 세트",
          description:
            "첨단 세럼 기술과 Hyperloop 전달 시스템을 결합한 프리미엄 두피 관리 세트.",
          price: "$1,320",
          category: "devices",
          features: ["두피 관리", "세럼 포함", "전문 세트"],
        },
        {
          name: "Vita C 13.5 슈퍼 브라이트닝 앰플",
          description:
            "고농축 비타민C 앰플로 집중 미백 및 안티에이징 케어를 제공합니다.",
          price: "$176",
          category: "skincare",
          features: ["비타민C", "브라이트닝", "안티에이징"],
        },
        {
          name: "딥 리페어 액티베이팅 뉴트리션 크림",
          description:
            "딥 하이드레이션 기술로 피부를 수복하고 활력을 되찾아주는 영양 크림.",
          price: "$141",
          category: "skincare",
          features: ["딥 리페어", "뉴트리션", "30ml"],
        },
        {
          name: "Vita C 슈퍼 브라이트닝 마스크",
          description:
            "비타민C를 주입한 프리미엄 시트 마스크로 즉각적인 브라이트닝과 수분 공급.",
          price: "$58",
          category: "skincare",
          features: ["5매", "브라이트닝", "수분 공급"],
        },
        {
          name: "글로우 뷰티 콜라겐 젤리",
          description:
            "맛있는 콜라겐 젤리 보충제로 피부, 모발, 손톱 건강을 안에서부터 케어.",
          price: "$140",
          category: "wellness",
          features: ["콜라겐", "뷰티", "매일 섭취"],
        },
        {
          name: "슬리밍 메가 프로바이오틱스",
          description:
            "소화 건강과 체중 관리를 지원하는 첨단 프로바이오틱스 포뮬러.",
          price: "$122",
          category: "wellness",
          features: ["프로바이오틱스", "슬리밍", "장 건강"],
        },
        {
          name: "본 & 조인트 액티브 메가 포뮬러",
          description:
            "활동적인 라이프스타일을 위한 필수 영양소가 담긴 종합 관절 및 뼈 건강 포뮬러.",
          price: "$117",
          category: "wellness",
          features: ["관절 지원", "뼈 건강", "액티브 포뮬러"],
        },
        {
          name: "한국 홍삼 추출액",
          description:
            "프리미엄 6년근 한국 홍삼 추출액, 전통 공법으로 최대 효능과 활력을 담았습니다.",
          price: "$189",
          category: "ginseng",
          features: ["6년근", "프리미엄 추출", "전통 공법"],
        },
        {
          name: "한국 인삼차 선물세트",
          description:
            "고급스러운 한국 인삼차 선물세트, 매일의 건강과 마음을 담은 선물로 안성맞춤.",
          price: "$68",
          category: "ginseng",
          features: ["선물세트", "매일 건강", "30포"],
        },
        {
          name: "한국 인삼 슬라이스",
          description:
            "엄선된 한국 인삼 슬라이스, 삼계탕, 차, 전통 요리에 적합합니다.",
          price: "$128",
          category: "ginseng",
          features: ["슬라이스", "요리용", "천연"],
        },
        {
          name: "묘족 은장식 자수 재킷",
          description:
            "구이저우 묘족 전통 자수와 은장식이 어우러진 수공예 재킷.",
          price: "$580",
          category: "ethnicWear",
          features: ["수공예", "묘족 자수", "은장식"],
        },
        {
          name: "동족 쪽빛 염색 드레스",
          description:
            "대대로 전해 내려온 천연 쪽빛 염색 기법으로 만든 전통 동족 드레스.",
          price: "$420",
          category: "ethnicWear",
          features: ["천연 염색", "동족 유산", "수직"],
        },
        {
          name: "구이저우 바틱 실크 스카프",
          description:
            "전통 구이저우 왁스 방염 패턴과 현대적 우아함을 결합한 장인 바틱 실크 스카프.",
          price: "$168",
          category: "ethnicWear",
          features: ["바틱 아트", "순수 실크", "장인 제작"],
        },
        {
          name: "묘족 은 봉황 목걸이",
          description:
            "묘족 은세공사가 수작업으로 만든 봉황 모티프 스테이트먼트 목걸이, 번영을 상징합니다.",
          price: "$460",
          category: "jewelry",
          features: ["수공예 은", "봉황 모티프", "묘족 유산"],
        },
        {
          name: "구이저우 은 세공 팔찌",
          description:
            "구이저우 장인의 수백 년 금속 공예를 보여주는 섬세한 은 세공 팔찌.",
          price: "$280",
          category: "jewelry",
          features: ["세공 기법", "925 실버", "전통 공예"],
        },
        {
          name: "묘족 자수 귀걸이",
          description:
            "묘족 은 공예와 수작업 자수를 결합한 유니크한 귀걸이.",
          price: "$95",
          category: "jewelry",
          features: ["은 & 직물", "수작업", "가벼움"],
        },
      ],
    },
    about: {
      title: "Evata 소개",
      subtitle: "베이 에어리어에 뿌리, 세계와 연결",
      story:
        "Evata는 샌프란시스코 베이 에어리어에 기반을 둔 회사로, 프리미엄 로컬 서비스와 글로벌 뷰티 혁신을 연결합니다. Union French Cleaners의 35년 이상의 경험과 한국 뷰티 기술 선도 브랜드 UNI&CORE와의 파트너십을 통해 지역 사회에 품질과 신뢰를 제공합니다.",
      values: [
        {
          title: "로컬 전문성",
          description: "1989년부터 샌프란시스코 베이 에어리어에 깊이 뿌리내림.",
        },
        {
          title: "품질 우선",
          description: "모든 서비스와 제품에 타협 없는 기준 적용.",
        },
        {
          title: "혁신",
          description: "최첨단 한국 뷰티 기술을 베이 에어리어에 도입.",
        },
        {
          title: "신뢰",
          description: "10,000명 이상의 만족한 고객이 선택한 파트너.",
        },
      ],
    },
    contact: {
      title: "문의하기",
      subtitle: "연락을 기다리고 있습니다",
      form: {
        name: "이름",
        email: "이메일",
        phone: "전화번호",
        subject: "제목",
        message: "메시지",
        submit: "메시지 보내기",
        success: "메시지가 전송되었습니다! 곧 답변드리겠습니다.",
        error: "전송에 실패했습니다. 다시 시도해 주세요.",
      },
      info: {
        title: "연락처",
        address: "1718 Union St, San Francisco, CA 94123",
        phone: "415-923-1212",
        email: "info@unincore.us",
        hours: "월-금: 오전 9시 - 오후 6시 (태평양 시간)",
      },
    },
    footer: {
      brand: "Evata",
      tagline: "베이 에어리어 프리미엄 서비스 & 한국 뷰티 기술",
      quickLinks: "빠른 링크",
      contactUs: "문의하기",
      copyright: "© 2026 Evata. All rights reserved.",
    },
  },
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}
