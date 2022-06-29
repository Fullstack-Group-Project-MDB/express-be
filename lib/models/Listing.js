const pool = require('../utils/pool');

class Listing {
  id;
  title;
  content;
  constructor(row) {
    for (const key in row) {
      this[key] = row[key];
    }
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM listings');
    return rows.map((row) => new Listing(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from listings where id=$1', [
      id,
    ]);
    return rows[0] ? new Listing(rows[0]) : null;
  }
}

module.exports = Listing;
