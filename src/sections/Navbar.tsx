"use client";
import Image from "next/image";
import logoImage from '@/assets/images/datavanta logo.png';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



const navLinks = [
    { label: "Product", href: "#" },
    { label: "Discover", href: "#discover" },
    { label: "Customers", href: "#customers" },
    { label: "About Me", href: "#aboutme" },
    { label: "Contact", href: "#contact" },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return ( 
    <>
     <section className="fixed w-full top-0 z-50 border-b border-[#1b1c1c]">
         <div className="">
            <div className="bg-neutral-950/75 backdrop-blur-2xl">
                <div className="grid grid-cols-2 lg:grid-cols-3 px-20 md:px-60 items-center">
                    <div>
                      <Link href="/">
                        <Image src={logoImage} alt="Datavanta logo" className="h-16 m:h-auto w-auto" />
                      </Link>
                    </div>
                    <div className="lg:flex justify-center items-center hidden">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Customers</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">About Me</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
         <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
                    </div>
                    <div className="flex justify-end gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-menu md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        >
                            <line x1="3" y1="6" x2="21" y2="6" 
                            className={twMerge("origin-left transition", isOpen && 'rotate-45 -translate-y-1')}>
                            </line>

                            <line x1="3" y1="12" x2="21" y2="12" 
                            className={twMerge("transition", isOpen && "opacity-0")}>
                            </line>

                            <line x1="3" y1="18" x2="21" y2="18"
                            className={twMerge("origin-left transition", isOpen && '-rotate-45 translate-y-1')}>
                            </line>
                        </svg>
                        <Link href="/login">
                          <Button variant="secondary" className="whitespace-nowrap hidden md:inline-flex justify-center items-center">Log In</Button>
                        </Link>
                        <Link href="/sign-up">
                          <Button variant="default" className=" whitespace-nowrap hidden md:inline-flex justify-center items-center">Sign Up</Button>
                        </Link>
                    </div>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto"}}
                        exit={{ height: 0}}
                        className="overflow-hidden">
                            <div className="flex flex-col items-start gap-4 pl-20 py-4">
                                {navLinks.map(link => (
                                    <a 
                                    href={link.href} 
                                    key={link.label}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <Link href="/login">
                                  <Button variant="secondary" className="whitespace-nowrap inline-flex justify-center items-center">Log in</Button>
                                </Link>
                                <Link href="/sign-up">
                                  <Button variant="default" className="whitespace-nowrap inline-flex justify-center items-center ">Sign Up</Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
         </div>
     </section> 
     <div className="pb-[86px] md:pb-[98px] lg:pb-[108px]">

     </div>
     </>
     ); 
}
