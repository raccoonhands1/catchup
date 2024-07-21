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
import { CardDemo } from "@/components/goodCard";
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
              className=" w-full p-4 rounded-2xl bg-gray-100 inset-1"
            >
              <h1 className="text-xl font-bold">
                Here are some examples of completed JIRA epics across various
                industries:
              </h1>
              <h1 className="text-lg font-bold">
                1. Epic: Implement User Authentication System
              </h1>
              <h2>
                {" "}
                - Description: Transition all backend services to Kubernetes for
                better scalability and manageability.
                <br />- User Stories: - As a developer, I want to containerize
                the existing backend services.
                <br />- As an operations engineer, I want to deploy services on
                Kubernetes clusters.
                <br />- As a team, we need to ensure all services are monitored
                and logging is enabled.
                <br />
                <span className="text-green-500">Status: Completed</span>
              </h2>
              <h1 className="text-lg font-bold">
                2. Epic: Migrate Backend Services to Kubernetes
              </h1>
              <h2>
                {" "}
                - Description: Transition all backend services to Kubernetes for
                better scalability and manageability.
                <br />- User Stories: - As a developer, I want to containerize
                the existing backend services.
                <br />- As an operations engineer, I want to deploy services on
                Kubernetes clusters.
                <br />- As a team, we need to ensure all services are monitored
                and logging is enabled.
                <br /> <span className="text-green-500">Status: Completed</span>
              </h2>

              <h1 className="text-xl font-bold">
                Here are some examples of completed JIRA epics across various
                industries:
              </h1>
              <h1 className="text-lg font-bold">
                3. Epic: Redesign Checkout Process
              </h1>
              <h2>
                - Description: Improve the checkout process to reduce cart
                abandonment rates.
                <br />- User Stories:
                <br /> - As a user, I want a simplified and intuitive checkout
                flow.
                <br /> - As a user, I want to save my payment information for
                future purchases.
                <br /> - As a business, we need to integrate with multiple
                payment gateways.
                <br />
                <span className="text-green-500">Status: Completed</span>
              </h2>
              <h1 className="text-lg font-bold">
                4. Epic: Implement Recommendation Engine
              </h1>
              <h2>
                - Description: Develop a recommendation engine to enhance user
                shopping experience.
                <br />- User Stories:
                <br /> - As a user, I want personalized product recommendations
                based on my browsing history.
                <br /> - As a user, I want to see similar products when viewing
                an item.
                <br /> - As a developer, I want to integrate machine learning
                models to generate recommendations.
                <br />
                <span className="text-green-500">Status: Completed</span>
              </h2>
              <h1 className="text-lg font-bold">
                5. Epic: Patient Portal Enhancement
              </h1>
              <h2>
                - Description: Enhance the patient portal to provide better
                access to medical records and appointment scheduling.
                <br />- User Stories:
                <br /> - As a patient, I want to view my medical history and
                test results online.
                <br /> - As a patient, I want to book, reschedule, and cancel
                appointments through the portal.
                <br /> - As a doctor, I want to send reminders and notifications
                to patients via the portal.
                <br />
                <span className="text-green-500">Status: Completed</span>
              </h2>
              <h1 className="text-lg font-bold">
                6. Epic: Telehealth Integration
              </h1>
              <h2>
                - Description: Integrate telehealth services to allow virtual
                consultations with healthcare providers.
                <br />- User Stories:
                <br /> - As a patient, I want to schedule and attend virtual
                consultations with my doctor.
                <br /> - As a doctor, I want to manage virtual appointments and
                access patient records during consultations.
                <br /> - As a system admin, I want to ensure the platform
                complies with healthcare data security regulations.
                <br />
                <span className="text-green-500">Status: Completed</span>
              </h2>
              <h1 className="text-lg font-bold">
                7. Epic: Automated Financial Reporting
              </h1>
              <h2>
                - Description: Develop an automated system for generating
                financial reports.
                <br />- User Stories:
                <br /> - As a financial analyst, I want to automate monthly
                financial report generation.
                <br /> - As a manager, I want real-time access to financial data
                dashboards.
                <br /> - As an accountant, I want to ensure all financial data
                is accurate and compliant with regulations.
                <br />
                <span className="text-green-500">Status: Completed</span>
              </h2>
              <h1 className="text-lg font-bold">
                8. Epic: Fraud Detection System
              </h1>
              <h2>
                - Description: Implement a system to detect and prevent
                fraudulent transactions.
                <br />- User Stories:
                <br /> - As a customer, I want to be notified of any suspicious
                activity on my account.
                <br /> - As a security analyst, I want to identify and block
                fraudulent transactions in real-time.
                <br /> - As a developer, I want to use machine learning
                algorithms to improve fraud detection accuracy.
                <br />
                <span className="text-green-500">Status: Completed</span>
              </h2>
            </div>
          </div>
        ))}

        {/* */}
      </div>
    </div>
  );
};
