import React from 'react';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import { withStyles } from 'material-ui/styles'
import {countRootItems} from './items'

const styles = theme => {
  return {
    button: {
      marginRight: 2* theme.spacing.unit,
      marginTop: 2* theme.spacing.unit
    },
    badge: {
      top: 2* theme.spacing.unit,
      right: 2* theme.spacing.unit,
    }
  }
}

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
export class ItemRootSelection extends React.Component {
  render () {
    const { onSelect, classes, items, order } = this.props
    const rootCodes = Array.from(new Set(items.map(a => a.path[0])))
    return (

      <div>
        {rootCodes.map(itemRootCode => {
          const orderCount = countRootItems(order, itemRootCode)
          const child = (
            <Button fab
                    onClick={() => onSelect(itemRootCode)}
              className={classes.button} >
              {itemRootCode}
            </Button>
          )
          return (
            <span>
              {(orderCount > 0) ? (
                <Badge classes={{badge: classes.badge}} badgeContent={orderCount} color="accent">
                  {child}
                </Badge>
              ) : child }
            </span>
          )
        })}
      </div>
    )
  }
}

export default withStyles(styles)(ItemRootSelection)
