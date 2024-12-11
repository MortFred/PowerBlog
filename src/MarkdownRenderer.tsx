import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer = memo(({ content }: MarkdownRendererProps) => {
    return <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} children={content} />;
});

export default MarkdownRenderer;
