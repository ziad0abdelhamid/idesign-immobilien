"use client";

import { useLanguageStore } from "@/lib/store";
import { motion, easeOut, type Variants } from "framer-motion";
import { Subtitles } from "lucide-react";

/* ---------------------------------------------
   1) Localized content
---------------------------------------------- */

type Section = {
    title: string;
    subtitle?: string;
    intro?: string;
    content: (string | { subtitle: string })[];
};

type DataProtectionLocale = {
    title: string;
    subtitle?: string;
    intro?: string;
    sections: Section[];
};

const dataProtectionContent: Record<"de" | "en", DataProtectionLocale> = {
    de: {
        title: "Datenschutzerklärung",
        intro: "DB ImmoDesign e.U. nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung erläutert, wie wir personenbezogene Daten erheben, verarbeiten und schützen.",
        sections: [
            {
                title: "1. Verantwortlicher",
                subtitle: "Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten ist:",
                content: [
                    "DB ImmoDesign e.U.",
                    "Inhaber: Daniel Betros",
                    "Laaweg 30, 8401 Kalsdorf bei Graz, Österreich",
                    "Telefon: +43 676 418 3782",
                    "E-Mail: office@immo-design.at",
                    "Website: www.immo-design.at",
                ],
            },
            {
                title: "2. Erhebung und Verarbeitung personenbezogener Daten",
                intro: "Wir verarbeiten personenbezogene Daten immer rechtmäßig, fair und transparent gemäß DSGVO und österreichischem Datenschutzrecht.",
                content: [
                    { subtitle: "Folgende Daten können erhoben werden:" },
                    "Name und Vorname",
                    "Postanschrift",
                    "Telefonnummer",
                    "E-Mail-Adresse",
                    "Immobilieninteressen und -anforderungen",
                    "Finanzielle Kreditwürdigkeit (sofern von Ihnen bereitgestellt)",
                    "Eigentumsgeschichte und Besitztitel",
                    "Kommunikationsinhalte und Notizen aus Gesprächen",
                ],
            },
            {
                title: "3. Verarbeitungszwecke",
                content: [
                    "Ihre Daten werden verarbeitet für:",
                    "Bearbeitung Ihrer Anfragen und Angebote",
                    "Vermittlung und Verkauf von Immobilien",
                    "Vorbereitung und Durchführung von Verträgen",
                    "Kundenbetreuung und -beratung",
                    "Einhaltung gesetzlicher Verpflichtungen aus dem Gewerberecht und Steuerrecht",
                    "Verbesserung unserer Dienstleistungen",
                    "Rechtsverfolgung und Geltendmachung von Ansprüchen",
                ],
            },
            {
                title: "4. Rechtsgrundlagen der Datenverarbeitung",
                content: [
                    "Art. 6 Abs. 1 lit. a DSGVO – Einwilligung des Betroffenen",
                    "Art. 6 Abs. 1 lit. b DSGVO – Erfüllung eines Vertrags oder vorvertragliche Maßnahmen",
                    "Art. 6 Abs. 1 lit. c DSGVO – Einhaltung einer rechtlichen Verpflichtung",
                    "Art. 6 Abs. 1 lit. f DSGVO – Berechtigte Interessen an Geschäftsanbahnung, Vermittlung und Vertragsabwicklung",
                ],
            },
            {
                title: "5. Datenweitergabe an Dritte",
                content: [
                    "Im Rahmen der Immobiliendienstleistungen kann eine Weitergabe personenbezogener Daten an folgende Stellen erforderlich sein:",
                    "Kunden oder andere Interessenten (für Verkaufsvermittlung)",
                    "Notare und Rechtsanwälte",
                    "Banken und Kreditinstitute (bei Finanzierungsberatung)",
                    "Behörden (zur Erfüllung gesetzlicher Pflichten)",
                    "Die Weitergabe erfolgt nur, soweit sie zur Vertragserfüllung erforderlich oder rechtlich zulässig ist.",
                ],
            },
            {
                title: "6. Speicherdauer",
                content: [
                    "Ihre personenbezogenen Daten werden nur so lange gespeichert, wie dies für die Erfüllung der jeweiligen Verarbeitungszwecke erforderlich ist.",
                    "Längere Speicherfristen gelten für Daten, die aufgrund von Buchhaltungs- und Steuergesetzen oder anderen Gesetzen aufbewahrt werden müssen (üblicherweise 7 Jahre für Geschäftsunterlagen gemäß Unternehmensgesetzbuch).",
                    "Nach Ablauf der Aufbewahrungsfrist werden die Daten gelöscht oder anonymisiert.",
                ],
            },
            {
                title: "7. Ihre Rechte",
                content: [
                    "Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:",
                    "Auskunftsrecht (Art. 15 DSGVO) – Auskunft über die bei uns gespeicherten Daten",
                    "Berichtigungsrecht (Art. 16 DSGVO) – Richtigstellung ungenauer oder unvollständiger Daten",
                    "Löschungsrecht (Art. 17 DSGVO) – Löschung Ihrer Daten unter bestimmten Voraussetzungen",
                    "Einschränkungsrecht (Art. 18 DSGVO) – Einschränkung der Datenverarbeitung",
                    "Datenübertragungsrecht (Art. 20 DSGVO) – Erhalt Ihrer Daten in strukturierter, gängiger Form",
                    "Widerspruchsrecht (Art. 21 DSGVO) – Ablehnung der Verarbeitung Ihrer Daten",
                    "Widerrufsrecht – Widerruf erteilter Einwilligungen jederzeit möglich",
                    "Zur Geltendmachung dieser Rechte kontaktieren Sie uns unter office@immo-design.at",
                ],
            },
            {
                title: "8. Beschwerde bei der Datenschutzbehörde",
                content: [
                    "Sollten Sie der Meinung sein, dass die Verarbeitung Ihrer Daten gegen Datenschutzgesetze verstößt, haben Sie das Recht, eine Beschwerde bei der zuständigen Datenschutzbehörde einzureichen:",
                    "Österreichische Datenschutzbehörde (DSB)",
                    "Barichgasse 40–42, 1030 Wien",
                    "E-Mail: dsb@dsb.gv.at",
                    "Telefon: +43 1 52 252-0",
                    "Website: www.dsb.gv.at",
                ],
            },
            {
                title: "9. Kontaktformular und E-Mail-Anfragen",
                content: [
                    "Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, speichern wir Ihre Angaben einschließlich E-Mail, Name und Telefonnummer, um Ihre Anfrage zu bearbeiten.",
                    "Die Daten werden nicht an Dritte weitergegeben, es sei denn, dies ist erforderlich, um Ihre Anfrage zu beantworten.",
                    "Nach vollständiger Bearbeitung Ihrer Anfrage werden die Daten gemäß der geltenden Aufbewahrungsfrist gespeichert.",
                ],
            },
            {
                title: "10. Cookies und Website-Analyse",
                content: [
                    "Diese Website verwendet möglicherweise Cookies, um die Benutzererfahrung zu verbessern.",
                    "Technisch notwendige Cookies sind erforderlich für die Funktionsfähigkeit der Website.",
                    "Weitere Cookies erfordern Ihre vorherige Einwilligung.",
                    "Sie können Cookies in Ihren Browsereinstellungen deaktivieren.",
                ],
            },
            {
                title: "11. Datensicherheit",
                content: [
                    "Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust, Zerstörung und Manipulation zu schützen.",
                    "Diese Maßnahmen umfassen Verschlüsselung, sichere Serverumgebungen und Zugriffskontrollmechanismen.",
                    "Trotzdem ist keine Internetübertragung vollständig sicher, und wir können absolute Sicherheit nicht garantieren.",
                ],
            },
            {
                title: "12. Links zu externen Websites",
                content: [
                    "Diese Website kann Links zu externen Websites enthalten. Wir sind nicht verantwortlich für den Datenschutz oder die Praktiken dieser externen Websites.",
                    "Bevor Sie persönliche Daten auf externen Websites angeben, lesen Sie deren Datenschutzerklärungen.",
                ],
            },
            {
                title: "13. Änderungen dieser Datenschutzerklärung",
                content: [
                    "Wir behalten uns das Recht vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren, um Änderungen in unseren Datenschutzpraktiken oder Rechtsvorschriften widerzuspiegeln.",
                    "Änderungen werden auf dieser Seite veröffentlicht. Bitte überprüfen Sie diese Datenschutzerklärung regelmäßig.",
                ],
            },
        ],
    },

    en: {
        title: "Privacy Policy",
        intro: "DB ImmoDesign e.U. takes the protection of your personal data very seriously. This privacy policy explains how we collect, process, and protect your personal information.",
        sections: [
            {
                title: "1. Controller",
                subtitle: "Responsible for processing your personal data is:",
                content: [
                    "DB ImmoDesign e.U.",
                    "Owner: Daniel Betros",
                    "Laaweg 30, 8401 Kalsdorf bei Graz, Austria",
                    "Phone: +43 676 418 3782",
                    "Email: office@immo-design.at",
                    "Website: www.immo-design.at",
                ],
            },
            {
                title: "2. Collection and Processing of Personal Data",
                intro: "We process personal data lawfully, fairly, and transparently in accordance with the GDPR and Austrian privacy law.",
                content: [
                    { subtitle: "The following data may be collected:" },
                    "First and last name",
                    "Postal address",
                    "Phone number",
                    "Email address",
                    "Real estate interests and requirements",
                    "Financial creditworthiness information (if provided)",
                    "Property ownership history and titles",
                    "Communication contents and notes from conversations",
                ],
            },
            {
                title: "3. Purposes of Processing",
                content: [
                    "Your data is processed for:",
                    "Handling your inquiries and offers",
                    "Real estate mediation and sales",
                    "Contract preparation and execution",
                    "Customer support and advice",
                    "Compliance with legal obligations under trade and tax law",
                    "Improvement of our services",
                    "Legal enforcement and claims",
                ],
            },
            {
                title: "4. Legal Bases for Data Processing",
                content: [
                    "Art. 6(1)(a) GDPR – Consent of the data subject",
                    "Art. 6(1)(b) GDPR – Performance of a contract or pre-contractual measures",
                    "Art. 6(1)(c) GDPR – Compliance with a legal obligation",
                    "Art. 6(1)(f) GDPR – Legitimate interests in business initiation, mediation, and contract execution",
                ],
            },
            {
                title: "5. Sharing Data with Third Parties",
                content: [
                    "In the context of real estate services, sharing personal data with the following parties may be necessary:",
                    "Customers or other interested parties (for sales mediation)",
                    "Notaries and lawyers",
                    "Banks and financial institutions (for financing advice)",
                    "Government authorities (for legal compliance)",
                    "Data sharing occurs only when required for contract performance or legally permitted.",
                ],
            },
            {
                title: "6. Data Retention Period",
                content: [
                    "Your personal data is retained only as long as necessary for the respective processing purposes.",
                    "Extended retention periods apply to data subject to accounting, tax, and other legal requirements (typically 7 years for business records under the Austrian Business Code).",
                    "After the retention period expires, data is deleted or anonymized.",
                ],
            },
            {
                title: "7. Your Rights",
                content: [
                    "You have the following rights regarding your personal data:",
                    "Right to access (Art. 15 GDPR) – Information about data we hold",
                    "Right to rectification (Art. 16 GDPR) – Correction of inaccurate or incomplete data",
                    "Right to erasure (Art. 17 GDPR) – Deletion under certain conditions",
                    "Right to restrict processing (Art. 18 GDPR) – Limitation of data processing",
                    "Right to data portability (Art. 20 GDPR) – Receipt of your data in structured format",
                    "Right to object (Art. 21 GDPR) – Refusal of data processing",
                    "Right to withdraw consent – Revocation of given consent anytime",
                    "To exercise these rights, contact us at office@immo-design.at",
                ],
            },
            {
                title: "8. Filing a Complaint with the Data Protection Authority",
                content: [
                    "If you believe processing of your data violates privacy laws, you have the right to file a complaint with the Austrian data protection authority:",
                    "Austrian Data Protection Authority (DSB)",
                    "Barichgasse 40–42, 1030 Vienna",
                    "Email: dsb@dsb.gv.at",
                    "Phone: +43 1 52 252-0",
                    "Website: www.dsb.gv.at",
                ],
            },
            {
                title: "9. Contact Form and Email Inquiries",
                content: [
                    "When you contact us via the contact form or email, we store your information including email, name, and phone number to process your request.",
                    "Data is not shared with third parties unless required to respond to your inquiry.",
                    "After your request is fully processed, data is retained according to applicable retention periods.",
                ],
            },
            {
                title: "10. Cookies and Website Analytics",
                content: [
                    "This website may use cookies to improve user experience.",
                    "Technically necessary cookies are required for website functionality.",
                    "Additional cookies require your prior consent.",
                    "You can disable cookies in your browser settings.",
                ],
            },
            {
                title: "11. Data Security",
                content: [
                    "We implement technical and organizational security measures to protect your personal data against unauthorized access, loss, destruction, and alteration.",
                    "These measures include encryption, secure server environments, and access control mechanisms.",
                    "However, no internet transmission is completely secure, and we cannot guarantee absolute security.",
                ],
            },
            {
                title: "12. Links to External Websites",
                content: [
                    "This website may contain links to external websites. We are not responsible for the privacy practices of these external sites.",
                    "Before providing personal information on external websites, please read their privacy policies.",
                ],
            },
            {
                title: "13. Changes to This Privacy Policy",
                content: [
                    "We reserve the right to update this privacy policy as needed to reflect changes in our practices or applicable law.",
                    "Changes will be posted on this page. Please review this policy regularly.",
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

export default function DataProtectionPage() {
    const { language } = useLanguageStore();
    const content = dataProtectionContent[language] || dataProtectionContent.en;

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
                                        <li key={i}>
                                            {typeof line === 'string' ? line : line.subtitle}
                                        </li>
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