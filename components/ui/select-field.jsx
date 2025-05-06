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
    <div>
      <label htmlFor={id} className={`block text-sm font-medium ${error ? "text-red-500" : "text-gray-700"} mb-1`}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md appearance-none`}
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
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
