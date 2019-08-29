import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faHome } from '@fortawesome/free-solid-svg-icons'

import './css/ResultScreen.css'
import theme from '../services/theme'
import { updatePage, updateTheme, updateScore } from '../actions'

import Homescreen from './Homescreen'
import SnakeBoard from './SnakeBoard'

class ResultScreen extends React.Component {

  handleReplay = () => {
    this.props.updateTheme(theme());
    this.props.updateScore(0);
    this.props.updatePage(<SnakeBoard />);
  }

  handleHome = () => {
    this.props.updateTheme(theme());
    this.props.updateScore(0);
    this.props.updatePage(<Homescreen />);
  }

  render = () => (
    <div className='container' style={{ 'background': this.props.theme.dark }}>
      <div className='game-over'>
        <p>G A M E</p>
        <p>O V E R !!</p>
      </div>

      <div className='result'>
        <div className='score'>YOUR SCORE: {this.props.game.score}</div>
        <div className='high-score'> HIGH SCORE: {this.props.game.highScore}</div>
      </div>

      <div className='actions'>
        <FontAwesomeIcon icon={faRedoAlt} size="2x" onClick={this.handleReplay} />
        <FontAwesomeIcon icon={faHome} size="2x" onClick={this.handleHome} />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  game: state.game,
  theme: state.theme
});

export default connect(mapStateToProps, { updatePage, updateScore, updateTheme })(ResultScreen);