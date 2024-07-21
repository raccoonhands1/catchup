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
  // {
  //   num: 10, // value of impact/ severity
  //   words: `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths.`, //summary
  // },
  // {
  //   num: 50,
  //   words: `This code introduces a button that, when clicked, increments the value of`,
  // },
  // {
  //   num: 90,
  //   words: `Add a Button to Trigger the Update: Include a button in the JSX that, when impact.number.`,
  // },
  {
    num: 40,
    url: "https://arxiv.org/abs/2407.12795",
    title: "How to make a button",
    authors:
      "Ethan Mollick, Lilach Mollick, Natalie Bach, LJ Ciccarelli, Ben Przystanski, Daniel Ravipinto",
    time: "19 July 2024",
    abstract:
      "This paper explores the potential of generative AI in creating adaptive educational simulations. By leveraging a system of multiple AI agents, simulations can provide personalized learning experiences, offering students the opportunity to practice skills in scenarios with AI-generated mentors, role-players, and instructor-facing evaluators. We describe a prototype, PitchQuest, a venture capital pitching simulator that showcases the capabilities of AI in delivering instruction, facilitating practice, and providing tailored feedback. The paper discusses the pedagogy behind the simulation, the technology powering it, and the ethical considerations in using AI for education. While acknowledging the limitations and need for rigorous testing, we propose that generative AI can significantly lower the barriers to creating effective, engaging simulations, opening up new possibilities for experiential learning at scale.",
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
              className="h-[40rem] w-full p-4 rounded-2xl bg-gray-100 inset-1"
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
