import getContactTemplate from "./template";
export default class Contacts {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.createdAt = data.createdAt;
  }
  render() {
    const template = document.createElement("tr");
    template.innerHTML = getContactTemplate(this);
    el.append(template);
  }
}
