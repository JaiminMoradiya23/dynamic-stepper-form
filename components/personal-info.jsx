"use client"

import InputField from "./ui/input-field"
import SelectField from "./ui/select-field"
import Button from "./ui/button"

export default function PersonalInfo({ formData, handleChange, errors, handleBack, handleNext }) {
  const countryOptions = [
    { value: "United States", label: "United States" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "Japan", label: "Japan" },
    { value: "China", label: "China" },
    { value: "India", label: "India" },
    { value: "Brazil", label: "Brazil" },
  ]

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Chinese", label: "Chinese" },
    { value: "Japanese", label: "Japanese" },
    { value: "Russian", label: "Russian" },
    { value: "Arabic", label: "Arabic" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "Hindi", label: "Hindi" },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Personal Info</h2>
        <p className="text-gray-600">Setup Information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="firstName"
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          error={errors.firstName}
          required
        />

        <InputField
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          error={errors.lastName}
          required
        />

        <SelectField
          id="country"
          name="country"
          label="Country"
          value={formData.country}
          onChange={handleChange}
          options={countryOptions}
          placeholder="Select country"
          error={errors.country}
          required
        />

        <SelectField
          id="language"
          name="language"
          label="Language"
          value={formData.language}
          onChange={handleChange}
          options={languageOptions}
          placeholder="Select language"
          error={errors.language}
          required
        />
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={handleBack}>
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
      </div>
    </div>
  )
}
