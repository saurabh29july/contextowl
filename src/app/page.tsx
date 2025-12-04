import {
  BarChart2,
  Building2,
  LineChart,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const kpiCards = [
  { title: "Total Brands", value: "42", trend: "↗ 4.1% vs last week", icon: Building2 },
  { title: "Total Prompts", value: "1.2M", trend: "↗ 2.8% vs 24h", icon: BarChart2 },
  { title: "AEO Prompts", value: "182k", trend: "→ steady", icon: Sparkles },
  { title: "GEO Prompts", value: "141k", trend: "↗ 1.3% vs 7d", icon: MessageCircle },
  { title: "Visibility Prompts", value: "118k", trend: "↘ 0.6% vs 7d", icon: LineChart },
  { title: "Sentiment Prompts", value: "96k", trend: "↗ 3.0% vs 7d", icon: TrendingUp },
];

const brandRows = [
  { name: "Nova Retail", prompts: 182, latency: "94 ms", uptime: "99.9%" },
  { name: "Acme Labs", prompts: 141, latency: "102 ms", uptime: "99.7%" },
  { name: "Northwind", prompts: 118, latency: "88 ms", uptime: "99.8%" },
];

const promptRows = [
  { name: "Support classifier", volume: "54k/day", accuracy: "97.2%" },
  { name: "Offer generator", volume: "31k/day", accuracy: "95.4%" },
  { name: "Tone normalizer", volume: "22k/day", accuracy: "96.1%" },
];

const recentBrands = [
  { name: "Aperture Labs", owner: "ops@aperture.io", created: "12m ago" },
  { name: "Neo Market", owner: "data@neo.market", created: "42m ago" },
  { name: "Helix Bio", owner: "ml@helix.bio", created: "2h ago" },
];

const recentPrompts = [
  { prompt: "support_classifier_v2", brand: "Nova Retail", status: "Deployed", updated: "8m ago" },
  { prompt: "aeo_inference_rerank", brand: "Acme Labs", status: "Training", updated: "27m ago" },
  { prompt: "sentiment_stream_v3", brand: "Northwind", status: "Deployed", updated: "1h ago" },
];

export default function Home() {
  return (
    <AppShell
      title="Analytics dashboard"
      subtitle="Overview"
      actions={
        <>
          <Badge variant="outline" className="hidden sm:inline-flex">
            Data refresh: 5 min
          </Badge>
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">New prompt</Button>
        </>
      }
    >
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-3">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold leading-tight">{card.value}</div>
                  <p className="text-xs text-muted-foreground">{card.trend}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card className="md:col-span-2 bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle>Brand performance</CardTitle>
                <CardDescription>Recent activity and reliability.</CardDescription>
              </div>
              <Badge variant="outline">99.8% uptime</Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brand</TableHead>
                    <TableHead>Prompts</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead className="text-right">Uptime</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brandRows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.prompts}</TableCell>
                      <TableCell>{row.latency}</TableCell>
                      <TableCell className="text-right">{row.uptime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Capacity</CardTitle>
              <CardDescription>Load vs. allocated tokens.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Inference</span>
                  <span className="text-muted-foreground">68%</span>
                </div>
                <Progress value={68} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Embeddings</span>
                  <span className="text-muted-foreground">44%</span>
                </div>
                <Progress value={44} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Vector search</span>
                  <span className="text-muted-foreground">59%</span>
                </div>
                <Progress value={59} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Prompts</CardTitle>
              <CardDescription>High-volume prompt families.</CardDescription>
            </div>
            <Tabs defaultValue="volume" className="w-[220px]">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="volume">Volume</TabsTrigger>
                <TabsTrigger value="quality">Quality</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prompt</TableHead>
                  <TableHead>Daily volume</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promptRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>{row.volume}</TableCell>
                    <TableCell className="text-right">{row.accuracy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Recent Brands</CardTitle>
                <CardDescription>Newest brand workspaces added.</CardDescription>
              </div>
              <Badge variant="outline">Live</Badge>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {recentBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium leading-tight">{brand.name}</p>
                    <p className="text-xs text-muted-foreground">{brand.owner}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{brand.created}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Recent Prompt Activity</CardTitle>
                <CardDescription>Latest prompt updates across brands.</CardDescription>
              </div>
              <Badge variant="secondary">Stream</Badge>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {recentPrompts.map((item) => (
                <div
                  key={item.prompt}
                  className="flex items-start justify-between rounded-md border px-3 py-2"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-tight">{item.prompt}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.brand} • {item.status}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.updated}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
