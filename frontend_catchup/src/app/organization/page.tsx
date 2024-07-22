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
interface ImpactItem {
  num: number;
  url: string;
  title: string;
  authors: string;
  time: string;
  abstract: string;
}
const impact: ImpactItem[] = [
  {
    num: 52,
    url: "https://arxiv.org/abs/2407.12795",
    title: "So you think you know box shadows?",
    authors: "Yohannesk",
    time: "19 July 2024",
    abstract:
      "An in-depth exploration of box shadows in CSS, discussing common misconceptions and advanced techniques for better design.",
  },
  {
    num: 83,
    url: "https://arxiv.org/abs/2407.12800",
    title: "Mining JIT traces for missing optimizations with Z3",
    authors: "Matt D.",
    time: "20 July 2024",
    abstract:
      "A detailed analysis on how to use Z3 to find missing optimizations in Just-In-Time (JIT) compiled code, focusing on improving performance.",
  },
  {
    num: 37,
    url: "https://arxiv.org/abs/2407.12801",
    title: "rr – record and replay debugger for C/C++",
    authors: "Lev Zettelin",
    time: "18 July 2024",
    abstract:
      "An introduction to rr, a debugger for C/C++ that allows recording and replaying of program execution, making debugging more efficient.",
  },
  {
    num: 68,
    url: "https://arxiv.org/abs/2407.12802",
    title:
      "What is the significance of the character 'j' at the end of a Roman Numeral?",
    authors: "Kamaraju",
    time: "17 July 2024",
    abstract:
      "A historical analysis on the use of the character 'j' in Roman numerals, exploring its origins and significance.",
  },
  {
    num: 91,
    url: "https://arxiv.org/abs/2407.12803",
    title:
      "Atlassian research highlights major disconnect between developers and leaders",
    authors: "Layer 8",
    time: "21 July 2024",
    abstract:
      "Recent research by Atlassian reveals significant gaps in communication and expectations between software developers and organizational leaders.",
  },
  {
    num: 14,
    url: "https://arxiv.org/abs/2407.12804",
    title: "A brief history of Dell Unix",
    authors: "Fanf2",
    time: "20 July 2024",
    abstract:
      "An overview of the history of Dell's Unix operating system, detailing its development and impact on the tech industry.",
  },
  {
    num: 45,
    url: "https://arxiv.org/abs/2407.12805",
    title: "GPG and Me",
    authors: "Udev4096",
    time: "22 July 2024",
    abstract:
      "A personal account of experiences using GPG for secure communication, discussing challenges and benefits.",
  },
  {
    num: 9,
    url: "https://arxiv.org/abs/2407.12806",
    title: "Inkbase: Programmable Ink",
    authors: "Surprise Talk",
    time: "19 July 2024",
    abstract:
      "An exploration of Inkbase, a technology allowing programmable ink, enabling new forms of digital and physical interactions.",
  },
  {
    num: 29,
    url: "https://arxiv.org/abs/2407.12807",
    title: "PgManage: Modern, cross platform graphical database client",
    authors: "Thunder Bong",
    time: "20 July 2024",
    abstract:
      "Introduction to PgManage, a modern graphical database client that supports multiple platforms, aimed at improving database management.",
  },
  {
    num: 64,
    url: "https://arxiv.org/abs/2407.12808",
    title:
      "Trellis (YC W24) is hiring engineer to build AI-powered ETL for unstructured data",
    authors: "Trellis Team",
    time: "21 July 2024",
    abstract:
      "Trellis, a YC W24 startup, is looking for engineers to develop AI-powered ETL solutions for handling unstructured data.",
  },
];

export default function SidebarDemo() {
  const links = [
    {
      label: " ",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
              className="h-[10rem] w-full p-4 rounded-2xl bg-gray-100 inset-1"
            >
              <h2>{impact[index].title}</h2>
              <h3>{impact[index].time}</h3>
              <TextGenerateEffect words={impact[index].abstract} />
              <TextGenerateEffect words={impact[index].authors} />
            </div>
            <div className="flex flex-col w-[50rem] gap-5">
              {/* impact bar*/}
              <div
                key={index}
                className="w-full h-min p-4 rounded-2xl bg-gray-100 m-1"
              >
                {/* <TextGenerateEffect words={words} /> */}
                <div className="flex justify-center w-full pb-2 font-bold">
                  How impactful to my organization?
                </div>
                <div className="w-full ">
                  <Progress value={item.num} />
                </div>
              </div>
              {/* impact bar*/}
            </div>
          </div>
        ))}

        {/* */}
      </div>
    </div>
  );
};
