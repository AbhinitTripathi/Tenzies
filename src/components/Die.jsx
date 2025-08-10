export default function Die(props) {
        const styles = {
                backgroundColor: props.isHeld ? "#59E391" : "#FFF",
        };
        return (
                <button
                        onClick={() => props.hold(props.id)}
                        style={styles}
                        aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
                        aria-pressed={props.isHeld}
                        disabled={props.gameWon}
                >
                        {props.value}
                </button>
        );
}
