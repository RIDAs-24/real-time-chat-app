import { NextResponse } from "next/response";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const hashedAdminPassword = await bcrypt.hash("admin123", 12);
    const hashedUserPassword = await bcrypt.hash("user123", 12);

    // Create Super Admin
    const adminUser = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        name: "Super Admin",
        hashedPassword: hashedAdminPassword,
        role: "SUPER_ADMIN",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      }
    });

    // Create dummy users
    const user1 = await prisma.user.upsert({
      where: { email: "john@example.com" },
      update: {},
      create: {
        email: "john@example.com",
        name: "John Doe",
        hashedPassword: hashedUserPassword,
        role: "USER",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      }
    });

    const user2 = await prisma.user.upsert({
      where: { email: "jane@example.com" },
      update: {},
      create: {
        email: "jane@example.com",
        name: "Jane Smith",
        hashedPassword: hashedUserPassword,
        role: "USER",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      }
    });

    // Create a demo conversation
    await prisma.conversation.create({
      data: {
        users: {
          connect: [
            { id: adminUser.id },
            { id: user1.id }
          ]
        },
        messages: {
          create: [
            {
              body: "Hello John, welcome to the Real-Time Chat App!",
              sender: { connect: { id: adminUser.id } },
              seen: { connect: { id: user1.id } }
            }
          ]
        }
      }
    });

    return NextResponse.json({ message: "Seed successful!" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
