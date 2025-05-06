"use client"

import InputField from "./ui/input-field"
import PasswordField from "./ui/password-field"
import SelectField from "./ui/select-field"
import Button from "./ui/button"

export default function DynamicForm({ step, formData, handleChange, errors, handleBack, handleNext, handleSubmit }) {
  const renderField = (field) => {
    const props = {
      id: field.id,
      name: field.name,
      label: field.label,
      value: formData[field.name] || "",
      onChange: handleChange,
      placeholder: field.placeholder,
      error: errors[field.name],
      required: field.required,
    }

    switch (field.type) {
      case "password":
        return <PasswordField key={field.id} {...props} />
      case "select":
        return <SelectField key={field.id} {...props} options={field.options} />
      default:
        return <InputField key={field.id} {...props} type={field.type} />
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{step.title}</h2>
        <p className="text-gray-600">{step.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{step.fields.map((field) => renderField(field))}</div>

      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={handleBack} disabled={!handleBack}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>

        {handleNext && (
          <Button onClick={handleNext}>
            Next
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        )}

        {handleSubmit && (
          <Button onClick={handleSubmit}>
            Submit
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </Button>
        )}
      </div>
    </div>
  )
}
