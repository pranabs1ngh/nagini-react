import React from 'react'
import { connect } from 'react-redux';
import { updateScore, updateHighScore, updatePage } from '../actions'

import './css/SnakeBoard.css'
import image from './img/food.png'
import '../services/roundedRectangle'
import ResultScreen from './ResultScreen'

class SnakeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.foodImg = new Image();
    this.foodImg.src = image;

    this.food = null;
    this.snake = [
      { i: 6, j: 2 },
      { i: 6, j: 3 },
      { i: 6, j: 4 },
    ];

    this.keyPressed = 'ArrowRight';
    this.snakeDirection = 'ArrowRight';
    this.refreshTime = null;
  }

  initArea = () => {
    let area = new Array(this.state.row);
    for (let i = 0; i < this.state.row; i++)
      area[i] = new Array(this.state.col);

    for (let i = 0; i < this.state.row; i++)
      for (let j = 0; j < this.state.col; j++)
        area[i][j] = 0;

    if (this.food)
      area[this.food.i][this.food.j] = 9;

    this.snake.forEach(e => {
      area[e.i][e.j] = 1;
    });

    this.setState({ area });
  }

  changeDirection = direction => {
    if (this.snakeDirection === this.keyPressed) {
      if (direction === 'w') direction = 'ArrowUp';
      if (direction === 's') direction = 'ArrowDown';
      if (direction === 'a') direction = 'ArrowLeft';
      if (direction === 'd') direction = 'ArrowRight';

      if (direction === 'ArrowUp' && this.keyPressed !== 'ArrowDown')
        this.keyPressed = direction;
      else if (direction === 'ArrowDown' && this.keyPressed !== 'ArrowUp')
        this.keyPressed = direction;
      else if (direction === 'ArrowRight' && this.keyPressed !== 'ArrowLeft')
        this.keyPressed = direction;
      else if (direction === 'ArrowLeft' && this.keyPressed !== 'ArrowRight')
        this.keyPressed = direction;
    }
  }

  generateFood = () => {
    let i = Math.floor(Math.random() * this.state.col);
    let j = Math.floor(Math.random() * this.state.row);

    for (let n = 0; n < this.snake.length; n++)
      if (i === this.snake[n].i && j === this.snake[n].j) return this.generateFood();

    this.food = { i, j };
  }

  nextPos = () => {
    const pos = this.snake[this.snake.length - 1];
    let i, j;

    switch (this.keyPressed) {
      case 'ArrowUp':
        i = pos.i - 1;
        j = pos.j;
        break;
      case 'ArrowDown':
        i = pos.i + 1;
        j = pos.j;
        break;
      case 'ArrowLeft':
        i = pos.i;
        j = pos.j - 1;
        break;
      case 'ArrowRight':
        i = pos.i;
        j = pos.j + 1;
        break;
      default:
        i = pos.i;
        j = pos.j;
    }

    return { i, j };
  }

  moveSnake = () => {
    const nextPos = this.nextPos();

    if (nextPos.i >= 0 && nextPos.i < this.state.col && nextPos.j >= 0 && nextPos.j < this.state.row && this.state.area[nextPos.i][nextPos.j] !== 1)
      this.snake.push(nextPos);
    else
      return false;

    if (this.state.area[nextPos.i][nextPos.j] === 9) {
      let score = this.props.game.score;
      let highScore = this.props.game.highScore;

      score += 10;
      this.props.updateScore(score);
      this.refreshTime -= 3;

      if (score > highScore) {
        highScore = score;
        this.props.updateHighScore(highScore);
      }
      this.generateFood();
    }
    else this.snake.shift();

    this.snakeDirection = this.keyPressed;

    return true;
  }

  snakeController = () => {
    setTimeout(() => {
      const shouldContinue = this.moveSnake();
      if (shouldContinue) {
        this.initArea();
        this.snakeController();
      } else {
        setTimeout(() => {
          this.props.updatePage(<ResultScreen />);
        }, 1000);
      }
    }, this.refreshTime);
  }

  updateCanvasDimensions = () => {
    const width = window.innerWidth > 500 ? 850 : 390;
    const height = window.innerWidth > 500 ? 700 : 390;
    const boxSize = width > 400 ? 50 : 30;
    const rectRadius = boxSize === 50 ? 15 : 11;
    const row = width / boxSize;
    const col = height / boxSize;

    const canvas = this.refs.canvas;
    canvas.width = width;
    canvas.height = height;

    this.setState({ width, height, row, col, boxSize, rectRadius });
  }

  componentDidMount = async () => {
    await this.updateCanvasDimensions();

    if (this.props.game.level === 'easy') this.refreshTime = 200;
    else if (this.props.game.level === 'medium') this.refreshTime = 150;
    else this.refreshTime = 100;

    this.initArea();
    this.generateFood();

    this.snakeController();

    document.addEventListener('keydown', e => {
      this.changeDirection(e.key)
    })
  }

  componentDidUpdate = () => {
    let ctx = this.refs.canvas.getContext('2d');
    let bg = this.props.theme.light;

    const { col, row, boxSize, rectRadius } = this.state;

    // 1. Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 2. Render Background
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        ctx.fillStyle = bg;
        ctx.fillRect(j * boxSize, i * boxSize, boxSize, boxSize);

        bg = (bg === this.props.theme.light) ? this.props.theme.dark : this.props.theme.light;
      }
    }

    // 2. Render Snake and Food
    this.snake.forEach(e => {
      ctx.roundRect(e.j * boxSize, e.i * boxSize, boxSize, boxSize, rectRadius);
      ctx.fillStyle = this.props.theme.snake;
      ctx.fill();
    })
    if (this.food)
      ctx.drawImage(this.foodImg, this.food.j * boxSize, this.food.i * boxSize, boxSize, boxSize);
  }

  render = () => (
    <div className='snakeboard-container'>
      <div className='scores'>
        <p>Score: {this.props.game.score}</p>
        <p>High Score: {this.props.game.highScore}</p>
      </div>

      <canvas
        ref='canvas'
        style={{
          'border': `3px solid ${this.props.theme.dark}`
        }}
      />
    </div>
  );
}

const mapStateToProps = state => ({ game: state.game, theme: state.theme })

export default connect(mapStateToProps, { updateScore, updateHighScore, updatePage })(SnakeBoard);