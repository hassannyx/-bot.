// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// إعدادات OpenAI باستخدام المفتاح من ملف .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// وظيفة للحصول على الرد من OpenAI
async function getResponseFromAI(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
    throw new Error("فشل في الاتصال بـ OpenAI.");
  }
}

// تسجيل المحادثات في ملف نصي
function logConversation(userInput, aiResponse) {
  const log = `User: ${userInput}\nAI: ${aiResponse}\n\n`;
  fs.appendFileSync('conversation_log.txt', log, 'utf8');
}

// إعداد نقطة النهاية للواجهة الأمامية
app.post('/ask', async (req, res) => {
  const userInput = req.body.question;
  
  if (!userInput.trim()) {
    return res.status(400).json({ error: "يرجى إدخال سؤال." });
  }

  try {
    const aiResponse = await getResponseFromAI(userInput);
    logConversation(userInput, aiResponse);
    res.json({ answer: aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// إعداد الخادم ليعمل على المنفذ 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
