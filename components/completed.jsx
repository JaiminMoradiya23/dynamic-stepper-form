"use client"

import { useState, useEffect } from "react"
import Button from "./ui/button"
import confetti from "canvas-confetti"

export default function Completed({ handleReset }) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti after component mounts
    const timer = setTimeout(() => {
      setShowConfetti(true)

      // Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="py-12 text-center animate-fadeIn">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">All steps are completed!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for completing all the steps. Your information has been successfully submitted.
      </p>

      <div className="flex justify-center mt-6">
        <Button onClick={handleReset} className="px-8 py-3 shadow-md hover:shadow-lg transition-all">
          Start Over
        </Button>
      </div>
    </div>
  )
}
