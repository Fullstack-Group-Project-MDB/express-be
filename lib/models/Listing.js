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
}

module.exports = Listing;
