import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import { useState } from "react";

function App() {
    const [colors, setColors] = useState(initialColors);

    function handleAddColor(newColor) {
        setColors([newColor, ...colors]);
        console.log(newColor);
    }

    function handleDeleteColor(colorToDelete) {
        setColors(colors.filter((color) => color !== colorToDelete));
    }

    return (
        <>
            <h1>Theme Creator</h1>
            <ColorForm onAddColor={handleAddColor} />
            <ul>
                {colors.map((color) => (
                    <li key={color.id}>
                        <Color
                            color={color}
                            onDeleteColor={handleDeleteColor}
                        />
                    </li>
                ))}
            </ul>
            {colors.length === 0 && <p>No colors.. start by adding one!</p>}
        </>
    );
}

export default App;
