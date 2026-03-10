"use client";

import { useLanguageStore } from "@/lib/store";
import { motion, easeOut, type Variants } from "framer-motion";

/* ---------------------------------------------
   1) Localized content
---------------------------------------------- */

type Section = {
    title: string;
    content: string[];
};

type ImprintLocale = {
    title: string;
    sections: Section[];
};

const imprintContent: Record<"de" | "en", ImprintLocale> = {
    de: {
        title: "Impressum",
        sections: [
            {
                title: "Betreiber der Website",
                content: [
                    "DB ImmoDesign e.U.",
                    "Inhaber: Daniel Betros",
                    "Laaweg 30, 8401 Kalsdorf bei Graz, Österreich",
                    "Firmenbuchnummer: FN 633491 f",
                    "Firmenbuchgericht: Landesgericht Graz",
                    "Telefon: +43 676 418 3782",
                    "E-Mail: office@immo-design.at",
                ],
            },
            {
                title: "Berufsbezeichnung & Aufsichtsbehörde",
                content: [
                    "Berufsbezeichnung: Immobilienmakler (verliehen in Österreich)",
                    "Zuständige Aufsichtsbehörde: Bezirkshauptmannschaft Graz-Umgebung",
                    "Anwendbare Berufsregelungen: Gewerbeordnung (GewO)",
                    "Abrufbar unter: www.ris.bka.gv.at",
                ],
            },
            {
                title: "Haftung für Inhalte",
                content: [
                    "Die Inhalte unserer Website werden mit großer Sorgfalt erstellt und regelmäßig aktualisiert. Trotzdem können wir nicht für die Vollständigkeit, Richtigkeit und Aktualität aller Inhalte garantieren.",
                    "DB ImmoDesign e.U. übernimmt keine Haftung für Schäden, die durch die Nutzung oder Nichtnutzung der bereitgestellten Informationen entstehen, soweit diese nicht auf grober Fahrlässigkeit oder Vorsatz beruhen.",
                ],
            },
            {
                title: "Haftung für Links",
                content: [
                    "Diese Website enthält Links zu externen Websites Dritter. Wir haben keinen Einfluss auf den Inhalt dieser externen Webseiten und können daher keine Verantwortung für diese Inhalte übernehmen.",
                    "Für die Inhalte verlinkter Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Wir distanzieren uns ausdrücklich von allen Inhalten, die gegen Gesetze verstoßen oder sonst unangemessen sind.",
                    "Sollten Sie fehlerhafte oder illegale Links entdecken, bitten wir Sie, uns dies mitzuteilen.",
                ],
            },
            {
                title: "Urheberrecht",
                content: [
                    "Alle Inhalte dieser Website (Texte, Bilder, Videos, Grafiken, Logos, etc.) sind urheberrechtlich geschützt.",
                    "Die Verwendung, Vervielfältigung oder Verbreitung dieser Inhalte ohne schriftliche Genehmigung von DB ImmoDesign e.U. ist nicht gestattet.",
                    "Zuwiderhandlungen werden zivilrechtlich und strafrechtlich verfolgt.",
                ],
            },
            {
                title: "Online-Streitbeilegung",
                content: [
                    "Verbraucher haben die Möglichkeit, Verbraucherstreitigkeiten über die Online-Streitbeilegungsplattform der EU einzureichen: https://ec.europa.eu/consumers/odr/",
                    "DB ImmoDesign e.U. ist nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren teilzunehmen.",
                ],
            },
        ],
    },

    en: {
        title: "Imprint",
        sections: [
            {
                title: "Website Operator",
                content: [
                    "DB ImmoDesign e.U.",
                    "Owner: Daniel Betros",
                    "Laaweg 30, 8401 Kalsdorf bei Graz, Austria",
                    "Business Register Number: FN 633491 f",
                    "Business Register Court: Regional Court Graz",
                    "Phone: +43 676 418 3782",
                    "Email: office@immo-design.at",
                ],
            },
            {
                title: "Professional Title & Supervision",
                content: [
                    "Professional Title: Real Estate Agent (Austria)",
                    "Supervisory Authority: District Government Graz-Umgebung",
                    "Applicable Professional Regulations: Trade Regulation Act (Gewerbeordnung - GewO)",
                    "Available at: www.ris.bka.gv.at",
                ],
            },
            {
                title: "Liability for Content",
                content: [
                    "The contents of our website are created with great care and updated regularly. Nevertheless, we cannot guarantee the completeness, accuracy and timeliness of all contents.",
                    "DB ImmoDesign e.U. assumes no liability for damages that result from the use or non-use of the information provided, unless such damage is based on gross negligence or intent.",
                ],
            },
            {
                title: "Liability for Links",
                content: [
                    "This website contains links to external websites of third parties. We have no influence on the contents of these external websites and therefore cannot assume responsibility for these contents.",
                    "For the contents of linked pages, the respective provider or operator is always responsible. We explicitly distance ourselves from all contents that violate laws or are otherwise inappropriate.",
                    "If you discover faulty or illegal links, please notify us.",
                ],
            },
            {
                title: "Copyright",
                content: [
                    "All contents of this website (texts, images, videos, graphics, logos, etc.) are protected by copyright.",
                    "The use, reproduction or distribution of these contents without written permission from DB ImmoDesign e.U. is not permitted.",
                    "Violations will be prosecuted under civil and criminal law.",
                ],
            },
            {
                title: "Online Dispute Resolution",
                content: [
                    "Consumers have the option to submit consumer disputes via the EU's online dispute resolution platform: https://ec.europa.eu/consumers/odr/",
                    "DB ImmoDesign e.U. is neither obliged nor willing to participate in dispute resolution proceedings.",
                ],
            },
        ],
    },
};

/* ---------------------------------------------
   2) Motion
---------------------------------------------- */

const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

/* ---------------------------------------------
   3) Page Component
---------------------------------------------- */

export default function ImprintPage() {
    const { language } = useLanguageStore();
    const content = imprintContent[language] || imprintContent.en;

    return (
        <div className="w-full bg-neutral-50 dark:bg-neutral-950">
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="section-title mb-12 text-center">
                        {content.title}
                    </h2>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="space-y-12"
                    >
                        {content.sections.map((section, idx) => (
                            <motion.div
                                key={`${language}-${idx}`}
                                variants={card}
                                className="space-y-4"
                            >
                                <h3 className="text-xl font-semibold tracking-tight text-primary-600 dark:text-primary-400">
                                    {section.title}
                                </h3>

                                <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
                                    {section.content.map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>

                                {idx < content.sections.length - 1 && (
                                    <div className="border-t-2 border-primary-500 mt-6" />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}