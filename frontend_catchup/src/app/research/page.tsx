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

interface ImpactItem {
  num: number;
  words: string;
}
const impact: ImpactItem[] = [
  {
    num: 10,
    words: `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths.`,
  },
  {
    num: 50,
    words: `This code introduces a button that, when clicked, increments the value of`,
  },
  {
    num: 90,
    words: `Add a Button to Trigger the Update: Include a button in the JSX that, when impact.number.`,
  },
  {
    num: 40,
    words: `Calls the function to update impact.number. Add a Button to Trigger the at, when clicked`,
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
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
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
      <div className="p-2 md:p-10 rounded-tl-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {/* boxes */}

        {impact.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div
              key={index}
              className="h-[10rem] w-full p-4 rounded-2xl bg-gray-100 inset-1"
            >
              <TextGenerateEffect words={impact[index].words} />
            </div>
            <div key={index} className="w-full p-4 rounded-2xl bg-gray-100">
              {/* <TextGenerateEffect words={words} /> */}
              <div className="flex justify-center w-full pb-2 font-bold">
                How impactful to your startup?
              </div>
              <div className="w-full ">
                <Progress value={item.num} />
              </div>
            </div>
          </div>
        ))}

        {/* */}
      </div>
    </div>
  );
};
