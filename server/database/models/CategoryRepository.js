const AbstractRepository = require("./AbstractRepository");

class CategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "category" });
  }

  async browse() {
    const [result] = await this.database.query(
      `select id, name from ${this.table}`
    );

    return result;
  }

  async read(name) {
    const [rows] = await this.database.query(
      `SELECT c.name, v.id, v.title, v.image, v.is_connected FROM ${this.table} AS c LEFT JOIN video AS v ON c.id = v.category_id WHERE LOCATE(?, c.name)`,
      [name]
    );

    return rows;
  }

  async create(category) {
    const { name } = category;
    const [rows] = await this.database.query(
      `insert into ${this.table} (name) value (?)`,
      [name]
    );

    return rows.insertId;
  }

  async edit(name, id) {
    const [result] = await this.database.query(
      `update ${this.table} set name = ? where id = ? `,
      [name, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [row] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return row.affectedRows;
  }
}

module.exports = CategoryRepository;
