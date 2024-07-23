"use client";
import React, { useState, useEffect } from "react";
import articleJson from "@/lib/articles.json";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);

  const loop = false; // This might be dynamic in your actual code

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        // Action to perform after duration ends
        setLoading(false);
        setShowDashboard(true);
      }, 2000); // Assuming '100' is the duration in milliseconds

      // Cleanup function to clear the timeout
      return () => clearTimeout(timer);
    }
  }, [loading]); // This effect depends on the `loop` state
  return (
    <div className="w-full flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader
        loadingStates={articleJson.map((title) => ({
          text: title.title,
        }))}
        loading={loading}
        duration={100}
        loop={false}
      />

      {showDashboard && <Dashboard />}
    </div>
  );
}

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-3xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
        {/* boxes */}

        {articleJson.map((item, index) => (
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
