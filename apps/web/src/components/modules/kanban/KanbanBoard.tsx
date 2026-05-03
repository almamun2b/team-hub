"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ActionItem } from "@/types/actionItem";
import { updateActionItemAction } from "@/actions/actionItem.actions";
import { toast } from "sonner";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";

interface KanbanBoardProps {
  actionItems: ActionItem[];
}

export function KanbanBoard({ actionItems }: KanbanBoardProps) {
  const [activeItem, setActiveItem] = useState<ActionItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: "TODO", title: "To Do", items: actionItems.filter(item => item.status === "TODO") },
    { id: "IN_PROGRESS", title: "In Progress", items: actionItems.filter(item => item.status === "IN_PROGRESS") },
    { id: "DONE", title: "Done", items: actionItems.filter(item => item.status === "DONE") },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item = actionItems.find(item => item.id === active.id);
    setActiveItem(item || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const itemId = active.id as string;
    const overId = over.id as string;

    // Find the current item
    const currentItem = actionItems.find(item => item.id === itemId);
    if (!currentItem) return;

    const columnIds = new Set(["TODO", "IN_PROGRESS", "DONE"]);
    const newStatus = columnIds.has(overId)
      ? (overId as "TODO" | "IN_PROGRESS" | "DONE")
      : actionItems.find((item) => item.id === overId)?.status;

    if (!newStatus || currentItem.status === newStatus) return;

    try {
      // Update the item status
      const formData = new FormData();
      formData.append("workspaceId", currentItem.workspaceId);
      formData.append("status", newStatus);

      const result = await updateActionItemAction(itemId, undefined, formData);
      if (result.success) {
        toast.success("Task updated successfully!");
      } else {
        toast.error(result.error || "Failed to update task");
      }
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            items={column.items}
          />
        ))}
      </div>

      <DragOverlay>
        {activeItem ? (
          <KanbanCard item={activeItem} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
