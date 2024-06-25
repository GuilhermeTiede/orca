import DefaultErrorAlert from "@/Layouts/Components/DefaultErrorAlert";
import http from "@/Libs/Http";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  MenuItem
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Can from "../Can";
import * as Unicons from "@iconscout/react-unicons";

export default function Delete({ environment, module, route, label, size = 20, onDeletedMessage = '', onDeleted = () => { } }) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const handleOpen = () => setDialogIsOpen(true)
  const handleClose = () => setDialogIsOpen(false)

  const handleConfirm = async (event) => {
    try {
      setIsLoading(true);
      await http.delete(route);

      if (onDeletedMessage) {
        enqueueSnackbar(onDeletedMessage, {
          variant: 'success',
        });
      }

      onDeleted();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || error.message, {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
      handleClose();
    }
  }

  return (
    <Can permission='delete' environment={environment} module={module}>
      {error && (
        <DefaultErrorAlert error={error} onClose={() => setError(null)} />
      )}

      {!isLoading && (
        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpen}>
          <Unicons.UilTrashAlt size={size} style={{ marginRight: 5 }} /> {label || ''}
        </MenuItem>
      )}

      {isLoading && (
        <MenuItem sx={{ color: 'error.main' }} disabled>
          <CircularProgress color='secondary' size='1.5rem' />
        </MenuItem>
      )}

      <Dialog
        open={dialogIsOpen}
      >
        <DialogTitle>
          <Icon>error</Icon> Atenção!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>Não</Button>
          <Button onClick={handleConfirm} color='error' variant='outlined'>Sim</Button>
        </DialogActions>
      </Dialog>
    </Can>
  );
}
