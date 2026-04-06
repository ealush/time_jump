"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import styles from "./ChronoPortal.module.css";
import StepOneMission from "./chrono-portal/StepOneMission";
import StepTwoCalibration from "./chrono-portal/StepTwoCalibration";
import StepThreeSuccess from "./chrono-portal/StepThreeSuccess";
import { ChronosSchemaType, ChronoStep } from "./chrono-portal/types";
import { initiateJump } from "../actions/jumpAction";
import { INITIAL_CHRONO_FORM } from "./chrono-portal/types";

export default function ChronoPortal() {
  const [currentStep, setCurrentStep] = useState<ChronoStep>(1);
  const [formData, setFormData] =
    useState<ChronosSchemaType>(INITIAL_CHRONO_FORM);
  const [isSubmitting, startSubmitTransition] = useTransition();

  function updateField(key: keyof ChronosSchemaType, value: string | boolean) {
    const nextFormData = {
      ...formData,
      [key]: value,
    };

    setFormData(nextFormData);
  }

  async function handleInitiateJump() {
    startSubmitTransition(async function () {
      await initiateJump({
        travelerName: formData.travelerName,
        travelerBirthYear: formData.travelerBirthYear,
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
    setFormData({} as ChronosSchemaType);
    setCurrentStep(1);
  }
}
