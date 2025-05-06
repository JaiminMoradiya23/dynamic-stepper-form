"use client"

import InputField from "./ui/input-field"
import PasswordField from "./ui/password-field"
import Button from "./ui/button"

export default function AccountDetails({ formData, handleChange, errors, handleNext }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Account Details</h2>
        <p className="text-gray-600">Enter your account details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="username"
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          placeholder="johnDoe"
          error={errors.username}
          required
        />

        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="johndoe@gmail.com"
          error={errors.email}
          required
        />

        <PasswordField
          id="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="secondary" disabled>
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
