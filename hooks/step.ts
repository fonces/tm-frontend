import { useState } from 'react'

const useStep = (last: number) => {
  const [activeStep, setActiveStep] = useState(0)
  const isStepCompleted = activeStep === last

  const onNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const onBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  const onReset = () => setActiveStep(0)

  return {
    activeStep,
    isStepCompleted,
    onNext,
    onBack,
    onReset,
  }
}

export default useStep
