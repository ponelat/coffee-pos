import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import OrderInput from './OrderInput.js'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  count: {
    display: 'inline-block'
  }
});


const ItemDetails = ({items, itemRootCode, classes, CODES}) => {
  if(!items)
    return null

  return  (
    <Paper className={classes.root}>
      <Typography type="title" >
        {itemRootCode}
      </Typography>
      <Typography type="subheading">
        {CODES[itemRootCode]}
      </Typography>
      {items.map( item => {
        const itemLabel = item.path.map(code => CODES[code]).join(' ')
        return (
          <Paper>
            <Grid container justify="space-between">
              <Grid item>
                <Button>
                  - {itemLabel}
                </Button>
              </Grid>
              <Grid item>
                <Typography type="display1" className={classes.count}>
                  999
                </Typography>
              </Grid>
              <Grid item>
                <Button>
                  - {itemLabel}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )
      })}
      <Paper>
        <Button>
          + Double
        </Button>
      </Paper>
    </Paper>
  )
}

export default withStyles(styles)(ItemDetails);
