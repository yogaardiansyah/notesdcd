class AppBar extends HTMLElement {
  connectedCallback() {
    const theme = this.getAttribute("data-theme") || "blue";

    this.innerHTML = `
        <header style="background: ${this.getBackgroundColor(
          theme
        )}; color: white; padding: 15px; text-align: center;">
          <h1>Aplikasi Catatan</h1>
        </header>
      `;
  }

  getBackgroundColor(theme) {
    switch (theme) {
      case "red":
        return "#FF5733";
      case "orange":
        return "#FFA500";
      case "green":
        return "#28A745";
      default:
        return "#007BFF";
    }
  }
}

customElements.define("app-bar-c", AppBar);
