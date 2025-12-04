"use client";

import {
  ArrowLeft,
  Globe2,
  MapPin,
  MessageSquare,
  Radar,
  Sparkles,
} from "lucide-react";

import * as React from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const BRAND = {
  name: "Nova Retail",
  description:
    "Omnichannel retailer focusing on curated lifestyle products, with emphasis on rapid merchandising and personalized offers.",
  market: "Retail • Lifestyle",
  geography: "US / EU",
  prompts: {
    total: 182_400,
    aeo: 42_000,
    geo: 28_500,
    visibility: 22_100,
    sentiment: 18_400,
  },
};

const BRAND_CONTEXT = {
  socialHandles: {
    twitter: "@novaretail",
    linkedin: "linkedin.com/company/novaretail",
    instagram: "@novaretail",
  },
  icp: {
    segment: "Mid-market retail",
    size: "50-500 stores",
    decisionMakers: ["VP Merchandising", "Head of Ecommerce", "CX Lead"],
  },
  targetAudience: [
    "Lifestyle shoppers seeking curated collections",
    "Urban professionals with high mobile engagement",
    "Returning customers with high repeat intent",
  ],
  strengths: [
    "Rapid merchandising cycles",
    "Personalized offers and bundles",
    "Strong loyalty engagement across channels",
  ],
  weaknesses: [
    "Seasonal inventory risk",
    "Returns sensitivity on apparel SKUs",
    "Limited presence in APAC",
  ],
  keyCompetitors: ["Northwind Styles", "Aperture Goods", "VectorX Lifestyle"],
  positioning: {
    narrative: "Curated lifestyle retail with fast merchandising and tailored offers.",
    pillars: ["Discovery-first experience", "Personalized bundles", "Reliable fulfillment"],
  },
  useCases: [
    "Offer personalization for returning shoppers",
    "Proactive return-risk mitigation messaging",
    "Real-time merchandising for seasonal drops",
  ],
};

const MONITORING_GROUPS = [
  {
    label: "AEO",
    rows: [
      {
        prompt: "aeo_inference_rerank",
        optimization: "CTR uplift",
        measurement: "A/B holdout",
        created: "2024-11-02",
      },
    ],
  },
  {
    label: "GEO",
    rows: [
      {
        prompt: "geo_recommendation_v2",
        optimization: "Geo relevance",
        measurement: "Regional conversion",
        created: "2024-10-18",
      },
    ],
  },
  {
    label: "Visibility",
    rows: [
      {
        prompt: "visibility_ranker_v1",
        optimization: "Placement score",
        measurement: "View depth",
        created: "2024-09-29",
      },
    ],
  },
  {
    label: "Sentiment",
    rows: [
      {
        prompt: "sentiment_stream_v3",
        optimization: "Tone adherence",
        measurement: "CSAT delta",
        created: "2024-08-11",
      },
    ],
  },
  {
    label: "Competitor",
    rows: [
      {
        prompt: "competitive_watch_v1",
        optimization: "Share of voice",
        measurement: "Mention coverage",
        created: "2024-07-05",
      },
    ],
  },
];

export default function BrandDetailPage() {
  return (
    <AppShell
      title={BRAND.name}
      subtitle="Brand"
      actions={
        <>
          <Button variant="outline" size="sm" asChild className="gap-2">
            <Link href="/brands">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <Badge variant="secondary" className="gap-1">
            <Radar className="h-3 w-3" /> Monitoring
          </Badge>
        </>
      }
      contentClassName="flex flex-col gap-4"
    >
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="context">Brand 360 Context</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring Prompts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Brand overview</CardTitle>
                <CardDescription>Profile and prompt footprint.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{BRAND.description}</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Market</span>
                      <span className="text-muted-foreground">{BRAND.market}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Geography</span>
                      <span className="text-muted-foreground">{BRAND.geography}</span>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  <MetricCard label="Total prompts" value={BRAND.prompts.total.toLocaleString()} />
                  <div className="grid grid-cols-2 gap-3">
                    <MetricCard label="AEO" value={BRAND.prompts.aeo.toLocaleString()} />
                    <MetricCard label="GEO" value={BRAND.prompts.geo.toLocaleString()} />
                    <MetricCard label="Visibility" value={BRAND.prompts.visibility.toLocaleString()} />
                    <MetricCard label="Sentiment" value={BRAND.prompts.sentiment.toLocaleString()} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="context" className="mt-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Brand 360 Context</CardTitle>
                <CardDescription>Structured intelligence view (placeholder data).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border bg-muted/30 px-3 py-2 text-xs font-mono text-foreground">
                  <pre className="whitespace-pre-wrap leading-relaxed">
{JSON.stringify(BRAND_CONTEXT, null, 2)}
                  </pre>
                </div>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe2 className="h-4 w-4 text-muted-foreground" />
                  Social, ICP, audience, strengths/weaknesses, competitors, positioning, and use cases in one view.
                </p>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Swap in live data when available; JSON is formatted for quick scanning or copy.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Monitoring Prompts</CardTitle>
                <CardDescription>Grouped by category with prompt optimization details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-40">Category</TableHead>
                        <TableHead>Prompt Text</TableHead>
                        <TableHead>Optimization Type</TableHead>
                        <TableHead>Measurement Type</TableHead>
                        <TableHead>Created Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MONITORING_GROUPS.map((group) => (
                        <React.Fragment key={group.label}>
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={5} className="font-semibold text-foreground">
                              {group.label}
                            </TableCell>
                          </TableRow>
                          {group.rows.map((row) => (
                            <TableRow key={`${group.label}-${row.prompt}`}>
                              <TableCell className="text-muted-foreground">{group.label}</TableCell>
                              <TableCell className="font-medium">{row.prompt}</TableCell>
                              <TableCell>{row.optimization}</TableCell>
                              <TableCell>{row.measurement}</TableCell>
                              <TableCell>{row.created}</TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Placeholder dataset; replace with live monitoring feed when available.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold text-foreground leading-tight">{value}</p>
    </div>
  );
}

