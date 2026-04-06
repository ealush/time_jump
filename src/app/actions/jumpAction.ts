"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/db/prismaClient";
import type { ChronosSchemaType } from "../components/chrono-portal/types";

export async function createJumpRequest(
  data: ChronosSchemaType,
): Promise<void> {
  await prisma.jumpRequest.create({
    data: {
      mission: String(data.mission),
      destinationYear: Number(data.destinationYear),
      plutoniumCores: Number(data.plutoniumCores),
      suppressParadoxCheck: Boolean(data.suppressParadoxCheck),
      travelerName: String(data.travelerName),
      travelerBirthYear: Number(data.travelerBirthYear),
    },
  });

  redirect("/jumps");
}

export async function initiateJump(data: ChronosSchemaType): Promise<{
  success: boolean;
  response: undefined | string;
}> {
  await createJumpRequest(data);

  return {
    success: true,
    response: undefined,
  };
}
