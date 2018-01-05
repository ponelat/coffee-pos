import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import map from 'lodash/map'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { totalRand } from './items'

const styles = theme => {
  return {
    root: {
      width: '100%',
      paddingBottom: '2em'
    },
    flex: {
      flex: 1
    }
  }
}

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
export class SummaryPage extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  defaultProps = {
    order: {},
    classes: {},
  }

  render () {
    const { classes, order, items, currentOrderIndex} = this.props
    const emptyOrder = Object.keys(order).length < 1
    const totalR = totalRand(order)

    return (
      <Paper className={classes.root}>
          <Typography type="title" >
            Order #{currentOrderIndex}
          </Typography>
          {emptyOrder ? (
            <Typography type="subheading" >
              Empty Order.
            </Typography>
          ) : (
            <List>
              {map(order, (count, itemPath) => {
                console.log("itemPath", itemPath)

                const item = items.find(a => a.path == itemPath)
                const label = item.pathLabels.join(' ')
                return (
                  <ListItem button key={itemPath} dense className={classes.listItem}>
                      <ListItemText primary={label} />
                      <ListItemSecondaryAction>
                        <Typography type="display1">
                          x {count}
                        </Typography>
                      </ListItemSecondaryAction>
                  </ListItem>
                )})}
            </List>
          ) }
        <Typography type="display3">
        Total: <b>{totalR}</b>
        </Typography>
        </Paper>
    )
  }
}

export default withStyles(styles)(SummaryPage)
