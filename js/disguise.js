document.addEventListener("DOMContentLoaded", () => {
   const checkbox = document.getElementById("gc-disguise-toggle");

   const updateDisguise = (enable) => {
      document.title = enable ? "Google Classroom" : "Jet Yeh's";
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
         link = document.createElement("link");
         link.rel = "icon";
         document.head.appendChild(link);
      }
      link.href = enable ? "/assets/favicon-gc-16x16.png" : "/assets/favicon-32x32.png";
   };

   const isEnabled = localStorage.getItem("gcDisguise") === "true";
   if (isEnabled) {
      updateDisguise(true);
      if (checkbox) checkbox.checked = true;
   }

   checkbox?.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      localStorage.setItem("gcDisguise", isChecked);
      updateDisguise(isChecked);
   });
});
