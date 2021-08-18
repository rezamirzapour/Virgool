import { useSnackbar as useOriginalSnackbar, SnackbarMessage, VariantType } from 'notistack'

export default function useSnackbar() {
    const { enqueueSnackbar: originalEnqueueSnackbar, closeSnackbar } = useOriginalSnackbar()
    const enqueueSnackbar = (message: SnackbarMessage, variant: VariantType = 'success', anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'center',
    }) => originalEnqueueSnackbar(message, { variant })
    return { enqueueSnackbar, closeSnackbar }
}