import { useEffect, useState } from "react";
import "./CopyToClipboard.css";

export default function CopyToClipboard({ color, contrast }) {
    const [wasCopied, setWasCopied] = useState(false);

    async function handleCopyToClipboard() {
        await navigator.clipboard.writeText(color);
        setWasCopied(true);
    }

    useEffect(() => {
        if (!wasCopied) return;

        const timer = setInterval(() => {
            setWasCopied(false);
        }, 3000);

        return () => clearInterval(timer);
    }, [wasCopied]);

    return (
        <>
            <button
                className="copy__button"
                style={{ color: contrast }}
                onClick={handleCopyToClipboard}
            >
                {color.toUpperCase()}
                <span className="copy__feedback">
                    {wasCopied ? "Copied!" : "Copy!"}
                </span>
            </button>
        </>
    );
}
