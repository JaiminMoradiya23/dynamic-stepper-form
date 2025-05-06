export const validateField = (field, value, allValues) => {
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
