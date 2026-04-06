import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/app/db/prismaClient";
import styles from "./jumps.module.css";

export const metadata: Metadata = {
  title: "Jump Registry · ChronoTrips™ Temporal Transit Authority",
  description: "Official registry of all filed temporal displacement requests.",
};

export const dynamic = "force-dynamic";

export default async function JumpsPage() {
  const jumps = await prisma.jumpRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className={styles.viewport}>
      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          ChronoTrips™ Temporal Transit Authority
        </Link>
        <Link href="/" className={styles.navLink}>
          + File New Jump Request
        </Link>
      </nav>

      {/* ── Heading ── */}
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Bureau of Chronological Transit · Official Jump Registry</p>
        <h1>Filed Temporal Displacement Requests</h1>
      </header>

      {/* ── Grid ── */}
      <section className={styles.grid}>
        {jumps.length === 0 && (
          <p className={styles.empty}>
            No displacement requests on file. The timeline awaits its first traveler.
          </p>
        )}

        {jumps.map(function (jump) {
          const isParadox = jump.travelerBirthYear >= jump.destinationYear;
          const date = new Date(jump.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          const primaryName = jump.travelerName || "Unknown Traveler";

          return (
            <Link
              key={jump.id}
              href={`/jumps/${jump.id}`}
              className={styles.card}
            >
              <span className={styles.cardId}>
                #{jump.id.slice(-8).toUpperCase()}
              </span>
              <span className={styles.cardName}>
                {primaryName}
              </span>
              <span className={styles.cardYear}>→ {jump.destinationYear}</span>
              <p className={styles.cardMission}>{jump.mission}</p>
              <div className={styles.cardFooter}>
                {jump.suppressParadoxCheck && (
                  <span className={`${styles.badge} ${styles.badgeParadox}`}>
                    ⚠ CHECK SUPPRESSED
                  </span>
                )}
                <span
                  className={`${styles.badge} ${
                    isParadox ? styles.badgeParadox : styles.badgeSafe
                  }`}
                >
                  {isParadox ? "⚠ PARADOX" : "✓ SAFE"}
                </span>
                <span className={styles.cardDate}>{date}</span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
