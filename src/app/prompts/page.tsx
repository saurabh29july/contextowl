"use client";

import * as React from "react";
import { FileDown } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type PromptRow = {
  prompt: string;
  brand: string;
  category: "AEO" | "GEO" | "Visibility" | "Sentiment" | "Competitor";
  optimizationType: "AEO" | "GEO";
  measurementType: "Visibility" | "Sentiment" | "Ranking" | "Competitiveness";
  intentType: "Commercial" | "Informational" | "Navigational";
  created: string; // ISO date
};

const PROMPT_DATA: PromptRow[] = [
  {
    prompt: "aeo_inference_rerank",
    brand: "Nova Retail",
    category: "AEO",
    optimizationType: "AEO",
    measurementType: "Ranking",
    intentType: "Commercial",
    created: "2024-11-02",
  },
  {
    prompt: "geo_recommendation_v2",
    brand: "Acme Labs",
    category: "GEO",
    optimizationType: "GEO",
    measurementType: "Ranking",
    intentType: "Navigational",
    created: "2024-10-18",
  },
  {
    prompt: "visibility_ranker_v1",
    brand: "Northwind",
    category: "Visibility",
    optimizationType: "AEO",
    measurementType: "Visibility",
    intentType: "Informational",
    created: "2024-09-29",
  },
  {
    prompt: "sentiment_stream_v3",
    brand: "Nova Retail",
    category: "Sentiment",
    optimizationType: "GEO",
    measurementType: "Sentiment",
    intentType: "Informational",
    created: "2024-08-11",
  },
  {
    prompt: "competitive_watch_v1",
    brand: "Helix Bio",
    category: "Competitor",
    optimizationType: "GEO",
    measurementType: "Competitiveness",
    intentType: "Commercial",
    created: "2024-07-05",
  },
];

const CATEGORIES = ["AEO", "GEO", "Visibility", "Sentiment", "Competitor"] as const;
const MEASUREMENTS = ["Visibility", "Sentiment", "Ranking", "Competitiveness"] as const;
const INTENTS = ["Commercial", "Informational", "Navigational"] as const;

export default function PromptsPage() {
  const [brand, setBrand] = React.useState("all");
  const [category, setCategory] = React.useState("all");
  const [measurement, setMeasurement] = React.useState("all");
  const [intent, setIntent] = React.useState("all");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const brands = React.useMemo(
    () => Array.from(new Set(PROMPT_DATA.map((p) => p.brand))),
    []
  );

  const filtered = React.useMemo(() => {
    return PROMPT_DATA.filter((row) => {
      if (brand !== "all" && row.brand !== brand) return false;
      if (category !== "all" && row.category !== category) return false;
      if (measurement !== "all" && row.measurementType !== measurement) return false;
      if (intent !== "all" && row.intentType !== intent) return false;
      if (from && new Date(row.created) < new Date(from)) return false;
      if (to && new Date(row.created) > new Date(to)) return false;
      return true;
    });
  }, [brand, category, measurement, intent, from, to]);

  const exportCsv = () => {
    const headers = [
      "Prompt Text",
      "Brand",
      "Category",
      "Optimization Type",
      "Measurement Type",
      "Intent Type",
      "Created Date",
    ];
    const rows = filtered.map((r) => [
      r.prompt,
      r.brand,
      r.category,
      r.optimizationType,
      r.measurementType,
      r.intentType,
      r.created,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prompts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell
      title="Prompts intelligence"
      subtitle="Prompts"
      actions={
        <Button size="sm" variant="outline" className="gap-2" onClick={exportCsv}>
          <FileDown className="h-4 w-4" />
          Export CSV
        </Button>
      }
      contentClassName="flex flex-col gap-4"
    >
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter prompts across all brands.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-6">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Brand</p>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Category</p>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Measurement Type</p>
              <Select value={measurement} onValueChange={setMeasurement}>
                <SelectTrigger>
                  <SelectValue placeholder="Measurement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {MEASUREMENTS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Intent Type</p>
              <Select value={intent} onValueChange={setIntent}>
                <SelectTrigger>
                  <SelectValue placeholder="Intent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {INTENTS.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">From</p>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">To</p>
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>All prompts</CardTitle>
              <CardDescription>Aggregated across brands with optimization signals.</CardDescription>
            </div>
            <Badge variant="outline">{filtered.length} shown</Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prompt Text</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Optimization</TableHead>
                    <TableHead>Measurement</TableHead>
                    <TableHead>Intent</TableHead>
                    <TableHead>Created Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-6">
                        No prompts match these filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((row) => (
                      <TableRow key={`${row.brand}-${row.prompt}`}>
                        <TableCell className="font-medium">{row.prompt}</TableCell>
                        <TableCell>{row.brand}</TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[11px]">
                            {row.optimizationType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[11px]">
                            {row.measurementType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[11px]">
                            {row.intentType}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.created}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

