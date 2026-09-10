import IconCloud from "./ui/iconcloud";

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "figma",
  "rust",
  "linux",
  "render",
  "postman",
  "netlify",
  "solidity",
  "python",
  "mongodb",
  "tailwindcss",
];

export function IconCloudDemo() {
  return (
    <div className="relative flex h-full w-full max-w-[42rem] items-center justify-center overflow-hidden rounded-2xl bg-transparent px-4 pb-12 pt-2">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
