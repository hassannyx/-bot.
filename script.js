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
