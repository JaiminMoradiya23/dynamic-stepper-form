"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export default function DatePicker({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  min,
  max,
  disabled = false,
  readOnly = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date())
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null)
  const datePickerRef = useRef(null)

  // Format date as MM/DD/YYYY
  const formatDate = (date) => {
    if (!date) return ""
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Parse date from string
  const parseDate = (dateString) => {
    if (!dateString) return null
    const [month, day, year] = dateString.split("/").map(Number)
    return new Date(year, month - 1, day)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const dateString = e.target.value
    setSelectedDate(parseDate(dateString))
    onChange({
      target: {
        name,
        value: dateString,
      },
    })
  }

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setIsOpen(false)
    onChange({
      target: {
        name,
        value: formatDate(date),
      },
    })
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Get month name and year
  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" }) + " " + date.getFullYear()
  }

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    // Get days from previous month
    const daysInPrevMonth = getDaysInMonth(year, month - 1)
    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
      day: daysInPrevMonth - firstDayOfMonth + i + 1,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isCurrentMonth: false,
    }))

    // Get days from current month
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      month,
      year,
      isCurrentMonth: true,
    }))

    // Get days from next month
    const totalDaysDisplayed = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7
    const nextMonthDays = Array.from(
      { length: totalDaysDisplayed - (prevMonthDays.length + currentMonthDays.length) },
      (_, i) => ({
        day: i + 1,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
      }),
    )

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  // Check if a date is selected
  const isDateSelected = (date) => {
    if (!selectedDate) return false
    return (
      date.day === selectedDate.getDate() &&
      date.month === selectedDate.getMonth() &&
      date.year === selectedDate.getFullYear()
    )
  }

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date()
    return date.day === today.getDate() && date.month === today.getMonth() && date.year === today.getFullYear()
  }

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update current date when selected date changes
  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate))
    }
  }, [selectedDate])

  return (
    <div className={`group relative ${className}`} ref={datePickerRef}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-2 transition-colors ${
            error ? "text-red-500" : "text-gray-700 group-hover:text-indigo-600"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          id={id}
          name={name}
          value={value || ""}
          onChange={handleInputChange}
          onClick={() => !disabled && !readOnly && setIsOpen(true)}
          className={`w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200 ${
            error ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-indigo-500"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          placeholder="MM/DD/YYYY"
          required={required}
          disabled={disabled}
          readOnly={readOnly}
        />
        <button
          type="button"
          onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
          disabled={disabled || readOnly}
        >
          <Calendar className="h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-72 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-3 flex items-center justify-between border-b">
            <button type="button" onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <div className="font-medium">{getMonthName(currentDate)}</div>
            <button type="button" onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="p-2">
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(new Date(date.year, date.month, date.day))}
                  className={`
                    h-8 w-8 flex items-center justify-center text-sm rounded-full
                    ${
                      isDateSelected(date)
                        ? "bg-indigo-500 text-white"
                        : date.isCurrentMonth
                          ? isToday(date)
                            ? "bg-indigo-100 text-indigo-700"
                            : "text-gray-700 hover:bg-gray-100"
                          : "text-gray-400 hover:bg-gray-50"
                    }
                  `}
                >
                  {date.day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
