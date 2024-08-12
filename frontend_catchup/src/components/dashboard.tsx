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
  {
    "text": "I have to say, this article is one of the best I’ve read on this topic. The depth of research and the clarity in presenting complex concepts are truly commendable. I particularly appreciated the section on emerging trends and how they might impact the industry. The examples provided were very illustrative and helped in understanding the potential future directions. Overall, this piece has provided me with valuable insights that I can apply to my own work and discussions with colleagues. I’ll definitely be recommending this to my network and revisiting it for reference in the future.",
    "author": "Emily Clarke",
    "time": "3 hours ago",
    "likes": 12,
    "authorPosition": "Content Strategist"
  },
  {
    "text": "What a fantastic read! The author has done an exceptional job of breaking down the subject matter into easily digestible sections. I especially enjoyed the detailed analysis of the current market landscape and the predictions made for the coming years. It’s rare to find articles that manage to combine thorough research with practical advice so seamlessly. The writing style was engaging and kept me hooked throughout. I found the case studies particularly useful for understanding real-world applications of the concepts discussed. This article is a great resource for anyone looking to deepen their knowledge in this field.",
    "author": "Alex Turner",
    "time": "2 hours ago",
    "likes": 7,
    "authorPosition": "Business Analyst"
  },
  {
    "text": "Thank you for this enlightening article. It’s clear that a lot of effort went into researching and compiling the information presented. The way you addressed the challenges faced by professionals in the industry and provided actionable solutions is very helpful. I was particularly impressed with the section that covered recent innovations and how they are shaping the future. This article has sparked some new ideas for projects I’m working on, and I’m excited to explore them further. It’s articles like these that make a real difference in advancing knowledge and fostering innovation.",
    "author": "Sophia Davis",
    "time": "45 minutes ago",
    "likes": 8,
    "authorPosition": "Research Scientist"
  },
  {
    "text": "I found this article to be incredibly informative and well-structured. The author did a great job of providing a comprehensive overview of the topic while also diving into specific details that are often overlooked. The data presented was up-to-date and relevant, and the conclusions drawn were insightful. I particularly appreciated the section that compared different methodologies and their effectiveness. This is a valuable resource for anyone involved in the field and will definitely be bookmarking it for future reference. Kudos to the author for putting together such a thorough and thought-provoking piece.",
    "author": "Liam Patel",
    "time": "1 hour ago",
    "likes": 9,
    "authorPosition": "Project Manager"
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
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<
    number | null
  >(null);

  function selectArticle(index: number): void {
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
      <div className="p-2 dark:border-neutral-700 bg-primary dark:bg-neutral-900 flex flex-col gap-2 h-screen overflow-scroll">
        {/* summary boxes */}

        {articleJson.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              key={index}
              className="lg:w-full p-4 rounded-md bg-primary-foreground border-2"
            >
              <div className="flex justify-between pr-6">
                <h2 className="font-bold text-xl">{articleJson[index].title}</h2>
                <div className="flex  items-center p-1 gap-2 ">
                  <h2 className="lowercase px-2 rounded-full bg-blue-400 text-white text-md">
                    {articleJson[index].type}
                  </h2>
                  <h2 className="lowercase px-2 rounded-full bg-green-400 text-white text-md">
                    LOW
                  </h2>
                </div>
              </div>
              {/*Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className="text-sm"
                    onClick={(event: MouseEvent<HTMLButtonElement>) =>
                      selectArticle(index)
                    }
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
      {/* comment section*/}
    </div>
  );
}
