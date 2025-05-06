"use client"

export default function InputField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) {
  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-medium ${error ? "text-red-500" : "text-gray-700"} mb-1`}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md`}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
