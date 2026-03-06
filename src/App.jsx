import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";

function App() {
        const [colors, setColors] = useLocalStorageState("colors", {
        defaultValue: initialColors,
    });

    function handleAddColor(newColor) {
        setColors([newColor, ...colors]);
        console.log(newColor);
    }

    function handleDeleteColor(colorToDelete) {
        setColors(colors.filter((color) => color !== colorToDelete));
    }

    function handleEditColor(editedColor) {
        setColors(
            colors.map((color) =>
                color.id === editedColor.id ? editedColor : color,
            ),
        );
    }

    return (
        <>
            <h1>Theme Creator</h1>
            <ColorForm onSubmitColor={handleAddColor} />
            <ul>
                {colors.map((color) => (
                    <li key={color.id}>
                        <Color
                            color={color}
                            onDeleteColor={handleDeleteColor}
                            onEditColor={handleEditColor}
                        />
                    </li>
                ))}
            </ul>
            {colors.length === 0 && <p>No colors.. start by adding one!</p>}
        </>
    );
}

export default App;
