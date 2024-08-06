const AbstractRepository = require("./AbstractRepository");

class FavoriteRepository extends AbstractRepository {
  constructor() {
    super({ table: "favorite" });
  }

  async isVideoFavorite(userId, videoId) {
    const [rows] = await this.database.query(
      `SELECT 1 FROM ${this.table} WHERE user_id = ? AND video_id = ?`,
      [userId, videoId]
    );

    return rows[0];
  }

  async addFavorite(userId, videoId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, video_id) VALUES (?, ?)`,
      [userId, videoId]
    );

    return result.affectedRows;
  }

  async removeFavorite(userId, videoId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND video_id = ?`,
      [userId, videoId]
    );

    return result.affectedRows;
  }
}

module.exports = FavoriteRepository;
