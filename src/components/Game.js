import React from "react";
import Board from "./Board";
import calculateWinner from "../util/calculateWinner";
import calculatePosition from "../util/calculatePosition";

class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
        squareNumber: null
      }
    ],
    xIsNext: true,
    currentStep: 0
  };

  jumpTo = step => {
    this.setState({
      currentStep: step,
      xIsNext: step % 2 === 0
    });
  };

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.currentStep + 1);
    const current = history[this.state.currentStep];
    const res = calculateWinner(current.squares);
    if (current.squares[i] === null && !res) {
      const squares = current.squares.slice();
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
            squareNumber: i
          }
        ]),
        currentStep: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.currentStep];
    const res = calculateWinner(current.squares);
    let status;
    if (res) {
      status = "Winner " + res;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    const moves = history.map((step, move) => {
      const pos = calculatePosition(step.squareNumber);
      const desc = move
        ? "go to move " + move + " at (" + pos[0] + "," + pos[1] + ")"
        : "go to game start";
      if (move === this.state.currentStep) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              <b>{desc}</b>
            </button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
