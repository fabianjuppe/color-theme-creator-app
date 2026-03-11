import { initialColors } from "./lib/colors";
import { initialThemes } from "./lib/themes";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";
import Theme from "./Components/Theme/Theme";
import { nanoid } from "nanoid";
import { useState } from "react";

function App() {
    const [themes, setThemes] = useLocalStorageState("themes", {
        defaultValue: initialThemes.map((theme) =>
            theme.id === "t1"
                ? { ...theme, colors: initialColors, default: true }
                : { ...theme, colors: [], default: false },
        ),
    });
    const [currentThemeId, setCurrentThemeId] = useLocalStorageState(
        "currentThemeId",
        { defaultValue: initialThemes[0].id },
    );

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);

    const currentTheme = themes.find((theme) => theme.id === currentThemeId);

    function handleAddTheme() {
        const newTheme = {
            id: nanoid(),
            name: "NEW THEME",
            colors: [],
            default: false,
        };

        setThemes([...themes, newTheme]);
        setCurrentThemeId(newTheme.id);
    }

    function handleDeleteTheme() {
        setCurrentThemeId(themes[0].id);
        setThemes(themes.filter((theme) => theme !== currentTheme));
        setShowConfirmation(false);
    }

    function handleEditTheme(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        setThemes(
            themes.map((theme) =>
                theme.id === currentThemeId
                    ? { ...theme, name: data.themeName }
                    : theme,
            ),
        );

        setShowEditMode(false);
    }

    return (
        <>
            <h1>Theme Creator</h1>
            {showEditMode ? (
                <>
                    <form onSubmit={handleEditTheme}>
                        <input
                            className="app__input"
                            id="themeName"
                            type="text"
                            name="themeName"
                            defaultValue={currentTheme.name}
                        ></input>
                        <button className="app__button" type="submit">
                            Save
                        </button>
                        <button
                            className="app__button theme__button--cancel"
                            onClick={() => setShowEditMode(false)}
                        >
                            Discard
                        </button>
                    </form>
                </>
            ) : showConfirmation ? (
                <>
                    <button
                        className="app__button"
                        onClick={handleDeleteTheme}
                        disabled={currentTheme.default}
                    >
                        Delete
                    </button>
                    <button
                        className="app__button theme__button--cancel"
                        onClick={() => setShowConfirmation(false)}
                        disabled={currentTheme.default}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <select
                        className="app__select"
                        value={currentTheme.id}
                        onChange={(event) =>
                            setCurrentThemeId(event.target.value)
                        }
                    >
                        {themes.map((theme) => (
                            <option key={theme.id} value={theme.id}>
                                {theme.name}
                            </option>
                        ))}
                    </select>
                    <button className="app__button" onClick={handleAddTheme}>
                        Add Theme
                    </button>
                    {!currentTheme.default && (
                        <>
                            <button
                                className="app__button"
                                onClick={() => setShowEditMode(true)}
                            >
                                Edit Theme
                            </button>
                            <button
                                className="app__button"
                                onClick={() => setShowConfirmation(true)}
                            >
                                Delete Theme
                            </button>
                        </>
                    )}
                </>
            )}

            <Theme
                currentTheme={currentTheme}
                themes={themes}
                setThemes={setThemes}
            />
        </>
    );
}

export default App;
