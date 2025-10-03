import getContactTemplate from "./template";
import DB from "../../DB";
export default class Contact {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.domElement = null;
  }
  render(el) {
    const template = document.createElement("template");
    template.innerHTML = getContactTemplate(this);
    this.domElement = template.content.firstElementChild;
    el.append(this.domElement);
    this.initEvents();
  }

  async update(data) {
    //je modifie dans le tableau this.contacts
    this.firstname = data.inputFirstname;
    this.lastname = data.inputLastname;
    this.email = data.inputEmail;

    //je modifie dans le DOM
    this.domElement.querySelector(".span-firstname").innerText = this.firstname;
    this.domElement.querySelector(".span-lastname").innerText = this.lastname;
    this.domElement.querySelector(".span-email").innerText = this.email;
    //Remove la class isEditing
    this.domElement.classList.remove("isEditing");
    // je modifie dans la DB
    return await DB.updateOne(this);
  }

  initEvents() {
    this.domElement
      .querySelector(".btn-delete")
      .addEventListener("click", (e) => {
        window.ContactList.deleteOneById(this.id);
      });

    this.domElement
      .querySelector(".btn-edit")
      .addEventListener("click", (e) => {
        this.domElement.classList.add("isEditing");
      });

    this.domElement
      .querySelector(".btn-check")
      .addEventListener("click", (e) => {
        this.update({
          inputFirstname:
            this.domElement.querySelector(".input-firstname").value,
          inputLastname: this.domElement.querySelector(".input-lastname").value,
          inputEmail: this.domElement.querySelector(".input-email").value,
        });
      });
  }
}
