import { OpenRouter } from "@openrouter/sdk";
import { NextResponse } from "next/server";

// 1. Client Setup
const client = new OpenRouter({
    apiKey: "sk-or-v1-368...600", // Using placeholder for now as per prompt
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        const systemPrompt = `
      أنت اسمك "صميدة" (Somaida).
      الشخصية: رجل صعيدي مصري، شهم، ودمك خفيف.
      اللهجة: تحدث باللهجة الصعيدية المصرية فقط
      (استخدم: يا بوي، واه، كيفك، زين، مخبرش).
      المهمة: مساعد ذكي لرواد مكان اسمه "The Hub".
      تنبيه: لا تخرج عن الشخصية أبداً.
    `;

        const completion = await client.chat.send({
            model: "tngtech/deepseek-r1t2-chimera:free",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
        });

        const reply = completion.choices[0]?.message?.content || "النت تقيل يا بوي، قول تاني؟";
        return NextResponse.json({ reply });

    } catch (error) {
        console.error("Somaida Error:", error);
        return NextResponse.json(
            { reply: "واه! حصلت كركبة في السيستم." },
            { status: 500 }
        );
    }
}
