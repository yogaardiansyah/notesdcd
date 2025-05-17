class FooterC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const theme = this.getAttribute("data-theme") || "blue";

    this.shadowRoot.innerHTML = `
        <style>
          footer {
            background-color: ${this.getBackgroundColor(theme)};
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 14px;
          }
      
          footer a {
            color: whitesmoke;
            text-decoration: none;
          }
      
          footer a:hover {
            text-decoration: underline;
          }
        </style>
    
        <footer>
          <p>Made by <a href="https://github.com/yogaardiansyah" target="_blank">Yoga Ardiansyah</a></p>
        </footer>
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

customElements.define("footer-c", FooterC);
