import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import ContrastCheck from "../ContrastCheck/ContrastCheck";
import { Pencil, Trash2 } from "lucide-react";

export default function Color({ color, onDeleteColor, onEditColor }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);

    function handleEditColor(editedColor) {
        onEditColor(editedColor);
        setShowEditMode(false);
    }

    return (
        <div className="color-card" style={{ backgroundColor: color.hex }}>
            {showEditMode ? (
                <ColorForm
                    onSubmitColor={handleEditColor}
                    setShowEditMode={setShowEditMode}
                    initialColor={color}
                />
            ) : showConfirmation ? (
                <>
                    <button
                        className="color-card__button color-card__button--delete"
                        onClick={() => onDeleteColor(color)}
                    >
                        Delete
                    </button>
                    <button
                        className="color-card__button color-card__button--cancel"
                        onClick={() => setShowConfirmation(false)}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <CopyToClipboard
                        color={color.hex}
                        contrast={color.contrastText}
                    />
                    <p style={{ color: color.contrastText }}>{color.role}</p>
                    <p style={{ color: color.contrastText }}>
                        {color.contrastText.toUpperCase()}
                    </p>
                    <ContrastCheck
                        color={color.hex}
                        contrast={color.contrastText}
                    />
                </>
            )}

            {!showConfirmation && !showEditMode && (
                <>
                    <button
                        className="color-card__icon color-card__icon--delete"
                        onClick={() => setShowConfirmation(true)}
                    >
                        <Trash2 size={25} color={color.contrastText} />
                    </button>
                    <button
                        className="color-card__icon color-card__icon--edit"
                        onClick={() => setShowEditMode(true)}
                    >
                        <Pencil size={25} color={color.contrastText} />
                    </button>
                </>
            )}
        </div>
    );
}
