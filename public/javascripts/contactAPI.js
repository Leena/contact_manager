class ContactAPI {
  getAll() {
    return fetch("http://localhost:3000/api/contacts").then((response) =>
      response.json()
    );
  }

  getContact(id) {
    return fetch(`http://localhost:3000/api/contacts/${id}`).then((response) =>
      response.json()
    );
  }

  addNewContact(formData) {
    return fetch("http://localhost:3000/api/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    });
  }

  updateExistingContact(id, formData) {
    return fetch(`http://localhost:3000/api/contacts/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formData,
    }).then((response) => response.json());
  }

  deleteContact(id) {
    fetch(`http://localhost:3000/api/contacts/${id}`, {
      method: "DELETE",
    });
  }
}

export { ContactAPI };
