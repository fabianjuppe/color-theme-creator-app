import { nanoid } from "nanoid";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onAddColor }) {
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        onAddColor({
            id: nanoid(),
            role: data.role,
            hex: data.hex.toUpperCase(),
            contrastText: data.contrastText.toUpperCase(),
        });

        event.target.reset();
    }

    return (
        <form className="color-form" onSubmit={handleSubmit}>
            <label htmlFor="role">Role</label>
            <input
                id="role"
                type="text"
                name="role"
                placeholder="some color"
                required
            />
            <label htmlFor="hex">Hex</label>
            <ColorInput id="hex" hex="#123456" />
            <label htmlFor="contrastText">Contrast Text</label>
            <ColorInput id="contrastText" hex="#ffffff" />
            <button type="submit">ADD COLOR</button>
        </form>
    );
}
