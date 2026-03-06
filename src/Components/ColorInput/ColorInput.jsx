import { useState } from "react";
import "./ColorInput.css";

export default function ColorInput({ id, hex }) {
    const [input, setInput] = useState(hex);

    function handleInput(event) {
        setInput(event.target.value);
    }

    return (
        <div className="color-input">
            <input
                id={id}
                type="text"
                name={id}
                value={input}
                onChange={handleInput}
            />
            <input
                id={`color-${id}`}
                type="color"
                name={`color-${id}`}
                value={input}
                onChange={handleInput}
            />
        </div>
    );
}
