import React, {Fragment} from 'react';
import {
  Menu,
  MenuItem,
  MenuList,
  Button,
  IconButton
} from '@material-ui/core';
import {MoreVert, Delete} from '@material-ui/icons';
import CustomEventsDialog from '../CustomEvents/Popup';
import Sharing from "./Sharing";


class Submenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Fragment>
        <IconButton
          onClick={this.handleClick}
        >
          <MoreVert fontSize='small'/>
        </IconButton>
        <Menu
          id="submenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <MenuList>
            <MenuItem>
              <CustomEventsDialog
                  onAddCustomEvent={this.props.onAddCustomEvent}
              />
            </MenuItem>
            <MenuItem>
                <Button onClick={this.props.onClearSchedule} style={{width: "100%"}}>
                    <Delete/> Clear All
                </Button>
            </MenuItem>
            <MenuItem>
              <Sharing onTakeScreenshot={this.props.onTakeScreenshot} />
            </MenuItem>
          </MenuList>
        </Menu>
      </Fragment>
    );
  }
}

export default Submenu;
