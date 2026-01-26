document.addEventListener("DOMContentLoaded", () => {
   console.log("Seasonal script initialized");

   const isWithinChristmasPeriod = () => {
      const today = new Date();
      const currentMonth = today.getMonth();
      return currentMonth === 11;
   };

   const updateIcon = () => {
      const iconElement = document.querySelector('.sidebar img[title="icon"]');
      if (!iconElement) return;
      const basePath = "/img/";
      const enabled = localStorage.getItem("christmasThemePreference") === "enabled";
      if (enabled && isWithinChristmasPeriod()) {
         iconElement.src = `${basePath}icon-christmas.png`;
      } else {
         iconElement.src = `${basePath}icon.png`;
      }
   };

   const loadThemeScript = (scriptPath) => {
      const existingScript = document.getElementById("dynamic-theme-script");
      if (existingScript) existingScript.remove();
      const script = document.createElement("script");
      script.id = "dynamic-theme-script";
      script.src = scriptPath;
      script.async = true;
      document.head.appendChild(script);
   };

   const applyChristmasTheme = () => {
      console.log("Applying Christmas theme");
      document.body.classList.add("christmas-theme");
      updateIcon();
      loadThemeScript("/js/christmas.js");
   };

   const removeChristmasTheme = () => {
      console.log("Removing Christmas theme");
      document.body.classList.remove("christmas-theme");
      updateIcon();
      loadThemeScript("/js/usual.js");
   };

   const toggleCheckbox = document.getElementById("christmas-theme-toggle");

   let preference = localStorage.getItem("christmasThemePreference");
   if (!preference) {
      preference = "enabled";
      localStorage.setItem("christmasThemePreference", "enabled");
   }

   if (preference === "enabled" && isWithinChristmasPeriod()) {
      applyChristmasTheme();
   } else {
      removeChristmasTheme();
   }

   if (toggleCheckbox) {
      toggleCheckbox.checked = preference === "enabled";

      toggleCheckbox.addEventListener("change", () => {
         const newPref = toggleCheckbox.checked ? "enabled" : "disabled";
         localStorage.setItem("christmasThemePreference", newPref);

         if (newPref === "enabled" && isWithinChristmasPeriod()) {
            applyChristmasTheme();
         } else {
            removeChristmasTheme();
         }
      });
   }

   updateIcon();
});
