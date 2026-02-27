import { useState, useEffect, useRef } from "react";

const WHIMSICAL_ACTS = [
  "Taught a pigeon to waltz 🕊️",
  "Named every cloud in the sky ☁️",
  "Wrote a sonnet for a mushroom 🍄",
  "Challenged a snail to a race 🐌",
  "Knitted a sweater for a cactus 🌵",
  "Held a funeral for a lost sock 🧦",
  "Appointed yourself Mayor of the Moon 🌙",
  "Invented a new color 🎨",
  "Apologized to a door you walked into 🚪",
  "Gave a motivational speech to houseplants 🌿",
  "Started a band with woodland creatures 🎸",
  "Built a tiny castle for a beetle 🐞",
  "Declared Tuesday a national holiday 📅",
  "Made friends with a lamppost 🪔",
  "Translated a bird's song into poetry 🐦",
  "Narrated your own life in a British accent 🎙️",
  "Went on a quest for the perfect rock 🪨",
  "Wore a cape to the grocery store 🦸",
  "Hosted a tea party for imaginary royalty 🫖",
  "Decided clouds are just sky sheep ☁️🐑",
];

const LEVELS = [
  { label: "Suspiciously Normal", color: "#a8d8ea", emoji: "😐" },
  { label: "A Bit Quirky", color: "#aa96da", emoji: "🙃" },
  { label: "Delightfully Odd", color: "#fcbad3", emoji: "✨" },
  { label: "Wonderfully Weird", color: "#ff9f43", emoji: "🌀" },
  { label: "Chaotically Whimsical", color: "#ff6b6b", emoji: "🌈" },
  { label: "FULL GOBLIN MODE", color: "#f9ca24", emoji: "🎪" },
];

export default function WhimsicalMeter() {
  const [value, setValue] = useState(0);
  const [acts, setActs] = useState([]);
  const [floating, setFloating] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const idRef = useRef(0);

  const level = LEVELS[Math.min(Math.floor(value / 17), 5)];

  const doWhimsicalShit = () => {
    const newVal = Math.min(value + Math.floor(Math.random() * 18) + 8, 100);
    setValue(newVal);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    const act = WHIMSICAL_ACTS[Math.floor(Math.random() * WHIMSICAL_ACTS.length)];
    setActs(prev => [act, ...prev].slice(0, 5));

    // Floating emoji
    const id = idRef.current++;
    const emojis = ["✨", "🌈", "🦋", "🌸", "⭐", "🎉", "🍄", "🌙"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const x = 20 + Math.random() * 60;
    setFloating(prev => [...prev, { id, emoji, x }]);
    setTimeout(() => setFloating(prev => prev.filter(f => f.id !== id)), 1500);
  };

  const reset = () => {
    setValue(0);
    setActs([]);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Floating emojis */}
      {floating.map(f => (
        <div key={f.id} style={{
          position: "absolute",
          left: `${f.x}%`,
          bottom: "30%",
          fontSize: "2rem",
          animation: "floatUp 1.5s ease-out forwards",
          pointerEvents: "none",
        }}>
          {f.emoji}
        </div>
      ))}

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5); opacity: 1; }
          100% { transform: translateY(-200px) scale(1.5); opacity: 0; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-8px) rotate(-2deg); }
          75% { transform: translateX(8px) rotate(2deg); }
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes wiggle {
          0%,100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>

      {/* Title */}
      <h1 style={{
        color: "white",
        fontSize: "2.5rem",
        textAlign: "center",
        textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        marginBottom: "8px",
        animation: "wiggle 3s ease-in-out infinite",
      }}>
        ✨ Whimsical Shit Meter ✨
      </h1>
      <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "30px", fontSize: "1rem" }}>
        How much whimsical shit are you doing?
      </p>

      {/* Meter Card */}
      <div style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        padding: "32px",
        width: "100%",
        maxWidth: "480px",
        border: "2px solid rgba(255,255,255,0.3)",
        animation: isShaking ? "shake 0.5s ease" : "none",
      }}>
        {/* Level display */}
        <div style={{
          textAlign: "center",
          marginBottom: "24px",
          animation: "pulse 2s ease-in-out infinite",
        }}>
          <div style={{ fontSize: "4rem" }}>{level.emoji}</div>
          <div style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
          }}>
            {level.label}
          </div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "2rem", fontWeight: "bold" }}>
            {value}%
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          background: "rgba(255,255,255,0.2)",
          borderRadius: "50px",
          height: "28px",
          marginBottom: "24px",
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.3)",
        }}>
          <div style={{
            height: "100%",
            width: `${value}%`,
            borderRadius: "50px",
            background: `linear-gradient(90deg, ${level.color}, white)`,
            transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            boxShadow: `0 0 20px ${level.color}`,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              top: 0, left: "-100%",
              width: "200%", height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "shimmer 2s infinite",
            }} />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={doWhimsicalShit}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "50px",
            border: "none",
            background: `linear-gradient(135deg, ${level.color}, #f093fb)`,
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
            boxShadow: `0 8px 25px rgba(0,0,0,0.2)`,
            transition: "transform 0.1s, box-shadow 0.1s",
            fontFamily: "Georgia, serif",
            marginBottom: "12px",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          🪄 Do Whimsical Shit
        </button>

        <button
          onClick={reset}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "50px",
            border: "2px solid rgba(255,255,255,0.4)",
            background: "transparent",
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.9rem",
            cursor: "pointer",
            fontFamily: "Georgia, serif",
          }}
        >
          Reset to Boring
        </button>
      </div>

      {/* Recent acts */}
      {acts.length > 0 && (
        <div style={{
          marginTop: "24px",
          width: "100%",
          maxWidth: "480px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", marginBottom: "10px", fontSize: "0.85rem" }}>
            recent whimsy detected:
          </p>
          {acts.map((act, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "10px 16px",
              marginBottom: "6px",
              color: "white",
              fontSize: "0.9rem",
              opacity: 1 - i * 0.15,
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>
              {act}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}