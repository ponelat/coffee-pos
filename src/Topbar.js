import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import {totalRand, totalDrinks} from './items'

const styles = {
  root: {
    width: '100%',
    justifyContent: 'space-between'
  },
  flex: {
    flex: 2,
  },
  menuButton: {
    flex: 1,
    // marginLeft: -12,
    // marginRight: 20,
  },
};

export class Topbar extends React.Component {

  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onClearOrders = () => {
    const isSure = window.prompt('Positive you want to clear you orders? Please type sure-sure', 'not sure')
    if(isSure == 'sure-sure')
      this.props.onClearOrders()
    this.handleClose()
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  render() {
    const { classes, currentOrderIndex, order, exportOrders } = this.props;
    const { anchorEl } = this.state
    const isOpen = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.flex}>
              <IconButton
                aria-owns={isOpen ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="contrast"
                >
                #{currentOrderIndex}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={isOpen}
                onClose={this.handleClose}
                >
                <MenuItem onClick={this.onClearOrders}>Clear Orders</MenuItem>
              </Menu>
            </div>
            <Typography type="title" color="inherit" className={classes.flex} >
              Cups ({totalDrinks(order)})
            </Typography>
            <Typography type="title" color="inherit" className={classes.flex}>
              {totalRand(order)}
            </Typography>

            <IconButton onClick={exportOrders} color="contrast" className={classes.menuButton} aria-label="Download orders">
              <FileDownloadIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Topbar);
