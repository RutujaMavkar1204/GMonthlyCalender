import React, { useState,useContext } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import Calender from './Calender';
import userContext from '../context/userContext';
import Table from './Table'


export default function Header() {
  
  const{showCalender, setShowCalender,goToPreviousMonth, goToNextMonth, currentDate, setCurrentDate,displayDate, setDisplayDate}=useContext(userContext)
 
  const today=()=>{
    setDisplayDate(new Date());
    setCurrentDate(new Date())
    setShowCalender(false);

  }
  const getCalender=()=>{
    setDisplayDate(currentDate);
    setShowCalender(!showCalender)
  }

  return (
    <>
   
      <div className="flex justify-between w-full z-30 bg-lightblue items-center border-b border-gray-300  p-2 fixed">
        <h2
          className="text-3xl text-blue-500 hover:text-sky-400 mx-4 cursor-pointer"
          onClick={getCalender}
        >
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
          {/*Calender Section */}
        {showCalender && (
          <div className="absolute left-0 top-full mt-1 z-50 bg-white shadow-lg rounded-lg">
            <Calender
              currentDate={currentDate}
              dateSelected={(date) => {
                setCurrentDate(date);
                setShowCalender(false);
              }}
            />
          </div>
        )}

        <div className="flex mx-4">
          <button onClick={goToPreviousMonth}>
            <ChevronLeft className="font-medium hover:text-sky-400 text-sky-600 mx-1 cursor-pointer" size={35} />
          </button>
          <button className="font-medium text-xl hover:text-sky-400 text-sky-600 cursor-pointer" onClick={today}>
            Today
          </button>
          <button onClick={goToNextMonth }>
            <ChevronRight className="font-bold hover:text-sky-400 text-sky-600 mx-1 cursor-pointer" size={35} />
          </button>
        </div>
      </div>
      {/*Table section */}
      <Table dateSelected={currentDate} onDateSelect={(date) => {
  setCurrentDate(date);
  setShowCalender(false);
}} />
  
    </>
  );
}
