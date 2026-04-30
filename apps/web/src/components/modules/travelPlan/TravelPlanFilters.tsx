"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TravelPlanSearchParams } from "@/types/travelPlan";
import { ArrowDown, ArrowUp, Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef } from "react";

interface TravelPlanFiltersProps {
  searchParams: TravelPlanSearchParams;
}

export function TravelPlanFilters({ searchParams }: TravelPlanFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Partial<TravelPlanSearchParams>) => {
      const newParams = new URLSearchParams(currentParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          newParams.set(key, String(value));
        } else {
          newParams.delete(key);
        }
      });
      router.push(`${pathname}?${newParams.toString()}`);
    },
    [currentParams, pathname, router]
  );

  const [localState, setLocalState] = useReducer(
    (
      state: { searchTerm: string; minBudget: string; maxBudget: string },
      updates: Partial<typeof state>
    ) => ({
      ...state,
      ...updates,
    }),
    {
      searchTerm: searchParams.searchTerm || "",
      minBudget: searchParams.minBudget || "",
      maxBudget: searchParams.maxBudget || "",
    }
  );

  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const debouncedUpdateParams = useCallback(
    (key: string, updates: Partial<TravelPlanSearchParams>) => {
      const timers = timersRef.current;

      if (timers.has(key)) {
        clearTimeout(timers.get(key)!);
      }

      const timer = setTimeout(() => {
        updateParams(updates);
        timers.delete(key);
      }, 300);
      timers.set(key, timer);
    },
    [updateParams]
  );

  useEffect(() => {
    setLocalState({
      searchTerm: searchParams.searchTerm || "",
      minBudget: searchParams.minBudget || "",
      maxBudget: searchParams.maxBudget || "",
    });
  }, [searchParams.searchTerm, searchParams.minBudget, searchParams.maxBudget]);

  const handleSearch = (term: string) => {
    setLocalState({ searchTerm: term });
    debouncedUpdateParams("searchTerm", { searchTerm: term, page: 1 });
  };

  const handleFilter = (key: keyof TravelPlanSearchParams, value: string) => {
    if (key === "travelType" && value === "all") {
      updateParams({ travelType: undefined, page: 1 });
    } else {
      updateParams({ [key]: value, page: 1 });
    }
  };

  const handleMinBudgetChange = (value: string) => {
    setLocalState({ minBudget: value });
    debouncedUpdateParams("minBudget", { minBudget: value, page: 1 });
  };

  const handleMaxBudgetChange = (value: string) => {
    setLocalState({ maxBudget: value });
    debouncedUpdateParams("maxBudget", { maxBudget: value, page: 1 });
  };

  const clearFilters = () => {
    updateParams({
      searchTerm: undefined,
      destination: undefined,
      travelType: undefined,
      minBudget: undefined,
      maxBudget: undefined,
      sortBy: undefined,
      sortOrder: undefined,
      page: 1,
    });
  };

  return (
    <div className="mb-8 p-6 bg-card rounded-xl border shadow-sm">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search travel plans..."
            value={localState.searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
        <Button variant="outline" onClick={clearFilters} className="h-9">
          <Filter className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Travel Type */}
        <Select
          value={
            searchParams.travelType === undefined
              ? "all"
              : searchParams.travelType
          }
          onValueChange={(value) => handleFilter("travelType", value)}
        >
          <SelectTrigger className="h-9 w-full">
            <SelectValue placeholder="Travel Type">
              {searchParams.travelType === undefined
                ? "All Types"
                : searchParams.travelType}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="SOLO">Solo</SelectItem>
            <SelectItem value="GROUP">Group</SelectItem>
            <SelectItem value="FAMILY">Family</SelectItem>
            <SelectItem value="COUPLE">Couple</SelectItem>
          </SelectContent>
        </Select>

        {/* Min Budget */}
        <Input
          type="number"
          placeholder="Min Budget"
          value={localState.minBudget}
          onChange={(e) => handleMinBudgetChange(e.target.value)}
          className="h-9 w-full"
        />

        {/* Max Budget */}
        <Input
          type="number"
          placeholder="Max Budget"
          value={localState.maxBudget}
          onChange={(e) => handleMaxBudgetChange(e.target.value)}
          className="h-9 w-full"
        />
        <div className="flex items-center gap-2">
          <Select
            value={searchParams.sortBy || "createdAt"}
            onValueChange={(value) => handleFilter("sortBy", value)}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="startDate">Start Date</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="destination">Destination</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Order */}
          <Select
            value={searchParams.sortOrder || "desc"}
            onValueChange={(value) => handleFilter("sortOrder", value)}
          >
            <SelectTrigger className="h-9 w-20">
              {/* <SelectValue placeholder="Order" /> */}
              {searchParams.sortOrder === "asc" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="asc">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4" />
                  Ascending
                </div>
              </SelectItem>
              <SelectItem value="desc">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-4 w-4" />
                  Descending
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
