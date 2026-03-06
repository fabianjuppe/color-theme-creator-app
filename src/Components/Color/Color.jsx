import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import ContrastCheck from "../ContrastCheck/ContrastCheck";

export default function Color({ color, onDeleteColor, onEditColor }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);

    function handleEditColor(editedColor) {
        onEditColor(editedColor);
        setShowEditMode(false);
    }

    return (
        <div className="color-card" style={{ backgroundColor: color.hex }}>
            <h2 className="color-card-highlight">{color.hex.toUpperCase()}</h2>
            <CopyToClipboard hex={color.hex} />
            <p style={{ color: color.contrastText }}>{color.role}</p>
            <p style={{ color: color.contrastText }}>
                contrast: {color.contrastText.toUpperCase()}
            </p>
            <ContrastCheck color={color.hex} contrast={color.contrastText} />
            {showEditMode && (
                <ColorForm
                    onSubmitColor={handleEditColor}
                    initialColor={color}
                />
            )}
            {showConfirmation && (
                <>
                    <p className="color-card-highlight">Really delete?</p>
                    <button onClick={() => setShowConfirmation(false)}>
                        CANCEL
                    </button>
                </>
            )}
            {showEditMode && (
                <>
                    <button onClick={() => setShowEditMode(false)}>
                        CANCEL
                    </button>
                </>
            )}
            {!showEditMode && (
                <button
                    onClick={
                        showConfirmation
                            ? () => onDeleteColor?.(color)
                            : () => setShowConfirmation(true)
                    }
                >
                    DELETE
                </button>
            )}
            {!showConfirmation && !showEditMode && (
                <button onClick={() => setShowEditMode(!showEditMode)}>
                    EDIT
                </button>
            )}
        </div>
    );
}
