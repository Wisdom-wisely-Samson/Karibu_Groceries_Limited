# Produce Sales & Branch Analytics System

## Overview

The **Produce Sales & Branch Analytics System** is a full-stack web application designed to manage agricultural produce sales across multiple branches. It enables businesses to track inventory, record cash and credit sales, and analyze branch performance through interactive dashboards.

The system supports **role-based access** for Directors, Managers, and Agents, ensuring each user interacts with features relevant to their responsibilities.

---

# Key Features

## Authentication & Authorization

* Secure login system
* Role-based access control
* Roles supported:

  * **Director** – Full analytics and reporting access
  * **Manager** – Branch-level management
  * **Agent** – Sales recording

---

## Produce Management

* Add produce inventory
* Track tonnage per branch
* Monitor stock availability
* Update inventory automatically after sales

---

## Sales Management

* Record produce sales
* Track buyer information
* Record tonnage sold
* Track payment amounts
* Edit and delete transactions

---

## Credit Sales

* Record sales made on credit
* Track outstanding balances
* Monitor customer liabilities

---

## Branch Analytics

Directors can view branch performance metrics such as:

* Total Sales
* Credit Sales
* Stock Levels
* Revenue per Branch

Revenue is calculated as:

Revenue = (Cash Sales + Credit Sales) – Cost of Produce

---

## Data Visualization

Analytics dashboards display business insights through charts including:

* Revenue per branch
* Cash vs Credit sales
* Stock distribution

---

# Technology Stack

## Frontend

* Vue.js 3
* Pinia (state management)
* Axios (API communication)
* Chart.js (analytics visualization)

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Tokens)

---

# System Architecture

Frontend (Vue.js)
⬇
REST API (Node.js + Express)
⬇
MongoDB Database

---

# Project Structure

```
backend
 ├── controllers
 ├── models
 ├── routes
 ├── middleware
 ├── seed
 └── server.js

frontend
 ├── components
 ├── modules
 ├── stores
 ├── router
 └── main.js
```

---

# Installation

## Clone Repository

```
git clone https://github.com/Wisdom-wisely-Samson/Karibu_Groceries_Limited
```

---

## Backend Setup

```
cd backend
npm install
npm run dev
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

# Seeding Sample Data

To populate the database with test data:

```
node seed/seed.js
```

This will automatically create:

* Sample users
* Produce inventory
* Sales records
* Credit sales

---

# Future Improvements

* Mobile application
* Export analytics reports
* Automated financial reports
* Predictive sales analytics
* SMS/email notifications

---

# Author

Developed as part of a produce management system project.
