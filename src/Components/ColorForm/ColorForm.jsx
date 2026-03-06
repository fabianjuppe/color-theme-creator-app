import { nanoid } from "nanoid";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onSubmitColor, initialColor }) {
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
            }}
        >
            <label htmlFor="role">Role</label>
            <input
                id="role"
                type="text"
                name="role"
                placeholder="some color"
                defaultValue={initialColor?.role || ""}
                required
            />
            <label htmlFor="hex">Hex</label>
            <ColorInput id="hex" hex={initialColor?.hex || "#123456"} />
            <label htmlFor="contrastText">Contrast Text</label>
            <ColorInput
                id="contrastText"
                hex={initialColor?.contrastText || "#ffffff"}
            />
            <button type="submit">
                {initialColor ? "UPDATE COLOR" : "ADD COLOR"}
            </button>
        </form>
    );
}
