import DB from "../../DB";
import Contacts from "../contact/Contact";
import getContactListTemplate from "../contactList/template";
export default class ContactList {
  constructor(data) {
    this.domElement = document.querySelector(data.el);
    this.listDomElement = null;
    DB.setApiUrl(data.url);
    this.contacts = [];
    this.loadContacts();
  }
  async loadContacts() {
    const contacts = await DB.findAll();
    this.contacts = contacts.map((contact) => new Contacts(contact));
    this.render();
  }
  getContactsCount() {
    return this.contacts.length;
  }
  renderContactsCount() {
    this.domElement.querySelector(".contacts-count span").innerText =
      this.getContactsCount();
  }

  render() {
    this.domElement.innerHTML = getContactListTemplate();
    this.listDomElement = this.domElement.querySelector(".contacts-list");
    this.contacts.forEach((contact) => contact.render(this.listDomElement));
    this.renderContactsCount();
    this.initEvents();
  }
  async addContact(data) {
    //ajouter dans la DB
    const contact = await DB.create(data);
    // ajouter à this.contacts
    const newContact = new Contacts(contact);
    this.contacts.push(newContact);
    //ajouter dans le DOM
    newContact.render(this.listDomElement);
    //relancer le render des contacts count
    this.renderContactsCount();
  }

  initEvents() {
    this.domElement
      .querySelector(".add-contact-btn")
      .addEventListener("click", (e) => {
        this.addContact({
          firstname: this.domElement.querySelector(".firstname").value,
          lastname: this.domElement.querySelector(".lastname").value,
          email: this.domElement.querySelector(".email").value,
        });
      });
  }
}
