import React, { useRef, useState } from 'react';
import './TicTacToe3players.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';
import triangle_icon from '../Assests/triangle.png';

const initialData = Array(36).fill(" ");
const symbols = ["x", "o", "▲"]; 

const TicTacToe = () => {
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== " ") return;

        const newData = [...data];
        const currentSymbol = symbols[count % 3];

        if (currentSymbol === "x") {
            e.target.innerHTML = `<img src='${cross_icon}'>`;
        } else if (currentSymbol === "o") {
            e.target.innerHTML = `<img src='${circle_icon}'>`;
        } else {
            e.target.innerHTML = `<img src='${triangle_icon}'>`;
        }

        newData[num] = currentSymbol;
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };
    const checkWin = (data) => {
        const size = 6;
        for (let i = 0; i < size; i++) {
            const rowStart = i * size;
            if (
                data[rowStart] !== " " &&
                data[rowStart] === data[rowStart + 1] &&
                data[rowStart + 1] === data[rowStart + 2] &&
                data[rowStart + 2] === data[rowStart + 3] &&
                data[rowStart + 3] === data[rowStart + 4] &&
                data[rowStart + 4] === data[rowStart + 5]
            ) {
                won(data[rowStart]);
                return;
            }
        }
        for (let i = 0; i < size; i++) {
            if (
                data[i] !== " " &&
                data[i] === data[i + size] &&
                data[i + size] === data[i + 2 * size] &&
                data[i + 2 * size] === data[i + 3 * size] &&
                data[i + 3 * size] === data[i + 4 * size] &&
                data[i + 4 * size] === data[i + 5 * size]
            ) {
                won(data[i]);
                return;
            }
        }
        if (
            data[0] !== " " &&
            data[0] === data[size + 1] &&
            data[size + 1] === data[2 * (size + 1)] &&
            data[2 * (size + 1)] === data[3 * (size + 1)] &&
            data[3 * (size + 1)] === data[4 * (size + 1)] &&
            data[4 * (size + 1)] === data[5 * (size + 1)]
        ) {
            won(data[0]);
            return;
        }
        if (
            data[size - 1] !== " " &&
            data[size - 1] === data[2 * (size - 1)] &&
            data[2 * (size - 1)] === data[3 * (size - 1)] &&
            data[3 * (size - 1)] === data[4 * (size - 1)] &&
            data[4 * (size - 1)] === data[5 * (size - 1)]
        ) {
            won(data[size - 1]);
            return;
        }
        if (!data.includes(" ")) {
            titleRef.current.innerHTML = "It's a Draw!";
            setLock(true);
        }
    };
    
    const won = (winner) => {
        setLock(true);
        const winnerIcon = winner === "x" ? cross_icon : winner === "o" ? circle_icon : triangle_icon;
        titleRef.current.innerHTML = `Congratulations: <img src='${winnerIcon}'> Wins`;
    };
    const reset = () => {
        setData(initialData);
        setLock(false);
        titleRef.current.innerHTML = "Tic Tac Toe Game";
        setCount(0);
        
        const cells = document.querySelectorAll(".boxes");
        cells.forEach(cell => (cell.innerHTML = ""));
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game</h1>
            <div className="horizontal-layout">
                <div className="player-container">
                    <div className={`player player1 ${count % 3 === 0 ? "active" : ""}`}>Player 1 (X)</div>
                    <div className={`player player2 ${count % 3 === 1 ? "active" : ""}`}>Player 2 (O)</div>
                    <div className={`player player3 ${count % 3 === 2 ? "active" : ""}`}>Player 3 (▲)</div>
                </div>
                <div className="board">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div className="row" key={i}>
                            {Array.from({ length: 6 }, (_, j) => {
                                const cellIndex = i * 6 + j;
                                return (
                                    <div
                                        className="boxes"
                                        key={cellIndex}
                                        onClick={(e) => toggle(e, cellIndex)}
                                    ></div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
}

export default TicTacToe;
