import React,{useState} from 'react'

import userContext from './userContext';

export default function userContextProvider({children}){
    const [currentDate, setCurrentDate] = useState(new Date());
    const [displayDate, setDisplayDate] = useState(currentDate);  
    const [showCalender, setShowCalender] = useState(false); 
  const firstDayOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
  const prevMonthLastDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), 0).getDate();
  const currentMonthLastDay = new Date(displayDate.getFullYear(), displayDate.getMonth()+1, 0).getDay();

  const goToPreviousMonth = () => {
    setShowCalender(false);
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1));
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() -1, 1))
    
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
     setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1));
    setShowCalender(false);
  };
  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(displayDate.getFullYear(), displayDate.getMonth(), i + 1);
    return {
      date,
      dayNumber: i + 1,
      isCurrentMonth: true,
      isToday: date.toDateString() === new Date().toDateString(),
    };
  });
  
    return(
        <userContext.Provider value={{showCalender, setShowCalender,goToPreviousMonth, goToNextMonth, firstDayOfMonth,dates, daysInMonth, prevMonthLastDate, currentMonthLastDay,currentDate,setDisplayDate, displayDate, setCurrentDate}}>
            {children}
        </userContext.Provider>
    )
}

