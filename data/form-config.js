// Form configuration in JSON format
export const formConfig = {
  steps: [
    {
      id: "account-details",
      title: "Account Details",
      subtitle: "Enter your account details",
      fields: [
        {
          id: "username",
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johnDoe",
          required: true,
          validation: {
            required: "This field is required",
          },
        },
        {
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
          required: true,
          validation: {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          },
        },
        {
          id: "password",
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "••••••••",
          required: true,
          validation: {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          },
        },
        {
          id: "confirmPassword",
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "••••••••",
          required: true,
          validation: {
            required: "This field is required",
            match: {
              field: "password",
              message: "Passwords do not match",
            },
          },
        },
        {
          id: "accountType",
          name: "accountType",
          label: "Account Type",
          type: "radio",
          required: true,
          inline: true,
          options: [
            { value: "personal", label: "Personal" },
            { value: "business", label: "Business" },
          ],
          validation: {
            required: "Please select an account type",
          },
        },
        {
          id: "termsAndConditions",
          name: "termsAndConditions",
          label: "I agree to the Terms and Conditions",
          type: "checkbox",
          required: true,
          validation: {
            required: "You must agree to the Terms and Conditions",
          },
        },
      ],
    },
    {
      id: "personal-info",
      title: "Personal Info",
      subtitle: "Setup Information",
      fields: [
        {
          id: "firstName",
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "John",
          required: true,
          validation: {
            required: "This field is required",
          },
        },
        {
          id: "lastName",
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Doe",
          required: true,
          validation: {
            required: "This field is required",
          },
        },
        {
          id: "birthDate",
          name: "birthDate",
          label: "Birth Date",
          type: "date",
          required: true,
          validation: {
            required: "This field is required",
          },
        },
        {
          id: "country",
          name: "country",
          label: "Country",
          type: "select",
          placeholder: "Select country",
          required: true,
          options: [
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
          ],
          validation: {
            required: "This field is required",
          },
        },
        {
          id: "language",
          name: "language",
          label: "Language",
          type: "select",
          placeholder: "Select language",
          required: true,
          options: [
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
          ],
          validation: {
            required: "This field is required",
          },
        },
        {
          id: "employmentStatus",
          name: "employmentStatus",
          label: "Employment Status",
          type: "radio",
          required: true,
          options: [
            { value: "employed", label: "Employed" },
            { value: "self-employed", label: "Self-Employed" },
            { value: "unemployed", label: "Unemployed" },
            { value: "student", label: "Student" },
          ],
          validation: {
            required: "Please select your employment status",
          },
        },
      ],
    },
    {
      id: "social-links",
      title: "Social Links",
      subtitle: "Add Social Links",
      fields: [
        {
          id: "twitter",
          name: "twitter",
          label: "Twitter",
          type: "url",
          placeholder: "https://twitter.com/username",
          required: true,
          validation: {
            required: "This field is required",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Please enter a valid URL",
            },
          },
        },
        {
          id: "facebook",
          name: "facebook",
          label: "Facebook",
          type: "url",
          placeholder: "https://facebook.com/username",
          required: true,
          validation: {
            required: "This field is required",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Please enter a valid URL",
            },
          },
        },
        {
          id: "google",
          name: "google",
          label: "Google",
          type: "url",
          placeholder: "https://plus.google.com/username",
          required: true,
          validation: {
            required: "This field is required",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Please enter a valid URL",
            },
          },
        },
        {
          id: "linkedin",
          name: "linkedin",
          label: "LinkedIn",
          type: "url",
          placeholder: "https://linkedin.com/in/username",
          required: true,
          validation: {
            required: "This field is required",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Please enter a valid URL",
            },
          },
        },
        {
          id: "privacySettings",
          name: "privacySettings",
          label: "Privacy Settings",
          type: "radio",
          required: true,
          options: [
            { value: "public", label: "Public Profile" },
            { value: "private", label: "Private Profile" },
            { value: "friends", label: "Friends Only" },
          ],
          validation: {
            required: "Please select your privacy settings",
          },
        },
        {
          id: "experience",
          name: "experience",
          label: "Years of Experience",
          type: "range",
          min: 0,
          max: 20,
          step: 1,
          showValue: true,
          required: true,
          validation: {
            required: "Please indicate your years of experience",
          },
        }
      ],
    },
    {
      id: "additional-info",
      title: "Additional Information",
      subtitle: "Tell about yourself",
      fields: [
        {
          id: "bio",
          name: "bio",
          label: "Biography",
          type: "textarea",
          placeholder: "Tell us about yourself...",
          required: true,
          rows: 4,
          fullWidth: true,
          validation: {
            required: "This field is required",
          },
        },
        {
          id: "documents",
          name: "documents",
          label: "Upload Multiple Files",
          type: "file",
          accept: "*/*", // Accept all file types
          multiple: true,
          maxSize: 10485760, // 10MB
          required: true,
          fullWidth: true,
          validation: {
            required: "Please upload at least one document",
          },
        }
      ],
    },
  ],
}