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
}
