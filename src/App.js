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
import Items from './items'
import {loadOrders,saveOrders,exportOrders} from './storage'

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
    this.state = {
      currentOrderIndex: 0,
      summaryPage: false,
      orders: loadOrders()
    }
  }

  onItemSelect = (rootCode) => {
    this.setState({
      currentRootCode: rootCode
    })
  }

  onPrevious = () => {
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

  onAddItem = (e, item) => {
    this.setState(state => {
      const order = state.orders[state.currentOrderIndex]
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

  sync = debounce(() => {
    saveOrders(this.state.orders)
  }, 1000)

  render() {
    const { currentOrderIndex, orders, summaryPage } = this.state
    const { classes } = this.props

    const currentOrder = orders[currentOrderIndex] || {}

    return (
      <div className={classes.root}>
        <Reboot/>
        <Topbar exportOrders={exportOrders} currentOrderIndex={currentOrderIndex} order={currentOrder} />
        <Grid container direction="column" spacing={24}>
          <Grid item xs>
            {summaryPage ? (
              <SummaryPage order={currentOrder} currentOrderIndex={currentOrderIndex} items={Items}/>
            ) : (
              <ItemSelection onAddItem={this.onAddItem} onRemoveItem={this.onRemoveItem} order={currentOrder} items={Items}/>
            )}
          </Grid>
          <Footer onNext={this.onNext} onPrevious={this.onPrevious}/>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
