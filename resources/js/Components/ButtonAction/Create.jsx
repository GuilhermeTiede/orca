import {router} from "@inertiajs/react";
import {Button, Icon} from "@mui/material";
import React from "react";

export default function Create({environment, module, route, label, size, variant = 'contained', ...inertiaVisitProps}) {
    const handleOnClick = (event) => {
        return router.visit(route, {...inertiaVisitProps});
    }

    return (
        <Button variant={variant} size={size} color='primary' onClick={handleOnClick}>
            <Icon>add</Icon> {label || ''}
        </Button>
    );
}
