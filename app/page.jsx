"use client"

import { useState } from "react"
import DynamicForm from "../components/dynamic-form"
import ProgressSteps from "../components/progress-steps"
import Completed from "../components/completed"
import { formConfig } from "../data/form-config"
import { validateStep } from "../utils/validation"

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [stepsWithErrors, setStepsWithErrors] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]

        // If no more errors for this step, remove it from stepsWithErrors
        if (Object.keys(newErrors).length === 0) {
          setStepsWithErrors((prev) => prev.filter((step) => step !== currentStep))
        }

        return newErrors
      })
    }
  }

  const handleNext = () => {
    const { isValid, errors: validationErrors } = validateStep(formConfig.steps[currentStep - 1], formData)

    if (isValid) {
      // Remove this step from stepsWithErrors if it was there
      setStepsWithErrors((prev) => prev.filter((step) => step !== currentStep))

      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      setErrors(validationErrors)
      // Add this step to stepsWithErrors if it's not already there
      setStepsWithErrors((prev) => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep]
        }
        return prev
      })
    }
  }

  const handleBack = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1)
      setErrors({})
      setIsAnimating(false)
    }, 300)
  }

  const handleSubmit = () => {
    const { isValid, errors: validationErrors } = validateStep(formConfig.steps[currentStep - 1], formData)

    if (isValid) {
      // Remove this step from stepsWithErrors if it was there
      setStepsWithErrors((prev) => prev.filter((step) => step !== currentStep))

      // Here you would typically submit the form data to your backend
      console.log("Form submitted:", formData)
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(formConfig.steps.length + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      setErrors(validationErrors)
      // Add this step to stepsWithErrors if it's not already there
      setStepsWithErrors((prev) => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep]
        }
        return prev
      })
    }
  }

  const handleReset = () => {
    setFormData({})
    setErrors({})
    setCurrentStep(1)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        <ProgressSteps steps={formConfig.steps} currentStep={currentStep} stepsWithErrors={stepsWithErrors} />

        <div className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
          {currentStep <= formConfig.steps.length ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">{formConfig.steps[currentStep - 1].title}</h2>
                <p className="text-gray-600 mt-1">{formConfig.steps[currentStep - 1].subtitle}</p>
              </div>

              <DynamicForm
                step={formConfig.steps[currentStep - 1]}
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                handleBack={currentStep > 1 ? handleBack : null}
                handleNext={currentStep < formConfig.steps.length ? handleNext : null}
                handleSubmit={currentStep === formConfig.steps.length ? handleSubmit : null}
              />
            </>
          ) : (
            <Completed handleReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  )
}
