document.addEventListener("DOMContentLoaded", function () {
  const footerPlaceholder = document.getElementById("footer");
  if (footerPlaceholder) {
    fetch("/common/footer.html")
      .then((response) => response.text())
      .then((data) => {
        footerPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  }
});
