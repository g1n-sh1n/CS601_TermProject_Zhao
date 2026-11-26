import type { ReactNode } from "react";

interface SectionTitleProps {
  id?: string;
  level?: 1 | 2;
  children: ReactNode;
}

// Green Douban-style section title (the dots come from CSS ::after)
function SectionTitle({ id, level = 2, children }: SectionTitleProps) {
  const Tag = level === 1 ? "h1" : "h2";
  return <Tag id={id} className="section-title">{children}</Tag>;
}

export default SectionTitle;
