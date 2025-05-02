async function sendQuestion() {
  const userInput = document.getElementById("userInput").value;
  
  if (userInput.trim() === "") {
    alert("من فضلك، اكتب سؤالك أولًا!");
    return;
  }

  document.getElementById("responseBox").innerText = "جاري البحث...";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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" // أدخل مفتاح API الخاص بك هنا
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }]
    })
  });

  const data = await response.json();
  const aiResponse = data.choices[0].message.content;
  document.getElementById("responseBox").innerText = aiResponse;
}
