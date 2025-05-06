"use client"

export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-200"

  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300",
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "transform hover:-translate-y-0.5 active:translate-y-0"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
