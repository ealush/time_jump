"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/db/prismaClient";
import type { ChronosSchemaType } from "../components/chrono-portal/types";

export type JumpData = ChronosSchemaType;

export async function createJumpRequest(data: JumpData): Promise<void> {
  await prisma.jumpRequest.create({
    data: {
      mission: String(data.mission),
      destinationYear: Number(data.destinationYear),
      plutoniumCores: Number(data.plutoniumCores),
      suppressParadoxCheck: Boolean(data.suppressParadoxCheck),
      crew: {
        create: data.crew.map((m) => ({
          name: String(m.name),
          birthYear: Number(m.birthYear),
        })),
      },
    },
  });

  redirect("/jumps");
}

export async function initiateJump(data: JumpData): Promise<void> {
  await createJumpRequest(data);
}
