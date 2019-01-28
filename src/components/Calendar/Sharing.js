import React from "react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Share from "@material-ui/icons/Share";
import html2canvas from "html2canvas";
import Tooltip from "@material-ui/core/Tooltip";
import { FacebookShareButton, FacebookIcon } from "react-share";
const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

class Sharing extends React.Component {
  state = {
    anchorEl: null,
    image: null,
    loading: true
  };

  handleClick = event => {
    this.setState(
      {
        loading: true,
        anchorEl: event.currentTarget
      },
      () => {
        this.props.takePic(() => {
          html2canvas(document.getElementById("screenshot")).then(canvas => {
            let img = canvas.toDataURL("image/png");

            var arr = img.split(","),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], "ok", { type: mime });

            var formData = new FormData();

            formData.append(0, file);

            fetch(
              `https://jfz4nqa9na.execute-api.us-west-1.amazonaws.com/latest/image-upload`,
              {
                method: "POST",
                body: formData
              }
            )
              .then(res => {
                if (!res.ok) {
                  throw res;
                }
                return res.json();
              })
              .then(images => {
                console.log("ok", images[0]);
                this.setState({ image: images[0].secure_url, loading: false });
              })
              .catch(err => {});
          });
        });
      }
    );
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          <Tooltip title="Download Schedule">
            <Share />
          </Tooltip>
        </IconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          {/* {!this.state.loading ? (
            <FacebookShareButton url={this.state.image} quote="dsad">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          ) : null} */}
          <Typography className={classes.typography}>
            {!this.state.loading ? (
              <Typography>
                <Typography>
                  Image Link:
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.image}
                  >
                    Click to see the image!!!
                  </a>
                </Typography>
                Share:
                <FacebookShareButton
                  url={this.state.image}
                  quote="Shared from https://antalmanac.com/ (Antalmanac)!!!! "
                  hashtag="#AntAlmanac"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </Typography>
            ) : (
              <img
                src="https://media.giphy.com/media/b5YDpcfF7oBB3r3myx/giphy.gif"
                alt="Loading"
                title="Loading"
              />
            )}
          </Typography>
        </Popover>
      </Fragment>
    );
  }
}

Sharing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sharing);



// WEBPACK FOOTER //
// ./src/components/Calendar/Sharing.js