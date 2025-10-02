import DB from "../../DB";
import Contacts from "../contact/Contact";
import getContactListTemplate from "../contactList/template";
export default class ContactList {
  constructor(data) {
    this.domElement = document.querySelector(data.el);
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
    this.contacts.forEach((contact) =>
      contact.render(this.domElement.querySelector(".contacts-list"))
    );
    this.renderContactsCount();
  }
}
