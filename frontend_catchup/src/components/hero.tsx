'use client';

import { PlaceholdersAndVanishInput } from '@/components/placeholders-and-vanish-input.tsx';
import { CardHoverEffectDemo } from '@/components/example-topics';
import Image from 'next/image';
import { useState } from 'react';
import { subscribeTopic } from '@/lib/actions/api';
import { Loader2 } from 'lucide-react';
export default function Hero() {
	const placeholders = [
		//topic names
		'AI/ML',
		'Cancer',
		'Computer networks',
		'Data science',
		'Economics',
		'Education',
		'Engineering',
		'Environment',
		'Finance',
		'Health',
		'History',
		'Humanities',
	];
	const [topic, setTopic] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTopic(e.target.value);
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!topic) return;
		setIsLoading(true);
		try {
			await subscribeTopic(topic);
			// Handle successful subscription (e.g., show a success message)
			console.log('Successfully subscribed to topic:', topic);
			setTopic(''); // Clear the input field
		} catch (error) {
			// Handle error (e.g., show an error message)
			console.error('Failed to subscribe:', error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<div className="px-6 pt-14 lg:px-8">
				<div
					aria-hidden="true"
					className=" absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className=" left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-white opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					/>
				</div>

				<div className="h-[40rem] flex flex-col justify-center  items-center px-4">
					<Image src="/catchup-hero.png" alt="Hero" width={1155} height={678} />

					<CardHoverEffectDemo />

					<h2 className="my-8 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black gap-1">
						Subscribe to topics
					</h2>
					<PlaceholdersAndVanishInput
						placeholders={placeholders}
						onChange={handleChange}
						onSubmit={onSubmit}
						value={topic}
						setValue={setTopic}
					/>
					{/* <h3 className="mt-2">Subscribe topics</h3> */}
				</div>
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-white opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					/>
				</div>
			</div>
			{isLoading && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
					<Loader2 className="h-8 w-8 text-white animate-spin" />
				</div>
			)}
		</>
	);
}
