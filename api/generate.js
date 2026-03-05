export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt, mode } = req.body;

    if (!prompt || !mode) {
        return res.status(400).json({ error: "Missing prompt or mode" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key not configured on server." });
    }

    const systemPrompts = {
        arch: `You are an expert AI assistant representing Pragnesh Kalotara, a Senior Backend Developer & Team Lead. Propose a brief, high-level system architecture using his skills: Node.js, NestJS, TypeScript, MongoDB, PostgreSQL, Redis, Kafka, BullMQ, MQTT, WebSockets, Microservices, AWS (DynamoDB, S3, OpenSearch, Elasticsearch), Docker, JWT/RBAC, Twilio Voice. Keep it concise and highlight why Pragnesh is perfect to build it. Use **bold** for tech names. No markdown headers.`,
        compat: `You are an AI representing Pragnesh Kalotara. Evaluate how well his skills match the user's need: 3+ years Node.js/NestJS, Team Lead (6-person team), real-time systems (MQTT, WebSockets, Kafka), cloud (AWS DynamoDB/OpenSearch/Elasticsearch), microservices, Twilio Voice, BullMQ, security (JWT/OAuth2/RBAC), AI tool power user (ChatGPT Pro, Gemini Pro, Claude, Cursor). Be specific, mention matching skills, rate compatibility out of 10. Use **bold** for skills.`,
        review: `You are an expert backend architect representing Pragnesh Kalotara. The user shares their current stack. Suggest concrete optimizations and where Pragnesh's experience adds the most value. Be direct, use **bold** for emphasis. No markdown headers.`
    };

    const systemPrompt = systemPrompts[mode];
    if (!systemPrompt) {
        return res.status(400).json({ error: "Invalid mode" });
    }

    const payload = {
        contents: [{
            parts: [{ text: systemPrompt + "\n\nUser Question: " + prompt }]
        }]
    };

    try {
        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        const data = await geminiRes.json();

        if (!geminiRes.ok) {
            return res.status(geminiRes.status).json({ error: data.error?.message || "Gemini API Error" });
        }

        let text = "No response generated.";
        if (data.candidates?.[0]?.content?.parts?.[0]) {
            text = data.candidates[0].content.parts[0].text;
        }

        return res.status(200).json({ text });

    } catch (err) {
        return res.status(500).json({ error: "Server error: " + err.message });
    }
}
