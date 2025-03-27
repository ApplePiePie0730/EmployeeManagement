# **Assignment: Full-Stack CRUD Application Development with DevOps Practices**

## **Objective**

You have been provided with a starter project that includes user authentication using  **Node.js, React.js, and MongoDB**. Your task is to extend this application by implementing **CRUD (Create, Read, Update, Delete) operations** for a real-world application of your choice, while following industry best practices such as:

* **Project Management with JIRA**
* **Requirement Diagram using SysML**
* **Version Control using GitHub**
* **CI/CD Integration for Automated Deployment**

## **Requirements**

### **1. Choose a Real-World Application**

Select a meaningful use case for your CRUD operations. We will provide the list, you have to select it.

### **2. Project Management with JIRA and SysML**

* Create a **JIRA project** and define:
  * **Epic**
  * **User Stories** (features required in your app)
  * **Child issues & Subtasks** (breaking down development work)
  * **Sprint Planning** (organizing work into milestones)
* Document your JIRA **board URL** in the project README.
* Draw a requirements diagram

### **3. Backend Development (Node.js + Express + MongoDB)**

* Create a user-friendly interface to interact with your API (Some portion developed, follow task manager app)).
* Implement **forms** for adding and updating records.
* Display data using  **tables, cards, or lists (Follow how we showed data in task manager app)**

### **4. Frontend Development (React.js)**

* Create a user-friendly interface to interact with your API (**Some portion developed, follow task manager app)**.
* Implement **forms** for adding, showing, deleting and updating records (CRUD).
* Display data using  **tables, cards, or lists (Follow how we showed data in task manager app)**

### **5. Authentication & Authorization**

* Ensure **only authenticated users** can access and perform CRUD operations. (Already developed in your project)
* Use **JWT (JSON Web Tokens)** for user authentication (Use the task manager one from .env file).

### **6. GitHub Version Control & Branching Strategy**

* Use **GitHub for version control** and maintain:
  * `main` branch (stable production-ready code)
  * Feature branches (`feature/xyz`) for each new functionality
* Follow proper **commit messages** and  **pull request (PR) reviews** .

### **7. CI/CD Pipeline Setup**

* Implement a **CI/CD pipeline using GitHub Actions** to:
  * Automatically **run tests** on every commit/pull request (Optional).
  * Deploy the **backend** to **AWS** .
  * Deploy the **frontend** to **AWS**.
* Document your  **CI/CD workflow in the README**.

## **Submission Requirements**

* **JIRA Project Board URL** (user stories ).
* **Requirment diagram** (Using project features)
* **GitHub Repository** (`backend/` and `frontend/`).
* **README.md** with:

  * Project setup instructions.
  * CI/CD pipeline details.

JIRA Project Board URL:  https://shelley0730.atlassian.net/jira/software/projects/EM/boards/67

This project use GitHub Actions to set up CI/CD pipeline.
* **CI workflow:**  
  * step 1: When code is pushed to the "main" branch, it will automatically run the workflow.    
  * step 2: The workflow fetches the latest code from the repository into GitHub Actions runner.  
  * step 3: Set up Node.js.  
  * step 4: Load the Mongo_URL, JWT_SECRET, Port from GitHub Secrets.(Manually added it into Github Environments already)  
  * step 5: Use "yarn" instead of "npm" to install dependencies.  
  * step 6: Executes backend tests in the Test folder to verify functionality.  
* **CD workflow:**  
  * step 7: SSH into EC2 instance, and navigate to Backend directory, pull latest code and install dependencies, then restart Backend using pm2.  
  * step 8: SSH into EC2 instance and navigate to the Frontend directory, remove the old build and install dependencies then rebuild the Frontend and restart Nginx.  