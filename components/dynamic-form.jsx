"use client"

import InputField from "./ui/input-field"
import PasswordField from "./ui/password-field"
import SelectField from "./ui/select-field"
import TextareaField from "./ui/textarea-field"
import CheckboxField from "./ui/checkbox-field"
import CheckboxGroup from "./ui/checkbox-group"
import RadioGroup from "./ui/radio-group"
import FileUpload from "./ui/file-upload"
import DatePicker from "./ui/date-picker"
import RangeSlider from "./ui/range-slider"
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
      disabled: field.disabled,
      className: field.className,
      ...field.props, // Additional props specific to field type
    }

    switch (field.type) {
      case "password":
        return <PasswordField key={field.id} {...props} />
      case "select":
        return <SelectField key={field.id} {...props} options={field.options} />
      case "textarea":
        return <TextareaField key={field.id} {...props} rows={field.rows} maxLength={field.maxLength} />
      case "checkbox":
        if (field.options) {
          return <CheckboxGroup key={field.id} {...props} options={field.options} values={formData[field.name] || {}} />
        }
        return <CheckboxField key={field.id} {...props} checked={formData[field.name] || false} />
      case "radio":
        return <RadioGroup key={field.id} {...props} options={field.options} inline={field.inline} />
      case "file":
        return (
          <FileUpload
            key={field.id}
            {...props}
            accept={field.accept}
            multiple={field.multiple}
            maxSize={field.maxSize}
          />
        )
      case "date":
        return <DatePicker key={field.id} {...props} min={field.min} max={field.max} />
      case "range":
        return (
          <RangeSlider
            key={field.id}
            {...props}
            min={field.min}
            max={field.max}
            step={field.step}
            showValue={field.showValue}
          />
        )
      default:
        return <InputField key={field.id} {...props} type={field.type} />
    }
  }

  return (
    <div className="animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {step.fields.map((field, index) => (
          <div
            key={field.id}
            className={`transition-all duration-300 ${field.fullWidth || field.type === "file" ? "md:col-span-2" : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {renderField(field)}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between">
        {handleBack && (
          <Button variant="secondary" onClick={handleBack} className="shadow-sm hover:shadow transition-all">
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
        )}

        {handleNext && (
          <Button onClick={handleNext} className="shadow-md hover:shadow-lg transition-all">
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
          <Button onClick={handleSubmit} className="shadow-md hover:shadow-lg transition-all">
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
