// lib/mongodb.ts
import { MongoClient } from "mongodb";

let _client: MongoClient | null = null;
let _clientPromise: Promise<MongoClient> | null = null;

/**
 * Lazily create a single MongoDB client instance.
 * Compatible with MongoDB Node.js Driver v5 (no isConnected()).
 */
export async function getClient(): Promise<MongoClient> {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL ||
    "";

  if (!uri) {
    throw new Error(
      "❌ Missing MongoDB URI. Set MONGODB_URI (or MONGO_URI / DATABASE_URL) in your .env file."
    );
  }

  // If client already exists, return it
  if (_client) return _client;

  // If promise already exists, return the same promise (avoid race conditions)
  if (_clientPromise) return _clientPromise;

  // Create and store the connection promise
  _clientPromise = new MongoClient(uri).connect().then((client) => {
    _client = client;
    return client;
  });

  return _clientPromise;
}
