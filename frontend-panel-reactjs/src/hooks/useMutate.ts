import { useState } from "react"
import { toast } from 'material-react-toastify'

export default function useMutate() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const mutate = async (submiter: Function, message?: string) => {
        try {
            setIsSubmitting(true)
            await submiter()
            toast.success(message || "با موفقیت انجام شد")
        } catch {
            toast.error('خطایی وحود دارد')
        }
        finally {
            setIsSubmitting(false)
        }
    }
    return { mutate, isSubmitting };
}