import getContactTemplate from "./template";
export default class Contacts {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.createdAt = data.creayedAt;
    this.domElement = null;
  }
  render(el) {
    const template = document.createElement("template");
    template.innerHTML = getContactTemplate(this);
    this.domElement = template.content.firstElementChild;
    el.append(this.domElement);
  }
}
