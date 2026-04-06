"use client";

import styles from "../ChronoPortal.module.css";
import FieldControl from "./FieldControl";
import { ChronosSchemaType } from "./types";

type StepOneMissionProps = {
  formData: ChronosSchemaType;
  onChange: (key: keyof ChronosSchemaType, value: string | boolean) => void;
  onNext: () => void;
};

export default function StepOneMission({
  formData,
  onChange,
  onNext,
}: StepOneMissionProps) {
  return (
    <>
      <h1>Phase 1: Traveler Registration & Mission Briefing</h1>

      <FieldControl
        label="Primary Traveler Designation (Legal Name)"
        input={
          <input
            type="text"
            value={formData.travelerName}
            placeholder="e.g., Dr. Emmett L. Brown"
            onChange={function (event) {
              onChange("travelerName", event.target.value);
            }}
          />
        }
        name="travelerName"
      />

      <FieldControl
        label="Origin Year (Year of Birth)"
        input={
          <input
            type="number"
            value={formData.travelerBirthYear}
            placeholder="e.g., 1920"
            onChange={function (event) {
              onChange("travelerBirthYear", event.target.value);
            }}
          />
        }
        name="travelerBirthYear"
      />

      <FieldControl
        label="Mission Objective (State Your Temporal Business)"
        input={
          <textarea
            rows={3}
            value={formData.mission}
            placeholder="Describe why you need to breach the timeline..."
            onChange={function (event) {
              onChange("mission", event.target.value);
            }}
          />
        }
        name="mission"
      />

      <button
        type="button"
        className={styles.primaryBtn}
        onClick={onNext}
        disabled={false}
      >
        Proceed to Calibration →
      </button>
    </>
  );
}
