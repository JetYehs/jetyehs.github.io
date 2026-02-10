const getById = (id) => document.getElementById(id);
const querySelectorAll = (selector) => document.querySelectorAll(selector);

document.addEventListener("DOMContentLoaded", () => {
   const loadingBar = getById("loading-bar");
   if (loadingBar) {
      loadingBar.style.width = "100%";
      setTimeout(() => {
         loadingBar.style.opacity = 0;
         setTimeout(() => (loadingBar.style.display = "none"), 500);
      }, 500);
   }

   getById("go-to-top-button")?.addEventListener("click", () => window.scroll({ top: 0, behavior: "smooth" }));

   const progressIndicator = getById("progress");
   const updateProgress = () => {
      if (!progressIndicator) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollPercentage = Math.round((scrollTop * 100) / (scrollHeight - clientHeight)) || 0;
      progressIndicator.style.background = `conic-gradient(#A61414 ${scrollPercentage}%, #3D3D3D ${scrollPercentage}%)`;
   };
   window.addEventListener("scroll", updateProgress);
   updateProgress();

   const categoryButtons = querySelectorAll(".selectable");
   const gameElements = querySelectorAll(".gameDiv");
   let selectedCategory = "all";

   window.switchGame = (category) => {
      selectedCategory = category;
      categoryButtons.forEach((button) => {
         const isMatch = button.getAttribute("name") === selectedCategory;
         button.classList.toggle("selectedButton", isMatch);
         button.classList.toggle("selectButton", !isMatch);
      });
      gameElements.forEach((game) => (game.style.display = selectedCategory === "all" || game.classList.contains(selectedCategory) ? "" : "none"));
   };

   window.searchFunction = () => {
      const searchFilter = (getById("myinput")?.value || "").trim().toUpperCase();
      gameElements.forEach((game) => {
         const gameName = (game.getAttribute("name") || "").toUpperCase();
         game.style.display = gameName.includes(searchFilter) && (selectedCategory === "all" || game.classList.contains(selectedCategory)) ? "" : "none";
      });
   };

   const [audioPlayer, playPauseIcon] = [getById("mySong"), getById("icon")];
   if (audioPlayer && playPauseIcon) {
      playPauseIcon.addEventListener("click", () => {
         audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
         playPauseIcon.src = `assets/${audioPlayer.paused ? "play" : "pause"}.png`;
      });
   }

   window.switchGame("all");
});

async function fetchQuotes() {
   const quoteElement = getById("random-quote");
   if (!quoteElement) return;
   try {
      const quotes = await (await fetch("../assets/media/quotes.json")).json();
      const { quote, author } = quotes[Math.floor(Math.random() * quotes.length)] || {};
      const quoteText = quote ? `"${quote}" - ${author || "Unknown"}` : "No quotes found.";
      quoteElement.textContent = "";
      let charIndex = 0;
      const typewriterTimer = setInterval(() => {
         quoteElement.textContent += quoteText[charIndex++];
         if (charIndex >= quoteText.length) clearInterval(typewriterTimer);
      }, 50);
   } catch {
      quoteElement.textContent = "Error loading quote.";
   }
}

fetchQuotes();
