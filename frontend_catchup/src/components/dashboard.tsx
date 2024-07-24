import articleJson from "@/lib/articles.json";
import CommentBox from "@/components/comment-sidebar";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { MouseEvent } from "react";
import SelectArticleSidebar from "./select-article-sidebar";


interface Comment {
  text: string;
  author: string;
  time: string;
  likes: number;
  authorPosition: string;
}

//comments 1 2 3 4 correspond to indexes of the articles in the articleJson
const comments1: Comment[] = [
  {
    text: "This is a great article!",
    author: "John Doe",
    time: "2 hours ago",
    likes: 10,
    authorPosition: "Marketing",
  },
  {
    text: "I found this very insightful.",
    author: "Jane Smith",
    time: "1 hour ago",
    likes: 5,
    authorPosition: "UI/UX Designer",
  },
  {
    text: "Thanks for sharing this information.",
    author: "Michael Johnson",
    time: "30 minutes ago",
    likes: 3,
    authorPosition: "Developer",
  },
];

const comments2: Comment[] = [
  {
    text: "This is a great article!",
    author: "John Doe",
    time: "2 hours ago",
    likes: 10,
    authorPosition: "Marketing",
  },
];

const comments3: Comment[] = [
  {
    text: "Thanks for sharing this information.",
    author: "Michael Johnson",
    time: "30 minutes ago",
    likes: 3,
    authorPosition: "Developer",
  },
];

const comments4: Comment[] = [
  {
    text: "This is a great article!",
    author: "John Doe",
    time: "2 hours ago",
    likes: 10,
    authorPosition: "Marketing",
  },
];

export default function Dashboard() {
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number | null>(null);

  function selectArticle(index:number):void{
    setSelectedArticleIndex(index);
  }


  //should be replaced with mongodb fetch in the future. This is for demo purposes.
  const getCommentsForArticle = (index: number): Comment[] => {
      switch (index) {
        case 0:
          return comments1;
        case 1:
          return comments2;
        case 2:
          return comments3;
        case 3:
          return comments4;
        default:
          return [];
      }
    };

  return (
    
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 h-screen overflow-scroll">
        {/* summary boxes */}

        {articleJson.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              key={index}
              className="lg:w-full p-4 rounded-2xl bg-gray-100 border-2"
            >
              <div className="flex justify-between pr-6">
                <h2 className="font-bold">{articleJson[index].title}</h2>
                <div className="flex  items-center p-1 gap-2 ">
                  <h2 className="lowercase px-2 rounded-full bg-blue-400 text-white text-sm">
                    {articleJson[index].type}
                  </h2>
                  <h2 className="lowercase px-2 rounded-full bg-green-400 text-white text-sm">
                    LOW
                  </h2>
                </div>
              </div>
              {/*Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger 
                  className="text-sm" 
                  onClick={(event: MouseEvent<HTMLButtonElement>) => selectArticle(index)}
                  >
                    Read more
                  </AccordionTrigger>
                  <AccordionContent>
                    <h3>{articleJson[index].time}</h3>
                    <TextGenerateEffect words={articleJson[index].summary} />
                    <div className="flex gap-1 mt-4">
                      <h1>author:</h1>
                      <h1>{articleJson[index].creator || ""}</h1>{" "}
                    </div>
                    <div className="flex gap-1">
                      Arxiv link:
                      <h2 className="text-blue-500">
                        <a href={articleJson[index].post_url}>
                          {articleJson[index].post_url}
                        </a>
                      </h2>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/*Accordion */}

              <h2 className="font-thin text-sm">
                {articleJson[index].time_created}
              </h2>
            </div>
          </div>
        ))}
        {/* summary boxes */}
      </div>
      {/* comment section*/}
      {selectedArticleIndex !== null ? (
          <CommentBox comments={getCommentsForArticle(selectedArticleIndex)} />
        ) : (
            <SelectArticleSidebar /> // Replace with whatever you want to show in the else case
          )}
      { /* comment section*/ }
    </div>
  );
};
