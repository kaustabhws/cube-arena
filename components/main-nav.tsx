"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  isOpen,
  setIsOpen,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/create`,
      label: "Create Room",
      active: pathname === `/create`,
    },
    {
      href: `/join`,
      label: "Join Room",
      active: pathname === `/join`,
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center text-base font-medium space-x-4 lg:space-x-6",
        className
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
          onClick={() => {
            if (setIsOpen) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
