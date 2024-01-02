import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <div className={cn("w-full h-auto absolute bottom-0 p-3")}>
      <div
        className={cn(
          "w-full rounded-lg shadow-lg outline outline-gray-200 bg-white bg-opacity-30 backdrop-blur-xl p-4 h-auto flex justify-between text-sm"
        )}
      >
        <div className={cn("text-muted-foreground")}>
          <strong>Walker & Weights</strong> © {new Date().getFullYear()}
        </div>
        <div className={cn("text-muted-foreground")}>
          <Link href="/privacy-policy">Adatvédelmi nyilatkozat</Link>
        </div>
      </div>
    </div>
  );
}
