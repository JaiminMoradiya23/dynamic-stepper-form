"use client"

export default function RadioGroup({
  id,
  name,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  inline = false,
  className = "",
}) {
  return (
    <div className={`group ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium mb-2 ${
            error ? "text-red-500" : "text-gray-700 group-hover:text-indigo-600"
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`${inline ? "flex flex-wrap gap-4" : "space-y-2"}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`${id}-${option.value}`}
                  name={name}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  className="sr-only"
                  required={required}
                  disabled={disabled}
                />
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    value === option.value ? "bg-indigo-500" : "bg-white border border-gray-300"
                  } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => !disabled && onChange({ target: { name, value: option.value } })}
                >
                  {value === option.value && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={`${id}-${option.value}`}
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
