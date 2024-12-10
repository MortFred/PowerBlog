import React from "react";
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
        <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, remarkRehype]}
            children={content}
            components={{
                h2: ({ node, ...props }) =>
                    props.children ? (
                        <h2 id={generateSlug(React.Children.toArray(props.children)[0].toString())} {...props}></h2>
                    ) : null,
            }}
        />
    );
}

const generateSlug = (string: string) => {
    let str = string.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    return str;
};
