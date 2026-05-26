export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input } = req.body;

  if (!input || typeof input !== "string") {
    return res.status(400).json({ error: "Geen input meegegeven" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1000,
        system: `Je bent een productiviteitsassistent die takenlijsten sorteert. Reageer ALLEEN met geldig JSON, geen uitleg, geen markdown. Exact dit formaat:
{"vandaag":["taak1"],"week":["taak2"],"delegeer":["taak3"],"loslaten":["taak4"]}
Regels: vandaag=urgent/deadline, week=belangrijk niet dringend, delegeer=iemand anders kan dit, loslaten=niet nodig. Max 6 woorden per taak. Max 5 per categorie.`,
        messages: [{ role: "user", content: `Sorteer: ${input}` }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Anthropic error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content?.[0]?.text || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return res.status(200).json(parsed);

  } catch (err) {
    console.error("Handler error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
