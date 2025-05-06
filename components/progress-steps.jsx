export default function ProgressSteps({ steps, currentStep, stepsWithErrors = [] }) {
  return (
    <div className="flex items-start mb-12 space-x-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        const hasError = stepsWithErrors.includes(stepNumber)

        return (
          <div key={step.id} className="flex items-start flex-1">
            <div className="flex items-start">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  hasError
                    ? "bg-[#ef4444] text-white"
                    : isCompleted
                      ? "bg-indigo-600 text-white"
                      : isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-500"
                }`}
              >
                {hasError ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                ) : isCompleted ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{`0${stepNumber}`}</span>
                )}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    hasError ? "text-red-500" : isActive || isCompleted ? "text-indigo-600" : "text-gray-700"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.subtitle}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
