import { useState } from 'react'

const useStep = () => {
  const [activeStep, setActiveStep] = useState(0)

  const onNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const onBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  const onReset = () => setActiveStep(0)

  return {
    activeStep,
    onNext,
    onBack,
    onReset,
  }
}

export default useStep
