// ASK FOOTNOTE — contextual research assistant

document.addEventListener("DOMContentLoaded", function () {

  // Create floating button
  const askButton = document.createElement("button");
  askButton.id = "ask-footnote-btn";
  askButton.textContent = "ASK FOOTNOTE ✦";
  document.body.appendChild(askButton);

  // Create chat panel
  const chat = document.createElement("div");
  chat.id = "footnote-chat";

  chat.innerHTML = `
    <div class="chat-header">
      <strong>ASK FOOTNOTE</strong>
      <button id="close-chat">×</button>
    </div>

    <div class="chat-messages" id="chat-messages">

      <div class="assistant-message">
        Ask what the headline left out.
      </div>

    </div>

    <div class="chat-suggestions">

      <button data-question="protest">
        Why are students protesting?
      </button>

      <button data-question="wangchuk">
        Who is Sonam Wangchuk?
      </button>

      <button data-question="jantar">
        Why does Jantar Mantar matter?
      </button>

      <button data-question="merit">
        Can merit become a privilege?
      </button>

      <button data-question="lenses">
        Why look at one story through different lenses?
      </button>

    </div>

    <div class="chat-input">
      <input
        id="footnote-input"
        type="text"
        placeholder="Ask a question..."
      >

      <button id="footnote-send">→</button>
    </div>
  `;

  document.body.appendChild(chat);

  const messages = document.getElementById("chat-messages");
  const input = document.getElementById("footnote-input");
  const sendButton = document.getElementById("footnote-send");

  // Open chat
  askButton.addEventListener("click", function () {
    chat.classList.toggle("open");
  });

  // Close chat
  document.getElementById("close-chat").addEventListener("click", function () {
    chat.classList.remove("open");
  });

  // Answers
  const answers = {

    protest:
      "Student protests rarely begin on the day people enter the streets. They can emerge from frustration with institutions, examinations, policy decisions and the feeling that ordinary channels for being heard have failed. Footnote asks what happened before the demonstration became a headline.",

    wangchuk:
      "Sonam Wangchuk is an Indian engineer, education reformer and environmental activist from Ladakh. His work has included education reform and advocacy concerning Ladakh's environment, governance and constitutional protections.",

    jantar:
      "Jantar Mantar in New Delhi is more than a physical location. The area has long served as a prominent site for public demonstrations, allowing movements to bring political demands into a visible national space.",

    merit:
      "Merit can appear objective while still being shaped by unequal opportunity. Two people may face the same examination or selection process while reaching it with very different access to education, money, guidance, time and other resources. The result measures performance, but it may not reveal the conditions that helped produce it.",

    lenses:
      "A headline tells us what happened. Different lenses ask different questions. History asks what came before. Law asks what institutions can actually change. Economics asks who gains, who loses and who bears the cost. Looking through several lenses can reveal parts of a story that a single explanation misses."

  };

  function addUserMessage(text) {
    const message = document.createElement("div");
    message.className = "user-message";
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function addAssistantMessage(text) {
    const message = document.createElement("div");
    message.className = "assistant-message";
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  // Suggested question buttons
  document.querySelectorAll(".chat-suggestions button").forEach(function (button) {

    button.addEventListener("click", function () {

      const key = button.dataset.question;

      addUserMessage(button.textContent.trim());

      setTimeout(function () {
        addAssistantMessage(answers[key]);
      }, 300);

    });

  });

  // Detect typed questions
  function answerQuestion() {

    const question = input.value.trim();

    if (!question) return;

    addUserMessage(question);

    input.value = "";

    const lower = question.toLowerCase();

    let answer;

    if (
      lower.includes("wangchuk") ||
      lower.includes("sonam")
    ) {
      answer = answers.wangchuk;
    }

    else if (
      lower.includes("jantar") ||
      lower.includes("mantar")
    ) {
      answer = answers.jantar;
    }

    else if (
      lower.includes("merit") ||
      lower.includes("privilege")
    ) {
      answer = answers.merit;
    }

    else if (
      lower.includes("lens") ||
      lower.includes("history") ||
      lower.includes("economics") ||
      lower.includes("law")
    ) {
      answer = answers.lenses;
    }

    else if (
      lower.includes("protest") ||
      lower.includes("student") ||
      lower.includes("education")
    ) {
      answer = answers.protest;
    }

    else {
      answer =
        "I don't have a verified Footnote for that question yet. Try asking about the protest, Sonam Wangchuk, Jantar Mantar, merit, or the three lenses.";
    }

    setTimeout(function () {
      addAssistantMessage(answer);
    }, 300);
  }

  sendButton.addEventListener("click", answerQuestion);

  input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
      answerQuestion();
    }

  });

});
// DARK MODE

const darkModeButton = document.createElement("button");

darkModeButton.id = "dark-mode-toggle";
darkModeButton.textContent = "☾ DARK";

document.body.appendChild(darkModeButton);

if (localStorage.getItem("footnote-theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkModeButton.textContent = "☀ LIGHT";
}

darkModeButton.addEventListener("click", function () {

  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkModeButton.textContent = "☀ LIGHT";
    localStorage.setItem("footnote-theme", "dark");
  } else {
    darkModeButton.textContent = "☾ DARK";
    localStorage.setItem("footnote-theme", "light");
  }

});