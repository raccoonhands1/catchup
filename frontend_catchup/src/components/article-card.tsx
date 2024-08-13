import { MouseEvent, useState, useEffect } from 'react';
import { TextGenerateEffect } from '@/components/text-generate-effect';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/types';
interface ArticleCardProps {
	article: Article;
	onClick: (id: number) => void;
}
export default function ArticleCard({ article, onClick }: ArticleCardProps) {
	function getSeverityColor(severity: string): string {
		switch (severity.toLowerCase()) {
			case 'high':
				return 'bg-red-500 text-white';
			case 'mid':
				return 'bg-yellow-500 text-black';
			case 'low':
				return 'bg-green-500 text-white';
			default:
				return 'bg-gray-500 text-white';
		}
	}

	return (
		<Card key={article.id} className="w-full">
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					<span>{article.title}</span>
					<div className="flex gap-2">
						<Badge variant="secondary">{article.arxivId}</Badge>
						<Badge variant="outline">
							{new Date(article.published).toLocaleDateString()}
						</Badge>
						<Badge className={getSeverityColor(article.severity)}>
							{article.severity}
						</Badge>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger
							onClick={() => {
								onClick(article.id);
							}}
						>
							Read more
						</AccordionTrigger>
						<AccordionContent>
							<TextGenerateEffect words={article.summary} />
							<div className="mt-4">
								<p>
									<strong>Authors:</strong> {article.authors}
								</p>
								<p>
									<strong>PDF:</strong>{' '}
									<a
										href={article.pdf}
										className="text-blue-500 hover:underline"
									>
										{article.pdf}
									</a>
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
}
