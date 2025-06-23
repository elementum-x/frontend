import Link from "next/link";

export function Footer() {
  return (
    <footer className="sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 py-2 flex items-center justify-between text-xs">
      <div>
        <span className="inline-flex items-center border border-green-400 text-green-400 rounded px-2 py-1 gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
          Online
        </span>
      </div>
      <nav className="flex gap-4 text-muted-foreground">
        <Link href="#" className="hover:underline">
          Docs
        </Link>
        <Link href="#" className="hover:underline">
          Support
        </Link>
        <Link href="#" className="hover:underline">
          Terms
        </Link>
        <Link href="#" className="hover:underline">
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
}
