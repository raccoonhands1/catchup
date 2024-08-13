import { CommentBoxProps } from '@/lib/types';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';

export default function CommentBox({ comments }: CommentBoxProps) {
	function getInitials(name: string): string {
		return name
			.split(' ')
			.map(word => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	return (
		<Card className="w-[50rem]">
			<CardHeader>
				<CardTitle>Discussion</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<Separator className="my-4" />
				{comments.length === 0
					? comments.length === 0 && (
							<div className="text-center text-gray-500 py-4">
								No comments yet. Be the first to comment!
							</div>
					  )
					: comments.map((comment, index) => (
							<Card key={index}>
								<CardContent className="pt-6">
									<div className="flex items-center space-x-2 mb-2">
										<Avatar>
											<AvatarImage>{getInitials(comment.author)}</AvatarImage>

											<AvatarFallback>{comment.author[0]}</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold text-sm">{comment.author}</p>
											<p className="text-xs text-muted-foreground">
												{comment.authorPosition}
											</p>
										</div>
									</div>
									<p className="mb-2">{comment.text}</p>
									<div className="flex items-center justify-between text-sm text-muted-foreground">
										<span>{comment.time}</span>
										<Button variant="ghost" size="sm">
											<Heart className="h-4 w-4 mr-2" />
											Like
										</Button>
									</div>
								</CardContent>
							</Card>
					  ))}
			</CardContent>
			<CardFooter>
				<div className="flex flex-1 ">
					<Input placeholder="Add a comment..." className="flex-1" />
					<Button>Post</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
