export default class DB {
  static setApiUrl(data) {
    this.apiUrl = data;
  }

  static async findAll() {
    const response = await fetch(this.apiUrl + "contacts");
    return response.json();
  }
}
