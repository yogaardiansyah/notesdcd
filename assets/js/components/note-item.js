class NoteItem extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const date = this.getAttribute("date");

    this.innerHTML = `
            <div>
                <h2>${title}</h2>
                <p>${body}</p>
                <small>${date}</small>
            </div>
        `;
  }
}

customElements.define("note-item", NoteItem);
