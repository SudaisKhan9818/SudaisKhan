export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string;
  tags: string[];
  image: string;
  url: string | null;
}

export const PROJECTS: Project[] = [
  {
    id: "resume-forge",
    number: "01",
    title: "AI ResumeForge",
    subtitle: "AI-Powered Resume Builder",
    description:
      "A SaaS platform that uses cutting-edge AI to generate tailored, ATS-optimized resumes in seconds. Users input their experience and the AI handles the rest — formatting, wording, and keyword density — so every application stands out.",
    tech: "Next.js · React · Supabase · AI",
    tags: ["SaaS", "AI", "Web"],
    image: "/assests/Resume2.PNG",
    url: "https://ai-resume-forge.vercel.app/",
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Shopping App",
    description:
      "A fully-featured shopping platform with real-time inventory, Firebase auth, cart management, and Stripe payments. Built for speed, scalability, and a seamless checkout experience across all devices.",
    tech: "React · Firebase · Tailwind CSS",
    tags: ["Web", "E-Commerce"],
    image: "/assests/Ecommerce.PNG",
    url: "https://ecommerce-website-c403c.web.app/",
  },
  {
    id: "medical",
    number: "03",
    title: "Healer AI",
    subtitle: "Healthcare Web System",
    description:
      "A healthcare management system that streamlines patient records, appointment scheduling, and doctor-patient communication. Designed with a focus on data security, HIPAA-conscious architecture, and an accessible UI.",
    tech: "React · Node.js · MongoDB",
    tags: ["Web", "Healthcare"],
    image: "/assests/Medical.PNG",
    url: "https://healer-ai-opal.vercel.app/",
  },
  {
    id: "supplier-platform",
    number: "04",
    title: "SupplierTrack KSA",
    subtitle: "Stock & Supplier Management",
    description:
      "A comprehensive B2B supplier and stock management platform designed for the KSA market. Features real-time inventory tracking, payment processing, supplier analytics, and a beautiful dashboard for seamless operations.",
    tech: "Next.js · Tailwind CSS · TypeScript",
    tags: ["B2B", "Dashboard", "Web"],
    image: "/assests/Supplier.png",
    url: "https://supplier-platform-beta.vercel.app/",
  },
];
