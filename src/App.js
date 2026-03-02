import { useState, useRef } from "react";

const WHIMSICAL_ACTS = [
  "Taught a pigeon to waltz 🕊️","Named every cloud in the sky ☁️",
  "Wrote a sonnet for a mushroom 🍄","Challenged a snail to a race 🐌",
  "Knitted a sweater for a cactus 🌵","Held a funeral for a lost sock 🧦",
  "Appointed yourself Mayor of the Moon 🌙","Invented a new color 🎨",
  "Apologized to a door you walked into 🚪","Gave a motivational speech to houseplants 🌿",
  "Started a band with woodland creatures 🎸","Built a tiny castle for a beetle 🐞",
  "Declared Tuesday a national holiday 📅","Made friends with a lamppost 🪔",
  "Translated a bird's song into poetry 🐦","Narrated your own life in a British accent 🎙️",
  "Went on a quest for the perfect rock 🪨","Wore a cape to the grocery store 🦸",
  "Hosted a tea party for imaginary royalty 🫖","Decided clouds are just sky sheep ☁️🐑",
];

const WHIMSY_LEVELS = [
  { label: "Suspiciously Normal", color: "#a8d8ea", emoji: "😐" },
  { label: "A Bit Quirky", color: "#aa96da", emoji: "🙃" },
  { label: "Delightfully Odd", color: "#fcbad3", emoji: "✨" },
  { label: "Wonderfully Weird", color: "#ff9f43", emoji: "🌀" },
  { label: "Chaotically Whimsical", color: "#ff6b6b", emoji: "🌈" },
  { label: "FULL GOBLIN MODE", color: "#f9ca24", emoji: "🎪" },
];

const AFFIRMATIONS = [
  "Bitch, you got this! 💥",
  "You consistently overcome fucking hard things! 🔥",
  "You are an absolute unit of a human being! 💪",
  "The audacity you have to keep going? Legendary. 👑",
  "Obstacles are terrified of you and they should be! 😤",
  "You've survived 100% of your worst days. Do the math. 🧮",
  "Other people's doubt is just background noise. Turn it off. 🔇",
  "You are built different and everyone can tell. ⚡",
  "Hard things bow down to you eventually. FACT. 🫡",
  "Your resilience is genuinely unhinged. Keep it up. 🚀",
  "You didn't come this far to only come this far, goddammit! 🏁",
  "Chaos? You eat chaos for breakfast. 😈",
  "The version of you from 5 years ago would be FLOORED right now. 🤯",
  "You are not for everyone and that is their loss. 💅",
  "Softness AND strength? You contain multitudes, you magnificent beast. 🦁",
  "Stop playing small. The world needs your whole unfiltered self. 🌍",
  "You are the main character and it's not even close. 🎬",
  "Every time you thought you couldn't — you did anyway. That's insane. 🤌",
  "Your potential is actually offensive to mediocrity. 😂",
  "Whatever you're facing right now? You've faced worse. You won then too. 🏆",
];

const AURA_LEVELS = [
  { label: "Just Warming Up", color: "#667eea", emoji: "😤" },
  { label: "Getting Dangerous", color: "#f093fb", emoji: "💪" },
  { label: "Certified Badass", color: "#ff6b6b", emoji: "🔥" },
  { label: "Unhinged Confidence", color: "#f9ca24", emoji: "⚡" },
  { label: "UNSTOPPABLE FORCE", color: "#00d2ff", emoji: "👑" },
  { label: "TRANSCENDENT BEAST", color: "#ff4757", emoji: "💥" },
];

function FloatingEmojis({ items }) {
  return items.map(f => (
    <div key={f.id} style={{
      position: "fixed", left: `${f.x}%`, bottom: "30%",
      fontSize: "2rem", animation: "floatUp 1.5s ease-out forwards",
      pointerEvents: "none", zIndex: 999,
    }}>{f.emoji}</div>
  ));
}

function WhimsicalMode() {
  const [value, setValue] = useState(0);
  const [acts, setActs] = useState([]);
  const [floating, setFloating] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const idRef = useRef(0);
  const level = WHIMSY_LEVELS[Math.min(Math.floor(value / 17), 5)];

  const doIt = () => {
    setValue(v => Math.min(v + Math.floor(Math.random() * 18) + 8, 100));
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    setActs(prev => [WHIMSICAL_ACTS[Math.floor(Math.random() * WHIMSICAL_ACTS.length)], ...prev].slice(0, 5));
    const id = idRef.current++;
    const emojis = ["✨","🌈","🦋","🌸","⭐","🎉","🍄","🌙"];
    setFloating(prev => [...prev, { id, emoji: emojis[Math.floor(Math.random() * emojis.length)], x: 20 + Math.random() * 60 }]);
    setTimeout(() => setFloating(prev => prev.filter(f => f.id !== id)), 1500);
  };

  return (
    <>
      <FloatingEmojis items={floating} />
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "20px",
      }}>
        <h1 style={{ color: "white", fontSize: "2.5rem", textAlign: "center", textShadow: "2px 2px 8px rgba(0,0,0,0.3)", marginBottom: "8px", animation: "wiggle 3s ease-in-out infinite" }}>
          ✨ Whimsical Shit Meter ✨
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "30px" }}>How much whimsical shit are you doing?</p>

        <div style={{
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
          borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "480px",
          border: "2px solid rgba(255,255,255,0.3)",
          animation: isShaking ? "shake 0.5s ease" : "none",
        }}>
          <div style={{ textAlign: "center", marginBottom: "24px", animation: "pulse 2s ease-in-out infinite" }}>
            <div style={{ fontSize: "4rem" }}>{level.emoji}</div>
            <div style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>{level.label}</div>
            <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "2rem", fontWeight: "bold" }}>{value}%</div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "50px", height: "28px", marginBottom: "24px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.3)" }}>
            <div style={{ height: "100%", width: `${value}%`, borderRadius: "50px", background: `linear-gradient(90deg, ${level.color}, white)`, transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: `0 0 20px ${level.color}` }} />
          </div>

          <button onClick={doIt} style={{ width: "100%", padding: "16px", borderRadius: "50px", border: "none", background: `linear-gradient(135deg, ${level.color}, #f093fb)`, color: "white", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: "12px" }}>
            🪄 Do Whimsical Shit
          </button>
          <button onClick={() => { setValue(0); setActs([]); }} style={{ width: "100%", padding: "10px", borderRadius: "50px", border: "2px solid rgba(255,255,255,0.4)", background: "transparent", color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Reset to Boring
          </button>
        </div>

        {acts.length > 0 && (
          <div style={{ marginTop: "24px", width: "100%", maxWidth: "480px" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", marginBottom: "10px", fontSize: "0.85rem" }}>recent whimsy detected:</p>
            {acts.map((act, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "12px", padding: "10px 16px", marginBottom: "6px", color: "white", fontSize: "0.9rem", opacity: 1 - i * 0.15, border: "1px solid rgba(255,255,255,0.2)" }}>{act}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function AffirmationMode() {
  const [value, setValue] = useState(0);
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [floating, setFloating] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [flash, setFlash] = useState(false);
  const idRef = useRef(0);
  const usedRef = useRef([]);
  const level = AURA_LEVELS[Math.min(Math.floor(value / 17), 5)];

  const getAffirmation = () => {
    if (usedRef.current.length >= AFFIRMATIONS.length) usedRef.current = [];
    const remaining = AFFIRMATIONS.filter((_, i) => !usedRef.current.includes(i));
    const idx = AFFIRMATIONS.indexOf(remaining[Math.floor(Math.random() * remaining.length)]);
    usedRef.current.push(idx);
    return AFFIRMATIONS[idx];
  };

  const doIt = () => {
    const aff = getAffirmation();
    setCurrent(aff);
    setValue(v => Math.min(v + Math.floor(Math.random() * 15) + 10, 100));
    setHistory(prev => [aff, ...prev].slice(0, 4));
    setIsShaking(true);
    setFlash(true);
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setFlash(false), 300);

    const id = idRef.current++;
    const emojis = ["💥","🔥","⚡","👑","💪","😤","🚀","💅"];
    setFloating(prev => [...prev, { id, emoji: emojis[Math.floor(Math.random() * emojis.length)], x: 10 + Math.random() * 80 }]);
    setTimeout(() => setFloating(prev => prev.filter(f => f.id !== id)), 1500);
  };

  return (
    <>
      <FloatingEmojis items={floating} />
      <div style={{
        background: flash
          ? "linear-gradient(135deg, #ff4757, #ff6b35)"
          : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "20px",
        transition: "background 0.1s",
      }}>
        <h1 style={{ color: "white", fontSize: "2.2rem", textAlign: "center", textShadow: "0 0 20px rgba(255,71,87,0.8)", marginBottom: "8px", letterSpacing: "2px", fontFamily: "Impact, sans-serif" }}>
          💥 AGGRESSIVE AFFIRMATIONS 💥
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "30px", fontSize: "0.9rem", letterSpacing: "1px" }}>YOU NEED TO HEAR THIS</p>

        <div style={{
          background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
          borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "500px",
          border: `2px solid ${level.color}`,
          boxShadow: `0 0 30px ${level.color}44`,
          animation: isShaking ? "shake 0.5s ease" : "none",
        }}>
          {/* Aura level */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "3.5rem" }}>{level.emoji}</div>
            <div style={{ color: level.color, fontSize: "1.3rem", fontWeight: "bold", letterSpacing: "2px", fontFamily: "Impact, sans-serif" }}>{level.label}</div>
          </div>

          {/* Aura bar */}
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "50px", height: "12px", marginBottom: "24px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${value}%`, borderRadius: "50px", background: `linear-gradient(90deg, ${level.color}, white)`, transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", boxShadow: `0 0 15px ${level.color}` }} />
          </div>

          {/* Current affirmation */}
          <div style={{
            minHeight: "100px", display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "20px",
            marginBottom: "20px", border: `1px solid ${level.color}44`,
          }}>
            <p style={{
              color: "white", fontSize: current ? "1.25rem" : "0.9rem",
              textAlign: "center", fontWeight: current ? "bold" : "normal",
              opacity: current ? 1 : 0.4, margin: 0, lineHeight: 1.4,
              textShadow: current ? `0 0 20px ${level.color}` : "none",
            }}>
              {current || "Hit the button. You need this."}
            </p>
          </div>

          <button onClick={doIt} style={{
            width: "100%", padding: "18px", borderRadius: "50px", border: "none",
            background: `linear-gradient(135deg, ${level.color}, #ff4757)`,
            color: "white", fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer",
            fontFamily: "Impact, sans-serif", letterSpacing: "2px",
            boxShadow: `0 8px 25px ${level.color}66`, marginBottom: "12px",
            textTransform: "uppercase",
          }}>
            💥 AFFIRM ME
          </button>
          <button onClick={() => { setValue(0); setCurrent(null); setHistory([]); usedRef.current = []; }} style={{ width: "100%", padding: "10px", borderRadius: "50px", border: `1px solid rgba(255,255,255,0.2)`, background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", cursor: "pointer" }}>
            Reset Aura
          </button>
        </div>

        {history.length > 1 && (
          <div style={{ marginTop: "20px", width: "100%", maxWidth: "500px" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: "10px", fontSize: "0.75rem", letterSpacing: "1px" }}>PREVIOUSLY RECEIVED TRUTHS:</p>
            {history.slice(1).map((a, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "10px 14px", marginBottom: "6px", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", opacity: 1 - i * 0.25, borderLeft: `3px solid ${level.color}66` }}>{a}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  const [mode, setMode] = useState(null);

  if (mode === "whimsical") return (
    <div>
      <button onClick={() => setMode(null)} style={{ position: "fixed", top: "16px", left: "16px", zIndex: 1000, padding: "8px 16px", borderRadius: "50px", border: "2px solid rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.2)", color: "white", cursor: "pointer", backdropFilter: "blur(10px)", fontSize: "0.85rem" }}>← Back</button>
      <WhimsicalMode />
    </div>
  );

  if (mode === "affirmations") return (
    <div>
      <button onClick={() => setMode(null)} style={{ position: "fixed", top: "16px", left: "16px", zIndex: 1000, padding: "8px 16px", borderRadius: "50px", border: "2px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.3)", color: "white", cursor: "pointer", backdropFilter: "blur(10px)", fontSize: "0.85rem" }}>← Back</button>
      <AffirmationMode />
    </div>
  );

  // Home screen
  return (
    <>
      <style>{`
        @keyframes floatUp { 0% { transform: translateY(0) scale(0.5); opacity: 1; } 100% { transform: translateY(-200px) scale(1.5); opacity: 0; } }
        @keyframes shake { 0%,100% { transform: translateX(0) rotate(0deg); } 25% { transform: translateX(-8px) rotate(-2deg); } 75% { transform: translateX(8px) rotate(2deg); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes wiggle { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        .mode-card:hover { transform: translateY(-6px) scale(1.02) !important; }
      `}</style>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #764ba2 50%, #f093fb 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "20px", fontFamily: "Georgia, serif",
      }}>
        <h1 style={{ color: "white", fontSize: "2.5rem", textAlign: "center", textShadow: "2px 2px 12px rgba(0,0,0,0.4)", marginBottom: "12px" }}>
          What do you need today?
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "48px", textAlign: "center" }}>Choose your vibe</p>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: "800px" }}>
          {/* Whimsical Card */}
          <div className="mode-card" onClick={() => setMode("whimsical")} style={{
            flex: "1", minWidth: "240px", maxWidth: "340px",
            background: "linear-gradient(135deg, #667eea, #764ba2, #f093fb)",
            borderRadius: "24px", padding: "40px 32px", cursor: "pointer",
            textAlign: "center", transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 12px 40px rgba(102,126,234,0.4)",
            border: "2px solid rgba(255,255,255,0.2)",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px", animation: "wiggle 3s ease-in-out infinite", display: "inline-block" }}>✨</div>
            <h2 style={{ color: "white", fontSize: "1.6rem", marginBottom: "12px", textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}>Whimsical Shit Meter</h2>
            <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Track your chaotic little adventures. For when you're naming clouds and knitting for cacti.
            </p>
            <div style={{ marginTop: "24px", padding: "12px 24px", background: "rgba(255,255,255,0.2)", borderRadius: "50px", color: "white", fontWeight: "bold", display: "inline-block" }}>
              Enter the Whimsy →
            </div>
          </div>

          {/* Affirmations Card */}
          <div className="mode-card" onClick={() => setMode("affirmations")} style={{
            flex: "1", minWidth: "240px", maxWidth: "340px",
            background: "linear-gradient(135deg, #1a1a2e, #0f3460, #ff4757)",
            borderRadius: "24px", padding: "40px 32px", cursor: "pointer",
            textAlign: "center", transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 12px 40px rgba(255,71,87,0.4)",
            border: "2px solid rgba(255,71,87,0.4)",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "16px", animation: "float 2s ease-in-out infinite", display: "inline-block" }}>💥</div>
            <h2 style={{ color: "white", fontSize: "1.6rem", marginBottom: "12px", fontFamily: "Impact, sans-serif", letterSpacing: "1px", textShadow: "0 0 20px rgba(255,71,87,0.8)" }}>AGGRESSIVE AFFIRMATIONS</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6, fontSize: "0.95rem" }}>
              For when you need someone to tell you straight up that you're an absolute unit who can handle anything.
            </p>
            <div style={{ marginTop: "24px", padding: "12px 24px", background: "rgba(255,71,87,0.3)", borderRadius: "50px", color: "white", fontWeight: "bold", display: "inline-block", border: "1px solid rgba(255,71,87,0.6)" }}>
              I NEED THIS →
            </div>
          </div>
        </div>
      </div>
    </>
  );
}