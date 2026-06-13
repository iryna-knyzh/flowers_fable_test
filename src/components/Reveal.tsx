"use client";

import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 42, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h2" | "h3" | "span" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  overline,
  title,
  description,
  align = "center",
}: {
  overline: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-5 ${alignCls}`}>
      <Reveal as="span" className="flex items-center gap-4">
        <span className="gold-divider w-10" />
        <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-gold-deep">
          {overline}
        </span>
        <span className="gold-divider w-10" />
      </Reveal>
      <Reveal as="h2" delay={0.12} className="font-serif-display max-w-3xl text-balance text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
        {title}
      </Reveal>
      {description && (
        <Reveal as="p" delay={0.22} className="max-w-xl text-pretty text-[15px] font-light leading-relaxed text-ink-muted">
          {description}
        </Reveal>
      )}
    </div>
  );
}
