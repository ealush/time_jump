import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/app/db/prismaClient";
import { genYearCongestion } from "@/app/utils";
import styles from "../jumps.module.css";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const jump = await prisma.jumpRequest.findUnique({
    where: { id },
  });
  if (!jump) return { title: "Jump Not Found · ChronoTrips™ Temporal Transit Authority" };
  const primaryName = jump.travelerName || "Unknown Traveler";
  return {
    title: `${primaryName} → ${jump.destinationYear} · ChronoTrips™`,
    description: `Temporal displacement request filed by ${primaryName}. Destination epoch: ${jump.destinationYear}.`,
  };
}

export default async function JumpDetailPage({ params }: Props) {
  const { id } = await params;
  const jump = await prisma.jumpRequest.findUnique({
    where: { id },
  });

  if (!jump) notFound();

  const isParadox = jump.travelerBirthYear >= jump.destinationYear;
  const congestion = genYearCongestion(jump.destinationYear);

  const filed = new Date(jump.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className={styles.viewport}>
      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          ChronoTrips™ Temporal Transit Authority
        </Link>
        <Link href="/jumps" className={styles.navLink}>
          ← Return to Registry
        </Link>
      </nav>

      <article className={styles.detail}>
        <header>
          <p className={styles.eyebrow}>
            Dossier #{jump.id.slice(-8).toUpperCase()} · Logged {filed} UTC-Temporal
          </p>
          <h1>
            {jump.travelerName || "Unknown Traveler"}
          </h1>
        </header>

        {/* Paradox warning */}
        {isParadox && (
          <div className={styles.paradoxAlert}>
            ⚠ TEMPORAL PARADOX DETECTED — Target epoch ({jump.destinationYear})
            predates or coincides with the traveler&apos;s origin year.
            This filing has been flagged for review by the Bureau of Chronological
            Transit. Do not attempt displacement until cleared.
          </div>
        )}

        <div className={styles.fields}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Target Epoch</span>
            <span className={styles.fieldValueAccent}>
              {jump.destinationYear}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Traveler Data</span>
            <ul className={styles.crewList}>
              <li>
                {jump.travelerName} (born {jump.travelerBirthYear})
              </li>
            </ul>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Plutonium Core Allocation (GW)</span>
            <span className={styles.fieldValue}>{jump.plutoniumCores}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Stated Mission Objective</span>
            <p className={styles.missionBlock}>{jump.mission}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Paradox Integrity Status</span>
            <span
              className={`${styles.badge} ${
                isParadox ? styles.badgeParadox : styles.badgeSafe
              }`}
            >
              {isParadox ? "⚠ PARADOX FLAGGED — HOLD" : "✓ TIMELINE INTEGRITY INTACT"}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              Temporal Corridor Traffic · Epoch {jump.destinationYear}
            </span>
            <span
              className={`${styles.congestion} ${styles[`congestion${congestion.level}`]}`}
            >
              {congestion.icon} {congestion.label}
            </span>
          </div>
        </div>

        <Link href="/jumps" className={styles.backLink}>
          ← Return to Jump Registry
        </Link>
      </article>
    </main>
  );
}
