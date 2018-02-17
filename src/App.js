import React, { Component } from 'react';
import debounce from 'lodash/debounce'
import logo from './logo.svg';
import './App.css';
import ItemSelection from './ItemSelection.js'
import ItemDetails from './ItemDetails.js'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Topbar from './Topbar.js'
import Reboot from 'material-ui/Reboot'
import Footer from './Footer.js'
import SummaryPage from './SummaryPage.js'
import {ensureItems} from './items'
import {loadOrders,saveOrders,exportOrders, clearOrders} from './storage'

function sumVals(obj) {
  return Object.keys(obj).reduce((acc, key) => acc + obj[key])
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 5,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {

  constructor(props,context) {
    super(props,context)
    const orders = loadOrders()
    this.state = {
      currentOrderIndex: orders.length,
      summaryPage: false,
      orders,
      items: null,
      loadingItems: true
    }

    ensureItems()
      .then(({ Items }) => {
        this.setState({items: Items, loadingItems: false})
      })
      .catch(err => {
        this.setState({ loadingItems: false, err: err+''})
      })

  }

  onItemSelect = (rootCode) => {
    this.setState({
      currentRootCode: rootCode
    })
  }

  onPrevious = () => {
    this.setState({showTotalSummary: false})
    if(this.state.summaryPage) {
      this.setState({summaryPage: false})
      return
    }
    if(this.state.currentOrderIndex > 0) {
      this.setState(state => ({
        summaryPage: true,
        currentOrderIndex: state.currentOrderIndex - 1
      }))
    }
  }

  onNext = () => {

    const { currentOrderIndex, summaryPage } = this.state
    this.setState({showTotalSummary: false})
    if(!summaryPage) {
      this.setState({
        summaryPage: true
      })
      return
    }

    if(currentOrderIndex < this.state.orders.length) {
      // The last order
      const isLastOrder = currentOrderIndex == (this.state.orders.length - 1)
      if(isLastOrder) {
        this.setState(state => ({
          orders: state.orders.concat({})
        }))
      }
      this.setState(state => ({
        summaryPage: false,
        currentOrderIndex: state.currentOrderIndex + 1
      }))
    }
  }

  onFirst = () => {
    this.setState({
      currentOrderIndex: 0,
      summaryPage: false,
      showTotalSummary: false
    })
  }

  onLast = () => {
    this.setState( state => ({
      currentOrderIndex: state.orders.length - 1,
      summaryPage: false,
      showTotalSummary: false
    }))
  }

  onClearOrders = () => {
    this.setState({
      orders: [{}],
      currentOrderIndex: 0,
      summaryPage: false
    })
  }

  onAddItem = (e, item) => {
    this.setState(state => {
      const order = state.orders[state.currentOrderIndex] = state.orders[state.currentOrderIndex] || {}
      order[item.path] = (order[item.path] || 0) + 1
      return state
    })
    this.sync()
  }

  onRemoveItem = (e, item) => {
    e.stopPropagation()
    this.setState(state => {
      const order = state.orders[state.currentOrderIndex]
      order[item.path] = (order[item.path] || 1) - 1
      return state
    })
    this.sync()
  }

  // onJumpToNextEnter = () => {
  //   this.setState(state => {
  //     state.summaryPage = false
  //     let nextIndex = 0
  //     for(let i = 0; i < state.orders.length; i++) {
  //       if(!isEmptyOrder(state.orders[i])) {
  //         nextIndex = i
  //       }
  //     }
  //     state.currentOrderIndex = nextIndex + 1
  //     state.orders[]
  //     return state
  //   })
  // }

  onShowTotalSummary = () => {
    this.setState({
      showTotalSummary: true
    })
  }

  sync = debounce(() => {
    saveOrders(this.state.orders)
  }, 1000)

  render() {
    const { items, loadingItems, err, currentOrderIndex, orders, summaryPage, showTotalSummary } = this.state
    const { classes } = this.props

    if(loadingItems || !items) {
      return (
        <div>
          Loading items...
          {err ? (
            <pre>
              {JSON.stringify(err, null, 2)}
            </pre>
          ) : null}
        </div>
      )
    }

    const currentOrder = orders[currentOrderIndex] || {}


    return (
      <div className={classes.root}>
        <Reboot/>
        <Topbar
          exportOrders={exportOrders}
          onClearOrders={this.onClearOrders}
          currentOrderIndex={currentOrderIndex}
          order={currentOrder}
          showTotalSummary={this.onShowTotalSummary}
          />
        <Grid container direction="column" spacing={24}>
          <Grid item xs>
            {showTotalSummary ? (
              <SummaryPage order={orders} summaryTitle="Total" items={items}/>
            ) : summaryPage ? (
              <SummaryPage order={currentOrder} summaryTitle={'Order #' + currentOrderIndex} items={items}/>
            ) : (
              <ItemSelection onAddItem={this.onAddItem} onRemoveItem={this.onRemoveItem} order={currentOrder} items={items}/>
            )}
          </Grid>
          <Footer onFirst={this.onFirst} onLast={this.onLast} onNext={this.onNext} onPrevious={this.onPrevious}/>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
