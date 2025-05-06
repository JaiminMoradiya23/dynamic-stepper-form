export const validateField = (field, value, allValues) => {
  const validation = field.validation
  if (!validation) return null

  // Required validation
  if (validation.required && (!value || value === "")) {
    return validation.required
  }

  // Skip other validations if value is empty and not required
  if (!value || value === "") return null

  // Pattern validation (regex)
  if (validation.pattern && !validation.pattern.value.test(value)) {
    return validation.pattern.message
  }

  // Min length validation
  if (validation.minLength && value.length < validation.minLength.value) {
    return validation.minLength.message
  }

  // Max length validation
  if (validation.maxLength && value.length > validation.maxLength.value) {
    return validation.maxLength.message
  }

  // Min value validation (for number inputs)
  if (validation.min && Number.parseFloat(value) < validation.min.value) {
    return validation.min.message
  }

  // Max value validation (for number inputs)
  if (validation.max && Number.parseFloat(value) > validation.max.value) {
    return validation.max.message
  }

  // Match validation (for password confirmation, etc.)
  if (validation.match && value !== allValues[validation.match.field]) {
    return validation.match.message
  }

  // Custom validation function
  if (validation.custom && typeof validation.custom.validate === "function") {
    const customError = validation.custom.validate(value, allValues)
    if (customError) return validation.custom.message || customError
  }

  return null
}

export const validateStep = (step, formData) => {
  const errors = {}
  let isValid = true

  step.fields.forEach((field) => {
    const error = validateField(field, formData[field.name], formData)
    if (error) {
      errors[field.name] = error
      isValid = false
    }
  })

  return { isValid, errors }
}
