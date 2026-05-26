import { useState } from "react";

const MOLLIE_LINK = "JOUW_MOLLIE_LINK_HIER";

const CATS = [
  { key: "vandaag",  label: "Vandaag",     color: "#e05a5a" },
  { key: "week",     label: "Deze week",   color: "#f5a623" },
  { key: "delegeer", label: "Delegeer",    color: "#5ab4e0" },
  { key: "loslaten", label: "Laat los",    color: "#5ae08a" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  :root{--bg:#0d0d0d;--surface:#161616;--border:#242424;--accent:#f5a623;--text:#f0ede8;--muted:#666}
  body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh}
  .app{max-width:680px;margin:0 auto;padding:48px 24px 80px;animation:up .6s ease both}
  @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .badge{display:inline-block;background:#f5a62322;color:var(--accent);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:20px;border:1px solid #f5a62344;margin-bottom:16px}
  h1{font-family:'Syne',sans-serif;font-size:clamp(32px,6vw,52px);font-weight:800;line-height:1.05;letter-spacing:-.02em;margin-bottom:12px}
  h1 span{color:var(--accent)}
  .sub{font-size:16px;color:var(--muted);font-weight:300;line-height:1.6;max-width:480px;margin-bottom:40px}
  .lbl{font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;display:block}
  textarea{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:15px;line-height:1.7;padding:20px;resize:none;outline:none;transition:border-color .2s;min-height:160px}
  textarea::placeholder{color:#444}
  textarea:focus{border-color:var(--accent)}
  .cc{text-align:right;font-size:12px;color:var(--muted);margin-top:6px}
  .btn{width:100%;background:var(--accent);color:#0d0d0d;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:16px;font-weight:700;padding:18px;cursor:pointer;transition:all .2s;margin-top:16px}
  .btn:hover:not(:disabled){background:#f8b84a;transform:translateY(-1px)}
  .btn:disabled{opacity:.5;cursor:not-allowed}
  .err{color:#e05a5a;font-size:14px;margin-top:12px;text-align:center}
  .sp{display:flex;align-items:center;gap:12px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:10px;margin-top:16px;font-size:13px;color:var(--muted);line-height:1.4}
  .sp strong{color:var(--text)}
  .rh{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .rt{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .rb{background:none;border:1px solid var(--border);color:var(--muted);font-family:'DM Sans',sans-serif;font-size:12px;padding:5px 12px;border-radius:20px;cursor:pointer;transition:all .2s}
  .rb:hover{border-color:var(--accent);color:var(--accent)}
  .pl{text-align:center;font-size:12px;color:var(--muted);margin-bottom:12px}
  .cols{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
  @media(max-width:500px){.cols{grid-template-columns:1fr}}
  .col{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px}
  .ch{display:flex;align-items:center;gap:8px;margin-bottom:14px}
  .cd{width:8px;height:8px;border-radius:50%;flex-shrink:0}
  .ct{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .cc2{margin-left:auto;font-size:11px;color:var(--muted);background:var(--border);padding:2px 7px;border-radius:10px}
  .ti{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:14px;line-height:1.4}
  .ti:last-child{border-bottom:none}
  .td{width:5px;height:5px;border-radius:50%;margin-top:6px;flex-shrink:0;opacity:.7}
  .em{font-size:13px;color:var(--muted);font-style:italic}
  .pw{background:var(--surface);border:1px solid var(--accent);border-radius:16px;padding:28px 24px;text-align:center;margin-top:16px}
  .pi{font-size:32px;margin-bottom:12px}
  .pw h3{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;margin-bottom:8px}
  .pw p{font-size:14px;color:var(--muted);margin-bottom:20px;line-height:1.6}
  .pt{display:inline-flex;align-items:baseline;gap:4px;margin-bottom:20px}
  .pa{font-family:'Syne',sans-serif;font-size:42px;font-weight:800;color:var(--accent)}
  .pc{font-size:22px;font-weight:600;color:var(--accent)}
  .pla{font-size:13px;color:var(--muted);margin-left:4px}
  .ub{display:block;width:100%;background:var(--accent);color:#0d0d0d;border:none;border-radius:10px;font-family:'Syne',sans-serif;font-size:15px;font-weight:700;padding:16px;cursor:pointer;text-decoration:none;transition:all .2s;margin-bottom:10px}
  .ub:hover{background:#f8b84a;transform:translateY(-1px)}
  .gu{font-size:12px;color:var(--muted)}
`;

function Column({ cat, items }) {
  const blurFrom = Math.ceil(items.length * 0.75);
  return (
    <div className="col">
      <div className="ch">
        <div className="cd" style={{ background: cat.color }} />
        <span className="ct" style={{ color: cat.color }}>{cat.label}</span>
        <span className="cc2">{items.length}</span>
      </div>
      {items.length === 0
        ? <p className="em">Niets hier</p>
        : items.map((t, i) => (
          <div key={i} className="ti" style={i >= blurFrom ? { filter: "blur(5px)", userSelect: "none", pointerEvents: "none", opacity: 0.5 } : {}}>
            <div className="td" style={{ background: cat.color }} />
            <span>{t}</span>
          </div>
        ))
      }
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fout");
      setResult(data);
    } catch (e) {
      setError("Er ging iets mis: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const total = result ? Object.values(result).reduce((a, b) => a + b.length, 0) : 0;
  const hidden = result ? Object.values(result).reduce((acc, items) => {
    return acc + (items.length - Math.ceil(items.length * 0.75));
  }, 0) : 0;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {!result ? (
          <>
            <div className="badge">✦ AI Productiviteit</div>
            <h1>Regel het<br /><span>voor me.</span></h1>
            <p className="sub">Dump alles wat in je hoofd zit — chaotisch, ongesorteerd, alles erbij. Wij maken er een plan van.</p>
            <label className="lbl">Wat staat er allemaal in je hoofd?</label>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder="belasting aangifte, mail Kevin, cadeau voor ma, APK auto, sportschool aanmelden..." rows={7} />
            <div className="cc">{input.length} tekens</div>
            <button className="btn" onClick={submit} disabled={!input.trim() || loading}>
              {loading ? "Aan het sorteren..." : "⚡ Regel het voor me"}
            </button>
            {error && <p className="err">{error}</p>}
            <div className="sp">
              <span>🧠</span>
              <div><strong>Stop met nadenken over wat eerst.</strong><br />Dump het, wij sorteren het in seconden.</div>
            </div>
          </>
        ) : (
          <>
            <div className="rh">
              <span className="rt">{total} taken gesorteerd</span>
              <button className="rb" onClick={() => { setResult(null); setInput(""); }}>↺ Opnieuw</button>
            </div>
            <p className="pl">👇 Eerste 75% zichtbaar — rest geblurred</p>
            <div className="cols">
              {CATS.slice(0, 2).map(c => <Column key={c.key} cat={c} items={result[c.key] || []} />)}
            </div>
            <div className="cols">
              {CATS.slice(2).map(c => <Column key={c.key} cat={c} items={result[c.key] || []} />)}
            </div>
            <div className="pw">
              <div className="pi">🔓</div>
              <h3>Ontgrendel je volledige plan</h3>
              <p>{hidden > 0 ? <><strong style={{ color: "var(--accent)" }}>{hidden} taken</strong> zijn verborgen. </> : ""}Download je volledige plan als PDF.</p>
              <div className="pt">
                <span className="pc">€</span>
                <span className="pa">2,99</span>
                <span className="pla">eenmalig</span>
              </div>
              <a href={MOLLIE_LINK} className="ub" target="_blank" rel="noopener noreferrer">
                Volledige lijst + PDF downloaden →
              </a>
              <p className="gu">🔒 Veilig betalen via Mollie</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
