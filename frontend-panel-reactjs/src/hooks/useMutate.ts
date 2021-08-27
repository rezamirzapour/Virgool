import { useState } from "react"
import { useSnackbar, SnackbarMessage } from 'notistack';

export default function useMutate() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar();
    const mutate = async (submiter: Function, message?: string) => {
        try {
            setIsSubmitting(true)
            await submiter()
            enqueueSnackbar(message || "با موفقیت انجام شد", { variant: 'success' })
        } catch {
            enqueueSnackbar('خطایی وحود دارد', { variant: 'error' })
        }
        finally {
            setIsSubmitting(false)
        }
    }
    return { mutate, isSubmitting };
}