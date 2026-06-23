import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 *
 * Source: https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
 */

let cached = global._mongoClientPromise;

if (!cached) {
  cached = { client: null, promise: null };
  global._mongoClientPromise = cached;
}

export async function getMongoClient() {
  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    const client = new MongoClient(MONGODB_URI);
    cached.promise = client.connect().then((client) => {
      cached.client = client;
      return client;
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db();
}
