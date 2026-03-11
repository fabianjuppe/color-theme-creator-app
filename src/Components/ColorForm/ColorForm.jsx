import { nanoid } from "nanoid";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({
    onSubmitColor,
    setShowEditMode,
    initialColor,
}) {
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        onSubmitColor({
            id: initialColor?.id || nanoid(),
            role: data.role,
            hex: data.hex.toUpperCase(),
            contrastText: data.contrastText.toUpperCase(),
        });

        event.target.reset();
    }

    return (
        <form
            className="color-form"
            onSubmit={handleSubmit}
            style={{
                color: initialColor ? initialColor.contrastText : "#000000",
                backgroundColor: initialColor ? "" : "#d3d3d3",
            }}
        >
            <label htmlFor="hex">Hex</label>
            <ColorInput id="hex" hex={initialColor?.hex || "#2edb53"} />
            <label htmlFor="role">Role</label>
            <input
                className="color-form__input"
                id="role"
                type="text"
                name="role"
                placeholder="some color"
                defaultValue={initialColor?.role || ""}
                required
            />

            <label htmlFor="contrastText">Contrast Text</label>
            <ColorInput
                id="contrastText"
                hex={initialColor?.contrastText || "#ffffff"}
            />
            <div>
                <button
                    className="color-form__button color-form__button--save"
                    type="submit"
                >
                    {initialColor ? "Save" : "Add"}
                </button>
                {initialColor && (
                    <button
                        className="color-form__button color-form__button--discard"
                        onClick={() => setShowEditMode(false)}
                    >
                        Discard
                    </button>
                )}
            </div>
        </form>
    );
}
