import "./Color.css";

export default function Color({ color }) {
    return (
        <div className="color-card" style={{ backgroundColor: color.hex }}>
            <h2 className="color-card-headline">{color.hex}</h2>
            <p style={{ color: color.contrastText }}>{color.role}</p>
            <p style={{ color: color.contrastText }}>
                contrast: {color.contrastText}
            </p>
        </div>
    );
}
