// Simple placeholder AI responder so the frontend has something to render.
exports.chat = async (req, res) => {
  const { messages, model } = req.body || {};
  const lastUserMessage = Array.isArray(messages)
    ? messages
        .filter((m) => m && m.role === "user")
        .map((m) => m.content)
        .pop()
    : null;

  const reply = lastUserMessage
    ? `Model ${model || "demo-model"} says: ${lastUserMessage}`
    : "No input provided.";

  res.json({
    message: { content: reply },
    response: reply,
  });
};
