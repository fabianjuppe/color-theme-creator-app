import { useState } from "react";
import "./ContrastCheck.css";

export default function ContrastCheck({ color, contrast }) {
    const [score, setScore] = useState("");

    async function postFetch() {
        const response = await fetch(
            "https://www.aremycolorsaccessible.com/api/are-they",
            {
                method: "POST",
                body: JSON.stringify({ colors: [color, contrast] }),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const data = await response.json();
        setScore(data.overall);
    }

    postFetch();

    return (
        <p className={`contrast-score contrast-score--${score}`}>
            Contrast Score: {score}
        </p>
    );
}
