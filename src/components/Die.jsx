import { useState, useEffect } from "react";

export default function Die({ id, value, isHeld, hold, gameWon, triggerFlip }) {
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        if (triggerFlip && !isHeld) {
            setIsFlipping(true);
            const timer = setTimeout(() => {
                setIsFlipping(false);
            }, 600); // must match CSS animation time
            return () => clearTimeout(timer);
        }
    }, [triggerFlip, isHeld]);

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "#FFF",
    };

    const pipStyles = {
        backgroundColor: isHeld ? "#FFF" : "#000",
    };

    return (
        <button
            onClick={() => hold(id)}
            style={styles}
            aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
            aria-pressed={isHeld}
            disabled={gameWon}
            className={`die face-${value} ${isFlipping ? "flipping" : ""}`}
        >
            {Array(9)
                .fill(null)
                .map((_, i) => (
                    <span
                        key={i}
                        className="pip"
                        style={pipStyles}
                    />
                ))}
        </button>
    );
}