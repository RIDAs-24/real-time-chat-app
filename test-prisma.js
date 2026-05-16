const { PrismaClient } = require("@prisma/client");

try {
  const client = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || "mongodb+srv://admin:admin123@cluster0.mongodb.net/realtime-chat?retryWrites=true&w=majority"
  });
  console.log("Success with datasourceUrl");
} catch (e) {
  console.error("Failed with datasourceUrl:", e.message);
  try {
    const client2 = new PrismaClient({
      url: process.env.DATABASE_URL || "mongodb+srv://admin:admin123@cluster0.mongodb.net/realtime-chat?retryWrites=true&w=majority"
    });
    console.log("Success with url");
  } catch (e2) {
    console.error("Failed with url:", e2.message);
  }
}
