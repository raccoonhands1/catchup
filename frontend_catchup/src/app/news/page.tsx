'use client';
import { useEffect, useState } from 'react';
import { getHackerNewsArticles } from '@/lib/actions/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Loader2 } from 'lucide-react';
import { HNArticle } from '@/lib/types';

export default function HackerNewsPage() {
	const [articles, setArticles] = useState<HNArticle[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const fetchedArticles = await getHackerNewsArticles();
				setArticles(fetchedArticles);
			} catch (error) {
				console.error('Error fetching articles:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchArticles();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="h-12 w-12 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Hacker News Articles</h1>
			{articles.length === 0 ? (
				<p className="text-center text-gray-500">No articles found.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{articles.map(article => (
						<Card
							key={article.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<CardTitle className="text-lg">
									<a
										href={article.url}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:underline flex items-center"
									>
										{article.title}
										<ExternalLink className="ml-2 h-4 w-4" />
									</a>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex justify-between items-center mb-2">
									<Badge variant="secondary">{article.points} points</Badge>
									<span className="text-sm text-gray-500">
										by {article.author}
									</span>
								</div>
								<time className="text-sm text-gray-500">
									{new Date(article.published).toLocaleDateString()}
								</time>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
