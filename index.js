const readline = require('readline');
const fs = require('fs');  // لاستعماله لتخزين المحادثات في ملف نصي
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  rl.question("Ask the AI a question: ", (userInput) => {
    if (userInput.trim() === "") {
      console.log("Please ask a valid question.");
      askQuestion();  // إعادة السؤال إذا كان المدخل فارغًا
      return;
    }
    
    getResponseFromAI(userInput);
  });
}

console.log("Hello, AI Debate Bot!");

const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: "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",  // مفتاح API الجديد
});

async function getResponseFromAI(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    
    const answer = response.choices[0].message.content;
    console.log("AI Response:", answer);
    
    // تسجيل المحادثة في ملف نصي
    const log = `User: ${prompt}\nAI: ${answer}\n\n`;
    fs.appendFileSync('conversation_log.txt', log);
    
    askQuestion(); // لجعل التفاعل مستمر
  } catch (error) {
    console.error("Error occurred:", error);
    rl.close(); // إغلاق الاتصال إذا حدث خطأ
  }
}

// بدء التفاعل الأول
askQuestion();

// إغلاق التطبيق عند الانتهاء
process.on('SIGINT', () => {
  console.log("\nExiting... Thank you for using the AI Debate Bot!");
  rl.close();
  process.exit();
});
