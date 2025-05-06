export default function ProgressSteps({ steps, currentStep, hasErrors = false }) {
  return (
    <div className="flex justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        const showError = hasErrors && isActive

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  showError
                    ? "bg-red-500 text-white"
                    : isCompleted
                      ? "bg-indigo-600 text-white"
                      : isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : showError ? (
                  <svg
                    className="w-5 h-5"
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
                ) : (
                  <span>{`0${stepNumber}`}</span>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${showError ? "text-red-500" : ""}`}>{step.title}</p>
                <p className="text-xs text-gray-500">{step.subtitle}</p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${stepNumber < currentStep ? "bg-indigo-600" : "bg-gray-200"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
