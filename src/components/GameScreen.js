import React from 'react'

class GameScreen extends React.Component {

  componentDidMount = () => {
    const canvas = this.refs.canvas;

  }

  render = () => (
    <>
      <canvas ref='canvas' />
    </>
  );
}

export default (GameScreen);