"use client"

import Button from "./ui/button"

export default function Completed({ handleReset }) {
  return (
    <div className="py-8 text-center">
      <h2 className="text-xl font-semibold mb-4">All steps are completed!</h2>

      <div className="flex justify-center mt-6">
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  )
}
