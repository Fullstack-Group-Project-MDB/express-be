const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  #passwordHash;
  constructor(row) {
    this.email = row.email;
    this.id = row.id;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ email, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO bulletin_users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, passwordHash]
    );
    return new User(rows[0]);
  }
  static async getByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM bulletin_users WHERE email=$1',
      [email]
    );
    return rows[0] ? new User(rows[0]) : null;
  }
  get passwordHash() {
    return this.passwordHash;
  }
};
