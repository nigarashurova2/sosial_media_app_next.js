"use client"
import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface MenuBarProps {
  className?: string;
}

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/messages", label: "Messages", icon: Mail },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export default function MenuBar({ className }: MenuBarProps) {
  const pathname = usePathname();

  return (
    <div className={className}>
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Button
            key={href}
            variant="ghost"
            className={`flex items-center justify-start gap-3 ${
              isActive ? "bg-muted text-primary" : ""
            }`}
            title={label}
            asChild
          >
            <Link href={href}>
              <Icon />
              <span className="hidden lg:inline">{label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
