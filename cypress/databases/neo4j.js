const neo4j = require('neo4j-driver');

const neo4jHost = 'localhost';

class Neo4J {
  static initializeDriver = () => {
    this.driver = neo4j.driver(
      `bolt://${neo4jHost}:7687`,
      neo4j.auth.basic('username', 'password'),
    );
  };

  static getSession = () => {
    if (!this.driver) this.initializeDriver();
    return this.driver.session();
  };

  static runQuery = async query => {
    const session = this.getSession();
    await session.run(query);
    session.close();
    return true;
  };
}

module.exports = Neo4J;
