"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  Factory,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type BrandStatus = "Active" | "Paused" | "Review";

type BrandRow = {
  name: string;
  industry: string;
  market: string;
  prompts: number;
  updated: string;
  status: BrandStatus;
};

const BRAND_DATA: BrandRow[] = [
  { name: "Nova Retail", industry: "Retail", market: "US / EU", prompts: 182_400, updated: "12m ago", status: "Active" },
  { name: "Aperture Labs", industry: "Biotech", market: "US", prompts: 98_230, updated: "28m ago", status: "Review" },
  { name: "Northwind", industry: "Logistics", market: "EMEA", prompts: 121_040, updated: "1h ago", status: "Active" },
  { name: "Acme Labs", industry: "E‑commerce", market: "Global", prompts: 75_110, updated: "2h ago", status: "Paused" },
  { name: "Helix Bio", industry: "Healthcare", market: "US", prompts: 64_900, updated: "3h ago", status: "Active" },
  { name: "Neo Market", industry: "Fintech", market: "APAC", prompts: 54_210, updated: "5h ago", status: "Active" },
  { name: "Atlas Energy", industry: "Energy", market: "LATAM", prompts: 43_780, updated: "6h ago", status: "Review" },
  { name: "VectorX", industry: "AI", market: "Global", prompts: 91_330, updated: "8h ago", status: "Active" },
];

const PAGE_SIZE = 5;

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name" | "prompts" | "updated">("name");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<BrandRow[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    website: "",
    industry: "",
    market: "",
    geography: "",
    competitors: "",
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setRows(BRAND_DATA);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = term
      ? rows.filter(
          (r) =>
            r.name.toLowerCase().includes(term) ||
            r.industry.toLowerCase().includes(term) ||
            r.market.toLowerCase().includes(term)
        )
      : rows;

    const sorted = [...base].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "prompts") return b.prompts - a.prompts;
      return a.updated.localeCompare(b.updated); // simple string sort for placeholder
    });
    return sorted;
  }, [rows, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newRow: BrandRow = {
      name: form.name.trim(),
      industry: form.industry.trim() || "—",
      market: form.market.trim() || "—",
      prompts: 0,
      updated: "Just now",
      status: "Active",
    };
    setRows((prev) => [newRow, ...prev]);
    setForm({
      name: "",
      website: "",
      industry: "",
      market: "",
      geography: "",
      competitors: "",
    });
    setDialogOpen(false);
  };

  const statusBadge = (status: BrandStatus) => {
    if (status === "Active")
      return <Badge variant="secondary" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Active</Badge>;
    if (status === "Review")
      return <Badge variant="outline" className="gap-1"><Clock3 className="h-3 w-3" /> Review</Badge>;
    return <Badge variant="outline" className="gap-1 text-amber-800 border-amber-200 bg-amber-50">Paused</Badge>;
  };

  const tableSkeleton = (
    <TableBody>
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          <TableCell colSpan={7}>
            <div className="flex items-center gap-3">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-3 w-16 rounded bg-slate-200" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border bg-white p-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Brands</p>
              <h1 className="text-xl font-semibold leading-tight text-foreground">Brand inventory</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <BadgeCheck className="h-4 w-4" />
              Verify
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">Add brand</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add brand</DialogTitle>
                  <DialogDescription>Store locally for now; no backend calls.</DialogDescription>
                </DialogHeader>
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Brand Name</label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Acme Labs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Website</label>
                    <Input
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Industry</label>
                      <Input
                        value={form.industry}
                        onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                        placeholder="Retail, Fintech..."
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Target Market</label>
                      <Input
                        value={form.market}
                        onChange={(e) => setForm((f) => ({ ...f, market: e.target.value }))}
                        placeholder="US, EMEA, APAC..."
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Geography</label>
                      <Input
                        value={form.geography}
                        onChange={(e) => setForm((f) => ({ ...f, geography: e.target.value }))}
                        placeholder="North America"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Main Competitors</label>
                      <Input
                        value={form.competitors}
                        onChange={(e) => setForm((f) => ({ ...f, competitors: e.target.value }))}
                        placeholder="Competitor A, B"
                      />
                    </div>
                  </div>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-5 py-5">
        <Card className="bg-white">
          <CardHeader className="flex flex-col gap-3 space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Brand table</CardTitle>
              <CardDescription>Data-heavy view with sorting, pagination, search, and actions.</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search brands..."
                  className="pl-8 pr-3 w-52 sm:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="prompts">Prompts (high)</SelectItem>
                  <SelectItem value="updated">Last updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brand Name</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead className="text-right">Prompts Generated</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                {loading ? (
                  tableSkeleton
                ) : filtered.length === 0 ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div className="flex flex-col items-center gap-2 py-6 text-center">
                          <div className="rounded-full border bg-slate-50 p-3">
                            <Factory className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm font-medium text-foreground">No brands found</p>
                          <p className="text-xs text-muted-foreground">
                            Adjust search or filters to see results.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {paginated.map((brand) => (
                      <TableRow key={brand.name}>
                        <TableCell className="font-medium">{brand.name}</TableCell>
                        <TableCell>{brand.industry}</TableCell>
                        <TableCell>{brand.market}</TableCell>
                        <TableCell className="text-right">{brand.prompts.toLocaleString()}</TableCell>
                        <TableCell>{brand.updated}</TableCell>
                        <TableCell>{statusBadge(brand.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Pause</DropdownMenuItem>
                              <DropdownMenuItem>Export</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Page</span>
                <Badge variant="outline">
                  {currentPage} / {totalPages}
                </Badge>
                <span>•</span>
                <span>{filtered.length} total</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Processing capacity</CardTitle>
            <CardDescription>Placeholder utilization metrics.</CardDescription>
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
      </main>
    </div>
  );
}

