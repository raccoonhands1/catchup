'use client';
import { useEffect, useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/sidebar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { IconArrowBigLeftLines } from '@tabler/icons-react';
import Dashboard from '@/components/dashboard';
import { ITopic } from '@/lib/types';
import { getTopics } from '@/lib/actions/api';
import useTopicStore from '@/lib/store/ui';

export default function SidebarDemo() {
	const [open, setOpen] = useState(true);
	const [topics, setTopics] = useState<ITopic[]>([]);
	const { setTopic } = useTopicStore();

	useEffect(() => {
		const fetch = async () => {
			const _topics = await getTopics();
			setTopics(_topics);
		};
		fetch();
	}, [setTopics]);

	return (
		<div
			className={cn(
				'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden' // for your use case, use `h-screen` instead of `h-[60vh]`
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-20 ">
					<div className="flex flex-col flex-1 overflow-y-auto">
						{open ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2">
							{topics.map(({ name, id }) => (
								<SidebarLink
									key={id}
									label={name}
									className=" rounded-xl p-1 flex"
									onClick={() => {
										setTopic({ name, id });
									}}
								/>
							))}
						</div>
					</div>
				</SidebarBody>
			</Sidebar>
			<Dashboard />
		</div>
	);
}
const Logo = () => {
	return (
		<Link
			href="#"
			className="font-normal flex space-x-2 items-center text-sm  py-1 relative z-20"
		>
			<IconArrowBigLeftLines stroke={1.5} className="h-6 w-6" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium text-black dark:text-white whitespace-pre"
			>
				Topics
			</motion.span>
		</Link>
	);
};
const LogoIcon = () => {
	return (
		<Link
			href="#"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<Bars3BottomLeftIcon aria-hidden="true" className="h-6 w-6" />
		</Link>
	);
};
