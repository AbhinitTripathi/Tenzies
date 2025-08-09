import Die from './components/Die.jsx'
import { useState } from 'react'

export default function App() {

    const [dice, setDice] = useState(generateAllNewDice());
    
    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => {
            return Math.ceil(Math.random()*6)
        });
    }

    function rollDice() {
        setDice(generateAllNewDice());
    }

    const diceElements = dice.map((die, index) => {
        return <Die key={index} value={die} />
    })

    generateAllNewDice();
    return (
        <main>
            <div className='die-container'>
                {diceElements}
            </div>

            <button className='roll-dice' onClick={rollDice}>Roll Dice</button>
        </main>
    );
}
