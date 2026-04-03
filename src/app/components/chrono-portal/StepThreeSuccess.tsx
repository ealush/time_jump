import Link from "next/link";
import styles from "../ChronoPortal.module.css";

type StepThreeSuccessProps = {
  onReset: () => void;
};

export default function StepThreeSuccess({ onReset }: StepThreeSuccessProps) {
  return (
    <>
      <h1>Displacement Complete. See You Yesterday.</h1>
      <p className={styles.successCopy}>
        Your temporal transit itinerary has been stamped, sealed, and filed with
        the Bureau of Chronological Transit. Godspeed through the timestream, traveler.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.secondaryBtn} onClick={onReset}>
          File Another Jump Request
        </button>
        <Link href="/jumps" className={styles.primaryBtn}>
          Access Jump Registry →
        </Link>
      </div>
    </>
  );
}
