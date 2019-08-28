import React from 'react'
import { connect } from 'react-redux'

import theme from '../services/theme'
import { updateTheme, updatePage } from '../actions'

import './css/App.css'
import Homescreen from './Homescreen'

class App extends React.Component {
  UNSAFE_componentWillMount = () => {
    this.props.updateTheme(theme());
    this.props.updatePage(<Homescreen />);
  }

  render = () => (
    <>
      {this.props.page}
    </>
  )
}

const mapStateToProps = state => ({ game: state.game, page: state.page })

export default connect(mapStateToProps, { updateTheme, updatePage })(App);