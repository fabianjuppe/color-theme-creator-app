import { useEffect, useState } from "react";
import "./CopyToClipboard.css";

export default function CopyToClipboard({ hex }) {
    const [wasCopied, setWasCopied] = useState(false);

    async function handleCopyToClipboard() {
        await navigator.clipboard.writeText(hex);
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
        <button onClick={handleCopyToClipboard}>
            {wasCopied ? "SUCCESFULLY COPIED!" : "COPY"}
        </button>
    );
}
