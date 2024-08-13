'use client';
import { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TextGenerateEffect = ({
	words,
	className,
}: {
	words: string;
	className?: string;
}) => {
	const [scope, animate] = useAnimate();
	let wordsArray = words.split(' ');

	useEffect(() => {
		const totalDuration = 500; // 0.5 seconds in milliseconds
		const staggerDelay = totalDuration / wordsArray.length;

		animate(
			'span',
			{
				opacity: 1,
			},
			{
				duration: 0.1,
				delay: i => (i * staggerDelay) / 1000, // Convert to seconds
				ease: 'linear',
			}
		);
	}, [scope.current, wordsArray.length]);

	const renderWords = () => {
		return (
			<motion.div ref={scope}>
				{wordsArray.map((word, idx) => {
					return (
						<motion.span
							key={word + idx}
							className="dark:text-white text-black opacity-0"
						>
							{word}{' '}
						</motion.span>
					);
				})}
			</motion.div>
		);
	};

	return (
		<div className={cn('font-thin', className)}>
			<div className="m-[0.1rem]">
				<div className="dark:text-white text-black text-[1rem] lg:text-base leading-snug tracking-wide">
					{renderWords()}
				</div>
			</div>
		</div>
	);
};
