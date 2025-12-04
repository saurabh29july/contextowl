"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  CreditCard,
  MessageCircle,
  Settings,
  Sparkles,
} from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: BarChart2 },
  { label: "Brands", href: "/brands", icon: Sparkles },
  { label: "Prompts", href: "/prompts", icon: MessageCircle },
  { label: "Billing", href: "#", icon: CreditCard },
  { label: "Settings", href: "#", icon: Settings },
];

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  contentClassName?: string;
};

export function AppShell({ title, subtitle, children, actions, contentClassName }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden border-r bg-card md:block md:w-64 lg:w-72">
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10" />
            <div>
              <p className="text-sm font-semibold leading-tight">ContextOwl</p>
              <p className="text-xs text-muted-foreground">SaaS Console</p>
            </div>
          </div>
        </div>
        <nav className="space-y-1.5 p-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Button
                key={item.label}
                variant={active ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-start gap-2"
                asChild
              >
                <Link href={item.href} aria-current={active ? "page" : undefined}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-3 border-b bg-card px-5 py-3">
          <div className="flex flex-1 items-center gap-3">
            <div>
              {subtitle ? (
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{subtitle}</p>
              ) : null}
              <h1 className="text-xl font-semibold leading-tight text-foreground">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <ModeToggle />
          </div>
        </header>

        <main className={cn("flex-1 overflow-auto p-5", contentClassName)}>{children}</main>
      </div>
    </div>
  );
}

