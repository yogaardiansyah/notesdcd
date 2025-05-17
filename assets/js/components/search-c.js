class SearchC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('assets/css/style.css');
      </style>
      <input type="text" id="search-input" placeholder="Cari catatan..." />
    `;

    const searchInput = this.shadowRoot.querySelector("#search-input");

    searchInput.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      document.dispatchEvent(new CustomEvent("searchNotes", { detail: query }));
    });
  }
}

customElements.define("search-c", SearchC);
