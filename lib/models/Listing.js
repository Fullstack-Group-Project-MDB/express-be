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
  static async insert({ title, content }) {
    const { rows } = await pool.query(
      `
    INSERT INTO listings (title, content)
    VALUES ($1, $2) RETURNING *`,
      [title, content]
    );
    return new Listing(rows[0]);
  }
  static async updateById(id, attrs) {
    const listing = await Listing.getById(id);
    if (!id) throw new Error('Listing not found');
    const { title, content } = { ...listing, ...attrs };
    const { rows } = await pool.query(
      `UPDATE listings SET title=$2, content=$3 
       WHERE id=$1
       RETURNING *
       `,
      [id, title, content]
    );
    return new Listing(rows[0]);
  }
  static async deleteById(id) {
    
    const { rows } = await pool.query(
      `DELETE FROM listings
      WHERE id=$1
      RETURNING *
      `,
      [id]
    );
    return new Listing(rows[0]);
  }
}

module.exports = Listing;
