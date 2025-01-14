'use client'
import { usePathname } from "next/navigation";

export default function Footer() {

    const pathname = usePathname();
  
    if (pathname.startsWith('/login')){
      return null
    };
    return (
      <footer className="mt-auto text-center text-zinc-400">
        <small>All rights reserved.</small>
      </footer>
    );
  }
  