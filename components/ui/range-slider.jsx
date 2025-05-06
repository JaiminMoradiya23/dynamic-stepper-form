"use client"

import { useState, useEffect } from "react"

export default function RangeSlider({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  min = 0,
  max = 100,
  step = 1,
  showValue = false,
  disabled = false,
  className = "",
}) {
  const [displayValue, setDisplayValue] = useState(value || min)

  useEffect(() => {
    setDisplayValue(value || min)
  }, [value, min])

  const handleChange = (e) => {
    const newValue = e.target.value
    setDisplayValue(newValue)
    onChange({
      target: {
        name,
        value: newValue,
      },
    })
  }

  // Calculate the position of the thumb as a percentage
  const thumbPosition = ((displayValue - min) / (max - min)) * 100

  return (
    <div className={`group ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label
              htmlFor={id}
              className={`block text-sm font-medium transition-colors ${error ? "text-red-500" : "text-gray-700 group-hover:text-indigo-600"
                }`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {showValue && <span className="text-sm text-gray-500">{displayValue}</span>}
        </div>
      )}
      <div className="relative">
        <div className="relative h-6 flex items-center">
          {/* Track background */}
          <div className="absolute h-1.5 w-full bg-indigo-100 rounded-full"></div>

          {/* Active track */}
          <div className="absolute h-1.5 bg-indigo-500 rounded-full" style={{ width: `${thumbPosition}%` }}></div>

          {/* Hidden native input for functionality */}
          <input
            type="range"
            id={id}
            name={name}
            min={min}
            max={max}
            step={step}
            value={displayValue}
            onChange={handleChange}
            className="absolute w-full h-6 opacity-0 cursor-pointer"
            required={required}
            disabled={disabled}
          />

          {/* Custom thumb */}
          <div
            className="absolute w-5 h-5 bg-indigo-500 rounded-full shadow pointer-events-none"
            style={{ left: `${thumbPosition}%`, transform: "translateX(-50%)" }}
          ></div>
        </div>
      </div>
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