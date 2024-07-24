"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bars3BottomLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { IconArrowBigLeftLines } from "@tabler/icons-react";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import articleJson from "@/lib/articles.json";
import CommentBox from "@/components/comment-sidebar";
import SelectArticleSidebar from "@/components/select-article-sidebar";
import { MouseEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { comment } from "postcss";


interface Comment {
  text: string;
  author: string;
  time: string;
  likes: number;
  authorPosition: string;
}

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


export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-20 ">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {articleJson.map((tags, idx) => (
                <SidebarLink
                  key={idx}
                  label={articleJson[idx].tags[0]}
                  className=" rounded-xl p-1 flex"
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

// Dummy dashboard component with content
const Dashboard = () => {
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number | null>(null);

  function selectArticle(index:number):void{
    setSelectedArticleIndex(index);
  }

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
              <div className="flex justify-between pr-10">
                <h2 className="font-bold">{articleJson[index].title}</h2>
                <div className="flex  items-center p-1 gap-2 ">
                  <h2 className="border border-black uppercase px-2 py-1 rounded-md bg-blue-500 text-white">
                    {articleJson[index].type}
                  </h2>
                  <h2 className="border border-black uppercase px-2 py-1 rounded-md bg-green-500 text-white">
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
