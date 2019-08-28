import React from 'react'
import { connect } from 'react-redux'

import theme from '../services/theme'
import { updateTheme } from '../actions'

import './css/App.css'
import Homescreen from './Homescreen'
import SnakeBoard from './SnakeBoard'

class App extends React.Component {
  state = {};

  componentWillMount = async () => {
    this.props.updateTheme(theme());

    if (!this.state.game) this.setState({ component: <Homescreen /> });
    else if (this.state.game) this.setState({ component: <SnakeBoard /> });
  }

  render = () => (
    <>
      {this.state.component}
    </>
  )
}

const mapStateToProps = state => ({ game: state.game })

export default connect(mapStateToProps, { updateTheme })(App);