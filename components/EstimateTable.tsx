import { ScrollableTable } from "@/components/ScrollableTable";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join(" ");
  }

  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }

  return "";
}

function classifyRow(text: string) {
  const normalised = text.replace(/\s+/g, " ").trim();

  if (/quoted project total|total including/i.test(normalised)) {
    return "is-grand-total";
  }

  if (/core project total/i.test(normalised)) {
    return "is-core-total";
  }

  if (/\btotal\b/i.test(normalised)) {
    return "is-total";
  }

  return "";
}

function isNumericCell(text: string) {
  const value = text.replace(/\s+/g, " ").trim();
  if (!value) {
    return false;
  }

  return (
    /^TBC$/i.test(value) ||
    /^£[\d,]+(\.\d+)?(\s*\+\s*VAT)?$/i.test(value) ||
    /^[\d,]+(\.\d+)?(\s*hrs?)?$/i.test(value) ||
    /^\d{1,3}(,\d{3})*(\.\d+)?(\s*hrs?)?$/i.test(value)
  );
}

function isNumericHeading(text: string) {
  return /hours|days|cost|price|estimate|total|figure|£/i.test(text);
}

function flatten(node: ReactNode): ReactNode[] {
  if (node == null || typeof node === "boolean") {
    return [];
  }

  if (Array.isArray(node)) {
    return node.flatMap(flatten);
  }

  return [node];
}

function childNodes(node: ReactNode): ReactNode[] {
  if (node && typeof node === "object" && "props" in node) {
    return flatten((node as { props: { children?: ReactNode } }).props.children);
  }

  return [];
}

function getHeaderLabels(children: ReactNode): string[] {
  for (const section of flatten(children)) {
    for (const row of childNodes(section)) {
      const cells = childNodes(row);
      if (cells.length > 0) {
        return cells.map((cell) => extractText(cell).replace(/\s+/g, " ").trim());
      }
    }
  }

  return [];
}

function isCompactTable(children: ReactNode): boolean {
  const headers = getHeaderLabels(children);
  const joined = headers.join(" ").toLowerCase();

  if (headers.length > 0 && headers.length <= 2) {
    return true;
  }

  if (joined.includes("priority") && joined.includes("meaning")) {
    return true;
  }

  if (joined.includes("workshop requirements") || /^audience$/i.test(headers[0] ?? "")) {
    return true;
  }

  return false;
}

function withoutNode<T extends object>(props: T & { node?: unknown }) {
  const rest = { ...props };
  delete rest.node;
  return rest;
}

export function MarkdownTable({ children }: { children: ReactNode }) {
  const compact = isCompactTable(children);

  return (
    <ScrollableTable compact={compact} label="Proposal table">
      <table className={cn("estimate-table", compact && "is-compact")}>{children}</table>
    </ScrollableTable>
  );
}

export function TableHead(props: ComponentPropsWithoutRef<"thead"> & { node?: unknown }) {
  return <thead {...withoutNode(props)} />;
}

export function TableBody(props: ComponentPropsWithoutRef<"tbody"> & { node?: unknown }) {
  return <tbody {...withoutNode(props)} />;
}

export function TableRow(props: ComponentPropsWithoutRef<"tr"> & { node?: unknown }) {
  const { children, className, ...rest } = withoutNode(props);
  const kind = classifyRow(extractText(children));

  return (
    <tr className={cn(kind, className)} {...rest}>
      {children}
    </tr>
  );
}

export function TableHeaderCell(props: ComponentPropsWithoutRef<"th"> & { node?: unknown }) {
  const { children, className, ...rest } = withoutNode(props);
  const numeric = isNumericHeading(extractText(children));

  return (
    <th className={cn(numeric && "is-numeric", className)} {...rest}>
      {children}
    </th>
  );
}

export function TableCell(props: ComponentPropsWithoutRef<"td"> & { node?: unknown }) {
  const { children, className, ...rest } = withoutNode(props);
  const numeric = isNumericCell(extractText(children));

  return (
    <td className={cn(numeric && "is-numeric", className)} {...rest}>
      {children}
    </td>
  );
}
