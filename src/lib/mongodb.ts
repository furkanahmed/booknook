import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb+srv://dremoyit_db_user:QYSpxHmhJQOKhgy2@cluster0.kocs1c0.mongodb.net/booknook?retryWrites=true&w=majority";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

