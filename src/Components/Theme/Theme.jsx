import Color from "../Color/Color";
import ColorForm from "../ColorForm/ColorForm";
import "./Theme.css";

export default function Theme({ currentTheme, themes, setThemes }) {
    function handleAddColor(newColor) {
        setThemes(
            themes.map((theme) =>
                theme.id === currentTheme.id
                    ? { ...theme, colors: [newColor, ...theme.colors] }
                    : theme,
            ),
        );
    }

    function handleDeleteColor(colorToDelete) {
        setThemes(
            themes.map((theme) =>
                theme.id === currentTheme.id
                    ? {
                          ...theme,
                          colors: theme.colors.filter(
                              (color) => color !== colorToDelete,
                          ),
                      }
                    : theme,
            ),
        );
    }

    function handleEditColor(editedColor) {
        setThemes(
            themes.map((theme) =>
                theme.id === currentTheme.id
                    ? {
                          ...theme,
                          colors: theme.colors.map((color) =>
                              color.id === editedColor.id ? editedColor : color,
                          ),
                      }
                    : theme,
            ),
        );
    }

    return (
        <>
            <ColorForm onSubmitColor={handleAddColor} />
            <ul className="theme__list">
                {currentTheme.colors.map((color) => (
                    <li key={color.id}>
                        <Color
                            color={color}
                            onDeleteColor={handleDeleteColor}
                            onEditColor={handleEditColor}
                        />
                    </li>
                ))}
            </ul>
            {currentTheme.colors.length === 0 && (
                <p>No colors... start by adding one!</p>
            )}
        </>
    );
}
