const AbstractRepository = require("./AbstractRepository");

class HerosliderRepository extends AbstractRepository {
  constructor() {
    super({ table: "heroslider" });
  }

  async allHerosliderVideos() {
    const [rows] = await this.database.query(
      `SELECT v.id, v.title, v.url, v.image, v.description, v.date, v.is_connected, c.name AS category FROM ${this.table} AS h JOIN video AS v ON h.video_id = v.id JOIN category AS c ON v.category_id = c.id`
    );

    return rows;
  }

  async addHerosliderVideo(videoId) {
    const [herosliderCountResult] = await this.database.query(
      "SELECT COUNT(*) AS count FROM heroslider"
    );
    const herosliderCount = herosliderCountResult[0].count;

    const maxRows = 5;

    if (herosliderCount >= maxRows) {
      const [idToDeleteResult] = await this.database.query(
        "SELECT MIN(id) AS id FROM heroslider"
      );
      const idToDelete = idToDeleteResult[0].id;

      await this.database.query("DELETE FROM heroslider WHERE id = ?", [
        idToDelete,
      ]);
    }

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (video_id) VALUES (?)`,
      [videoId]
    );

    return result.affectedRows;
  }

  async removeHerosliderVideo(videoId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE video_id = ?`,
      [videoId]
    );

    return result.affectedRows;
  }
}

module.exports = HerosliderRepository;
