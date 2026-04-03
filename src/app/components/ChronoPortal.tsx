"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import styles from "./ChronoPortal.module.css";
import StepOneMission from "./chrono-portal/StepOneMission";
import StepTwoCalibration from "./chrono-portal/StepTwoCalibration";
import StepThreeSuccess from "./chrono-portal/StepThreeSuccess";
import {
  INITIAL_CHRONO_FORM,
  ChronoStep,
  ChronosSchemaType,
} from "./chrono-portal/types";
import { initiateJump } from "../actions/jumpAction";

export default function ChronoPortal() {
  const [currentStep, setCurrentStep] = useState<ChronoStep>(1);
  const [formData, setFormData] =
    useState<ChronosSchemaType>(INITIAL_CHRONO_FORM);
  const [isSubmitting, startSubmitTransition] = useTransition();

  function updateField(
    key: keyof ChronosSchemaType,
    value: string | boolean,
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateCrewMember(
    memberId: string,
    field: "name" | "birthYear",
    value: string,
  ) {
    setFormData((prev) => ({
      ...prev,
      crew: prev.crew.map((m) =>
        m.id === memberId ? { ...m, [field]: value } : m,
      ),
    }));
  }

  function addCrewMember() {
    setFormData((prev) => ({
      ...prev,
      crew: [
        ...prev.crew,
        { id: crypto.randomUUID(), name: "", birthYear: "" },
      ],
    }));
  }

  function removeCrewMember(memberId: string) {
    setFormData((prev) => ({
      ...prev,
      crew: prev.crew.filter((m) => m.id !== memberId),
    }));
  }

  async function handleInitiateJump() {
    startSubmitTransition(async function () {
      await initiateJump({
        crew: formData.crew,
        mission: formData.mission,
        destinationYear: formData.destinationYear,
        plutoniumCores: formData.plutoniumCores,
        suppressParadoxCheck: Boolean(formData.suppressParadoxCheck),
      });
    });
  }

  return (
    <main className={styles.viewport}>
      <section className={styles.card}>
        <div className={styles.cardNav}>
          <p className={styles.eyebrow}>
            ChronoTrips™ · Temporal Transit Authority · Form JT-88
          </p>
          <Link href="/jumps" className={styles.registryLink}>
            Access Jump Registry →
          </Link>
        </div>

        {currentStep === 1 && (
          <StepOneMission
            formData={formData}
            onChange={updateField}
            onCrewChange={updateCrewMember}
            onAddCrewMember={addCrewMember}
            onRemoveCrewMember={removeCrewMember}
            onNext={() => {
              setCurrentStep(2);
            }}
          />
        )}

        {currentStep === 2 && (
          <StepTwoCalibration
            formData={formData}
            isCheckingTimeline={false}
            isSubmitting={isSubmitting}
            onChange={updateField}
            onBack={() => {
              setCurrentStep(1);
            }}
            onSubmit={handleInitiateJump}
          />
        )}

        {currentStep === 3 && <StepThreeSuccess onReset={handleReset} />}
      </section>
    </main>
  );

  function handleReset() {
    setFormData(INITIAL_CHRONO_FORM);
    setCurrentStep(1);
  }
}
