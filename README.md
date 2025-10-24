# Smart Udhari Manager

**Aesthetic, minimal web app for shopkeepers to manage customer credit (Udhari) efficiently.**

---

## Overview

Smart Udhari Manager is a **Flask-based web app** designed for **single shopkeeper use**.  
It allows shopkeepers to:  
- Track customers’ pending payments  
- Send **automated WhatsApp reminders** via Twilio  
- View payment history and upcoming dues  
- Download reports (PDF/CSV)  
- Search customers quickly  
- Switch between **light and dark mode** for comfort  

This app **digitizes the traditional credit notebook** while keeping it simple and user-friendly.

---

## Features

- Add and manage customers with:  
  - Name  
  - Phone number  
  - Address  
  - Pending amount  
  - Due date  
  - Last payment date  
  - Notes
- Dashboard displaying:  
  - Total payment to be received  
  - Upcoming dues  
  - Payment history  
- **Automated WhatsApp reminders** for due payments  
- **Search functionality** for customers  
- **Dark mode** toggle  
- Reports **viewable online** and **downloadable** in PDF/CSV

---

## Tech Stack

- **Backend:** Flask  
- **Database:** SQLite  
- **Frontend:** HTML, CSS, (optional: Bootstrap/Tailwind for aesthetics)  
- **API:** Twilio WhatsApp API  
- **Others:** Python libraries like pandas (for reports), Flask-Login (for auth)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/smart-udhari-manager.git
cd smart-udhari-manager
