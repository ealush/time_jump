export type ChronoStep = 1 | 2 | 3;

export type ChronosSchemaType = {
  travelerName: string;
  travelerBirthYear: string;
  mission: string;
  destinationYear: string;
  plutoniumCores: string;
  suppressParadoxCheck: boolean;
};

export const INITIAL_CHRONO_FORM: ChronosSchemaType = {
  travelerName: "",
  travelerBirthYear: "",
  mission: "",
  destinationYear: "",
  plutoniumCores: "",
  suppressParadoxCheck: false,
};
