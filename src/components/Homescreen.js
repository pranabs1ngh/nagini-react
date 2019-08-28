import React from 'react'
import { connect } from 'react-redux'
import './css/Homescreen.css'

import { newGame } from '../actions'

class Homescreen extends React.Component {

  newGame = level => {
    this.props.newGame({ level });
  }

  render = () => (
    <div className="init" style={{ 'background': this.props.theme.dark }} >
      <header>N A G I N I</header>
      <p className="choice">Choose level:</p>
      <div className="level">
        <div className='options' onClick={() => this.newGame('easy')}><h4>E a s y</h4></div>
        <div className='options' onClick={() => this.newGame('medium')}><h4>M e d i u m</h4></div>
        <div className='options' onClick={() => this.newGame('hard')}><h4>H a r d</h4></div>
      </div>
    </div>

  )
}

const mapStateToProps = state => ({ theme: state.theme })

export default connect(mapStateToProps, newGame)(Homescreen);