import { useSnackbar as useNotistack, VariantType } from 'notistack'
import { wait } from '@/utils/timer'

const useSnackbar = (waitMs: number = 5000) => {
  const { enqueueSnackbar, closeSnackbar } = useNotistack()

  const show = async (message: string, variant: VariantType) => {
    const key = enqueueSnackbar(message, { variant })
    await wait(waitMs)
    closeSnackbar(key)
  }

  const success = (message: string) => show(message, 'success')
  const error = (message: string) => show(message, 'error')

  return {
    show,
    success,
    error,
  }
}

export default useSnackbar
