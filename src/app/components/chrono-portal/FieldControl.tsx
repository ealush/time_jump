import styles from "../ChronoPortal.module.css";
import { ReactNode } from "react";
import { ChronosSchemaType } from "./types";

type FieldControlProps = {
  label: ReactNode;
  input: ReactNode;
  name: keyof ChronosSchemaType;
};

export default function FieldControl({
  label,
  input,
  name,
}: FieldControlProps) {
  return (
    <>
      <label className={styles.fieldLabel}>
        {label}
        <span className={styles.inputWrapper}>{input}</span>
      </label>
      <p className={styles.fieldMessage}></p>
    </>
  );
}
