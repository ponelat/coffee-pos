import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import {totalRand, totalDrinks} from './items'

const styles = {
  root: {
    width: '100%',
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

function Topbar(props) {
  const { classes, currentOrderIndex, order, exportOrders } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            #{currentOrderIndex}
          </Typography>
          <Typography type="title" color="inherit" className={classes.flex}>
            Coffees ({totalDrinks(order)})
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

Topbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Topbar);
