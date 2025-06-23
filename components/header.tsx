import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold">ElementumX</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Trade
            </Link>
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Portfolio
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button>Connect</Button>
        </div>
      </div>
    </header>
  );
}
