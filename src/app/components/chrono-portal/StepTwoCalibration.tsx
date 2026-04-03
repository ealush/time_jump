import { useMemo } from "react";
import { ChronosSchemaType } from "./types";
import { calculateQuantumFlux } from "@/app/utils";
import styles from "../ChronoPortal.module.css";
import FieldControl from "./FieldControl";

type StepTwoCalibrationProps = {
  formData: ChronosSchemaType;
  isCheckingTimeline: boolean;
  isSubmitting: boolean;
  onChange: (key: keyof ChronosSchemaType, value: string | boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export default function StepTwoCalibration({
  formData,
  isCheckingTimeline,
  isSubmitting,
  onChange,
  onBack,
  onSubmit,
}: StepTwoCalibrationProps) {
  const flux = useMemo(
    function () {
      const year = Number(formData.destinationYear);
      if (!Number.isFinite(year) || formData.destinationYear === "") {
        return 0;
      }
      return calculateQuantumFlux(year);
    },
    [formData.destinationYear],
  );

  return (
    <>
      <h1>Phase 2: Spacetime Coordinates & Flux Calibration</h1>

      <FieldControl
        label="Destination Year (Target Epoch)"
        input={
          <input
            type="number"
            value={formData.destinationYear}
            placeholder="YYYY"
            onChange={function (event) {
              onChange("destinationYear", event.target.value);
            }}
          />
        }
        name="destinationYear"
      />

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={!!formData.suppressParadoxCheck}
          onChange={function (event) {
            onChange("suppressParadoxCheck", event.target.checked);
          }}
        />
        Bypass Paradox Safety Interlock (Form W-9T Required)
      </label>

      <FieldControl
        label="Plutonium Core Allocation (Gigawatts)"
        input={
          <input
            type="number"
            value={formData.plutoniumCores}
            placeholder="0"
            onChange={function (event) {
              onChange("plutoniumCores", event.target.value);
            }}
          />
        }
        name="plutoniumCores"
      />

      <p className={styles.fluxText}>
        Projected Quantum Flux Load: {flux} GW —{" "}
        {flux > 1.21
          ? "CAUTION: exceeds standard threshold"
          : "within nominal parameters"}
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.secondaryBtn} onClick={onBack}>
          ← Abort & Return
        </button>
        <button
          type="button"
          className={styles.primaryBtn}
          disabled={isCheckingTimeline || isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? (
            <span className={styles.pendingIndicator}>
              <span className={styles.spinnerRing} />
              <span className={styles.pendingLabel}>
                Engaging flux capacitor...
              </span>
            </span>
          ) : (
            "INITIATE TEMPORAL DISPLACEMENT"
          )}
        </button>
      </div>
    </>
  );
}
