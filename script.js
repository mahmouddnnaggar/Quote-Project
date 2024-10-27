// ^ HTML Elements
let generateBtn = document.querySelector(".generate-quote");
let autoBtn = document.querySelector(".auto-generate");
let stopBtn = document.querySelector(".stop-generate");
let quoteText = document.querySelector(".quote");
let quoteAuthor = document.querySelector(".quote-author");
let intervalId;

// ^ Our Logic
async function getQuotes() {
  const response = await fetch("quotes.json");
  const quotes = await response.json();
  return quotes;
}

async function generateQuote() {
  const quotes = await getQuotes();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  if (localStorage.getItem("preQuote") === randomQuote.id) {
    generateQuote();
  } else {
    quoteText.innerHTML = randomQuote.text;
    quoteAuthor.innerHTML = randomQuote.author;
    localStorage.setItem("preQuote", randomQuote.id);
  }
}

generateQuote();

function autoGenerate() {
  autoBtn.classList.add("active");
  clearInterval(intervalId);
  generateQuote();
  intervalId = setInterval(() => {
    generateQuote();
  }, 6000);
}

function stopGenerate() {
  autoBtn.classList.remove("active");
  clearInterval(intervalId);
}

// ^ Events
generateBtn.addEventListener("click", function () {
  generateQuote();
  stopGenerate();
});

autoBtn.addEventListener("click", function () {
  autoGenerate();
});

stopBtn.addEventListener("click", function () {
  stopGenerate();
});
