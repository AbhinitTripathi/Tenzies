import Die from './components/Die.jsx'
import { useState } from 'react'

export default function App() {

    const [dice, setDice] = useState(generateAllNewDice());
    
    function generateAllNewDice() {
        return new Array(10).fill(0).map((_, index) => {
            return <Die id={index} value={Math.ceil(Math.random()*6)}/>
        });
    }

    generateAllNewDice();
    return (
        <main>
            <div className='die-container'>
                {dice}
            </div>
        </main>
    );
}
