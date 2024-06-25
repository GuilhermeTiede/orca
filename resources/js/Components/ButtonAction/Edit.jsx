import { router } from "@inertiajs/react";
import {MenuItem} from "@mui/material";
import React from "react";
import Can from "../Can";
import * as Unicons from "@iconscout/react-unicons";

export default function Edit({ environment, module, route, label, size = 20, ...inertiaVisitProps }) {
  const handleOnClick = (event) => {
    return router.visit(route, {...inertiaVisitProps});
  }

  return (
    <Can permission='update' environment={environment} module={module}>
      <MenuItem onClick={handleOnClick}>
        <Unicons.UilEditAlt size={size} style={{ marginRight: 5 }} /> {label || ''}
      </MenuItem>
    </Can>
  );
}
