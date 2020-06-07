import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

export const RenderAlert = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary" autoFocus>
          戻る
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const RenderConfirm = (props) => {
  const values = {
    name: props.name,
    email: props.email,
    kaisha: props.kaisha,
    busho: props.busho,
    yakushoku: props.yakushoku,
  };

  return (
    <Dialog
      open={props.isConfirmOpen}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.handleSubmit(values)}
          color="primary"
          autoFocus
        >
          {props.okMessage}
        </Button>
        <Button onClick={props.handleClose}>戻る</Button>
      </DialogActions>
    </Dialog>
  );
};
