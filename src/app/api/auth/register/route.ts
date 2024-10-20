import prisma from "@/src/lib/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, name } = body;

  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json({
      status: false,
      message: "Email/Username Already Exist!",
    });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // Creating new group named "Getting Started" each account created.
  const generateStartedGuideGroup = await prisma.groups.create({
    data: {
      title: "Getting Started",
      icon: "start",
      creatorId: user.id,
      tasks: {
        createMany: {
          data: [
            {
              creatorId: user.id,
              task: "Heyho! Let's start by organizing your tasks.",
            },
            {
              creatorId: user.id,
              task: "Click the star icon to mark a task as important. You'll find all important tasks in the Important menu.",
            },
            {
              creatorId: user.id,
              task: "Done with a task? Click the checkbox to mark it as completed.",
            },
            {
              creatorId: user.id,
              task: "Create a new task! The default due date is today, but you can set a future date if needed.",
            },
            {
              creatorId: user.id,
              task: "That's it! Enjoy managing your tasks with ease. Sayonara!",
            },
          ],
        },
      },
    },
  });

  // Generated "Groceries" group as example
  await prisma.groups.create({
    data: {
      title: "Groceries",
      icon: "cart",
      creatorId: user.id,
      tasks: {
        createMany: {
          data: [
            {
              creatorId: user.id,
              task: "Milk",
            },
            {
              creatorId: user.id,
              task: "Butter",
            },
            {
              creatorId: user.id,
              task: "Banana",
            },
            {
              creatorId: user.id,
              task: "Chocolate",
            },
            {
              creatorId: user.id,
              task: "Vegetables",
            },
          ],
        },
      },
    },
  });

  return NextResponse.json({
    status: true,
    message: "Success Creating New Account! Please Login.",
    generateStarterGroupId: generateStartedGuideGroup.label,
  });
}
