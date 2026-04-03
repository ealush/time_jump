"use server";

import { events } from "@/history";

export async function genHistoricalEventAction(
  year: number | string,
): Promise<string> {
  const yearEvents = events[String(year) as keyof typeof events];

  if (!yearEvents || yearEvents.length === 0) {
    return `No historical events found for year ${year}.`;
  }

  const randomIndex = Math.floor(Math.random() * yearEvents.length);
  return yearEvents[randomIndex];
}
