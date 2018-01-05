import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles'
import ItemRootSelection from './ItemRootSelection.js'
import ItemDetailSelection from './ItemDetailSelection.js'
import Grid from 'material-ui/Grid'

const styles = theme => {
  return {
  }
}

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
export class ItemSelection extends React.Component {
  state = {
    selectedItems: null
  }

  onRootSelected = (rootCode) => {
    this.setState({
      selectedItems: this.props.items.filter(a => a.path[0] == rootCode)
    })
  }

  render () {
    const { selectedItems } = this.state
    const { onSelect, classes, items, order, onAddItem, onRemoveItem } = this.props
    return (
      <Grid container direction="column" spacing={24}>
        <Grid item xs>
          <ItemRootSelection items={items} onSelect={this.onRootSelected}/>
        </Grid>
        <Grid item xs>
          <ItemDetailSelection onAddItem={onAddItem} onRemoveItem={onRemoveItem} order={order} items={selectedItems} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ItemSelection)
