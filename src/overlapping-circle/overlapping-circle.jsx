import { useEffect, useState } from "react";
import "./style.css";

function OverlappingCircle() {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  }

  function handleDocumentClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    const newCircle = { x, y };
    setCircles((prevCircles) => {
      const oldCircles = structuredClone(prevCircles);

      const newColor = getRandomColor();

      oldCircles.forEach((c) => {
        const x1 = c.x;
        const y1 = c.y;

        const x2 = newCircle.x;
        const y2 = newCircle.y;

        const xDiff = x2 - x1;
        const yDiff = y2 - y1;

        const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

        const RADIUS_SUM = 200; // each circle is of size 200.

        if (distance < RADIUS_SUM) {
          newCircle.color = newColor;
          c.color = newColor;
        }
      });

      oldCircles.push(newCircle);

      return oldCircles;
    });
  }

  return (
    <div className="circle">
      {circles.map((coord, index) => {
        return (
          <Circle key={index} x={coord.x} color={coord.color} y={coord.y} />
        );
      })}
    </div>
  );
}

function Circle({ x, y, color }) {
  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: color ?? "red",
      }}
      className="circle-comp"
    />
  );
}

export default OverlappingCircle;
