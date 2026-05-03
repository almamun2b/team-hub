"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ActionItem } from "@/types/actionItem";
import { Badge } from "@/components/ui/badge";
import { CheckSquare } from "lucide-react";
import { KanbanCard } from "./KanbanCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  items: ActionItem[];
}

export function KanbanColumn({ id, title, items }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`space-y-4 p-4 rounded-lg border-2 transition-colors ${
        isOver ? "border-primary bg-primary/5" : "border-dashed border-gray-300"
      }`}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Badge variant="secondary">{items.length}</Badge>
      </div>
      <div className="space-y-3 min-h-50">
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckSquare className="h-8 w-8 mx-auto mb-2" />
              <p>No items</p>
            </div>
          ) : (
            items.map((item) => (
              <KanbanCard key={item.id} item={item} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}