import React from 'react'
import { connect } from 'react-redux'
import { newGame, updatePage } from '../actions'

import './css/Homescreen.css'
import SnakeBoard from './SnakeBoard'

class Homescreen extends React.Component {

  newGame = async level => {
    await this.props.newGame({ level });
    this.props.updatePage(<SnakeBoard />);
  }

  render = () => (
    <div className="container" style={{ 'background': this.props.theme.dark }} >
      <header>N A G I N I</header>
      <p className="choice">Choose level:</p>
      <div className="options">
        <div className='level' onClick={() => this.newGame('easy')}><h4>E a s y</h4></div>
        <div className='level' onClick={() => this.newGame('medium')}><h4>M e d i u m</h4></div>
        <div className='level' onClick={() => this.newGame('hard')}><h4>H a r d</h4></div>
      </div>
    </div>

  )
}

const mapStateToProps = (state, ownProps) => ({ theme: state.theme, updatePage: ownProps.updateComponent })

export default connect(mapStateToProps, { newGame, updatePage })(Homescreen);