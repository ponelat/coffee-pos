import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import map from 'lodash/map'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import { totalRand, reduceOrders } from './items'
import Sunburst from './lib/react-sunburst'
import { flatCsvToSunburstTree } from './lib/react-sunburst-utils'

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

// const node = { name, children: [ ...nodes]}


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
    const { classes, order, items, summaryTitle} = this.props
    let virtualOrder = order
    if(Array.isArray(order)) {
      virtualOrder = reduceOrders(order)
    }

    const emptyOrder = Object.keys(virtualOrder).length < 1
    const totalR = totalRand(virtualOrder)
    console.log("virtualOrder", virtualOrder)
    const prepSunburstData = Object.keys(virtualOrder).map(key => {
      const size = virtualOrder[key]
      const tokens = key.split(',')
      // if(tokens.length > 1)
        return [tokens.join('-'), size]
      // return [key+'-a', size]
    })
    console.log("prepSunburstData", prepSunburstData)

    const sunburstData = flatCsvToSunburstTree(prepSunburstData)

    console.log("sunburstData", sunburstData)

    return (
      <Paper className={classes.root}>
          <Typography type="title" >
            {summaryTitle}
          </Typography>
          {emptyOrder ? (
            <Typography type="subheading" >
              Empty Order.
            </Typography>
          ) : (
            <List>
              {map(virtualOrder, (count, itemPath) => {
                if(!count)
                  return null

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
        <Sunburst
          data={sunburstData}
          onSelect={console.log}
          scale="linear" // or exponential
          tooltipContent={<div class="sunburstTooltip" style="position:absolute; color:'black'; z-index:10; background: #e2e2e2; padding: 5px; text-align: center;" />} // eslint-disable-line
          tooltip
          tooltipPosition="right"
          keyId="anagraph"
          width="320"
          height="350" />
        <h3>End</h3>
        </Paper>
    )
  }
}

export default withStyles(styles)(SummaryPage)

// "name": "flare",
//  "children": [
//   {
//    "name": "analytics",
//    "children": [
//     {
//      "name": "cluster",
//      "children": [
//       {"name": "AgglomerativeCluster", "size": 3938},
//       {"name": "CommunityStructure", "size": 3812},
//       {"name": "HierarchicalCluster", "size": 6714},
//       {"name": "MergeEdge", "size": 743}
//      ]
//     },
//     {
