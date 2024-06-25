import {usePage} from "@inertiajs/react";
import { useSnackbar } from 'react-simple-snackbar';
import {useEffect} from "react";

const Content = ({ children }) => {
    const {
        flash,
    } = usePage().props;

    const [openDefaultSnackbar, closeDefaultSnackbar] = useSnackbar({
        style: { backgroundColor: '#0ABF53' }
    });
    const [openErrorSnackbar, closeErrorSnackbar] = useSnackbar({
        style: { backgroundColor: 'red' },
    });

    useEffect(() => {
        Object.entries(flash || {})
            .forEach(([variant, content]) => {
                if (!!content) {
                    if(variant === 'success') openDefaultSnackbar(content)
                    if(variant === 'error') openErrorSnackbar(content)
                }
            });
    }, [flash]);

    return (
        <div>
            {children}
        </div>
    );
}

export default Content;
