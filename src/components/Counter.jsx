export default function Counter({ label, count, setcount }) {
    return (
        <div className="counter">
            <div className="label">{label}: {count}</div>
            <div className="buttonRow">
                <button className="counterButton" onClick={() => setcount(Math.max(0, count - 1))}>
                    <span className="buttonText">-</span>
                </button>
                <button className="counterButton" onClick={() => setcount(count + 1)}>
                    <span className="buttonText">+</span>
                </button>
            </div>
        </div>
    );
}
