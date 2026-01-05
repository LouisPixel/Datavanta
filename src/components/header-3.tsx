'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/images/datavanta logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
	GlobeIcon,
	UserPlusIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	PlugIcon,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 relative">
				<div className="flex items-center gap-5">
				<Link href="/">
                        <Image src={logoImage} alt="Datavanta logo" className="h-16 m:h-auto w-auto" />
                      </Link>
				</div>
				<NavigationMenu className="hidden md:flex absolute left-1/2 -translate-x-1/2">
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="bg-transparent">Product</NavigationMenuTrigger>
							<NavigationMenuContent className="bg-background p-1 pr-1.5">
								<ul className="bg-popover grid min-w-[500px] grid-cols-1 gap-2 rounded-md border p-2 shadow">
									{productLinks.map((item, i) => (
										<li key={i}>
											<ListItem {...item} />
										</li>
									))}
								</ul>
		
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="bg-transparent">Discover</NavigationMenuTrigger>
							<NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
								<div className="grid min-w-[600px] grid-cols-2 gap-2">
									<ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
										{companyLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
									<ul className="space-y-2 p-3">
										{companyLinks2.map((item, i) => (
											<li key={i}>
												<NavigationMenuLink
													href={item.href}
													className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
												>
													<item.icon className="text-foreground size-4" />
													<span className="font-medium">{item.title}</span>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuLink className="px-2" asChild>
							<a href="#" className="inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none whitespace-nowrap">
								Pricing
							</a>
						</NavigationMenuLink>
						<NavigationMenuLink className="px-2" asChild>
							<a href="/contact" className="inline-flex h-9 items-center justify-center rounded-md  px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none whitespace-nowrap">
								Contact
							</a>
						</NavigationMenuLink>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="hidden items-center gap-2 md:flex ml-4">
				<Link href="/login">
                                  <Button variant="outline" className="whitespace-nowrap inline-flex justify-center items-center">Log in</Button>
                                </Link>
                                <Link href="/sign-up">
                                  <Button variant="default" className="whitespace-nowrap inline-flex justify-center items-center ">Get Started</Button>
                                </Link>
				</div>
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
				<NavigationMenu className="max-w-full">
					<div className="flex w-full flex-col gap-y-2">
						<span className="text-sm">Product</span>
						{productLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						<span className="text-sm">Discover</span>
						{companyLinks.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						{companyLinks2.map((link) => (
							<ListItem key={link.title} {...link} />
						))}
						<NavigationMenuLink className="px-4" asChild>
							<a href="#" className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none whitespace-nowrap">
								Pricing
							</a>
						</NavigationMenuLink>
						<NavigationMenuLink className="px-4" asChild>
							<a href="/contact" className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none whitespace-nowrap">
								Contact
							</a>
						</NavigationMenuLink>
					</div>
				</NavigationMenu>
				<div className="flex flex-col gap-2">
				<Link href="/login">
                                  <Button variant="outline" className="whitespace-nowrap inline-flex justify-center items-center w-full">Log in</Button>
                                </Link>
                                <Link href="/sign-up">
                                  <Button variant="default" className="whitespace-nowrap inline-flex justify-center items-center w-full ">Get Started</Button>
                                </Link>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-4',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
	return (
		<NavigationMenuLink className={cn('w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2', className)} {...props} asChild>
			<a href={href}>
				<div className="bg-background/40 flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm">
					<Icon className="text-foreground size-5" />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-medium">{title}</span>
					<span className="text-muted-foreground text-xs">{description}</span>
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const productLinks: LinkItem[] = [
	{
		title: 'Features',
		href: '/features',
		description: 'Create responsive websites with ease',
		icon: GlobeIcon,
	},
	
	{
		title: 'Use Cases',
		href: '/use-cases',
		description: 'Tools to help your teams work better together',
		icon: UserPlusIcon,
	},
	
	{
		title: 'Graphs',
		href: '/graphs',
		description: 'Connect your apps and services',
		icon: PlugIcon,
	},
	
];

const companyLinks: LinkItem[] = [
	{
		title: 'About Us',
		href: '#',
		description: 'Learn more about our story and team',
		icon: Users,
	},
	{
		title: 'Customer Stories',
		href: '#',
		description: 'See how we’ve helped our clients succeed',
		icon: Star,
	},
	{
		title: 'Partnerships',
		href: '#',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
	},
];

const companyLinks2: LinkItem[] = [
	{
		title: 'Terms of Service',
		href: '#',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '#',
		icon: Shield,
	},
	{
		title: 'Refund Policy',
		href: '#',
		icon: RotateCcw,
	},
	{
		title: 'Blog',
		href: '#',
		icon: Leaf,
	},
	{
		title: 'Help Center',
		href: '#',
		icon: HelpCircle,
	},
];


function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	// also check on first load
	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}

