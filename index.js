const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function askQuestion() {
  rl.question("Ask the AI a question: ", (userInput) => {
    getResponseFromAI(userInput);
  });
}
console.log("Hello, AI Debate Bot!");
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: "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",  // أدخل مفتاح API الخاص بك هنا
});

async function getResponseFromAI(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // أو اختر أي نموذج آخر تريده
      messages: [{ role: "user", content: prompt }],
    });
    console.log("AI Response:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// اختبار البوت مع جملة بسيطة
getResponseFromAI("Hello, how can I help you today?");
askQuestion();
