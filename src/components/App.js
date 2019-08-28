import React from 'react'
import { connect } from 'react-redux'

import './css/App.css'
import Homescreen from './Homescreen'
import GameScreen from './GameScreen'

class App extends React.Component {
  state = {};

  componentWillMount = () => {
    if (!this.state.game) this.setState({ component: <Homescreen /> });
    else if (this.state.game) this.setState({ component: <GameScreen /> });
  }

  render = () => (
    <>
      {this.state.component}
    </>
  )
}

const mapStateToProps = state => ({ game: state.game })

export default connect(mapStateToProps)(App);