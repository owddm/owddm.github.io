import { marked } from "marked";
import { useMemo } from "react";

export type MarkedProps = {
  text?: string;
};
export const Marked = ({ text }: MarkedProps) => {
  const markdownToHtml = useMemo(() => marked.parse(text ?? "", { async: false }), [text]);
  return <div dangerouslySetInnerHTML={{ __html: markdownToHtml }}></div>;
};
