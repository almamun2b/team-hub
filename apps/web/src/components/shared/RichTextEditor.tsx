"use client";

import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { useEffect, useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write here...",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef<string>(value || "");

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    // Prevent caret jump: only sync DOM when external value actually changed.
    if (value !== lastValueRef.current && editor.innerHTML !== value) {
      editor.innerHTML = value || "";
      lastValueRef.current = value || "";
    }
  }, [value]);

  const run = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command);
    const next = editorRef.current?.innerHTML || "";
    lastValueRef.current = next;
    onChange(next);
  };

  return (
    <div className="rounded-md border">
      <div className="flex gap-2 border-b p-2">
        <Button type="button" size="sm" variant="outline" onClick={() => run("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => run("italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => run("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => run("insertOrderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-32 p-3 text-sm outline-none"
        onInput={(e) => {
          const next = (e.currentTarget as HTMLDivElement).innerHTML;
          lastValueRef.current = next;
          onChange(next);
        }}
        data-placeholder={placeholder}
      />
    </div>
  );
}
