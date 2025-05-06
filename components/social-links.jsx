"use client"

import InputField from "./ui/input-field"
import Button from "./ui/button"

export default function SocialLinks({ formData, handleChange, errors, handleBack, handleSubmit }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Social Links</h2>
        <p className="text-gray-600">Add Social Links</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          id="twitter"
          name="twitter"
          label="Twitter"
          type="url"
          value={formData.twitter}
          onChange={handleChange}
          placeholder="https://twitter.com/username"
          error={errors.twitter}
          required
        />

        <InputField
          id="facebook"
          name="facebook"
          label="Facebook"
          type="url"
          value={formData.facebook}
          onChange={handleChange}
          placeholder="https://facebook.com/username"
          error={errors.facebook}
          required
        />

        <InputField
          id="google"
          name="google"
          label="Google"
          type="url"
          value={formData.google}
          onChange={handleChange}
          placeholder="https://plus.google.com/username"
          error={errors.google}
          required
        />

        <InputField
          id="linkedin"
          name="linkedin"
          label="LinkedIn"
          type="url"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          error={errors.linkedin}
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
      </div>
    </div>
  )
}
