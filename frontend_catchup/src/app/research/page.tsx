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
interface ImpactItem {
  num: number;
  url: string;
  title: string;
  authors: string;
  time: string;
  abstract: string;
  arxiv: string;
}
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
      <div className="p-2 md:p-10 rounded-tl-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
        {/* boxes */}

        {impact.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              key={index}
              className="h-[18rem] w-full p-4 rounded-2xl bg-gray-100 inset-1"
            >
              <h2>{impact[index].title}</h2>
              <h3>{impact[index].time}</h3>
              <h2>
                Arxiv link:
                <h2 className="text-blue-500">
                  <Link href={impact[index].arxiv}>
                    {" "}
                    {articleJson[index].post_url || articleJson[index].url}
                  </Link>
                </h2>
              </h2>
              <TextGenerateEffect words={articleJson[index].summary} />
              author:
              <h1>{articleJson[index].creator || ""}</h1>
            </div>
            <div className="flex flex-col w-[50rem] gap-5">
              {/* impact bar*/}
              <div
                key={index}
                className="w-full h-min p-4 rounded-2xl bg-gray-100 m-1"
              >
                {/* <TextGenerateEffect words={words} /> */}
                <div className="flex justify-center w-full pb-2 font-bold">
                  How impactful to me?
                </div>
                <div className="w-full ">
                  <Progress value={item.num} />
                </div>
              </div>
              {/* impact bar*/}
              {/* comment section*/}
              <div
                key={index}
                className="w-full h-min p-4 rounded-2xl bg-gray-100 m-1"
              >
                {/* <TextGenerateEffect words={words} /> */}

                <div className="w-full flex flex-col">
                  <Textarea />
                  <button className="min-w-20 h-10 border-2 rounded-xl">
                    submit
                  </button>
                  {/* comment input and button */}
                </div>
              </div>
              {/* comment section*/}
            </div>
          </div>
        ))}

        {/* */}
      </div>
    </div>
  );
};
