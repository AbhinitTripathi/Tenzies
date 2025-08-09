import Die from "./components/Die.jsx";
import { useState } from "react";

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice());

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
    function rollDice() {
        setDice(generateAllNewDice());
    }

    // Pass down to Die component to change isHeld when clicked
    function hold(inID) {
        setDice(prevDice => {
            return prevDice.map(die => {
                return die.id === inID ? {...die, isHeld: !die.isHeld} : die
            })
        })
    }

    const diceElements = dice.map((die) => {
        return (
            <Die
                key={die.id}
                id={die.id}
                value={die.value}
                isHeld={die.isHeld}
                hold={hold}
            />
        );
    });

    return (
        <main>
            <div className="die-container">{diceElements}</div>

            <button className="roll-dice" onClick={rollDice}>
                Roll Dice
            </button>
        </main>
    );
}
