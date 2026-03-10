// This file now uses JSON files for translations instead of hardcoded strings
// JSON files are located in: public/locales/en.json, public/locales/ar.json, public/locales/de.json

import { pre } from "framer-motion/m";

const translationCache: Record<string, Record<string, any>> = {};

export async function loadTranslations(
  lang: string,
): Promise<Record<string, any>> {
  if (translationCache[lang]) {
    return translationCache[lang];
  }

  try {
    const response = await fetch(`/locales/${lang}.json`);
    const data = await response.json();
    translationCache[lang] = data;
    return data;
  } catch (error) {
    console.error(`Failed to load translations for language: ${lang}`, error);
    return {};
  }
}

export const translations = {
  en: {
    nav: {
      home: "Home",
      properties: "Properties",
      services: "Services",
      about: "About",
      partnership: "Partnership",
      contact: "Contact",
      admin: "Admin",
      imprint: "Imprint",
      dataProtection: "Privacy Policy",
    },
    home: {
      title: "Based in Austria",
      greeting: "DB ImmoDesign",
      subtitle:
        "Innovatives Immobilienmarketing – Wir machen Ihre Immobilie erlebbar",
      titleServices: [
        "Home Staging",
        "Professional Photography",
        "Drone Photography",
        "and much more for optimal marketing",
      ],
      cta: "Explore Investments",
      ctaTwo: "Mehr erfahren",
      featured: "Why DB ImmoDesign?",
      featuredDesc:
        "Your trusted partner for premium investment properties in Hurghada and the red sea region",
      feature1Title: "Consultation & Support",
      feature1Desc:
        "German-speaking consultation in Austria and personal bilingual support in Hurghada – from initial consultation to key handover",
      feature2Title: "Selected Investment Properties",
      feature2Desc:
        "Carefully vetted investment properties focused on rental income, strong returns, and long-term value appreciation",
      feature3Title: "Experience & Market Expertise",
      feature3Desc:
        "Over 10 years of experience in the Austrian real estate market and deep knowledge of investment opportunities in Hurghada",
      ctaTitle: "Start Your Property Journey Today",
      ctaDesc: "Discover hundreds of premium properties available now",
      cta2: "Get in Touch",
      reviewsTitle: "Was unsere Kunden sagen",
      reviewsDesc:
        "Hear from satisfied customers who found their perfect properties with us",
      reviews: [
        {
          text: "DB ImmoDesign made my property search incredibly smooth. Their expertise and dedication are unmatched!",
          name: "Ahmed Al-Mansouri",
          title: "Property Owner",
          image: "/dani.jpg",

          rating: 4,
        },
        {
          text: "I couldn't have asked for better service. They understood exactly what I was looking for.",
          name: "Sarah Johnson",
          title: "Investor",
          image: "/dani.jpg",

          rating: 4,
        },
        {
          text: "Professional, trustworthy, and results-driven. Highly recommended for anyone in the real estate market.",
          name: "Mohammad Hassan",
          title: "Business Owner",
          image: "/dani.jpg",

          rating: 4,
        },
        {
          text: "The entire team was supportive and transparent throughout the process. Five stars!",
          name: "Emma Wilson",
          title: "First-time Buyer",
        },
      ],
    },
    properties: {
      title: "Our Properties",
      searchPlaceholder: "Search properties...",
      filterBy: "Filter By",
      bedrooms: "Bedrooms",
      priceRange: "Price Range",
      area: "Area (sqm)",
      sqm: "sqm",
      price: "Price",
      location: "Location",
      description: "Description",
      bedrooms_count: "Bedrooms",

      viewDetails: "View Details",
      calculator: "Payment Calculator",
      totalPrice: "Total Price",
      downPayment: "Down Payment",
      remainingAmount: "Remaining Amount",
      monthlyPayment: "Monthly Payment (12 months)",
      updateCalculation: "Update Calculation",
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive real estate solutions tailored to your needs",
      buying: "Property Buying",
      buyingDesc: "Expert guidance through every step of the buying process",
      selling: "Property Selling",
      sellingDesc: "Maximize your property value with our proven strategies",
      renting: "Property Rental",
      rentingDesc: "Find the perfect rental property for your lifestyle",
      consulting: "Real Estate Consulting",
      consultingDesc: "Strategic advice for investment and development",
    },
    about: {
      title: "About us",
      subtitle: "Your Bridge Between Austria and the Red Sea",
      mission:
        "Our bilingual team combines years of professional experience in the Austrian real estate sector with an in-depth understanding of the dynamic and rapidly growing property market in Hurghada.",
      missionDesc:
        "The vision to specialize in investment properties for the German-speaking market was no coincidence. It evolved from a meaningful connection with a German family we met several years ago. Recognizing their challenges and their desire for reliable, German-speaking support on-site sparked a clear mission:",
      vision: "",
      visionDesc:
        "To provide a professional, transparent, and secure advisory approach for hand-picked investment opportunities along the Red Sea Riviera. As a registered Austrian company we bring European standards to your international investment.",
      values: "Our Values",
      integrity: "Integrity",
      integrityDesc: "Transparent and honest dealings in all transactions",
      expertise: "Expertise",
      expertiseDesc: "Deep market knowledge and professional excellence",
      service: "Customer Service",
      serviceDesc: "Dedicated support throughout your property journey",
      innovation: "Innovation",
      innovationDesc: "Leveraging technology for seamless experiences",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Your trusted partner for investment properties on the Red Sea",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
      contactInfo: "Contact Information",
      address: "Address",
      emailLabel: "Email",
      phoneLabel: "Phone",
      hoursLabel: "Business Hours",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    },
    filter: {
      title: "Filters",
      price: "Price",
      area: "Area",
      bedrooms: "Bedrooms",

      upTo: "Up to",
      sqm: "m²",
      plus: "+",
      openFilters: "Filters",
      reset: "Reset",
      rooms: "Rooms",
    },
    admin: {
      title: "Admin Dashboard",
      properties: "Properties Management",
      addProperty: "Add New Property",
      editProperty: "Edit Property",
      deleteProperty: "Delete Property",
      save: "Save",
      cancel: "Cancel",
      next: "Next",
      previous: "Previous",
      delete: "Delete",
      confirm: "Are you sure?",
      image: "Image",
      uploadImages: "Upload Images",
      dragDrop: "Drag and drop images here or click to browse",
      titleField: "Property Title",
      locationField: "Location",
      priceField: "Price",
      areaField: "Area (sqm)",
      bedroomsField: "Bedrooms",

      descriptionField: "Description",
      amenities: "Amenities",
      status: "Status",
      available: "Available",
      sold: "Sold",
      rented: "Rented",
      translations: "Translations",
      selectLanguage: "Select Language",
      loading: "Loading...",
      noProperties: "No properties found",
      success: "Operation completed successfully",
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      back: "Back",
      next: "Next",
      prev: "Previous",
      close: "Close",
      search: "Quick Links",
      filter: "Filter",
      clear: "Clear",
      noResults: "No results found",
      theme: "Theme",
      language: "Language",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
    },
    notFound: {
      title: "Page Not Found",
      description:
        "Sorry, the page you're looking for doesn't exist or has been moved.",
      backHome: "Back to Home",
      browseProperties: "Browse Properties",
    },
  },
  de: {
    nav: {
      home: "Home",
      properties: "Immobilien",
      services: "Leistungen",
      about: "Über uns",
      partnership: "Partnerschaft",
      contact: "Kontakt",
      admin: "Verwaltung",
      imprint: "Impressum",
      dataProtection: "Datenschutz",
    },
    home: {
      title: "Based in Austria.",
      greeting: "DB ImmoDesign",
      subtitle:
        "Innovatives Immobilienmarketing – Wir machen Ihre Immobilie erlebbar",
      titleServices: [
        "Home Staging",
        "professioneller Fotografie",
        "Drohnenaufnahmen",
        "und vielem mehr zur optimalen Vermarktung",
      ],
      cta: "Investments entdecken",
      cta2: "Mehr erfahren",
      featured: "Warum DB ImmoDesign?",
      featuredDesc:
        "Wir machen Ihre Immobilie erlebbar– mit Home Staging, professioneller Fotografie, Drohnenaufnahmen und vielem mehr zur optimalen Vermarktung.",
      feature1Title: "Beratung & Begleitung",
      feature1Desc:
        "Deutschsprachige Beratung in Österreich sowie persönliche, zweisprachige Begleitung in Hurghada – von der Erstberatung bis zur Schlüsselübergabe",
      feature2Title: "Ausgewählte Investment-Immobilien",
      feature2Desc:
        "Sorgfältig geprüfte Anlageimmobilien mit Fokus auf Vermietung, Renditepotenzial und langfristige Wertsteigerung",
      feature3Title: "Erfahrung & Marktkenntnis",
      feature3Desc:
        "Über 10 Jahre Erfahrung im österreichischen Immobilienmarkt und fundierte Kenntnisse der Investitionsmöglichkeiten in Hurghada",

      ctaTitle: "Beginnen Sie Ihre Immobilienreise heute",
      ctaTwo: "Erfahren Sie mehr",
      ctaDesc: "Entdecken Sie Hunderte von Premium-Immobilien",
      reviewsTitle: "Das sagen unsere Kunden",
      reviewsDesc:
        "Hören Sie von zufriedenen Kunden, die ihre perfekten Immobilien mit uns gefunden haben",
      reviews: [
        {
          text: "DB ImmoDesign hat meine Immobiliensuche unglaublich reibungslos gestaltet. Ihre Fachkenntnis und Hingabe sind unvergleichlich!",
          name: "Ahmed Al-Mansouri",
          title: "Immobilieneigentümer",
          image: "/dani.jpg",
          rating: 4,
        },
        {
          text: "Ich hätte mir keinen besseren Service wünschen können. Sie verstanden genau, was ich suchte.",
          name: "Sarah Johnson",
          title: "Investorin",
          image: "/dani.jpg",

          rating: 4,
        },
        {
          text: "Professionell, vertrauenswürdig und ergebnisorientiert. Sehr zu empfehlen für jeden auf dem Immobilienmarkt.",
          name: "Mohammad Hassan",
          title: "Geschäftsinhaber",
          image: "/dani.jpg",
          rating: 4,
        },
        {
          text: "Das gesamte Team war während des gesamten Prozesses unterstützend und transparent. Fünf Sterne!",
          name: "Emma Wilson",
          title: "Erstkäufer",
          image: "/dani.jpg",

          rating: 4,
        },
      ],
    },
    properties: {
      title: "Immobilien mit Potenzial",
      searchPlaceholder: "Immobilien durchsuchen...",
      filterBy: "Filtern nach",
      bedrooms: "Schlafzimmer",
      priceRange: "Preisbereich",
      area: "Fläche (qm)",
      sqm: "qm",
      price: "Preis",
      location: "Standort",
      description: "Beschreibung",
      bedrooms_count: "Schlafzimmer",

      viewDetails: "Details anzeigen",
      calculator: "Zahlungsrechner",
      totalPrice: "Kaufpreis",
      downPayment: "Anzahlung",
      remainingAmount: "Restbetrag",
      monthlyPayment: "12 Monatsraten zu je",
      updateCalculation: "Berechnung aktualisieren",
    },
    services: {
      title: "Unsere Leistungen",
      subtitle:
        "Umfassende Immobilienlösungen, die Ihren Bedürfnissen entsprechen",
      buying: "Immobilienkauf",
      buyingDesc: "Fachkundige Beratung bei jedem Schritt des Kaufprozesses",
      selling: "Immobilienverkauf",
      sellingDesc:
        "Maximieren Sie den Wert Ihrer Immobilie mit unseren bewährten Strategien",
      renting: "Immobilienvermietung",
      rentingDesc: "Finden Sie die perfekte Mietwohnung für Ihren Lebensstil",
      consulting: "Immobilienberatung",
      consultingDesc: "Strategische Beratung für Investitionen und Entwicklung",
    },
    about: {
      title: "Über uns",
      subtitle:
        "Unser zweisprachiges Team vereint mehrjährige Erfahrung im österreichischen Immobiliensektor mit fundierter Marktkenntnis im dynamisch wachsenden Immobilienmarkt Hurghadas.",
      mission: "Wie es alles begann",
      missionDesc:
        "Die Idee, Anlegerwohnungen in Hurghada gezielt für den deutschsprachigen Markt zu vermitteln, entstand nicht zufällig. Sie entwickelte sich aus der Begegnung mit einer deutschen Familie, die wir vor einigen Jahren kennenlernen durften.",
      vision: "Unser Konzept",
      visionDesc:
        "Aus ihren Erfahrungen, Fragen und dem Wunsch nach einer verlässlichen, deutschsprachigen Betreuung vor Ort wurde ein klares Konzept: ein professioneller, transparenter Vertriebs- und Beratungsansatz für ausgewählte Investmentimmobilien am Roten Meer.",
      values: "Unsere Werte",
      integrity: "Integrität",
      integrityDesc:
        "Transparente und ehrliche Geschäfte bei allen Transaktionen",
      expertise: "Fachkompetenz",
      expertiseDesc: "Tiefes Marktwissen und professionelle Exzellenz",
      service: "Kundenservice",
      serviceDesc: "Engagierte Unterstützung während Ihrer Immobilienreise",
      innovation: "Innovation",
      innovationDesc: "Nutzung von Technologie für nahtlose Erfahrungen",
    },
    contact: {
      title: "Kontakt",
      subtitle:
        "Ihr verlässlicher Partner für Investment Immobilien am roten Meer",
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer",
      subject: "Betreff",
      message: "Nachricht",
      send: "Nachricht senden",
      sending: "Wird gesendet...",
      success: "Nachricht erfolgreich versendet!",
      error:
        "Fehler beim Versenden der Nachricht. Bitte versuchen Sie es erneut.",
      contactInfo: "Kontaktinformationen",
      address: "Adresse",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon",
    },
    filter: {
      title: "Filter",
      price: "Preis",
      area: "Fläche",
      bedrooms: "Schlafzimmer",

      upTo: "Bis zu",
      sqm: "m²",
      plus: "+",
      openFilters: "Filter",
      reset: "Zurücksetzen",
      rooms: "Zimmer",
    },
    admin: {
      title: "Admin-Dashboard",
      properties: "Immobilienverwaltung",
      addProperty: "Neue Immobilie hinzufügen",
      editProperty: "Immobilie bearbeiten",
      deleteProperty: "Immobilie löschen",
      next: "Weiter",
      previous: "Zurück",
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      confirm: "Sind Sie sicher?",
      image: "Bild",
      uploadImages: "Bilder hochladen",
      dragDrop: "Ziehen Sie Bilder hier hin oder klicken Sie zum Durchsuchen",
      titleField: "Immobilientitel",
      locationField: "Standort",
      priceField: "Preis",
      areaField: "Fläche (qm)",
      bedroomsField: "Schlafzimmer",

      descriptionField: "Beschreibung",
      amenities: "Ausstattungen",
      status: "Status",
      available: "Verfügbar",
      sold: "Verkauft",
      rented: "Vermietet",
      translations: "Übersetzungen",
      selectLanguage: "Sprache auswählen",
      loading: "Lädt...",
      noProperties: "Keine Immobilien gefunden",
      success: "Operation erfolgreich abgeschlossen",
    },
    common: {
      loading: "Lädt...",
      error: "Ein Fehler ist aufgetreten",
      back: "Zurück",
      next: "Weiter",
      prev: "Zurück",
      close: "Schließen",
      search: "Schnellzugriffe",
      filter: "Filtern",
      clear: "Löschen",
      noResults: "Keine Ergebnisse gefunden",
      theme: "Design",
      language: "Sprache",
      lightMode: "Heller Modus",
      darkMode: "Dunkler Modus",
    },
    notFound: {
      title: "Seite nicht gefunden",
      description:
        "Entschuldigung, die gesuchte Seite existiert nicht oder wurde verschoben.",
      backHome: "Zurück zur Startseite",
      browseProperties: "Immobilien durchsuchen",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      properties: "العقارات",
      services: "الخدمات",
      about: "حول،",
      partnership: "الشراكة",
      contact: "اتصل بنا",
      admin: "الإدارة",
      imprint: "الطباعة",
      dataProtection: "سياسة الخصوصية",
    },
    home: {
      title: "مقره في النمسا",
      greeting: "تصميم iDesign العقاري",
      subtitle: "تسويق عقاري مبتكر - نحن نجعل ممتلكك حقيقياً",
      titleServices: [
        "تأثيث المنزل",
        "التصوير الفوتوغرافي الاحترافي",
        "تصوير بالطائرات بدون طيار",
        "والمزيد للتسويق الأمثل",
      ],
      cta: "Explore Investments",
      featured: "لماذا تصميم iDesign العقاري؟",
      featuredDesc:
        "شريكك الموثوق به للعقارات الاستثمارية الممتازة في الغردقة ومنطقة البحر الأحمر",
      feature1Title: "الاستشارة والدعم",
      feature1Desc:
        "استشارة باللغة الألمانية في النمسا ودعم ثنائي اللغة شخصي في الغردقة - من الاستشارة الأولية إلى تسليم المفاتيح",
      feature2Title: "العقارات الاستثمارية المختارة",
      feature2Desc:
        "عقارات استثمارية مختارة بعناية مع التركيز على دخل الإيجار والعوائد القوية وتقدير القيمة على المدى الطويل",
      feature3Title: "الخبرة وخبرة السوق",
      feature3Desc:
        "أكثر من 10 سنوات من الخبرة في سوق العقارات النمساوي ومعرفة عميقة بفرص الاستثمار في الغردقة",
      ctaTitle: "ابدأ رحلة الممتلكات الخاصة بك اليوم",
      ctaDesc: "اكتشف مئات العقارات الممتازة المتاحة الآن",
      reviewsTitle: "ما يقوله عملاؤنا",
      reviewsDesc:
        "استمع إلى العملاء الراضين الذين وجدوا ممتلكاتهم المثالية معنا",
      reviews: [
        {
          text: "جعل تصميم iDesign العقاري بحثي عن العقارات سلساً بشكل لا يصدق. خبرتهم وتفانيهم لا مثيل لهما!",
          name: "أحمد المنصوري",
          title: "مالك العقار",
          image: "/dani.jpg",
          rating: 4,
        },
        {
          text: "لم أستطع أن أطلب خدمة أفضل. فهموا بالضبط ما كنت أبحث عنه.",
          name: "سارة جونسون",
          title: "مستثمر",
          image: "/dani.jpg",
          rating: 4,
        },
        {
          text: "احترافي وموثوق وموجه للنتائج. موصى به بشدة لأي شخص في سوق العقارات.",
          name: "محمد حسن",
          title: "صاحب عمل",
          image: "/dani.jpg",
          rating: 4,
        },
        {
          text: "كان الفريق بأكمله داعماً وشفافاً طوال العملية. خمسة نجوم!",
          name: "إيما ويلسون",
          title: "مشتري لأول مرة",
          image: "/dani.jpg",
          rating: 4,
        },
      ],
    },
    properties: {
      title: "عقاراتنا",
      searchPlaceholder: "البحث عن العقارات...",
      filterBy: "تصفية حسب",
      bedrooms: "غرف النوم",
      priceRange: "نطاق السعر",
      area: "المنطقة (متر مربع)",
      sqm: "متر مربع",
      price: "السعر",
      location: "الموقع",
      description: "الوصف",
      bedrooms_count: "غرف النوم",
      viewDetails: "عرض التفاصيل",
      calculator: "حاسبة الدفع",
      totalPrice: "السعر الإجمالي",
      downPayment: "الدفع الأول",
      remainingAmount: "المبلغ المتبقي",
      monthlyPayment: "الدفع الشهري (12 شهراً)",
      updateCalculation: "تحديث الحساب",
    },
    services: {
      title: "خدماتنا",
      subtitle: "حلول العقارات الشاملة المخصصة لاحتياجاتك",
      buying: "شراء العقار",
      buyingDesc: "إرشادات الخبراء في كل خطوة من عملية الشراء",
      selling: "بيع العقار",
      sellingDesc: "زيادة قيمة العقار الخاص بك باستخدام استراتيجياتنا المثبتة",
      renting: "تأجير العقار",
      rentingDesc: "ابحث عن عقار الإيجار المثالي لنمط حياتك",
      consulting: "استشارات العقارات",
      consultingDesc: "نصائح استراتيجية للاستثمار والتطوير",
    },
    about: {
      title: "معلومات عنا",
      subtitle: "جسرك بين النمسا والبحر الأحمر",
      mission:
        "يجمع فريقنا ثنائي اللغة بين سنوات من الخبرة المهنية في قطاع العقارات النمساوي وفهم متعمق لسوق العقارات الديناميكي والمتنامي بسرعة في الغردقة.",
      missionDesc:
        "لم تكن الرغبة في التخصص في العقارات الاستثمارية للسوق الناطق بالألمانية مصادفة. تطورت من اتصال ذي مغزى مع عائلة ألمانية التقيناها منذ سنوات قليلة.",
      vision: "",
      visionDesc:
        "لتقديم نهج استشاري احترافي وشفاف وآمن لفرص الاستثمار المختارة بعناية على طول ريفييرا البحر الأحمر. كشركة نمساوية مسجلة، نحن نجلب معايير أوروبية إلى استثمارك الدولي.",
      values: "قيمنا",
      integrity: "النزاهة",
      integrityDesc: "التعاملات الشفافة والأمينة في جميع المعاملات",
      expertise: "الخبرة",
      expertiseDesc: "معرفة السوق العميقة والتميز المهني",
      service: "خدمة العملاء",
      serviceDesc: "دعم مخصص طوال رحلة الممتلكات الخاصة بك",
      innovation: "الابتكار",
      innovationDesc: "الاستفادة من التكنولوجيا للحصول على تجارب سلسة",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "شريكك الموثوق به للعقارات الاستثمارية على البحر الأحمر",
      name: "الاسم الكامل",
      email: "عنوان البريد الإلكتروني",
      phone: "رقم الهاتف",
      subject: "الموضوع",
      message: "الرسالة",
      send: "إرسال رسالة",
      sending: "جاري الإرسال...",
      success: "تم إرسال الرسالة بنجاح!",
      error: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      contactInfo: "معلومات الاتصال",
      address: "العنوان",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      hoursLabel: "ساعات العمل",
      hours: "الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً",
    },
    filter: {
      title: "المرشحات",
      price: "السعر",
      area: "المنطقة",
      bedrooms: "غرف النوم",
      upTo: "حتى",
      sqm: "م²",
      plus: "+",
      openFilters: "المرشحات",
      reset: "إعادة تعيين",
      rooms: "الغرف",
    },
    admin: {
      title: "لوحة تحكم المسؤول",
      properties: "إدارة العقارات",
      addProperty: "إضافة عقار جديد",
      editProperty: "تحرير العقار",
      deleteProperty: "حذف العقار",
      save: "حفظ",
      cancel: "إلغاء",
      next: "التالي",
      previous: "السابق",
      delete: "حذف",
      confirm: "هل أنت متأكد؟",
      image: "الصورة",
      uploadImages: "تحميل الصور",
      dragDrop: "اسحب الصور هنا أو انقر للاستعراض",
      titleField: "عنوان العقار",
      locationField: "الموقع",
      priceField: "السعر",
      areaField: "المنطقة (متر مربع)",
      bedroomsField: "غرف النوم",
      descriptionField: "الوصف",
      amenities: "المرافق",
      status: "الحالة",
      available: "متاح",
      sold: "مباع",
      rented: "مؤجر",
      translations: "الترجمات",
      selectLanguage: "اختر اللغة",
      loading: "جاري التحميل...",
      noProperties: "لم يتم العثور على عقارات",
      success: "اكتملت العملية بنجاح",
    },
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      back: "رجوع",
      next: "التالي",
      prev: "السابق",
      close: "إغلاق",
      search: "روابط سريعة",
      filter: "تصفية",
      clear: "مسح",
      noResults: "لم يتم العثور على نتائج",
      theme: "المظهر",
      language: "اللغة",
      lightMode: "الوضع الفاتح",
      darkMode: "الوضع الداكن",
    },
    notFound: {
      title: "الصفحة غير موجودة",
      description: "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      backHome: "العودة إلى الرئيسية",
      browseProperties: "استعرض العقارات",
    },
  },
};

export type TranslationKey =
  | keyof (typeof translations)["en"]["nav"]
  | keyof (typeof translations)["en"]["home"]
  | keyof (typeof translations)["en"]["properties"]
  | keyof (typeof translations)["en"]["services"]
  | keyof (typeof translations)["en"]["about"]
  | keyof (typeof translations)["en"]["contact"]
  | keyof (typeof translations)["en"]["admin"]
  | keyof (typeof translations)["en"]["common"]
  | keyof (typeof translations)["en"]["notFound"];

export function getTranslation(
  lang: keyof typeof translations,
  section: string,
  key: string,
): string {
  const sec =
    translations[lang][
      section as keyof (typeof translations)[keyof typeof translations]
    ];
  if (sec && typeof sec === "object") {
    return (sec as any)[key] || key;
  }
  return key;
}
