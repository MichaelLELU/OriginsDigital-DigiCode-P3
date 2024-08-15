/* eslint-disable camelcase */
const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  // Browse
  async readAll() {
    const [rows] = await this.database.query(
      `SELECT u.firstname, u.lastname, u.email, u.password, r.name AS role FROM ${this.table} AS u JOIN role AS r ON u.role_id=r.id`
    );

    return rows;
  }

  // Read
  async readById(id) {
    const [row] = await this.database.query(
      `SELECT u.firstname, u.lastname, u.email, u.password, r.name AS role FROM ${this.table} AS u JOIN role AS r ON u.role_id=r.id WHERE u.id=?`,
      [id]
    );

    return row[0];
  }

  async updateUserName(firstname, lastname, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname=?, lastname=? WHERE id=?`,
      [firstname, lastname, id]
    );

    return result;
  }

  // Add
  async create(firstname, lastname, email, password, role_id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, password, role_id) VALUES (?, ?, ?, ?, ?)`,
      [firstname, lastname, email, password, role_id]
    );

    return result.insertId;
  }

  // Destroy or "Delete"
  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );

    return result;
  }

  // Search user by email
  async searchByEmail(email) {
    const [result] = await this.database.query(
      `SELECT u.firstname, u.lastname, u.email, u.password, u.id, r.name AS role FROM ${this.table} AS u JOIN role AS r ON u.role_id=r.id WHERE email = ?`,
      [email]
    );

    return result;
  }
}

module.exports = UserRepository;
