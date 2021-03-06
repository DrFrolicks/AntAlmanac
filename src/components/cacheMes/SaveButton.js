import React, {Component} from "react";
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export default class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: null
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (wasCancelled) => {
    if (wasCancelled)
      this.setState({ open: false });
    else
      this.setState({ open: false }, () => {
        this.props.handleSave(this.state.name);
      });
  };

  componentDidMount() {
    if (typeof Storage !== "undefined") {
      const user = window.localStorage.getItem("userID");
      if (user !== null) {
        this.setState({ name: user });
      }
    }

    document.addEventListener("keydown", this.enterEvent, false);
  }

  componentWillUnmount() {
    document.addEventListener("keydown", this.enterEvent, false);
  }

  enterEvent = event => {
    const charCode = event.which ? event.which : event.keyCode;

    if ((charCode === 13 || charCode === 10) && document.activeElement.id === "nameSave") {
      event.preventDefault();
      this.setState({ open: false }, () => {
        this.props.handleSave(this.state.name);
      });

      return false;
    }
  };

  setName = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen} color="inherit">
          Save
        </Button>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose(true)}
        >
          <DialogTitle id="form-dialog-title">Save</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your username here to save your schedules.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nameSave"
              label="User ID"
              type="text"
              fullWidth
              placeholder="Enter here"
              defaultValue={this.state.name}
              onChange={this.setName}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(true)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleClose(false)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
