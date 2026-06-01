import * as Icons from "@/components/icons";

export interface SkillItem {
  id: string;
  name: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  url: string;
}

export const SKILLS_CONFIG: SkillItem[] = [
  {
    id: "html",
    name: "HTML5",
    Icon: Icons.Html5,
    url: "https://developer.mozilla.org/zh-TW/docs/Web/HTML",
  },
  {
    id: "css",
    name: "CSS3",
    Icon: Icons.Css3,
    url: "https://developer.mozilla.org/zh-TW/docs/Web/CSS",
  },
  {
    id: "js",
    name: "JavaScript",
    Icon: Icons.JavaScript,
    url: "https://developer.mozilla.org/zh-TW/docs/Web/JavaScript",
  },
  {
    id: "typescript",
    name: "TypeScript",
    Icon: Icons.TypeScript,
    url: "https://www.typescriptlang.org/",
  },
  {
    id: "react",
    name: "React",
    Icon: Icons.ReactIcon,
    url: "https://react.dev/",
  },
  {
    id: "next",
    name: "Next.js",
    Icon: Icons.Nextjs,
    url: "https://nextjs.org/",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    Icon: Icons.TailwindCSS,
    url: "https://tailwindcss.com/",
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    Icon: Icons.Bootstrap,
    url: "https://getbootstrap.com/",
  },
  {
    id: "express",
    name: "Express.js",
    Icon: Icons.Expressjs,
    url: "https://expressjs.com/",
  },
  {
    id: "node",
    name: "Node.js",
    Icon: Icons.Nodejs,
    url: "https://nodejs.org/",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    Icon: Icons.MongoDB,
    url: "https://www.mongodb.com/",
  },
  {
    id: "vscode",
    name: "VS Code",
    Icon: Icons.VScode,
    url: "https://code.visualstudio.com/",
  },
  { id: "git", name: "Git", Icon: Icons.Git, url: "https://git-scm.com/" },
];
