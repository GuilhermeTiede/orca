import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import * as Unicons from '@iconscout/react-unicons';
import React, {useState} from "react";
import {StyledRoot} from "@/Components/DataTableToolbar/styles";
import http from "@/Libs/Http";
import {useSnackbar} from "notistack";

export default function DataTableToolbar({ selected = [], deleteRoute, cloneRoute, onDeletedMessage = '', onClonedMessage = '', onDeleted = () => { }, onCloned = () => { } }) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [dialogCloneIsOpen, setDialogCloneIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const handleOpen = () => setDialogIsOpen(true)

  const handleClose = () => {
    setIsLoading(false)
    setDialogIsOpen(false)
  }

  const handleDeleteConfirm = async (event) => {
    try {
      setIsLoading(true);
      const response = await http.post(deleteRoute, { selected })

      enqueueSnackbar(response?.data?.message ?? onDeletedMessage, {
        variant: 'success',
      })

      onDeleted()
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || error.message, {
        variant: 'error',
      })
    } finally {
      handleClose()
    }
  }

  const handleCloneConfirm = async (event) => {
    try {
      setIsLoading(true);
      const response = await http.post(cloneRoute, { selected })

      enqueueSnackbar(response?.data?.message ?? onClonedMessage, {
        variant: 'success',
      })

      onCloned()
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || error.message, {
        variant: 'error',
      })
    } finally {
      handleClose()
    }
  }

  if (selected.length === 0) {
    return <></>
  }

  return (
    <>
      <StyledRoot
        sx={{
          ...(selected.length > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
          ...(selected.length === 0 && {
            padding: '0 !important'
          }),
        }}
      >
        {selected.length > 0 && (
          <Typography component="p" variant="body1">{selected.length} registros selecionados</Typography>
        )}

        {selected.length > 0 && (
          <Box>
            {cloneRoute && (
              <Tooltip title="Duplicar">
                <IconButton
                  onClick={() => setDialogCloneIsOpen(true)}
                >
                  <Unicons.UilCopy />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Deletar">
              <IconButton
                onClick={() => setDialogIsOpen(true)}
              >
                <Unicons.UilTrashAlt />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </StyledRoot>

      <Dialog
        open={dialogIsOpen}
      >
        <DialogTitle>
          <Grid container>
            <Unicons.UilExclamationTriangle style={{ marginRight: 10 }} /> Atenção!
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir os registros selecionados?
            <br/>
            <small>Selecionados: <strong>{selected.length}</strong></small>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>Não</Button>
          <Button onClick={handleDeleteConfirm} color='error' variant='outlined'>
            {!isLoading && 'Sim'}
            {isLoading && (
              <CircularProgress color='error' size='1.5rem' />
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogCloneIsOpen}
      >
        <DialogTitle>
          <Grid container>
            <Unicons.UilExclamationTriangle style={{ marginRight: 10 }} /> Atenção!
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja duplicar os registros selecionados?
            <br/>
            <small>Selecionados: <strong>{selected.length}</strong></small>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogCloneIsOpen(false)} variant='outlined'>Não</Button>
          <Button onClick={handleCloneConfirm} color='error' variant='outlined'>
            {!isLoading && 'Sim'}
            {isLoading && (
              <CircularProgress color='error' size='1.5rem' />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
