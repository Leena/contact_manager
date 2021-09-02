class ContactUI {
  constructor() {
    this.view = document.querySelector('#ContactsView');
    this.table = document.querySelector('tbody');
    this.modal = document.querySelector('#EditCtnModal');
    this.form = document.querySelector('#EditCtnForm');
    this.xOut = document.querySelector('#CancelEdits');
    this.editBtn = document.querySelector('#ConfirmEditsBtn');
    this.deleteBtn = document.querySelector('#DeleteCtnBtn');
    this.noContactTxt = document.querySelector('#noContactsText');

    this.xOut.addEventListener('click', (event) => {
    this.modal.classList.remove('is-active');
    });

    this.table.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      let rowId = event.target.parentNode.id;
      if (rowId > 0) this.modal.classList.add('is-active');

      let row = event.target.parentNode;
      let nameField = document.querySelector("#existingContactName");
      nameField.value = row.childNodes[1].innerText;
      let phoneField = document.querySelector("#existingContacPhoneNumber");
      phoneField.value = row.childNodes[2].innerText;
      let emailField = document.querySelector("#existingContactEmail");
      emailField.value = row.childNodes[3].innerText;
      let tagsField = document.querySelector("#existingContactTags");
      tagsField.value = row.childNodes[4].innerText;

      this.form.rowId = rowId;
      this.deleteBtn.rowId = rowId;
    });
  }

  bindEditContact(callback) {
    this.form.addEventListener('submit', (event)=> {
      event.stopPropagation();

      let rowId = this.form.rowId;
      let form = new FormData(this.form);

      if (form.get('tags')) {
        let apiFormat = formatTags(form.get('tags'));
        form.set('tags', apiFormat);
      }
      form = JSON.stringify(Object.fromEntries(form));
      this.modal.classList.remove('is-active');
      callback(rowId, form);
    });
  }

  bindDeleteContact(callback) {
    this.deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();
      callback(this.deleteBtn.rowId);
      this.modal.classList.remove('is-active');
    });
  }

  removeAll() {
    while (this.table.childElementCount > 1) {
      this.table.lastElementChild.remove();
    }
  }

  newRow(contact) {
    let newEntry = newTableRowId(contact);
    buildTableData(newEntry, contact);
    this.table.appendChild(newEntry);
  }

  appendNoContact(list) {
    if ((list === undefined) || (list.length === 0)) {
      this.noContactTxt.classList.add('title');
      this.noContactTxt.textContent = 'No Contact Found';
      return true;
    } 
    this.noContactTxt.textContent = '';
    return false;
  }

  setInitialView(source) {
    this.removeAll();
    if (this.appendNoContact(source)) {
      return;
    } else {
      let contacts = formatAllData(source);
      contacts.forEach(contact => this.newRow(contact));
    }
  }

  tagFiler(tag, contacts) {
    this.removeAll();
    let matches = [];
    
    contacts.forEach(contact => {
      if (contact.tags.split(',').includes(tag)) {
        matches.push(contact);
      }
    })

    if (this.appendNoContact(matches)) {
      return;
    } else {
      matches.forEach(this.newRow.bind(this));
    }
  }

  seachFilter(text, contacts) {
    this.removeAll();
    let matches = [];
    
    contacts.forEach(contact => {
      if (contact['full_name'].trim().toLowerCase().indexOf(text) === 0) {
        matches.push(contact);
      }
    })

    if (this.appendNoContact(matches)) {
      return;
    } else {
      matches.forEach(this.newRow.bind(this));
    }
  }
} 

function newTableRowId(contact) {
  let newEntry = document.createElement('tr');
  newEntry.id = contact.id;
  return newEntry;
}

function buildTableData(newEntry, contact) {
  let tableData = document.createElement('td');
  tableData.classList.add('is-size-6'); 

  let idRow = tableData.cloneNode();
  idRow.innerText = String(contact.id);
  newEntry.appendChild(idRow);

  let nameRow = tableData.cloneNode();
  nameRow.innerText = contact.full_name;
  newEntry.appendChild(nameRow);

  let phoneRow = tableData.cloneNode();
  phoneRow.innerText = String(contact.phone_number);
  newEntry.appendChild(phoneRow);

  let emailRow = tableData.cloneNode();
  emailRow.innerText = String(contact.email);
  newEntry.appendChild(emailRow);

  let tagRow = tableData.cloneNode();
    if (contact['tags']) {
      if (contact['tags'].includes(',')) {
        let tags = contact['tags'].split(',').join(', ')
        tagRow.innerText = String(tags);
        newEntry.appendChild(tagRow);
      } else {
        tagRow.innerText = String(contact['tags']);
        newEntry.appendChild(tagRow);
      }
    } else {
      newEntry.appendChild(tagRow);
    }
}

function formatTags(tagString) {
  let tags = tagString.split(',')
  let newTags = [];
  tags.forEach(tag => {
    if (!newTags.includes(tag)) newTags.push(tag);
  });
  return newTags.join(',').toLowerCase().replace(/\s/g, '').trim();
}

function formatAllData(source) {
  let contactCollection = [];
  source.forEach(contact => {
    let newContact = {}
    Object.keys(contact).forEach(key => {
      if (key === 'tags') {
        if (contact[key]) { 
          newContact[key] = formatTags(contact[key]);
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

export {ContactUI};