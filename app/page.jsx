"use client"

import { useState } from "react"
import DynamicForm from "../components/dynamic-form"
import ProgressSteps from "../components/progress-steps"
import Completed from "../components/completed"
import { formConfig } from "../data/form-config"

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const validateField = (field, value, allValues) => {
    const validation = field.validation
    if (!validation) return null

    if (validation.required && (!value || value === "")) {
      return validation.required
    }

    if (validation.pattern && value && !validation.pattern.value.test(value)) {
      return validation.pattern.message
    }

    if (validation.minLength && value && value.length < validation.minLength.value) {
      return validation.minLength.message
    }

    if (validation.match && value !== allValues[validation.match.field]) {
      return validation.match.message
    }

    return null
  }

  const validateStep = (stepIndex) => {
    const step = formConfig.steps[stepIndex - 1]
    const newErrors = {}
    let isValid = true

    step.fields.forEach((field) => {
      const error = validateField(field, formData[field.name], formData)
      if (error) {
        newErrors[field.name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
    // Clear errors when going back
    setErrors({})
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Here you would typically submit the form data to your backend
      console.log("Form submitted:", formData)
      setCurrentStep(formConfig.steps.length + 1) // Move to completed step
    }
  }

  const handleReset = () => {
    setFormData({})
    setErrors({})
    setCurrentStep(1)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <ProgressSteps steps={formConfig.steps} currentStep={currentStep} hasErrors={Object.keys(errors).length > 0} />

        <div className="mt-6">
          {currentStep <= formConfig.steps.length ? (
            <DynamicForm
              step={formConfig.steps[currentStep - 1]}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              handleBack={currentStep > 1 ? handleBack : null}
              handleNext={currentStep < formConfig.steps.length ? handleNext : null}
              handleSubmit={currentStep === formConfig.steps.length ? handleSubmit : null}
            />
          ) : (
            <Completed handleReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  )
}
