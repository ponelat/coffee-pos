import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { blue } from 'material-ui/colors'

import MenuIcon from 'material-ui-icons/Menu'

const styles = (theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: blue[900],
    display: 'flex',
    justifyItems: 'space-between',
  },
  flex: {
    flex: 4,
  },
  flexSmall: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

export class Footer extends React.Component {

  static propTypes = {
  };

  static defaultProps = {
  };

  render() {

    const { classes, onNext, onPrevious, onFirst, onLast } = this.props
    return (
      <Toolbar className={classes.root}>
        <Button onClick={onLast} className={classes.flexSmall} color="contrast">Last</Button>
        <Button onClick={onPrevious} className={classes.flex} color="contrast">Previous</Button>
        <Button onClick={onNext} className={classes.flex} color="contrast">Next</Button>
      </Toolbar>
    )
  }
}

//TODO add a jump to currnet order
        // <Button onClick={onJumpToNextEnter} className={classes.flex} color="contrast">Enter</Button>
export default withStyles(styles)(Footer)
