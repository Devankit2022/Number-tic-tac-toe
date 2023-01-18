import { useState } from 'react';
import Square from './Square';
import '../index.css';

function Board() {
    const [square, setSquare] = useState(Array(9).fill(null));
    const [X, setX] = useState(1);

    const winner = calculateWinner(square);
    let status;
    let player = X % 2 !== 0 ? 'Your turn' : 'Computer turn';
    if (winner) {
        if (player === 'Your turn') {
            status = 'Winner COMPUTER';
        } else {
            status = 'Winner YOU';
        }
        setTimeout(() => {
            setSquare(Array(9).fill(null));
            setX(1);
        }, 2000);
    } else {
        if (X === 10) {
            status = 'Game Over - TIE';
        } else {
            status = player;
        }
    }
    const renderSquare = (i) => {
        if (!winner) {
            return <Square value={square[i]} onClick={() => handleClick(i)} />;
        }
    };
    const handleClick = (i) => {
        const squares = square.slice();
        if (squares[i] === null) {
            squares[i] = X;
            setSquare(squares);
            setX(X + 1);
            let k = i + 1;
            let bl = true;
            while (k <= 8) {
                if (squares[k] === null) {
                    squares[k] = X + 1;
                    setSquare(squares);
                    setX(X + 2);
                    bl = false;
                    break;
                }
                k++;
            }
            if (bl) {
                k = i - 1;
                while (k >= 0) {
                    if (squares[k] === null) {
                        squares[k] = X + 1;
                        setSquare(squares);
                        setX(X + 2);
                        bl = false;
                        break;
                    }
                    k--;
                }
            }
        } else {
            alert("Can't do that");
        }
    };

    function calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (square[a] + square[b] + square[c] === 15) {
                return true;
            }
        }
        return null;
    }

    const rules = (
        <div>
            <h1>Rules</h1>
            <p># You can click in any sqaue to enter the value.</p>
            <p>
                # You cannnot just mannually enter the value, values are
                incresed by one based on the highest value present up to 9.
            </p>
            <p>
                # In computers turn it put the next value you just put, so play
                based on this rule.
            </p>
            <h3>ALL THE BEST</h3>
        </div>
    );
    return (
        <div className="board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>

            <h3>{status}</h3>
            {!winner ? rules : <></>}
        </div>
    );
}

export default Board;
