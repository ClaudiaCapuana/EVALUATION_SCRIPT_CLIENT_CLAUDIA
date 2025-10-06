import DB from "../../DB";
import Contact from "../contact/Contact";
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
    this.contacts = contacts.map((contact) => new Contact(contact));
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
    this.contacts.forEach((contact) =>
      this.listDomElement.append(contact.render())
    );
    this.renderContactsCount();
    this.initEvents();
  }
  async addContact(data) {
    //ajouter dans la DB
    const contact = await DB.create(data);
    // ajouter à this.contacts
    const newContact = new Contact(contact);
    this.contacts.push(newContact);
    //ajouter dans le DOM
    this.listDomElement.append(newContact.render());
    //relancer le render des contacts count
    this.renderContactsCount();
  }

  async deleteOneById(id) {
    //supprimer de la DB
    const resp = await DB.deleteOneById(id);
    //Supprimer de this.contacts
    this.contacts.splice(
      this.contacts.findIndex((contact) => contact.id == id),
      1
    );
    //supprimer du DOM
    this.domElement.querySelector(`[data-id="${id}"]`).remove();
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
        this.domElement.querySelector(".firstname").value = "";
        this.domElement.querySelector(".lastname").value = "";
        this.domElement.querySelector(".email").value = "";
      });
  }
}
