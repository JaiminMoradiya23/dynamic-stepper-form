"use client"

import { ChevronDown } from "lucide-react"

export default function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  required = false,
}) {
  return (
    <div className="group">
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
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 bg-white border rounded-lg appearance-none ${
            error ? "border-red-300" : "border-gray-300"
          }`}
          required={required}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
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
