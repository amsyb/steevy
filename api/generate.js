import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    console.log("BODY:", body);

    const { resumeText, jobAdText, outputType } = body;

    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

const prompt = `
You are a senior interview coach.

Your job is to help a candidate prepare for an interview using their resume and the job description.

Resume:
${resumeText}

Job Description:
${jobAdText}

Generate:

• Interview preparation notes  
• Key talking points to emphasize  
• Relevant experience to highlight  
• Weak areas to prepare for  
• 5 likely interview questions  

Write directly to the candidate using supportive coaching language.
Keep it concise and actionable.
`;

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: prompt }],
    });

    const result =
      completion.choices?.[0]?.message?.content ||
      "No response generated.";

    res.status(200).json({ result });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      error: error.message,
    });
  }
}