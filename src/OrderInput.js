import React from 'react'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import './OrderInput.css'

const styles = () => ({})

export default function() {
  return (
    <div>hi</div>
  )
}

// export class OrderInput extends React.Component {

//   static propTypes = {
//   };

//   static defaultProps = {
//   };

//   render() {
//     const { children } = this.props

//     return (
//       <div className="OrderInput">
//         <div className="stack">
//           <Button floating >
//             +
//           </Button>
//         </div>
//         <div className="stack">
//           {children}
//         </div>
//         <div className="stack">
//           <Button floating mini secondary>
//             -
//           </Button>
//         </div>
//       </div>
//     )
//   }
// }

// export default withStyles(styles)(OrderInput)
