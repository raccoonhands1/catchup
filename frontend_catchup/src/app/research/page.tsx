"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Bars3BottomLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { IconArrowBigLeftLines } from "@tabler/icons-react";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { Progress } from "@/components/ui/progress";
import { InputForm } from "@/components/input-form";
import { Textarea } from "@/components/ui/textarea";
import articleJson from "@/lib/articles.json";

interface Comment {

  text: string;
  author: string;
  time: string;
  likes: number;
  position: string;
}

interface ImpactItem {
  num: number;
  url: string;
  title: string;
  authors: string;
  time: string;
  abstract: string;
  arxiv: string;
}


const comments: Comment[] = [
  {
    text: "This is a great article!",
    author: "John Doe",
    time: "2 hours ago",
    likes: 10,
    position: "Marketing",
  },
  {
    text: "I found this very insightful.",
    author: "Jane Smith",
    time: "1 hour ago",
    likes: 5,
    position: "UI/UX Designer",
  },
  {
    text: "Thanks for sharing this information.",
    author: "Michael Johnson",
    time: "30 minutes ago",
    likes: 3,
    position: "Developer",
  },
];

const impact: ImpactItem[] = [
  {
    num: 23,
    url: "https://example.com/success/2407.12795",
    title: "The Art of Setting Achievable Goals",
    authors: "Jane Doe",
    time: "19 July 2024",
    abstract:
      "A comprehensive guide on how to set realistic and achievable goals to ensure continuous personal and professional growth.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 89,
    url: "https://example.com/success/2407.12800",
    title: "Mastering Time Management for Optimal Productivity",
    authors: "John Smith",
    time: "20 July 2024",
    abstract:
      "Strategies and techniques for managing time effectively to enhance productivity and achieve work-life balance.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 45,
    url: "https://example.com/success/2407.12801",
    title: "Building Resilience in Challenging Times",
    authors: "Emily Johnson",
    time: "18 July 2024",
    abstract:
      "Insights into building resilience and mental toughness to navigate through life's challenges and setbacks.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 67,
    url: "https://example.com/success/2407.12802",
    title: "The Power of Positive Thinking",
    authors: "Michael Lee",
    time: "17 July 2024",
    abstract:
      "Exploring the impact of positive thinking on personal success and well-being, backed by scientific research.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 12,
    url: "https://example.com/success/2407.12803",
    title: "Effective Communication Skills for Leaders",
    authors: "Samantha Brown",
    time: "21 July 2024",
    abstract:
      "Essential communication skills for leaders to inspire, motivate, and lead their teams to success.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 78,
    url: "https://example.com/success/2407.12804",
    title: "Financial Planning for Long-term Success",
    authors: "David White",
    time: "20 July 2024",
    abstract:
      "A practical approach to financial planning to secure long-term financial stability and success.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 34,
    url: "https://example.com/success/2407.12805",
    title: "Developing a Growth Mindset",
    authors: "Laura Martinez",
    time: "22 July 2024",
    abstract:
      "Understanding the importance of a growth mindset and how to cultivate it for personal and professional development.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 58,
    url: "https://example.com/success/2407.12806",
    title: "The Role of Networking in Career Advancement",
    authors: "Kevin Thompson",
    time: "19 July 2024",
    abstract:
      "Tips and strategies for effective networking to enhance career opportunities and professional growth.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 6,
    url: "https://example.com/success/2407.12807",
    title: "Balancing Work and Personal Life",
    authors: "Rachel Green",
    time: "20 July 2024",
    abstract:
      "Techniques for achieving a healthy work-life balance to maintain well-being and productivity.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
  {
    num: 93,
    url: "https://example.com/success/2407.12808",
    title: "Embracing Change for Personal Growth",
    authors: "James Anderson",
    time: "21 July 2024",
    abstract:
      "How to embrace and adapt to change to foster personal growth and seize new opportunities.",
    arxiv: "https://arxiv.org/abs/2407.12795",
  },
];

export default function SidebarDemo() {
  const links = [
    {
      label: "Techcrunch",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "BBC",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "CNN",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Hacker News",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {/* <div>
            <SidebarLink
              link={{
                label: "",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div> */}
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
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
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
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <Bars3BottomLeftIcon aria-hidden="true" className="h-6 w-6" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 h-screen overflow-scroll">
        {/* boxes */}

        {impact.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              key={index}
              className="h-[18rem] w-full p-4 rounded-2xl bg-gray-100 inset-1"
            >
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <h3 className="text-slate-500">{item.time}</h3>
              <h2>
                Arxiv link:
                <div className="text-blue-500">
                  <Link href={impact[index].arxiv}>
                    {" "}
                    {articleJson[index].post_url || articleJson[index].url}
                  </Link>
                </div>
              </h2>
              <TextGenerateEffect words={articleJson[index].summary} />
              author:
              <h1>{articleJson[index].creator || ""}</h1>
            </div>
          </div>
        ))}

        {/* */}
      </div>


      {/* comments area */}
      <div className="flex bg-transparent gap-5 h-full w-[50rem]">    
          <div className="p-2 md:pt-6 md:pl-8 md:pr-8 rounded-tl-3xl rounded-l-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-2">
              <h1 className="font-semibold text-lg">
                discussion
              </h1>
              <hr className="my-2 border-t-2 border-neutral-200 dark:border-neutral-700 w-full" />

              {comments.map((comment, index) => (
                <div key={index} className="flex gap-2">
                  <div
                    key={index}
                    className="w-full p-4 rounded-xl bg-gray-100 inset-1"
                  >
                    <div className="flex-row flex items-center">
                      <h1 className="font-semibold text-sm">{comment.author}</h1>
                      <h1 className="text-xs px-1 text-slate-500 ">{" • " + comment.position}</h1>
                    </div>
                    <h2 className="">{comment.text}</h2>
                    <h3 className="text-sm text-slate-500">{comment.time}</h3>

                    <svg
                      className="mr-auto justify-right mt-2 cursor-pointer h-5 w-5"
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
                    </svg>
                  </div>
                </div>

              ))}
            </div>
            <div className="inset-x-0 flex-row flex bottom-0">
              <div className="flex border-lg border-black bg-gray-200 min-h-10 rounded-2xl flex-1 items-center">
                <input 
                  placeholder="add a comment..." 
                  className="flex-1 outline-none bg-transparent h-full px-6">
                </input>
                <svg
                  className="w-6 h-6 text-gray-500 cursor-pointer mr-6"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
                  <path d="M4.285 9.567a.5.5 0 01.683.183A3.498 3.498 0 008 11.5a3.498 3.498 0 003.032-1.75.5.5 0 11.866.5A4.498 4.498 0 018 12.5a4.498 4.498 0 01-3.898-2.25.5.5 0 01.183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                </svg>
              </div>
              <button className="bg-blue-500 rounded-2xl font-semibold px-8 text-white py-2 ">
                post
              </button>
            </div>
          </div>
      </div>
      {/* end of comments area */}
    </div>
  );
};
