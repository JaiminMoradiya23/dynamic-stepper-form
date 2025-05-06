"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = "••••••••",
  error,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-medium ${error ? "text-red-500" : "text-gray-700"} mb-1`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md`}
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
