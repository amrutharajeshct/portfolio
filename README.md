# Amrutha Rajesh C T | SQL & Database Developer Portfolio

A clean, modern, and interactive personal portfolio website for **Amrutha Rajesh C T**, a **SQL Developer & Database Specialist** with 2+ years of production experience in **T-SQL, MySQL, MariaDB, Stored Procedures, and Query Optimization**, based in **Ernakulam, Kerala (Open to Relocation)**.

---

## 📁 Project Structure

```text
D:\AMRUTHA\EXTRA\
├── index.html                   # Semantic HTML5 structure (all sections + interactive widgets)
├── style.css                    # Professional CSS with navy blue accents & responsive rules
├── script.js                    # Vanilla JS (optimizer showcase, modal, progress bar, validation)
├── server.js                    # Lightweight zero-dependency Node.js server
├── README.md                    # Project documentation
└── assets/
    ├── avatar-placeholder.svg   # Vector avatar placeholder (ready for your headshot)
    └── Amrutha_Rajesh_CT_Resume.pdf  # Amrutha's complete resume PDF
```

---

## 🌟 New Interactive Features

1. **Interactive Query Optimization Showcase (Before vs. After)**:
   - Live interactive widget comparing an unoptimized Cartesian query vs. an optimized CTE with covering index.
   - Dynamic metrics comparison:
     - Runtime: `4.2 Minutes (252,000 ms)` &rarr; `0.14 Seconds (140 ms)` (99.9% faster!)
     - Logical Reads: `482,109 Pages` &rarr; `128 Pages`
     - Execution Plan: `Clustered Index Scan (100%)` &rarr; `Index Seek + Covering Index (1%)`
     - CPU Time: `14,320 ms` &rarr; `45 ms`
   - One-click **Copy SQL** button with toast notification.

2. **Impact Stats Counter Strip**:
   - `30–40%`: Average Query Performance Gains
   - `< 15s`: Critical Report Runtime (down from several minutes)
   - `500K+`: High-Volume Records Handled
   - `2+ Years`: Production Experience

3. **Interactive SQL Code Snippet Modal**:
   - Direct modal viewer on projects showing actual production SQL:
     - *ERP High-Volume Reporting Stored Procedure* (T-SQL, CTE, Window Functions, TRY...CATCH)
     - *MedAid Relational Schema & ACID Transaction Logic* (PostgreSQL DDL, Check Constraints, Row Locking)
     - *Automated Migration Validation & Duplicate Detection Script* (Data reconciliation)
   - One-click copy with feedback.

4. **Interactive Skills Category Filter**:
   - Filter skill cards instantly by: `All Skills`, `Databases`, `SQL Programming`, `Performance Tuning`, `Data Engineering`, `Tools & Languages`.

5. **Professional Certifications Showcase**:
   - IBM: SQL & Relational Databases (Verified)
   - Google / Coursera: Python for Everybody (Verified)
   - Microsoft: AZ-900 Azure Fundamentals (In Progress)
   - Mahindra Pride: Employability Skills (Verified)

6. **Quick Contact Actions**:
   - One-click **Copy Email** (`connectwithamruthact@gmail.com`) with instant toast confirmation.
   - Direct phone & WhatsApp links (`+91 9746810985`).
   - Direct links to LinkedIn and GitHub profiles.

7. **Live Character Counter & Form Validation**:
   - Real-time `0 / 500` character counter on message input.
   - Comprehensive error checks and responsive success alert.

8. **Reading Progress Bar**:
   - Subtle navy/blue bar at the top of the header tracking scroll depth.

---

## 🚀 How to Run the Website Locally

### Method 1: Direct File Open (Easiest — No Setup Needed)
Simply double-click `index.html` in File Explorer, or right-click `index.html` and choose **Open with > Chrome / Edge**.

### Method 2: Node.js (Included `server.js`)
In a terminal inside `D:\AMRUTHA\EXTRA`, run:
```powershell
node server.js
```
Then visit: `http://localhost:3000`

### Method 3: Python Built-in Server
In PowerShell, run:
```powershell
python -m http.server 3000
```
Then visit: `http://localhost:3000`

### Method 4: VS Code Live Server
Right-click `index.html` in VS Code and select **Open with Live Server**.
