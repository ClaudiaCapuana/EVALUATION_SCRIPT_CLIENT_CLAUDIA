export default class DB {
  static setApiUrl(data) {
    this.apiUrl = data;
  }

  static async findAll() {
    const response = await fetch(this.apiUrl + "contacts");
    return response.json();
  }

  static async create(data) {
    const response = await fetch(this.apiUrl + "contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      }),
    });
    return response.json();
  }

  static async deleteOneById(id) {
    const response = await fetch(this.apiUrl + "contacts/" + id, {
      method: "DELETE",
    });
    return response.json();
  }

  static async updateOne(contact) {
    const response = await fetch(this.apiUrl + "contacts/" + contact.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email,
      }),
    });
    return response.json();
  }
}
