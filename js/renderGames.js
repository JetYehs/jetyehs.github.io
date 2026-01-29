const container = document.getElementById("game-container");

if (container && Array.isArray(games)) {
   games.forEach((game, i) => {
      const div = document.createElement("div");
      div.className = `column gameDiv ${game.classes}`;
      div.setAttribute("name", game.name);
      div.innerHTML = `<a href="${game.link}"><div class="content"><img loading="lazy" src="${game.img}" alt="${game.name}" style="width:100%"><h4>${game.name}</h4></div></a>`;

      Object.assign(div.style, {
         opacity: "0",
         transform: "translateY(30px)",
         transition: "opacity 0.8s ease, transform 0.8s ease",
      });

      container.appendChild(div);

      setTimeout(
         () => {
            div.style.opacity = "1";
            div.style.transform = "translateY(0)";
         },
         i < 8 ? i * 220 : 1760 + (i - 8) * 60,
      );
   });
}
