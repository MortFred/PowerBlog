import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkRehype from "remark-rehype";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown children={content} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex, remarkRehype]} />
    );
}
