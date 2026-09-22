import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/cn";
import { headingId } from "@/lib/headings";
import {
  MarkdownTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/EstimateTable";
import type { ReactNode } from "react";

function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(flattenText).join("");
  }

  if (typeof node === "object" && "props" in node) {
    return flattenText((node as { props: { children?: ReactNode } }).props.children);
  }

  return "";
}

function heading(Tag: "h3" | "h4", idPrefix?: string) {
  return function Heading({ children }: { children?: ReactNode }) {
    const text = flattenText(children).trim();
    const id = text ? headingId(idPrefix ?? "", text) : undefined;
    return <Tag id={id}>{children}</Tag>;
  };
}

export function MarkdownRenderer({
  content,
  className,
  idPrefix,
}: {
  content: string;
  className?: string;
  idPrefix?: string;
}) {
  const components: Components = {
    h1: heading("h3", idPrefix),
    h2: heading("h3", idPrefix),
    h3: heading("h4", idPrefix),
    table: ({ children }) => <MarkdownTable>{children}</MarkdownTable>,
    thead: ({ children }) => <TableHead>{children}</TableHead>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: (props) => <TableRow {...props} />,
    th: (props) => <TableHeaderCell {...props} />,
    td: (props) => <TableCell {...props} />,
  };

  return (
    <div className={cn("proposal-prose", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
