# **GMonthlyCalendar**

This is a monthly calendar application built using **React**. It allows users to view events, add new events, and manage resources. The application supports **drag-and-drop functionality**, **dynamic resizing of event blocks**, and **smooth scrolling** to specific dates.

---
## **Features**

### 📅 **View Monthly Calendar**  
Displays a calendar for the current month with days and dates.

### ✍️ **Add Events**  
*Double-click on a date to add a new event.*

### 🔄 **Drag-and-Drop Events**  
Drag events to reschedule them on different dates or resources.

### 📏 **Resize Events**  
Resize event blocks dynamically by dragging their edges.

### 🏷️ **Add Resources**  
Add new resources (e.g., team members, projects) to the calendar.

### ❌ **Delete Events**  
Delete events using the **Backspace** key.

### 🎯 **Smooth Scrolling**  
Automatically scrolls to a specific date when selected.

---
## 🚀 **How to Run the Application Locally**

### **Prerequisites**
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### **Steps**
1. **Clone the Repository**  
   ```sh
   git clone https://github.com/RutujaMavkar1204/GMonthlyCalender.git
   cd GMonthlyCalendar
   ```
2. **Install Dependencies**  
   ```sh
   npm install
   ```
3. **Run the Application**  
   ```sh
   npm run dev
   ```
4. **Open the Application**  
   Open your browser and navigate to **http://localhost:3000**.

---
## 📂 **Folder Structure**
```
GMonthlyCalendar/
├── src/
│   ├── components/
│   │   ├── Table.js
│   │   ├── Header.js
│   │   ├── Calendar.js
│   ├── context/
│   │   ├── userContext.js
│   ├── App.js
│   ├── index.js
│   ├── styles.css
├── public/
│   ├── index.html
├── package.json
└── README.md
```
---
## 🛠 **Technologies Used**

- **React**: For building the user interface.
- **React Context API**: For managing global state (e.g., current date, resources).
- **Tailwind CSS**: Used to style the calendar and components.
- **JavaScript**: For implementing additional functionalities.

---
## 💡 **Answers to Reflection Questions**

### **3 Things I Learned from This Assignment**
- **Drag-and-Drop Implementation**: Learned how to implement drag-and-drop functionality using React and native browser APIs.
- **Dynamic Resizing**: Gained experience in dynamically resizing elements based on user input.
- **Getting Selected Date**: Implemented automatic scrolling to the selected date.

### **Most Difficult Part of the Assignment**
The most complex aspect was developing a **robust note-taking system** within the calendar interface. The most challenging part was ensuring smooth **drag-and-drop** and **resizing functionality** while maintaining UI and state updates.

### **What I Would Have Done Differently Given More Time**
- **Improved UI/UX**: Added more visual feedback for drag-and-drop and resizing actions.
- **Backend Integration**: Integrated a backend to persist events and resources.

---
## 📜 **License**
This project is licensed under the **MIT License**.

---
## 📞 **Contact**
For any questions or feedback, feel free to reach out:
- 📧 **Email**: mavkarrutuja@gmail.com  
- 🖥️ **GitHub**: https://github.com/RutujaMavkar1204

---

This version improves readability with **bold headings, icons, and spacing**, making it more visually appealing. Let me know if you need any more tweaks! 😊

