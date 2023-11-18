class TagUtility {
  constructor() {
    this.box = document.querySelector("#TagBox");
    this.viewAllTag = document.querySelector("#viewAllTag");
  }

  removeAll() {
    while (this.box.childElementCount > 1) {
      this.box.lastElementChild.remove();
    }
  }

  updateBox(rawContacts) {
    this.removeAll();
    let contacts = formatAllData(rawContacts);
    let uniqueTags = getUniqueTags(contacts);
    uniqueTags.sort();
    uniqueTags.forEach((tag) => {
      let newTag = createNewTag(tag);
      this.box.insertAdjacentElement("beforeend", newTag);
    });
  }

  bindViewAll(callback) {
    this.viewAllTag.addEventListener("click", (event) => {
      event.stopPropagation();
      callback();
    });
  }

  bindTagView(callback) {
    this.box.addEventListener("click", (event) => {
      event.stopPropagation();
      let tag = event.target.innerText;
      if (event.target.nodeName === "A") {
        callback(tag);
      }
    });
  }
}

function createNewTag(tag) {
  let newAnchor = document.createElement("a");
  newAnchor.classList.add("tag", "is-info", "is-rounded");
  newAnchor.id = tag;
  newAnchor.innerText = tag;
  return newAnchor;
}

function getUniqueTags(list) {
  let newTags = [];
  list.forEach((contact) => {
    if (contact["tags"]) {
      contact["tags"].forEach((tag) => {
        if (!newTags.includes(tag)) newTags.push(tag);
      });
    }
  });
  return newTags;
}

function formatAllData(source) {
  let contactCollection = [];
  source.forEach((contact) => {
    let newContact = {};
    Object.keys(contact).forEach((key) => {
      if (key === "tags") {
        if (contact[key]) {
          newContact[key] = formatTag(contact[key]);
        } else {
          newContact[key] = contact[key];
        }
      } else {
        newContact[key] = contact[key];
      }
    });
    contactCollection.push(newContact);
  });
  return contactCollection;
}

function formatTag(string) {
  return string.split(",");
}

export { TagUtility };
