import prisma from "@/src/lib/db";
import { getUserIdFromCookie } from "@/src/lib/getIdServerside";
import { NextRequest, NextResponse } from "next/server";

const assignee = async (method: string, assignTo: string) => {
  // This logic is carried by AI lmao.

  if (method === "assignment") {
    const isExistent = await prisma.users.findUnique({
      where: { email: assignTo },
    });

    // Return null if user is not found
    if (!isExistent) {
      return null;
    }

    // Return the user ID if found
    return isExistent.id;
  }

  // Return null if assignment method is not used
  return null;
};

const validate = async (method: string, assignTo: string) => {
  const assigneeResult = await assignee(method, assignTo);

  // Ensure `assigneeResult` is a string (user ID), otherwise return null
  if (typeof assigneeResult === "string") {
    return assigneeResult;
  }

  // Return null if no valid assignee was found
  return null;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = await getUserIdFromCookie();
    const { task, groupId, important, due_date, method, assignTo } = body;

    const assigneeId = await validate(method, assignTo);

    if (assignTo && !assigneeId) {
      return NextResponse.json({
        status: false,
        message:
          "We couldn't find the user you're looking for. Please try again or select a different user.",
      });
    }

    const createdTasks = await prisma.tasks.create({
      data: {
        creatorId: userId,
        task,
        groupId,
        important,
        due_date,
        assigneeId,
      },
      include: {
        groups: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ status: true, data: createdTasks });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error,
    });
  }
}
