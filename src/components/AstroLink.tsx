import { createContext, useContext, type ReactNode } from "react";

const AstroLinkContext = createContext<{ url: URL | null }>({ url: null });
AstroLinkContext.displayName = "AstroLinkContext";

export type AstroLinkURLProps = {
  url: URL;
  children?: ReactNode;
};
export const AstroLinkURL = ({ url, children }: AstroLinkURLProps) => {
  return <AstroLinkContext.Provider value={{ url }}>{children}</AstroLinkContext.Provider>;
};

export type AstroLinkProps = {
  href: string;
  className?: string;
  activeClass?: string;
  children: ReactNode;
};
export const AstroLink = ({ href, className, activeClass, children }: AstroLinkProps) => {
  const { url } = useContext(AstroLinkContext);
  if (url) {
    className = ((activeClass && url.pathname === href) || url.pathname.startsWith(href + "/") ? (className ? className + " " + activeClass : activeClass) : (className ?? "")) ?? "";
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};
