import React from 'react'
import { connect } from 'react-redux';
import { updateScore, updateHighScore } from '../actions'

import './css/SnakeBoard.css'
import image from './img/food.png'
import '../services/roundedRectangle'

class SnakeBoard extends React.Component {
  state = {}

  initArea = () => {
    let area = new Array(this.state.row);
    for (let i = 0; i < this.state.row; i++)
      area[i] = new Array(this.state.col);

    for (let i = 0; i < this.state.row; i++)
      for (let j = 0; j < this.state.col; j++)
        area[i][j] = 0;

    if (this.state.food)
      area[this.state.food.i][this.state.food.j] = 9;

    this.state.snake.forEach(e => {
      area[e.i][e.j] = 1;
    });

    this.setState({ area });
  }

  changeDirection = direction => {
    if (this.state.snakeDirection === this.state.keyPressed) {
      if (direction === 'w') direction = 'ArrowUp';
      if (direction === 's') direction = 'ArrowDown';
      if (direction === 'a') direction = 'ArrowLeft';
      if (direction === 'd') direction = 'ArrowRight';

      if (direction === 'ArrowUp' && this.state.keyPressed !== 'ArrowDown')
        this.setState({ keyPressed: direction });
      else if (direction === 'ArrowDown' && this.state.keyPressed !== 'ArrowUp')
        this.setState({ keyPressed: direction });
      else if (direction === 'ArrowRight' && this.state.keyPressed !== 'ArrowLeft')
        this.setState({ keyPressed: direction });
      else if (direction === 'ArrowLeft' && this.state.keyPressed !== 'ArrowRight')
        this.setState({ keyPressed: direction });
    }
  }

  generateFood = () => {
    let i = Math.floor(Math.random() * this.state.col);
    let j = Math.floor(Math.random() * this.state.row);

    this.state.snake.forEach(el => {
      if (i === el.i && j === el.j) return this.generateFood();
    });

    this.setState({ food: { i, j } });
  }

  nextPos = () => {
    const pos = this.state.snake[this.state.snake.length - 1];
    let i, j;

    switch (this.state.keyPressed) {
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
    const snake = this.state.snake;

    if (nextPos.i >= 0 && nextPos.i < this.state.col && nextPos.j >= 0 && nextPos.j < this.state.row && this.state.area[nextPos.i][nextPos.j] !== 1)
      snake.push(nextPos);
    else
      return false;

    if (this.state.area[nextPos.i][nextPos.j] === 9) {
      let score = this.props.game.score;
      let highScore = this.props.game.highScore;

      score += 10;
      this.props.updateScore(score);
      this.setState({ refreshTime: this.state.refreshTime - 3 });

      if (score > highScore) {
        highScore = score;
        this.props.updateHighScore(highScore);
      }
      this.generateFood();
    }
    else snake.shift();

    this.setState({ snake, snakeDirection: this.state.keyPressed });

    return true;
  }

  renderBG = () => {
    let ctx = this.refs.canvas.getContext('2d');
    let bg = this.props.theme.light;

    const boxSize = this.state.width > 400 ? 50 : 30;
    const row = ctx.canvas.width / boxSize;
    const col = ctx.canvas.height / boxSize;

    this.setState({ row, col });

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        ctx.fillStyle = bg;
        ctx.fillRect(j * boxSize, i * boxSize, boxSize, boxSize);

        bg = (bg === this.props.theme.light) ? this.props.theme.dark : this.props.theme.light;
      }
    }
  }

  renderSnake = () => {
    let ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.renderBG();
    const boxSize = this.state.width > 400 ? 50 : 30;
    const rectRadius = boxSize === 50 ? 15 : 11;

    for (let i = 0; i < this.state.col; i++) {
      for (let j = 0; j < this.state.row; j++) {
        if (this.state.area[i][j] === 1) {
          ctx.roundRect(j * boxSize, i * boxSize, boxSize, boxSize, rectRadius);
          ctx.fillStyle = this.props.theme.snake;
          ctx.fill();
        } else if (this.state.area[i][j] === 9) {
          ctx.drawImage(this.state.foodImg, j * boxSize, i * boxSize, boxSize, boxSize);
        }
      }
    }
  }

  snakeController = () => {
    setTimeout(() => {
      const shouldContinue = this.moveSnake();
      if (shouldContinue) {
        this.initArea();
        this.renderSnake();

        this.snakeController();
      }
    }, this.state.refreshTime);
  }

  updateCanvasDimensions = () => {
    const width = window.innerWidth > 500 ? 850 : 390;
    const height = window.innerWidth > 500 ? 700 : 390;

    this.setState({ width, height });
  }

  UNSAFE_componentWillMount = () => {
    let food = new Image();
    food.src = image;

    let refreshTime;
    if (this.props.game.level === 'easy') refreshTime = 250;
    else if (this.props.game.level === 'medium') refreshTime = 200;
    else refreshTime = 150;

    this.setState({
      foodImg: food,
      keyPressed: 'ArrowRight',
      snake: [
        { i: 6, j: 2 },
        { i: 6, j: 3 },
        { i: 6, j: 4 },
      ],
      refreshTime
    });
  }

  componentDidMount = async () => {
    await this.updateCanvasDimensions();
    await window.addEventListener('resize', this.updateCanvasDimensions);

    const canvas = this.refs.canvas;
    canvas.width = this.state.width;
    canvas.height = this.state.height;

    this.renderBG();
    this.initArea();
    this.generateFood();
    this.renderSnake();

    this.snakeController();

    document.addEventListener('keydown', e => {
      this.changeDirection(e.key)
    })
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
        }} />
    </div>
  );
}

const mapStateToProps = state => ({ game: state.game, theme: state.theme })

export default connect(mapStateToProps, { updateScore, updateHighScore })(SnakeBoard);