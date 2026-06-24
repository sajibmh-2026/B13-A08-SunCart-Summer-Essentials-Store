import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Lazy auth initialization — avoids top-level await issues on Vercel
async function handleGET(request) {
  const auth = await getAuth();
  const handler = toNextJsHandler(auth);
  return handler.GET(request);
}

async function handlePOST(request) {
  const auth = await getAuth();
  const handler = toNextJsHandler(auth);
  return handler.POST(request);
}

export { handleGET as GET, handlePOST as POST };
