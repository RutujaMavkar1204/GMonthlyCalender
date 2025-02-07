# GMonthlyCalender

This is a monthly calendar application built using React. It allows users to view events, add new events, and manage resources. The application supports drag-and-drop functionality for events, dynamic resizing of event blocks, and smooth scrolling to specific dates.

## Features

### View Monthly Calendar:
Displays a calendar for the current month with days and dates.
### Add Events:
Double-click on a date to add a new event.
### Drag-and-Drop Events: 
Drag events to reschedule them on different dates or resources.
### Resize Events:
Resize event blocks dynamically by dragging their edges.
### Add Resources:
Add new resources (e.g., team members, projects) to the calendar.
### Delete Events:
Delete events using the Backspace key.
### Smooth Scrolling:
Automatically scrolls to a specific date when selected.

## How to Run the Application Locally

### Prerequisites
Node.js (v16 or higher)
npm (v8 or higher)

### Steps
Clone the Repository:
git clone https://github.com/your-username/monthly-calendar.git
cd GMonthlyCalender 

Install Dependencies: npm install

Run the Application: npm run dev

Open the Application: Open your browser and navigate to http://localhost:3000.

## Folder Structure:

GMonthlyCalender/
├── src/
│   ├── components/
│   │   └── Table.js
│   │   └── Header.js
│   │   └── Calender.js
│   ├── context/
│   │   └── userContext.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── public/
│   └── index.html
├── package.json
└── README.md

## Technologies Used

React: For building the user interface.
React Context API: For managing global state (e.g., current date, resources).
Tailwind CSS: This is used to style the calendar and components.
JavaScript: For implementing some other functionalities.

 ## Answers to Reflection Questions

3 Things I Learned from This Assignment
Drag-and-Drop Implementation: I learned how to implement drag-and-drop functionality using React and native browser APIs.
Dynamic Resizing: I gained experience in dynamically resizing elements based on user input.
Getting Selected Date: I learned to scroll to the date selected automatically.

## Most Difficult Part of the Assignment

The most complex aspect of the project was developing a robust note-taking system within the calendar interface.
In that most challenging part was implementing the drag-and-drop and resizing functionality while ensuring smooth updates to the UI and state.

## What I Would Have Done Differently Given More Time

Improved UI/UX: I would have added more visual feedback for drag-and-drop and resizing actions.
Backend Integration: I would have integrated a backend to persist events and resources.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, feel free to reach out:
Email: mavkarrutuja@gmail.com
GitHub: https://github.com/RutujaMavkar1204

