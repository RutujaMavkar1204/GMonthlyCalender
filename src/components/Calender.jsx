import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import userContext from '../context/userContext'


export default function Calender({ currentDate, dateSelected }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const {showCalender, setShowCalender, dates,displayDate, setDisplayDate, firstDayOfMonth, daysInMonth, prevMonthLastDate, currentMonthLastDay}=useContext(userContext)
  
  //get an array of previous month ending dates
  const emptydates = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    date: new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, prevMonthLastDate - i),
    dayNumber: prevMonthLastDate - i,
    isCurrentMonth: false,
    isToday: false,
  })).reverse();

  let len=0
  if(currentMonthLastDay==6){
     len=13;
  }
  else if(currentMonthLastDay==5){
    len=13;
 }
  else{
    len=6;
  }
  //get an array of next month starting dates
  const afterdates=Array.from({length:len-currentMonthLastDay}, (_,i)=>{
    const date=new Date(displayDate.getFullYear(), displayDate.getMonth()+1, i+1);
    return{
      date: date,
      dayNumber: i+1,
      isCurrentMonth: false,
      isToday: false,
    }
  })
  const alldates = [...emptydates, ...dates, ...afterdates];
 
  //get previous month
  const goToPreviousMonth = () => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1));
  };

  //get next month
  const goToNextMonth = () => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1));
  };

  return (
    <>
    <div className="min-w-[273px]  bg-white rounded-lg inset-shadow-sm p-4 ">
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium cursor-pointer text-blue-500 font-normal hover:text-sky-400">
          {displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <div>
          <button onClick={goToPreviousMonth}>
            <ChevronLeft className="mx-4 hover:text-sky-400 cursor-pointer text-blue-600" size={30} />
          </button>
          <button onClick={goToNextMonth}>
            <ChevronRight className="cursor-pointer hover:text-sky-400 text-blue-600" size={30} />
          </button>
        </div>
      </div>
      <div className="border-b border-gray-400 grid grid-cols-7 gap-1 text-center font-normal text-xs mt-2">
        {days.map((day) => (
          <div key={day} className="px-2 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-2">
  {alldates.map((date, index) => (
    <>
      
      <button
      key={index}
        onClick={() => dateSelected(date.date)}
        className={`w-10 h-10 flex items-center text-xl justify-center rounded-full
          ${date.isCurrentMonth ? 'text-black ' : 'text-slate-400'}
          ${date.isToday ? 'text-blue-500 hover:bg-blue-100' : 'text-gray-900 hover:bg-blue-100'}
          ${date.date.toDateString() === currentDate.toDateString() ? 'text-white bg-blue-500 hover:bg-blue-500' : ''}
        `}
      >
        {date.dayNumber}
      </button>
    </>
  ))}
</div>

    </div>
    </>
  );
}
