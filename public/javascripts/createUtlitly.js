class CreateUtlitly {
  constructor() {
    this.mainBtn = document.querySelector("#CreateBtn");
    this.modal = document.querySelector("#CreatingCtnModal");
    this.form = document.querySelector("#CreatingCtnForm");
    this.xOut = document.querySelector("#CancelAdd");

    this.xOut.addEventListener("click", () => {
      this.modal.classList.remove("is-active");
    });

    this.mainBtn.addEventListener("click", () => {
      this.modal.classList.add("is-active");
    });
  }

  newContact(callback) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      let formContact = new FormData(this.form);

      if (formContact.get("tags")) {
        let uniqueTags = getUniqueTags(formContact.get("tags"));
        let apiFormat = formatTags(uniqueTags);
        formContact.set("tags", apiFormat);
      }

      formContact = JSON.stringify(Object.fromEntries(formContact));
      callback(formContact);
      this.form.reset();
      this.modal.classList.remove("is-active");
    });
  }
}

function formatTags(tagString) {
  return tagString.toLowerCase().replace(/\s/g, "").trim();
}

function getUniqueTags(list) {
  let tags = list.split(",");
  let newTags = [];
  tags.forEach((tag) => {
    if (!newTags.includes(tag)) newTags.push(tag);
  });
  return newTags.join(",");
}

export { CreateUtlitly };
