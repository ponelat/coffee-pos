import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles'

const styles = theme => {
  return {
    button: {
      marginRight: 2* theme.spacing.unit,
      marginTop: 2* theme.spacing.unit
    }
  }
}

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
export class ItemRootSelection extends React.Component {
  render () {
    const { onSelect, classes, items } = this.props
    const rootCodes = Array.from(new Set(items.map(a => a.path[0])))
    return (

      <div>
        {rootCodes.map(itemRootCode => {
          return (
            <Button fab
                    onClick={() => onSelect(itemRootCode)}
                    className={classes.button} >
              {itemRootCode}
            </Button>
          )
        })}
      </div>
    )
  }
}

export default withStyles(styles)(ItemRootSelection)
