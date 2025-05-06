"use client"

import { Check } from "lucide-react"

export default function CheckboxGroup({
  id,
  name,
  label,
  options,
  values = {},
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
}) {
  const handleChange = (optionId, checked) => {
    onChange({
      target: {
        name,
        value: {
          ...values,
          [optionId]: checked,
        },
      },
    })
  }

  return (
    <div className={`group ${className}`}>
      <label
        className={`block text-sm font-medium mb-2 ${
          error ? "text-red-500" : "text-gray-700 group-hover:text-indigo-600"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={`${id}-${option.id}`}
                  name={`${name}.${option.id}`}
                  checked={values[option.id] || false}
                  onChange={(e) => handleChange(option.id, e.target.checked)}
                  className="sr-only"
                  disabled={disabled}
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center ${
                    values[option.id] ? "bg-indigo-500" : "bg-white border border-gray-300"
                  } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => !disabled && handleChange(option.id, !values[option.id])}
                >
                  {values[option.id] && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={`${id}-${option.id}`}
                  className={`font-medium ${
                    error ? "text-red-500" : "text-gray-700"
                  } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {option.label}
                </label>
              </div>
            </div>
          </div>
        ))}
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
