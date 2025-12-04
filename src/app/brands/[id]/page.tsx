"use client";

import {
  ArrowLeft,
  Globe2,
  MapPin,
  MessageSquare,
  Radar,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function BrandDetailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Brand</p>
              <h1 className="text-xl font-semibold leading-tight text-foreground">{BRAND.name}</h1>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Radar className="h-3 w-3" /> Monitoring
          </Badge>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-5 py-5">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="context">Brand 360 Context</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring Prompts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card className="bg-white">
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
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Brand 360 Context</CardTitle>
                <CardDescription>Placeholder contextual summary.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Highlight positioning, audience cohorts, and channel mix. Include narrative snippets,
                  competitive differentiators, and key messaging pillars once data is wired.
                </p>
                <p className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-muted-foreground" />
                  Global merchandising cadence: weekly; seasonal drops: quarterly.
                </p>
                <p className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Top intents: discovery, return risk mitigation, offer personalization.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Monitoring Prompts</CardTitle>
                <CardDescription>Placeholder activity stream for monitored prompts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div>
                    <p className="font-medium text-foreground">support_classifier_v2</p>
                    <p className="text-xs text-muted-foreground">Live · Alerting enabled</p>
                  </div>
                  <Badge variant="outline">P95 118 ms</Badge>
                </div>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div>
                    <p className="font-medium text-foreground">aeo_inference_rerank</p>
                    <p className="text-xs text-muted-foreground">Training · Observing drift</p>
                  </div>
                  <Badge variant="secondary">Retraining</Badge>
                </div>
                <div className="flex items-center justify-between rounded-md border px-3 py-2">
                  <div>
                    <p className="font-medium text-foreground">sentiment_stream_v3</p>
                    <p className="text-xs text-muted-foreground">Live · Streaming</p>
                  </div>
                  <Badge variant="outline">P95 104 ms</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold text-foreground leading-tight">{value}</p>
    </div>
  );
}

