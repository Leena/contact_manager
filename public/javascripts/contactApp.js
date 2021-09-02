import {ContactAPI} from './contactAPI.js'
import {ContactUI} from './contactUI.js'
import {Controller} from './controller.js'
import {CreateUtlitly} from './createUtlitly.js'
import {SearchUtility} from './searchUtility.js'
import {TagUtility} from './tagUtility.js'
  
document.addEventListener('DOMContentLoaded', ()=> {
  let app = new Controller(new ContactUI(), new CreateUtlitly(), new TagUtility(), new SearchUtility(), new ContactAPI());
  app.createBtn.newContact(app.bindingNewCtn.bind(app));
  app.contactView.bindEditContact(app.bindEditCtn.bind(app));
  app.contactView.bindDeleteContact(app.bindDeleteCtn.bind(app));
  app.tagHandler.bindViewAll(app.viewAll.bind(app));
  app.tagHandler.bindTagView(app.bindTagView.bind(app));
  app.searchHandler.bindSearchView(app.bindSearchView.bind(app));
  app.viewAll();
}); 
 