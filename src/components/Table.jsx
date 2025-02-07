"use client"

import { useContext, useState, useEffect, useRef } from "react"
import userContext from "../context/userContext"

export default function StudentCalendar({ dateSelected, onDateSelect }) {
  const { currentDate, firstDayOfMonth, daysInMonth } = useContext(userContext)
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [draggingEvent, setDraggingEvent] = useState(null)
  const [expandedWidths, setExpandedWidths] = useState({})
  const [isAddingResource, setIsAddingResource] = useState(false)
  const [newResourceName, setNewResourceName] = useState("")
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [newEventName, setNewEventName] = useState("")
  const [tempEventData, setTempEventData] = useState(null)
  const datesContainerRef = useRef(null)
  const [dragDirection, setDragDirection] = useState(null)
  const [leftOffsets, setLeftOffsets] = useState({})

  // Colors for resources
  const color = ["#E5989B", "#CCDF92", "#C5D3E8", "#FFC6C6", "#D1F8EF", "#FFE8B6", "#E8F9FF", "#F7D9C4", "#D8BFD8", "#FAD2E1", "#B5EAD7", "#FAD2E1", "#B2E6D4", "#D9E7FD", "#FFD6E8", "#F5F1C1"];  
  const hoverColor = ["#D2665A", "#B1C29E", "#789DBC", "#F0A8D0", "#C0EBA6", "#FADA7A", "#B1F0F7", "#E8A87C", "#E4C1F9", "#BC8DA0", "#99D9D9", "#E97474", "#89CFF0", "#C5A3FF", "#F1A1A1", "#E1CE7A"];  
  const selectedColor = ["#A32D21", "#7A8E42", "#465A92", "#B8255A", "#0C7B58", "#D88C00", "#3F7994", "#C1593B", "#A1456D", "#7E3A58", "#007777", "#A13E50", "#006A8A", "#6E2B88", "#920000", "#735F00"];  
  

  // Array of notes which are already present on webpage
  const notes = [
    {
      id: 1,
      title: "Submit Guestara Assignment",
      start: new Date(2025, 1, 6),
      resourceId: 1,
      width: "200px",
    },
    {
      id: 2,
      title: "Attend Gmeet",
      start: new Date(2025, 1, 15),
      resourceId: 2,
      width: "100px",
    },
    {
      id: 3,
      title: "Resume Work of Hackathon",
      start: new Date(2025, 1, 8),
      resourceId: 3,
      width: "800px",
    },
    {
      id: 4,
      title: "Interview",
      start: new Date(2025, 1, 25),
      resourceId: 4,
      width: "100px",
    },
    {
      id: 5,
      title: "Revise DSA concept",
      start: new Date(2025, 1, 10),
      resourceId: 5,
      width: "90px",
    },
  ]
    
  const notesPresent = notes.map((note) => ({
    id: note.id,
    title: note.title,
    start: note.start,
    end: note.end,
    width: note.width,
    resourceId: note.resourceId,
  }))

  // Create resources
  const resources = []
  for (let i = 0; i < 15; i++) {
    resources.push({
      id: i,
      resource: `Resource ${String.fromCharCode(65 + i)}`,
      color: color[i],
      hoverColor: hoverColor[i],
      selectedColor: selectedColor[i],
    })
  }
  const [Resources, setResources] = useState(resources)

  // Create days and dates
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const dayAndDate = []
  for (let i = 0; i < daysInMonth; i++) {
    const datee = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
    dayAndDate.push({
      day: days[(firstDayOfMonth + i) % 7],
      date: i + 1,
      isToday: datee.toDateString() === new Date().toDateString(),
      fullDate: datee,
    })
  }

  // Event handlers
  function handleDoubleClick(e, date, resourceId) {
    setTempEventData({ date, resourceId })
    setIsAddingEvent(true)
  }

   
  function handleConfirmAddEvent() {
    if (newEventName.trim() && tempEventData) {
      const newEvent = {
        id: Date.now(),
        title: newEventName.trim(),
        start: tempEventData.date,
        end: new Date(tempEventData.date.getTime() + 60 * 60 * 1000),
        resourceId: tempEventData.resourceId,
      }
      setEvents([...events, newEvent])
      setNewEventName("")
      setIsAddingEvent(false)
      setTempEventData(null)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Backspace" && selectedEvent) {
      e.preventDefault()
      setIsConfirmingDelete(true)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedEvent, handleKeyDown]) // Added handleKeyDown to dependencies

  function getEventsForDateAndResource(date, resourceId) {
    return events.filter(
      (event) =>
        event.resourceId === resourceId &&
        date.getTime() >= new Date(event.start).setHours(0, 0, 0, 0) &&
        date.getTime() <= new Date(event.end).setHours(23, 59, 59, 999),
    )
  }
   //It calculates height to increase when new note is added to same date and resource
  function calculateResourceHeight(resourceId) {
    let maxEvents = 0
    for (let i = 0; i < dayAndDate.length; i++) {
      const eventsCount = getEventsForDateAndResource(dayAndDate[i].fullDate, resourceId).length
      if (eventsCount > maxEvents) {
        maxEvents = eventsCount
      }
    }
    return Math.max(80, maxEvents * 60)
  }
 //this section is use to change the location of note
  function handleEventDragStart(e, event) {
    e.dataTransfer.setData("text/plain", event.id.toString())
    setDraggingEvent(event)
  }

  function handleEventDragOver(e) {
    e.preventDefault()
  }

  function handleEventDrop(e, date, resourceId) {
    e.preventDefault()
    const eventId = Number(e.dataTransfer.getData("text/plain"))
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        const newStart = new Date(date)
        newStart.setHours(event.start.getHours(), event.start.getMinutes())
        const duration = event.end - event.start
        const newEnd = new Date(newStart.getTime() + duration)
        return { ...event, start: newStart, end: newEnd, resourceId }
      }
      return event
    })
    setEvents(updatedEvents)
    setDraggingEvent(null)
  }

  const [initialMouseX, setInitialMouseX] = useState(null)
  const [initialWidth, setInitialWidth] = useState(null)

  function handleDragStart(e, eventId, direction) {
    setInitialMouseX(e.clientX)
    setInitialWidth(expandedWidths[eventId] || 0)
    setDragDirection(direction)
  }
   
  //Use to expand note left and right
  function handleDrag(e, eventId) {
    if (e.clientX === 0 && e.clientY === 0) return
    const deltaX = e.clientX - initialMouseX
    let newWidth = initialWidth
    let newLeft = 0

    if (dragDirection === "right") {
      newWidth = Math.max(0, initialWidth + deltaX)
    } else if (dragDirection === "left") {
      newWidth = Math.max(0, initialWidth - deltaX)
      newLeft = Math.min(initialWidth, initialWidth + deltaX)
    }

    setExpandedWidths({
      ...expandedWidths,
      [eventId]: newWidth,
    })
    setLeftOffsets({
      ...leftOffsets,
      [eventId]: newLeft,
    })
  }

  function handleAddResource() {
    setIsAddingResource(true)
  }
  
  //It is use to add a new resource on confirmation
  function handleConfirmAddResource() {
    if (newResourceName.trim()) {
      const newResource = {
        id: Resources.length,
        resource: newResourceName.trim(),
        color: color[Resources.length % color.length],
        hoverColor: hoverColor[Resources.length % hoverColor.length],
        selectedColor: selectedColor[Resources.length % selectedColor.length],
      }
      setResources([...Resources, newResource])
      setNewResourceName("")
      setIsAddingResource(false)
    }
  }
 //It is use to delete a note on confirmation
  function handleConfirmDelete() {
    if (selectedEvent) {
      const updatedEvents = events.filter((event) => event.id !== selectedEvent.id)
      setEvents(updatedEvents)
      setSelectedEvent(null)
      setIsConfirmingDelete(false)
    }
  }
   //It is use to scroll to selected date
  useEffect(() => {
    if (dateSelected && datesContainerRef.current) {
      const selectedDateEl = datesContainerRef.current.querySelector(`[data-date="${dateSelected.getDate()}"]`)
      if (selectedDateEl) {
        selectedDateEl.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
  }, [dateSelected])

  return (
    //Resource Section
    <div className="relative h-screen">
      <div className="h-full overflow-auto">
        <div className="flex">
          <div className="sticky left-0 pt-13 z-20 bg-white">
            <div className="h-9 w-62 border-r border-l border-b border-gray-300">
              <button onClick={handleAddResource} className="px-4 py-1 my-1 ml-2 bg-blue-500 text-white rounded">
                Add Resource +
              </button>
            </div>

            <div className="bg-white">
              {Resources.map((resource) => (
                <div
                  key={resource.id}
                  className="w-62 border-r border-l border-b border-gray-300 px-4 font-medium text-lg text-gray-800"
                  style={{ height: `${calculateResourceHeight(resource.id)}px` }}
                >
                  {resource.resource}
                </div>
              ))}
            </div>
          </div>
          {/*Day and Date Section */}
          <div className="relative">
            <div ref={datesContainerRef} className="sticky top-0 pt-13 z-10 bg-white">
              {dayAndDate.map((val) => (
                <div
                  key={val.date}
                  className="inline-block w-[103px] h-9 border-r border-b border-gray-300"
                  data-date={val.fullDate.getDate()}
                >
                  <button
                    className={`text-xl mt-1 w-22 h-7 px-2 ${
                      val.isToday ? "rounded-2xl bg-blue-500 text-white" : "text-gray-800"
                    }`}
                  >
                    {val.date} {val.day}
                  </button>
                </div>
              ))}
            </div>
            {/*Grid Section */}
            {Resources.map((resource) => (
              <div key={resource.id} className="flex">
                {dayAndDate.map((day) => {
                  const cellEvents = getEventsForDateAndResource(day.fullDate, resource.id)
                  const cellHeight = calculateResourceHeight(resource.id)
                  return (
                    <div
                      key={day.fullDate.getTime()}
                      className={`w-[103px] border-b border-r relative border-gray-300`}
                      style={{ height: `${cellHeight}px` }}
                      onDoubleClick={(e) => handleDoubleClick(e, day.fullDate, resource.id)}
                      onDragOver={handleEventDragOver}
                      onDrop={(e) => handleEventDrop(e, day.fullDate, resource.id)}
                    >
                      {/*Notes which are already present */}
                      {notesPresent.map((item) => {
                        if (item.start.getTime() === day.fullDate.getTime() && item.resourceId === resource.id) {
                          return (
                            <div
                              key={item.id}
                              className="absolute left-1 right-1 h-12 mt-1 cursor-pointer rounded"
                              style={{
                                backgroundColor:
                                  selectedEvent?.id === item.id ? resource.selectedColor : resource.color,
                                zIndex: draggingEvent?.id === item.id ? 2 : 1,
                                width: `calc(${item.width} + ${expandedWidths[item.id] || 0}px)`,
                                left: `calc(0.25rem + ${leftOffsets[item.id] || 0}px)`,
                              }}
                              draggable
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  selectedEvent?.id === item.id ? resource.selectedColor : resource.hoverColor)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  selectedEvent?.id === item.id ? resource.selectedColor : resource.color)
                              }
                              onDragStart={(e) => handleEventDragStart(e, item)}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedEvent(item)
                              }}
                            >
                              <div className={`px-1 ${selectedEvent?.id === item.id ? "text-white" : ""}`}>
                                {item.title}
                              </div>
                              {selectedEvent?.id === item.id && (
                                <>
                                  <div
                                    className="absolute left-0 top-1/2 w-3 h-3 bg-white rounded-full cursor-ew-resize transform -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                      border: `1px solid ${selectedEvent?.id === item.id ? resource.selectedColor : resource.color}`,
                                    }}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, item.id, "left")}
                                    onDrag={(e) => handleDrag(e, item.id)}
                                  />
                                  <div
                                    className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full cursor-ew-resize transform translate-x-1/2 -translate-y-1/2"
                                    style={{
                                      border: `1px solid ${selectedEvent?.id === item.id ? resource.selectedColor : resource.color}`,
                                    }}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, item.id, "right")}
                                    onDrag={(e) => handleDrag(e, item.id)}
                                  />
                                </>
                              )}
                            </div>
                          )
                        }
                        return null
                      })}
                          {/*The notes we make */}
                      {cellEvents.map((event, index) => (
                        <div
                          key={event.id}
                          className="absolute left-1 right-1 h-12 mt-1 cursor-pointer rounded"
                          style={{
                            backgroundColor: selectedEvent?.id === event.id ? resource.selectedColor : resource.color,
                            top: `${index * 60}px`,
                            zIndex: selectedEvent?.id === event.id ? 2 : 1,
                            width: `calc(100% + ${expandedWidths[event.id] || 0}px)`,
                            left: `calc(0.25rem + ${leftOffsets[event.id] || 0}px)`,
                          }}
                          draggable
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              selectedEvent?.id === event.id ? resource.selectedColor : resource.hoverColor)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              selectedEvent?.id === event.id ? resource.selectedColor : resource.color)
                          }
                          onDragStart={(e) => handleEventDragStart(e, event)}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEvent(event)
                          }}
                        >
                          <div className={`px-1 ${selectedEvent?.id === event.id ? "text-white" : ""}`}>
                            {event.title}
                          </div>
                          {selectedEvent?.id === event.id && (
                            <>
                              <div
                                className="absolute left-0 top-1/2 w-3 h-3 bg-white rounded-full cursor-ew-resize transform -translate-x-1/2 -translate-y-1/2"
                                style={{
                                  border: `1px solid ${selectedEvent?.id === event.id ? resource.selectedColor : resource.color}`,
                                }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, event.id, "left")}
                                onDrag={(e) => handleDrag(e, event.id)}
                              />
                              <div
                                className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full cursor-ew-resize transform translate-x-1/2 -translate-y-1/2"
                                style={{
                                  border: `1px solid ${selectedEvent?.id === event.id ? resource.selectedColor : resource.color}`,
                                }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, event.id, "right")}
                                onDrag={(e) => handleDrag(e, event.id)}
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
            {/*Ask before Adding note  */}
        {isAddingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-80 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Add New Event</h2>
              <input
                type="text"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                placeholder="Enter event name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setIsAddingEvent(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
                >
                  Cancel
                </button>
                <button onClick={handleConfirmAddEvent} className="px-4 py-2 bg-blue-500 text-white rounded">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        {/*Adding named resource */}
        {isAddingResource && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-80 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Add New Resource</h2>
              <input
                type="text"
                value={newResourceName}
                onChange={(e) => setNewResourceName(e.target.value)}
                placeholder="Enter resource name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end">
                <button onClick={handleConfirmAddResource} className="px-4 py-2 bg-blue-500 text-white rounded">
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
         {/*confirm before deleting notes */}
        {isConfirmingDelete && (
          <div className="fixed inset-0 bg-black z-80 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this event?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
                >
                  Cancel
                </button>
                <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-500 text-white rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

