"use client";
import { useRef, useState, useEffect } from "react";

export default function DynamicSpinWheel() {
  const [segments, setSegments] = useState([
    { label: "100 Coins", color: "#FF6B6B" },
    { label: "Free Spin", color: "#FFD93D" },
    { label: "500 Coins", color: "#6BCB77" },
    { label: "Jackpot", color: "#4D96FF" },
  ]);

  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  const [editIndex, setEditIndex] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [editColor, setEditColor] = useState("#000000");

  const segmentAngle = segments.length ? 360 / segments.length : 0;

  // Spin wheel logic
  const spinWheel = () => {
    if (isSpinning || segments.length === 0) return;

    setIsSpinning(true);
    setResult(null);

    const randomIndex = Math.floor(Math.random() * segments.length);
    const spins = 360 * (4 + Math.random() * 3);
    // Calculate final rotation so the segment lands under the pointer (pointer at 0deg)
    // We rotate the wheel clockwise, so subtract to align pointer with segment center
    const finalRotation =
      spins +
      360 - // rotate so pointer at top (0deg)
      (randomIndex * segmentAngle + segmentAngle / 2);

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s ease-out";
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;

      setTimeout(() => {
        setIsSpinning(false);
        setResult(segments[randomIndex].label);

        // Lock wheel to final position without animation for next spin
        // Use modulo 360 to keep rotation within 0-360 range
        const lockedRotation =
          (360 - (randomIndex * segmentAngle + segmentAngle / 2)) % 360;
        wheelRef.current.style.transition = "none";
        wheelRef.current.style.transform = `rotate(${lockedRotation}deg)`;
      }, 4000);
    }
  };

  // Add new segment and start editing it immediately
  const addSegment = () => {
    if (isSpinning) return; // Prevent changes while spinning
    setSegments((prev) => {
      const newSegments = [...prev, { label: "New Segment", color: "#888888" }];
      setEditIndex(newSegments.length - 1);
      setEditLabel("New Segment");
      setEditColor("#888888");
      return newSegments;
    });
  };

  // Save edited segment
  const saveSegment = () => {
    if (!editLabel.trim()) {
      alert("Label cannot be empty");
      return;
    }
    setSegments((prev) => {
      const copy = [...prev];
      copy[editIndex] = { label: editLabel, color: editColor };
      return copy;
    });
    setEditIndex(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditIndex(null);
  };

  // Delete segment
  const deleteSegment = (index) => {
    if (!confirm("Delete this segment?")) return;
    setSegments((prev) => {
      const newSegments = prev.filter((_, i) => i !== index);
      // Adjust editIndex if needed
      if (editIndex !== null) {
        if (editIndex === index) {
          cancelEdit();
        } else if (editIndex > index) {
          setEditIndex(editIndex - 1);
        }
      }
      return newSegments;
    });
  };

  // Start editing segment
  const editSegment = (index) => {
    if (isSpinning) return; // Prevent editing while spinning
    setEditIndex(index);
    setEditLabel(segments[index].label);
    setEditColor(segments[index].color);
  };

  // Keyboard accessibility for spin button
  const handleSpinKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      spinWheel();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 text-gray-900 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Dynamic Spin Wheel</h1>

      {/* Wheel */}
      <div className="relative w-64 h-64 mb-6">
        <svg
          ref={wheelRef}
          viewBox="0 0 500 500"
          className="w-full h-full"
          style={{ transformOrigin: "50% 50%", cursor: isSpinning || segments.length === 0 ? "not-allowed" : "pointer" }}
          tabIndex={0}
          role="button"
          aria-label="Spin the wheel"
          onClick={spinWheel}
          onKeyDown={handleSpinKeyDown}
        >
          <circle
            cx="250"
            cy="250"
            r="245"
            fill="#f3f4f6"
            stroke="#ccc"
            strokeWidth="2"
          />
          {segments.map(({ label, color }, i) => {
            const startAngle = segmentAngle * i;
            const endAngle = startAngle + segmentAngle;

            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = 250 + 245 * Math.cos(startRad);
            const y1 = 250 + 245 * Math.sin(startRad);
            const x2 = 250 + 245 * Math.cos(endRad);
            const y2 = 250 + 245 * Math.sin(endRad);

            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

            const pathData = `
              M250,250
              L${x1},${y1}
              A245,245 0 ${largeArcFlag} 1 ${x2},${y2}
              Z
            `;

            const textAngle = startAngle + segmentAngle / 2;
            const textRad = (textAngle * Math.PI) / 180;
            const textX = 250 + 140 * Math.cos(textRad);
            const textY = 250 + 140 * Math.sin(textRad);

            return (
              <g key={i}>
                <path d={pathData} fill={color} stroke="#fff" strokeWidth="1" />
                <text
                  x={textX}
                  y={textY}
                  fill="#111"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                  style={{ userSelect: "none" }}
                >
                  {label}
                </text>
              </g>
            );
          })}
          <circle
            cx="250"
            cy="250"
            r="40"
            fill="#3b82f6"
            pointerEvents="none"
          />
          <text
            x="250"
            y="255"
            fill="white"
            fontWeight="700"
            fontSize="16"
            textAnchor="middle"
            pointerEvents="none"
            style={{ userSelect: "none" }}
          >
            {isSpinning ? "Spinning" : "SPIN"}
          </text>
        </svg>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-b-blue-600 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Result */}
      {result && (
        <p className="mb-4 text-lg font-semibold text-green-700 text-center">
          🎉 You won: {result}
        </p>
      )}

      {/* Segment Controls */}
      <div className="w-full">
        <button
          onClick={addSegment}
          className={`mb-4 px-4 py-2 text-white rounded hover:bg-blue-700 ${
            isSpinning ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"
          }`}
          aria-label="Add segment"
          disabled={isSpinning}
        >
          + Add Segment
        </button>

        {segments.length === 0 && (
          <p className="text-gray-500 italic text-center">No segments added yet.</p>
        )}

        {segments.map(({ label, color }, i) => (
          <div
            key={i}
            className="flex items-center justify-between mb-2 bg-gray-100 rounded p-2 cursor-pointer"
            onClick={() => editSegment(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                editSegment(i);
              }
            }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: color }}
                aria-label={`Segment color ${color}`}
              />
              <span>{label}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteSegment(i);
              }}
              className="text-red-600 font-bold text-lg"
              title="Delete Segment"
              aria-label={`Delete segment ${label}`}
            >
              &times;
            </button>
          </div>
        ))}

        {/* Edit segment form */}
        {editIndex !== null && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Edit Segment</h3>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="edit-label"
            >
              Label
            </label>
            <input
              id="edit-label"
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              className="w-full p-2 border rounded mb-3"
              aria-required="true"
              autoFocus
            />
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="edit-color"
            >
              Color
            </label>
            <input
              id="edit-color"
              type="color"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
              className="w-16 h-10 rounded border cursor-pointer"
            />
            <div className="mt-3 flex space-x-3">
              <button
                onClick={saveSegment}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                aria-label="Save segment"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                aria-label="Cancel editing"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
