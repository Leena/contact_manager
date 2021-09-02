class Controller {
  constructor(contact, create, tag, search, api) {
    this.contactView = contact;
    this.createBtn = create;
    this.tagHandler = tag;
    this.searchHandler = search;
    this.API = api;

  }

  viewAll() {
    this.API.getAll()
    .then(contacts => {
     this.contactView.setInitialView(contacts);
     this.tagHandler.updateBox(contacts);
    })
   .catch(error => console.log(error));
  }

  bindingNewCtn(formContact) {
    this.API.addNewContact(formContact)
    .catch(error => console.log(error));
    this.viewAll();
  }

  bindEditCtn(id, formContact){
    this.API.updateExistingContact(id, formContact)
    .catch(error => console.log(error));
    this.viewAll();
  }

  bindDeleteCtn(id){
    this.API.deleteContact(id);
    this.viewAll();
  }

  bindTagView(tag) {
    this.API.getAll()
    .then(contacts => this.contactView.tagFiler(tag, contacts))
    .catch(error => console.log(error));
  }

  bindSearchView(text) {
    this.API.getAll()
    .then(contacts => this.contactView.seachFilter(text, contacts))
    .catch(error => console.log(error));
  }
}

export {Controller}