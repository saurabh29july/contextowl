import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          shadcn/ui with Tailwind
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Light-first theme with an optional dark toggle. Tailwind and shadcn
          tokens are ready to use across the app.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <p className="text-sm text-muted-foreground">
          Try the optional dark mode toggle.
        </p>
      </div>
    </main>
  );
}
