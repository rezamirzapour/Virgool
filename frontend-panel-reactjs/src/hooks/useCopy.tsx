import copyToClipboard from 'copy-to-clipboard';
import { useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack';

export default function useCopy() {
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation()
    const copy = (text: string, message: string = 'کپی شد') => {
        copyToClipboard(text)
        enqueueSnackbar(message)
    }
    const copyCurrentUrl = (message: string = 'کپی شد') => void copy(location.pathname, message)
    return { copy, copyCurrentUrl }
}