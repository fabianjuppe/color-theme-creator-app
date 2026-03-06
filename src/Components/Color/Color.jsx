import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDeleteColor }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    return (
        <div className="color-card" style={{ backgroundColor: color.hex }}>
            <h2 className="color-card-highlight">{color.hex.toUpperCase()}</h2>
            <p style={{ color: color.contrastText }}>{color.role}</p>
            <p style={{ color: color.contrastText }}>
                contrast: {color.contrastText.toUpperCase()}
            </p>
            {showConfirmation && (
                <>
                    <p className="color-card-highlight">Really delete?</p>
                    <button
                        onClick={() => setShowConfirmation(!showConfirmation)}
                    >
                        CANCEL
                    </button>
                </>
            )}
            <button
                onClick={
                    showConfirmation
                        ? () => onDeleteColor?.(color)
                        : () => setShowConfirmation(!showConfirmation)
                }
            >
                DELETE
            </button>
        </div>
    );
}
