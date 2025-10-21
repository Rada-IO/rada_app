import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/10 py-10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="" className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="font-semibold">Rada</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-sm">
              Personalized AI tool advisor.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="#how" className="hover:underline">How it works</Link></li>
              <li><Link href="#vendors" className="hover:underline">For vendors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            </ul>
            <div className="mt-4 flex gap-3">
              <Link href="https://twitter.com/" aria-label="Twitter" className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"><Twitter size={18} aria-hidden /></Link>
              <Link href="https://linkedin.com/" aria-label="LinkedIn" className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"><Linkedin size={18} aria-hidden /></Link>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-500">© {year} Rada. All rights reserved.</p>
      </div>
    </footer>
  );
}


