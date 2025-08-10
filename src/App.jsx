import Die from "./components/Die.jsx";
import { useState, useRef, useEffect } from "react";
import Confetti from "./components/Confetti.jsx"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice());
    const rollCounter = useRef(0);
    const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value);
    
    // Focus on new game button when game is won
    const newGameRef = useRef(null);
    useEffect(() => {
        if (gameWon && newGameRef.current) {
            newGameRef.current.focus();
        }
    }, [gameWon]);

    // Default dice state
    function generateAllNewDice() {
        return new Array(10).fill({}).map((_, i) => {
            return {
                id: i,
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
            };
        });
    }

    // Generate new state when 'Role Dice' is clicked
    function rollDice(e) {
        if(e.target.innerText === "Roll") {
            rollCounter.current++;
            setDice((prevDice) => {
                return prevDice.map((die) => {
                    return die.isHeld
                        ? die
                        : { ...die, value: Math.ceil(Math.random() * 6) };
                });
            });
        } else {
            rollCounter.current = 0;
            setDice(generateAllNewDice);
        }
    }

    // Pass down to Die component to change isHeld when clicked
    function hold(inID) {
        setDice((prevDice) => {
            return prevDice.map((die) => {
                return die.id === inID ? { ...die, isHeld: !die.isHeld } : die;
            });
        });
    }

    const diceElements = dice.map((die) => {
        return (
            <Die
                key={die.id}
                id={die.id}
                value={die.value}
                isHeld={die.isHeld}
                hold={hold}
                gameWon={gameWon}
            />
        );
    });

    return (
        <main>
            {gameWon ? <Confetti /> : null}
            <div aria-live="polite" className="sr-only">
                {gameWon ? <p>You won! Press new game to start again</p> : null}
            </div>
            {gameWon ? 
                <div className="blur">
                    <h2>You Won!</h2>
                    <h4>It took you {rollCounter.current} rolls!</h4>
                </div>
                : null
            }
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="die-container">{diceElements}</div>

            <button ref={gameWon ? newGameRef : null} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    );
}
