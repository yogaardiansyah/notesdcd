import { notesData } from "./data.js";

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notesData = [];
    this.filteredNotes = [];
  }

  connectedCallback() {
    const theme = this.getAttribute("data-theme");

    if (theme === "dark") {
      this.style.backgroundColor = "#000";
      this.style.color = "#fff";
    } else {
      this.style.backgroundColor = "#fff";
      this.style.color = "#000";
    }

    this.shadowRoot.innerHTML = `
      <style>
          @import url('assets/css/style.css');
          #notes-list {
              color: black;   
          }
      </style>

      <form id="note-form">
          <input type="text" id="title" placeholder="Judul Catatan" required />
          <p id="title-error" style="color: red; display: none;">Judul minimal 3 karakter!</p>
          <textarea id="body" placeholder="Isi Catatan" required></textarea>
          <p id="body-error" style="color: red; display: none;">Isi catatan tidak boleh kosong!</p>
          <button type="submit">Tambah Catatan</button>
      </form>
    `;

    this.notesData = [...notesData];
    this.filteredNotes = [...notesData];

    this.renderNotes();

    const form = this.shadowRoot.querySelector("#note-form");
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");
    const titleError = this.shadowRoot.querySelector("#title-error");
    const bodyError = this.shadowRoot.querySelector("#body-error");

    titleInput.addEventListener("input", () => {
      this.validateForm();
    });

    bodyInput.addEventListener("input", () => {
      this.validateForm();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (title.length < 3) {
        titleError.style.display = "block";
        return;
      }

      if (!body) {
        bodyError.style.display = "block";
        return;
      }

      const newNote = {
        id: `notes-${Date.now()}`,
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      this.notesData.push(newNote);
      this.filteredNotes.push(newNote);

      document.dispatchEvent(new Event("notesUpdated"));
      form.reset();
    });

    document.addEventListener("notesUpdated", () => {
      this.renderNotes();
    });

    document.addEventListener("searchNotes", (event) => {
      this.filterNotes(event.detail);
    });
  }

  validateForm() {
    const title = this.shadowRoot.querySelector("#title").value.trim();
    const body = this.shadowRoot.querySelector("#body").value.trim();
    const titleError = this.shadowRoot.querySelector("#title-error");
    const bodyError = this.shadowRoot.querySelector("#body-error");

    titleError.style.display = title.length < 3 ? "block" : "none";
    bodyError.style.display = !body ? "block" : "none";
  }

  filterNotes(query) {
    if (query.trim() === "") {
      this.filteredNotes = this.notesData;
    } else {
      this.filteredNotes = this.notesData.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.body.toLowerCase().includes(query.toLowerCase())
      );
    }
    this.renderNotes();
  }

  renderNotes() {
    const notesList = document.querySelector("#notes-list");
    if (!notesList) return;

    notesList.innerHTML = "";

    if (this.filteredNotes.length === 0) {
      const noNotesMessage = document.createElement("p");
      noNotesMessage.textContent = "Tidak ada catatan ditemukan";
      notesList.appendChild(noNotesMessage);
      return;
    }

    this.filteredNotes.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      noteElement.setAttribute(
        "date",
        new Date(note.createdAt).toLocaleString()
      );
      notesList.appendChild(noteElement);
    });
  }
}

customElements.define("note-form", NoteForm);
