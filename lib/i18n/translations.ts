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
        "Innovatives Immobilienmarketing – We make your property come alive",
      basedinAustria: "Based in Austria",
      cta: "Explore Appartments",
      ctaTwo: "Our Services",
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
      cta2: "Our Services",
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
      dreamTitle: "Your Dream Properties Await You",
      dreamDesc:
        "Discover our exclusive selection of houses, apartments, and investment opportunities.",
      dreamCta: "Explore Properties",
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
      contactDescription:
        "Have questions or need assistance? We're here to help with any inquiries about buying or selling your property. Contact us through the form or directly via our contact details.",
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
    footer: {
      copyright: "© 2026 DB ImmoDesign e.U. All rights reserved.",
    },
    propertyModal: {
      contact: "Send Inquiry",
      area: "Floor Area",
      landArea: "Land Area",
      bedrooms: "Bedrooms",
      objectDescription: "Property Description",
      interested: "Interested?",
      propertyConsultant: "Property Consultant",
      inquiry: "Send Inquiry",
      agentMessage: "Hello, I am interested in the property",
      agentMessage2: "Could you please contact me with further details?",
      yourAgent: "Your Agent",
      facilities: "Facilities",
      pool: "Pool",
      yes: "Yes",
      no: "No",
      furtherFacilities: "Further Facilities:",
      noDescription: "No description available",
      swipeToNavigate: "Swipe to navigate",
    },
    aboutPage: {
      title: "About Us",
      heroQuote:
        "Innovation emerges when you think differently and have the courage to act on it.",
      heroQuoteAuthor:
        "Brehm, Alexander & Vahs, Dietmar, Innovationsmanagement, 2015",
      personName: "Daniel BETROS",
      personTitle: "Owner",
      personBio:
        "Welcome to ImmoDesign e.U.! My name is Daniel Betros and I have been marketing properties on behalf of my clients for over 10 years. From the beginning and to this day, I have been very interested in new ways and ideas to present properties more effectively and market them more successfully. Over the years, I have optimized the use of home staging, drone photography, 3D visualizations, virtual staging and many other methods to meet real estate sales requirements. Today, I am delighted to pass on these skills to my customers.\n\nEvery property and every sales situation is unique – that's why listening is the most important of all skills; In a personal conversation, we find the right concept for your property and your needs together.",
      contactTitle: "Contact Us",
      contactDesc:
        "Do you want to present your property optimally? We are here for you!",
      contactPhone: "+43 676 41 83 78-2",
      contactLocation: "Graz, Austria",
    },
    servicesPage: {
      title: "Our Services",
      subtitle: "Comprehensive real estate solutions tailored to your needs",
      photography: "Professional Photography",
      photographyDesc:
        "High-quality photos highlight your property in the best light. With optimal perspective, lighting and attention to detail, we showcase every object from its strongest side and increase the interest of potential buyers.",
      drones: "Drone Photography",
      dronesDesc:
        "With professional drone photography, we present your property and entire plot from impressive perspectives. Aerial shots show the surroundings, neighborhood and special features of your property at a glance. We offer this service free of charge as part of our marketing.",
      staging: "Home Staging",
      stagingDesc:
        "We skillfully stage your property. Through targeted use of furniture, lighting and decoration, we create an atmosphere of well-being that highlights the strengths of your rooms. Statistics show that home staging reduces time to sale by up to 73% and results in a significantly higher price in 85% of sales.",
      marketAnalysis: "Market Valuation Analysis",
      marketAnalysisDesc:
        "Finding the right sales price is one of the most important decisions around selling. We not only rely on purchase agreement information from recent sales - we also rely on our experience and conversations with the owner to determine the perfect price.",
      virtualStaging: "Virtual Staging",
      virtualStagingDesc:
        "With state-of-the-art software, we stage your property digitally at the highest level. Especially suitable for properties where traditional home staging is not possible.",
      visualization3D: "3D Visualization",
      visualization3DDesc:
        "With our 3D visualizations, interested parties experience your property virtually in real life. Spaces become tangible, furnishing ideas become visible and buyers can already digitally imagine their future home – a strong advantage.",
      quote:
        "Marketing is too important to leave to the marketing department alone.",
      quoteAuthor: "David Packard",
    },
  },
  de: {
    nav: {
      home: "Home",
      properties: "Immobilien",
      services: "Leistungen",
      about: "Über uns",
      partnership: "Partnerschaften",
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
      basedinAustria: "Based in Austria",
      cta: "Immobilien entdecken",
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
      dreamTitle: "Traumimmobilien warten auf Sie",
      dreamDesc:
        "Entdecken Sie unsere exklusive Auswahl an Häusern, Wohnungen und Investitionsmöglichkeiten.",
      dreamCta: "Immobilien entdecken",
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
      contactInfo: "Kontakt",
      contactDescription:
        "Wir ünterstützen Sie gerne bei allen Fragen rund um den Kauf  oder Verkauf Ihrer Immobilie.",
      address: "Adresse",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon",
    },
    aboutPage: {
      title: "Über uns",
      heroQuote:
        "Innovation entsteht, wenn man anders denkt und den Mut hat, es umzusetzen.",
      heroQuoteAuthor:
        "Brehm, Alexander & Vahs, Dietmar, Innovationsmanagement, 2015",

      personName: "Daniel BETROS",
      personTitle: "Inhaber",
      personBio:
        "Herzlich willkommen bei ImmoDesign e.U.! Mein Name ist Daniel Betros und ich vermittle seit mehr als 10 Jahren Immobilien im Auftrag meiner Kunden.\n\nVon Anfang an und bis heute bin ich stets sehr interessiert an neuen Wegen und Ideen, um Immobilien noch wirkungsvoller zu präsentieren und erfolgreicher zu vermarkten gewesen. Im Laufe der Jahre habe ich den Einsatz von Home Staging, Drohnenaufnahmen, 3D-Visualisierungen, virtuellem Staging und vielen weiteren Methoden auf die Anforderungen des Immobilienvertriebs optimiert. Heute freue ich mich, diese Fähigkeiten an meine Kundinnen und Kunden weiterzugeben.\n\nJede Immobilie und jede Verkaufssituation ist einzigartig – deshalb ist Zuhören die wichtigste aller Fähigkeiten. In einem persönlichen Gespräch finden wir gemeinsam das richtige Konzept für Ihre Immobilie und Ihre Bedürfnisse.",

      contactTitle: "Kontaktieren Sie uns",
      contactDesc:
        "Möchten Sie Ihre Immobilie optimal präsentieren? Wir sind für Sie da!",
      contactPhone: "+43 676 41 83 78-2",
      contactLocation: "Graz, Österreich",
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
    footer: {
      copyright: "© 2026 DB ImmoDesign e.U. Alle Rechte vorbehalten.",
    },
    propertyModal: {
      contact: "Anfrage senden",
      area: "Wohnfläche",
      landArea: "Grundstücksfläche",
      bedrooms: "Zimmer",
      objectDescription: "Objektbeschreibung",
      interested: "Interesse?",
      propertyConsultant: "Immobilienberater",
      inquiry: "Anfrage senden",
      agentMessage: "Hallo! Ich interessiere mich für diese Immobilie",
      agentMessage2: "Bitte schicken Sie mir weitere Details zu.",
      yourAgent: "Ihr Makler",
      facilities: "Ausstattung",
      pool: "Pool",
      yes: "Ja",
      no: "Nein",
      furtherFacilities: "Weitere Ausstattung:",
      noDescription: "Keine Beschreibung verfügbar",
      swipeToNavigate: "Wischen zum Navigieren",
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
