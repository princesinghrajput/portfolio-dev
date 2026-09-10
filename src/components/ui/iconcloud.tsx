"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 20,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2.2,
    activeCursor: "pointer",
    tooltip: "native",
    initial: [0.12, -0.12],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.035,
    minSpeed: 0.015,
    dragControl: true,
    freezeActive: true,
    fadeIn: 800,
    shuffleTags: true,
    centreFunc: (text: any) => {
      text.style.opacity = "1";
    },
    shape: "sphere",
  },
};

// Vibrant color overrides for maximum visual punch
const customColorMap: Record<string, { light: string; dark: string }> = {
  typescript: { light: "#3178C6", dark: "#3178C6" },
  javascript: { light: "#F7DF1E", dark: "#F7DF1E" },
  react: { light: "#087EA4", dark: "#61DAFB" },
  html5: { light: "#E34F26", dark: "#E34F26" },
  css3: { light: "#1572B6", dark: "#264DE4" },
  nodedotjs: { light: "#339933", dark: "#5FA04E" },
  express: { light: "#000000", dark: "#F8FAFC" },
  nextdotjs: { light: "#000000", dark: "#FFFFFF" },
  prisma: { light: "#2D3748", dark: "#5A67D8" },
  amazonaws: { light: "#FF9900", dark: "#FF9900" },
  postgresql: { light: "#4169E1", dark: "#4169E1" },
  firebase: { light: "#FFA000", dark: "#FFCA28" },
  nginx: { light: "#009639", dark: "#009639" },
  vercel: { light: "#000000", dark: "#00DF8F" },
  testinglibrary: { light: "#E33332", dark: "#E33332" },
  docker: { light: "#2496ED", dark: "#2496ED" },
  git: { light: "#F05032", dark: "#F05032" },
  jira: { light: "#0052CC", dark: "#2684FF" },
  github: { light: "#181717", dark: "#A855F7" },
  gitlab: { light: "#FC6D26", dark: "#FC6D26" },
  visualstudiocode: { light: "#007ACC", dark: "#007ACC" },
  androidstudio: { light: "#3DDC84", dark: "#3DDC84" },
  figma: { light: "#F24E1E", dark: "#F24E1E" },
  rust: { light: "#CE412B", dark: "#DEA584" },
  linux: { light: "#FCC624", dark: "#FCC624" },
  render: { light: "#46E3B7", dark: "#46E3B7" },
  postman: { light: "#FF6C37", dark: "#FF6C37" },
  netlify: { light: "#00C7B7", dark: "#00C7B7" },
  solidity: { light: "#363636", dark: "#627EEA" },
  python: { light: "#3776AB", dark: "#3776AB" },
  mongodb: { light: "#47A248", dark: "#47A248" },
  tailwindcss: { light: "#06B6D4", dark: "#38BDF8" },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const isDark = theme === "dark";
  const slug = ((icon as any).slug || icon.title?.toLowerCase().replace(/[^a-z0-9]/g, "")) as string;

  let targetHex = customColorMap[slug]
    ? isDark
      ? customColorMap[slug].dark
      : customColorMap[slug].light
    : `#${icon.hex}`;

  // If icon hex is pure black in dark mode, make it crisp white
  if (targetHex.toLowerCase() === "#000000" && isDark) {
    targetHex = "#FFFFFF";
  }

  const cleanHex = targetHex.replace("#", "");
  const coloredIcon = {
    ...icon,
    hex: cleanHex,
  };

  return renderSimpleIcon({
    icon: coloredIcon,
    bgHex: isDark ? "#000000" : "#ffffff",
    fallbackHex: targetHex,
    minContrastRatio: 0, // Never strip the color!
    size: 46,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "dark"),
    );
  }, [data, theme]);

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
