export type ChronoStep = 1 | 2 | 3;

export type CrewMember = {
  id: string;
  name: string;
  birthYear: string;
};

export type ChronosSchemaType = {
  crew: CrewMember[];
  mission: string;
  destinationYear: string;
  plutoniumCores: string;
  suppressParadoxCheck: boolean;
};

export const INITIAL_CHRONO_FORM: ChronosSchemaType = {
  crew: [{ id: "crew-1", name: "", birthYear: "" }],
  mission: "",
  destinationYear: "",
  plutoniumCores: "",
  suppressParadoxCheck: false,
};
