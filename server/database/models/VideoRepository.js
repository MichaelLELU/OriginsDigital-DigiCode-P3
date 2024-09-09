/* eslint-disable camelcase */
const AbstractRepository = require("./AbstractRepository");

class VideoRepository extends AbstractRepository {
  constructor() {
    super({ table: "video" });
  }

  // Browse (read all) videos

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT id, title, url, image, description, date, is_connected  FROM ${this.table}`
    );

    // return the array of videos
    return rows;
  }

  // Read

  async read(id) {
    // execute the SQL SELECT query to retrieve a specific video by its id
    const [row] = await this.database.query(
      `SELECT v.id, v.title, v.url, v.image, v.description, v.date, v.is_connected, c.name AS category FROM ${this.table} AS v JOIN category AS c ON v.category_id = c.id where v.id = ?`,
      [id]
    );

    // return the first row of the result, aka the video
    return row[0];
  }

  // Edit

  async edit(is_connected, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET is_connected=? WHERE id=?`,
      [is_connected, id]
    );

    return result.affectedRows;
  }

  // Add (create)

  async create(video) {
    const { title, url, image, description, is_connected, category_id } = video;
    // execute the SQL INSERT query to add a new video to the "video" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, url, image, description, is_connected, category_id) values( ?, ?, ?, ?, ?, ?)`,
      [title, url, image, description, is_connected, category_id]
    );

    // return the id of the newly inserted video
    return result.insertId;
  }

  // Destroy (delete)
  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );

    return result.affectedRows;
  }

  // Search (query)
  async query(search) {
    const [rows] = await this.database.query(
      `SELECT id, title, url, image, description, date, is_connected, category_id FROM ${this.table} WHERE LOCATE(?, title) OR LOCATE(?, description)`,
      [search, search]
    );

    return rows;
  }

  // Get random videos
  async browseRandom() {
    const [rows] = await this.database.query(
      `SELECT id, title, url, image, description, date, is_connected, category_id FROM ${this.table} ORDER BY RAND() LIMIT 9`
    );

    return rows;
  }

  // Get latest videos
  async browseLatest() {
    const [rows] = await this.database.query(
      `SELECT id, title, url, image, description, date, is_connected, category_id FROM ${this.table} ORDER BY id DESC LIMIT 9`
    );

    return rows;
  }
}

module.exports = VideoRepository;
