const pghost = 'localhost';
const pgURI = `postgresql://username:password@${pghost}:5432`;
const { Client } = require('pg');
class postgres {
  static getClient = async db => {
    const client = new Client({
      connectionString: `${pgURI}/${db}`,
    });
    await client.connect();
    return client;
  };

  static seedDB = async ([text, values]) => {
    const client = await this.getClient('dbName');
    let result;
    try {
      result = await client.query(text, values);
    } catch (error) {
      return undefined;
    }
    await client.end();
    return result;
  };
}
module.exports = postgres;