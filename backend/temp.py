import requests
import os

BEARERTOKEN=os.get("WORDWARAE")

url = "https://app.wordware.ai/api/released-app/68fae85b-580c-4165-b7f7-910343740930/run"
headers = {
    "Authorization": BEARERTOKEN,
    "Content-Type": "application/json"
}

val = """
  Here are some examples of completed JIRA epics across various industries:

### Software Development
1. **Epic: Implement User Authentication System**
   - Description: Develop and integrate a secure user authentication system for the application.
   - User Stories:
     - As a user, I want to be able to sign up using my email and password.
     - As a user, I want to log in using my credentials.
     - As a user, I want to reset my password if I forget it.
   - Status: Completed

2. **Epic: Migrate Backend Services to Kubernetes**
   - Description: Transition all backend services to Kubernetes for better scalability and manageability.
   - User Stories:
     - As a developer, I want to containerize the existing backend services.
     - As an operations engineer, I want to deploy services on Kubernetes clusters.
     - As a team, we need to ensure all services are monitored and logging is enabled.
   - Status: Completed

### E-commerce
3. **Epic: Redesign Checkout Process**
   - Description: Improve the checkout process to reduce cart abandonment rates.
   - User Stories:
     - As a user, I want a simplified and intuitive checkout flow.
     - As a user, I want to save my payment information for future purchases.
     - As a business, we need to integrate with multiple payment gateways.
   - Status: Completed

4. **Epic: Implement Recommendation Engine**
   - Description: Develop a recommendation engine to enhance user shopping experience.
   - User Stories:
     - As a user, I want personalized product recommendations based on my browsing history.
     - As a user, I want to see similar products when viewing an item.
     - As a developer, I want to integrate machine learning models to generate recommendations.
   - Status: Completed

### Healthcare
5. **Epic: Patient Portal Enhancement**
   - Description: Enhance the patient portal to provide better access to medical records and appointment scheduling.
   - User Stories:
     - As a patient, I want to view my medical history and test results online.
     - As a patient, I want to book, reschedule, and cancel appointments through the portal.
     - As a doctor, I want to send reminders and notifications to patients via the portal.
   - Status: Completed

6. **Epic: Telehealth Integration**
   - Description: Integrate telehealth services to allow virtual consultations with healthcare providers.
   - User Stories:
     - As a patient, I want to schedule and attend virtual consultations with my doctor.
     - As a doctor, I want to manage virtual appointments and access patient records during consultations.
     - As a system admin, I want to ensure the platform complies with healthcare data security regulations.
   - Status: Completed

### Finance
7. **Epic: Automated Financial Reporting**
   - Description: Develop an automated system for generating financial reports.
   - User Stories:
     - As a financial analyst, I want to automate monthly financial report generation.
     - As a manager, I want real-time access to financial data dashboards.
     - As an accountant, I want to ensure all financial data is accurate and compliant with regulations.
   - Status: Completed

8. **Epic: Fraud Detection System**
   - Description: Implement a system to detect and prevent fraudulent transactions.
   - User Stories:
     - As a customer, I want to be notified of any suspicious activity on my account.
     - As a security analyst, I want to identify and block fraudulent transactions in real-time.
     - As a developer, I want to use machine learning algorithms to improve fraud detection accuracy.
   - Status: Completed

These examples illustrate how epics are structured with descriptions, user stories, and the final status of completion.

"""

data = {
    "inputs": {
        "material": ""
    },
    "version": "^1.0"
}

response = requests.post(url, headers=headers, json=data)
print(response.status_code)
print(response.json())
