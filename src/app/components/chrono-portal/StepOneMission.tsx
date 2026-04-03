"use client";

import { useState } from "react";
import { ChronosSchemaType } from "./types";
import styles from "../ChronoPortal.module.css";
import FieldControl from "./FieldControl";

type StepOneMissionProps = {
  formData: ChronosSchemaType;
  onChange: (key: keyof ChronosSchemaType, value: string | boolean) => void;
  onCrewChange: (
    memberId: string,
    field: "name" | "birthYear",
    value: string,
  ) => void;
  onAddCrewMember: () => void;
  onRemoveCrewMember: (memberId: string) => void;
  onNext: () => void;
};

export default function StepOneMission({
  formData,
  onChange,
  onCrewChange,
  onAddCrewMember,
  onRemoveCrewMember,
  onNext,
}: StepOneMissionProps) {
  const [showCrewModal, setShowCrewModal] = useState(false);
  const primaryMember = formData.crew[0];
  const additionalCount = formData.crew.length - 1;

  return (
    <>
      <h1>Phase 1: Crew Manifest & Mission Briefing</h1>

      <FieldControl
        label="Primary Traveler Designation (Legal Name)"
        input={
          <input
            type="text"
            value={primaryMember?.name ?? ""}
            placeholder="e.g., Dr. Emmett L. Brown"
            onChange={function (event) {
              if (primaryMember) {
                onCrewChange(primaryMember.id, "name", event.target.value);
              }
            }}
          />
        }
        name={`crew_name_${primaryMember?.id}`}
      />

      <FieldControl
        label="Origin Year (Year of Birth)"
        input={
          <input
            type="number"
            value={primaryMember?.birthYear ?? ""}
            placeholder="e.g., 1920"
            onChange={function (event) {
              if (primaryMember) {
                onCrewChange(
                  primaryMember.id,
                  "birthYear",
                  event.target.value,
                );
              }
            }}
          />
        }
        name={`crew_birthYear_${primaryMember?.id}`}
      />

      <button
        type="button"
        className={styles.crewTrigger}
        onClick={function () {
          setShowCrewModal(true);
        }}
      >
        {additionalCount} additional crew member
        {additionalCount !== 1 ? "s" : ""}
      </button>

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

      {showCrewModal && (
        <div
          className={styles.modalOverlay}
          onClick={function () {
            setShowCrewModal(false);
          }}
        >
          <div
            className={styles.modalContent}
            onClick={function (e) {
              e.stopPropagation();
            }}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.sectionTitle}>Additional Crew Members</h2>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={function () {
                  setShowCrewModal(false);
                }}
              >
                Close
              </button>
            </div>

            {formData.crew.slice(1).map(function (member, index) {
              return (
                <div key={member.id} className={styles.crewMember}>
                  <div className={styles.crewMemberHeader}>
                    <span className={styles.crewMemberLabel}>
                      Crew Member {index + 2}
                    </span>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={function () {
                        onRemoveCrewMember(member.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  <FieldControl
                    label="Designation (Legal Name)"
                    input={
                      <input
                        type="text"
                        value={member.name}
                        placeholder="e.g., Marty McFly"
                        onChange={function (event) {
                          onCrewChange(member.id, "name", event.target.value);
                        }}
                      />
                    }
                    name={`crew_name_${member.id}`}
                  />

                  <FieldControl
                    label="Origin Year (Year of Birth)"
                    input={
                      <input
                        type="number"
                        value={member.birthYear}
                        placeholder="e.g., 1968"
                        onChange={function (event) {
                          onCrewChange(
                            member.id,
                            "birthYear",
                            event.target.value,
                          );
                        }}
                      />
                    }
                    name={`crew_birthYear_${member.id}`}
                  />
                </div>
              );
            })}

            {formData.crew.length === 1 && (
              <p className={styles.emptyCrewNote}>
                No additional crew members. Add one below.
              </p>
            )}

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={onAddCrewMember}
            >
              + Add Crew Member
            </button>
          </div>
        </div>
      )}
    </>
  );
}
