'use client';

import { useState, useEffect, forwardRef } from 'react';
import { getUserProfile, updateUserProfile } from '@/lib/actions/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
	const [researchField, setResearchField] = useState('');
	const [bio, setBio] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadProfile() {
			try {
				const profile = await getUserProfile();
				setResearchField(profile.researchField || '');
				setBio(profile.bio || '');
			} catch (err) {
				setError('Failed to load profile');
			} finally {
				setIsLoading(false);
			}
		}
		loadProfile();
	}, []);

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			await updateUserProfile(researchField, bio);
			// Optionally show a success message here
		} catch (err) {
			setError('Failed to update profile');
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<Card className="w-1/2 min-h-[600px] flex flex-col">
			<CardHeader>
				<CardTitle>Profile</CardTitle>
				<CardDescription>Update your research field and bio</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit} className="flex flex-col flex-grow">
				<CardContent className="flex-grow">
					<div className="grid w-full items-center gap-8 h-full">
						<div className="flex flex-col space-y-3">
							<Label htmlFor="researchField">Research Field</Label>
							<Input
								id="researchField"
								value={researchField}
								onChange={e => setResearchField(e.target.value)}
								className="w-full"
							/>
						</div>
						<div className="flex flex-col space-y-3 flex-grow">
							<Label htmlFor="bio">Bio</Label>
							<Textarea
								id="bio"
								value={bio}
								onChange={e => setBio(e.target.value)}
								className="w-full flex-grow resize-none"
								rows={20}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit" disabled={isLoading} className="w-full">
						{isLoading ? 'Updating...' : 'Save changes'}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
