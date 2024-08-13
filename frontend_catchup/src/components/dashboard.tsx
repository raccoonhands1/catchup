import { useState, useEffect } from 'react';
import CommentBox from '@/components/comment-sidebar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileX, Info } from 'lucide-react';
import SelectArticleSidebar from './select-article-sidebar';
import useTopicStore from '@/lib/store/ui';
import { getArticlesForTopic } from '@/lib/actions/api';
import { Article } from '@/lib/types';
import ArticleCard from './article-card';
import { Loader2 } from 'lucide-react';
import { Card } from './card-hover-effect';
import { CardContent } from './ui/card';

export default function Dashboard() {
	const { selectedTopic } = useTopicStore();
	const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
		null
	);
	const [articles, setArticles] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchArticles() {
			if (selectedTopic) {
				setIsLoading(true);
				setError(null);
				try {
					const fetchedArticles = await getArticlesForTopic(selectedTopic.name);
					setArticles(fetchedArticles);
				} catch (err) {
					setError((err as Error).message);
				} finally {
					setIsLoading(false);
				}
			} else {
				setArticles([]);
			}
		}

		fetchArticles();
	}, [selectedTopic]);

	function selectArticle(index: number): void {
		setSelectedArticleId(index);
	}

	const getCommentsForArticle = (id: number) => {
		console.log(`getting comments for article id ${id}`);
		// TODO: get comments
		return [];
	};

	return (
		<div className="flex flex-1">
			<div className="p-2 md:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 h-screen overflow-scroll flex-grow w-full">
				{!selectedTopic ? (
					<div className="flex w-full justify-center items-center h-full">
						<Alert className="w-full max-w-2xl">
							<Info className="h-4 w-4" />
							<AlertTitle>No topic selected</AlertTitle>
							<AlertDescription>
								Please select a topic from the sidebar to view its content.
							</AlertDescription>
						</Alert>
					</div>
				) : (
					<>
						<h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 pb-2 inline-block">
							{selectedTopic?.name || 'Select a Topic'}
						</h2>
						{isLoading && (
							<div className="flex items-center justify-center p-4">
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								<span>Loading articles...</span>
							</div>
						)}
						{error && (
							<Alert variant="destructive">
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						{!isLoading &&
							!error &&
							(articles.length > 0 ? (
								articles.map(article => (
									<ArticleCard
										article={article}
										key={article.id}
										onClick={selectArticle}
									/>
								))
							) : (
								<Card className="w-full">
									<CardContent className="flex flex-col items-center justify-center py-10">
										<FileX className="h-12 w-12 text-gray-400 mb-4" />
										<p className="text-lg font-medium text-gray-900">
											No articles found
										</p>
										<p className="text-sm text-gray-500">
											Try adjusting your search or filters
										</p>
									</CardContent>
								</Card>
							))}
					</>
				)}
			</div>
			{selectedArticleId !== null ? (
				<CommentBox comments={getCommentsForArticle(selectedArticleId)} />
			) : (
				<SelectArticleSidebar />
			)}
		</div>
	);
}
