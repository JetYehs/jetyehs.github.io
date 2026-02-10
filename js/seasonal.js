document.addEventListener("DOMContentLoaded", () => {
   const isChristmas = new Date().getMonth() === 11;
   const checkbox = document.getElementById("christmas-theme-toggle");

   const setIcon = (christmas) => {
      const icon = document.querySelector('.sidebar assets[title="icon"]');
      if (icon) icon.src = `/assets/icon${christmas ? "-christmas" : ""}.png`;
   };

   const loadScript = (src) => {
      const id = "dynamic-theme-script";
      document.getElementById(id)?.remove();
      const script = document.createElement("script");
      Object.assign(script, { id, src, async: true });
      document.head.appendChild(script);
   };

   const updateTheme = () => {
      const enabled = localStorage.getItem("christmasThemePreference") === "enabled";
      const active = enabled && isChristmas;

      document.body.classList.toggle("christmas-theme", active);
      setIcon(active);
      loadScript(active ? "/js/christmas.js" : "/js/usual.js");
   };

   if (!localStorage.getItem("christmasThemePreference")) {
      localStorage.setItem("christmasThemePreference", "enabled");
   }

   if (checkbox) {
      checkbox.checked = localStorage.getItem("christmasThemePreference") === "enabled";
      checkbox.addEventListener("change", () => {
         localStorage.setItem("christmasThemePreference", checkbox.checked ? "enabled" : "disabled");
         updateTheme();
      });
   }

   updateTheme();
});
