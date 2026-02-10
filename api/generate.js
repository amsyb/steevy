import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

console.log("ENV KEY:", process.env.OPENAI_API_KEY);


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { resumeText, jobAdText, outputType } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are a hiring manager.

Resume:
${resumeText}

Job Description:
${jobAdText}

Create:
- ${outputType}
- Key talking points
- Skill alignment summary

Keep it concise and structured.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({
      result: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
