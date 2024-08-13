'use client';
import { cn } from '@/lib/utils';
import React, { useState, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconArrowBigLeftLines, IconX } from '@tabler/icons-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SidebarContextProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
	undefined
);

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}
	return context;
};

export const SidebarProvider = ({
	children,
	open: openProp,
	setOpen: setOpenProp,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [openState, setOpenState] = useState(false);
	const open = openProp !== undefined ? openProp : openState;
	const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

	return (
		<SidebarContext.Provider value={{ open, setOpen }}>
			{children}
		</SidebarContext.Provider>
	);
};

export const Sidebar = ({
	children,
	open,
	setOpen,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<SidebarProvider open={open} setOpen={setOpen}>
			{children}
		</SidebarProvider>
	);
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
	return (
		<>
			<DesktopSidebar {...props} />
			<MobileSidebar {...(props as React.ComponentProps<'div'>)} />
		</>
	);
};

export const DesktopSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	const { open, setOpen } = useSidebar();
	return (
		<>
			<motion.div
				className={cn(
					'h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0',
					className
				)}
				animate={{
					width: open ? '300px' : '60px',
				}}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				{...props}
			>
				{children}
			</motion.div>
		</>
	);
};

export const MobileSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) => {
	const { open, setOpen } = useSidebar();
	return (
		<>
			<div
				className={cn(
					'h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full'
				)}
				{...props}
			>
				<div className="flex justify-end z-20 w-full">
					<IconArrowBigLeftLines
						className="text-neutral-800 dark:text-neutral-200"
						stroke={1.5}
						onClick={() => setOpen(!open)}
					/>
				</div>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ x: '-100%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: '-100%', opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: 'easeInOut',
							}}
							className={cn(
								'fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between',
								className
							)}
						>
							<div
								className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
								onClick={() => setOpen(!open)}
							>
								<IconX />
							</div>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

export const SidebarLink = ({
	label,
	className,
	onClick,
	...props
}: {
	label: string;
	className?: string;
	props?: string;
	onClick?: () => void;
	[key: string]: any;
}) => {
	const { open } = useSidebar();

	return (
		<div
			className={cn(
				'flex items-center justify-start py-2 overflow-x-hidden',
				className
			)}
			onClick={onClick}
			{...props}
		>
			<motion.div
				animate={{
					display: open ? 'block' : 'none',
					opacity: open ? 1 : 0,
				}}
				className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition-all duration-150"
			>
				<Card className="w-[15rem] p-0 hover:border-gray-700">
					<Button
						variant="ghost"
						className="w-full justify-between items-center text-base"
					>
						<span className="group-hover/modal-btn:translate-x-1 transition-all duration-500 overflow-hidden">
							{label}
						</span>
						{/* TODO: Implement change topic */}
					</Button>
				</Card>
			</motion.div>
		</div>
	);
};
