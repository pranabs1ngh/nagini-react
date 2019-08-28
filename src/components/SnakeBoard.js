import React from 'react'
import { connect } from 'react-redux';

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

    area[this.state.food.i][this.state.food.j] = 9;

    this.state.snake.forEach(e => {
      area[e.i][e.j] = 1;
    });

    this.setState({ area });
  }

  changeDirection = direction => {
    if (direction === 'ArrowUp' && this.state.snakeDirection !== 'ArrowDown')
      this.setState({ snakeDirection: direction });
    else if (this.state.snakeDirection === 'ArrowDown' && this.state.snakeDirection !== 'ArrowUp')
      this.setState({ snakeDirection: direction });
    else if (this.state.snakeDirection === 'ArrowRight' && this.state.snakeDirection !== 'ArrowLeft')
      this.setState({ snakeDirection: direction });
    else if (this.state.snakeDirection === 'ArrowLeft' && this.state.snakeDirection !== 'ArrowRight')
      this.setState({ snakeDirection: direction });
  }

  generateFood = () => {
    let i = Math.floor(Math.random() * this.state.col);
    let j = Math.floor(Math.random() * this.state.row);

    this.state.snake.forEach(e => {
      if (i === e.i && j === e.j) return this.generateFood();
    });

    this.setState({ food: { i, j } });
  }

  nextPos = () => {
    const pos = this.state.snake[this.state.snake.length - 1];
    let i, j;

    switch (this.state.snakeDirection) {
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

  move = () => {
    const nextPos = this.nextPos();
    const snake = this.state.snake;

    if (nextPos.i >= 0 && nextPos.i < this.state.col && nextPos.j >= 0 && nextPos.j < this.state.row && this.state.area[nextPos.i][nextPos.j] !== 1)
      snake.push(nextPos);
    else
      return false;

    if (this.state.area[nextPos.i][nextPos.j] === 9) this.generateFood();
    else snake.shift();

    this.setState({ snake });

    return true;
  }

  renderBG = () => {
    let ctx = this.refs.canvas.getContext('2d');
    let bg = this.props.theme.light;
    const row = ctx.canvas.width / 50;
    const col = ctx.canvas.height / 50;

    this.setState({ row, col });

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        ctx.fillStyle = bg;
        ctx.fillRect(j * 50, i * 50, 50, 50);

        bg = (bg === this.props.theme.light) ? this.props.theme.dark : this.props.theme.light;
      }
    }
  }

  renderSnake = () => {
    let ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.renderBG();

    for (let i = 0; i < this.state.col / 50; i++) {
      for (let j = 0; j < this.state.row / 50; j++) {
        if (this.state.area[i][j] === 1) {
          ctx.roundRect(j * 50, i * 50, 50, 50, 15);
          ctx.fillStyle = this.state.theme.snake;
          ctx.fill();
        } else if (this.state.area[i][j] === 9) {
          ctx.drawImage(this.state.foodImg, j * 50, i * 50, 50, 50);
        }
      }
    }
  }

  snakeController = () => {
    setTimeout(() => {
      const shouldContinue = this.move();
      if (shouldContinue) {
        this.initArea();
        this.renderSnake();

        this.snakeController();
      }
    }, 100);
  }

  updateCanvasDimensions = () => {
    const width = window.innerWidth > 500 ? 850 : 450;
    const height = window.innerWidth > 500 ? 700 : 450;

    this.setState({ width, height });
  }

  UNSAFE_componentWillMount = () => {
    let food = new Image();
    food.src = image;
    this.setState({
      foodImg: food,
      snake: [
        { i: 6, j: 2 },
        { i: 6, j: 3 },
        { i: 6, j: 4 },
      ],
      snakeDirection: 'ArrowRight',
      food: { i: 0, j: 0 }
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
    <>
      <canvas
        ref='canvas'
        style={{
          'border': `3px solid ${this.props.theme.dark}`,
          'borderRadius': '10px',
        }} />
    </>
  );
}

const mapStateToProps = state => ({ game: state.game, theme: state.theme })

export default connect(mapStateToProps)(SnakeBoard);