document.addEventListener("DOMContentLoaded", function () {
  const navbarPlaceholder = document.getElementById("navbar");
  if (navbarPlaceholder) {
    fetch("/common/navbar.html")
      .then((response) => response.text())
      .then((data) => {
        navbarPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading navbar:", error);
      });
  }
});
