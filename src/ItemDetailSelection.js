import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'

const styles = theme => {
  return {
    button: {
      marginRight: 2* theme.spacing.unit,
      marginTop: 2* theme.spacing.unit
    },
    addButton: {
      width: '99%'
    }
  }
}

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
export class ItemDetailSelection extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  defaultProps = {
    order: {},
    items: [],
    classes: {},
    onSelect: Function.prototype
  }

  render () {
    const { items, onSelect, classes, order, onAddItem, onRemoveItem } = this.props
    if(!items)
      return null

    return (
      <Paper>
        <Grid container direction="column">
          {items.map( item => {
            const orderCount = order[item.path] || 0
            return (
              <Grid item xs>

                <Grid container >
                  <Grid item xs>
                    <Button raised className={classes.addButton} onClick={(e) => onAddItem(e, item)}>
                      {item.pathLabels[0]} {" "}
                      {item.pathLabels.slice(1).join(' ')} -
                      {" "}
                      (<b> {orderCount}</b>)
                      {" "}
                      <b>x {item.priceRands}</b>

                    </Button>
                  </Grid>

                  <Grid item>
                    <Grid container alignItems="center" direction="column">
                      <Grid item xs>
                        <Button fab mini onClick={(e) => onRemoveItem(e, item)}>
                          <Icon>remove</Icon>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            )})}
      </Grid>
        </Paper>
    )
  }
}

export default withStyles(styles)(ItemDetailSelection)
