import React from 'react'

class SnakeBoard extends React.Component {
  state = {}

  updateCanvasDimensions = () => {
    const width = window.innerWidth > 500 ? 850 : 450;
    const height = window.innerWidth > 500 ? 700 : 450;

    this.setState({ width, height });
  }

  componentDidMount = async () => {
    await this.updateCanvasDimensions();
    await window.addEventListener('resize', this.updateCanvasDimensions);

    const canvas = this.refs.canvas;
    canvas.width = this.state.width;
    canvas.height = this.state.height;

  }

  render = () => (
    <>
      <canvas ref='canvas' />
    </>
  );
}

export default (SnakeBoard);