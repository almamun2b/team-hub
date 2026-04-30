"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

type StringListInputProps = {
  value?: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addButtonText?: string;
  separators?: string[];
};

export function StringListInput({
  value,
  onChange,
  placeholder,
  addButtonText,
  separators,
}: StringListInputProps) {
  const items = value ?? [];

  const [uncontrolledInput, setUncontrolledInput] = useState("");

  const separatorSet = useMemo(() => {
    return new Set(["Enter", ",", ...(separators ?? [])]);
  }, [separators]);

  const handleAdd = () => {
    const trimmed = uncontrolledInput.trim();
    if (!trimmed) return;
    if (items.includes(trimmed)) {
      setUncontrolledInput("");
      return;
    }
    onChange([...items, trimmed]);
    setUncontrolledInput("");
  };

  const handleRemove = (item: string) => {
    onChange(items.filter((i) => i !== item));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={uncontrolledInput}
          onChange={(e) => setUncontrolledInput(e.target.value)}
          onKeyDown={(e) => {
            if (separatorSet.has(e.key)) {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button type="button" onClick={handleAdd} size="sm">
          {addButtonText ?? "Add"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => handleRemove(item)}
          >
            {item} ×
          </Badge>
        ))}
      </div>
    </div>
  );
}
