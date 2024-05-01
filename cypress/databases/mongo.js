const monghost = 'localhost';

const mongoURI = `mongodb://${monghost}:27017`;

const DB = "test";

const { MongoClient } = require('mongodb');

class Mongo {
  static getClient = async () => {
    if (!this.client || !this.client.isConnected)
      this.client = await MongoClient.connect(mongoURI);
    return this.client;
  };

  static create = async ([collection, data]) => {
    const client = await this.getClient();
    const db = client.db(DB);
    const result = await db
      .collection(collection)
      .insertOne({ ...data, created_at: new Date(), updated_at: new Date() });
    return result;
  };

  static delete = async ([collection, condition]) => {
    const client = await this.getClient();
    const db = client.db(DB);
    const result = await db.collection(collection).deleteMany(condition);
    return result;
  };

  static update = async ([collection, data]) => {
    const client = await this.getClient();
    const db = client.db(DB);
    const result = await db
      .collection(collection)
      .update({ ...data, created_at: new Date(), updated_at: new Date() });
    return result;
  };
}
module.exports = Mongo;
