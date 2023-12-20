import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full h-auto absolute bottom-0 p-3">
      <div className="w-full rounded-lg shadow-lg outline outline-gray-200 bg-white bg-opacity-30 backdrop-blur-xl p-4 h-auto flex justify-between text-sm">
        <div className="text-muted-foreground">
          <strong>Walker & Weights</strong> © {new Date().getFullYear()}
        </div>
        <div className="text-muted-foreground">
          <Link href="/privacy-policy">Adatvédelmi nyilatkozat</Link>
        </div>
      </div>
    </div>
  );
}
