"use client"

export default function TextareaField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4,
  maxLength,
  disabled = false,
  readOnly = false,
  className = "",
}) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-2 transition-colors ${
          error ? "text-red-500" : "text-gray-700 group-hover:text-indigo-600"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value || ""}
          onChange={onChange}
          rows={rows}
          className={`w-full px-4 py-3 bg-gray-50 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-opacity-50 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-200 group-hover:border-indigo-200"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
        />
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
