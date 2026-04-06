import { PrismaClient } from "../src/app/generated/prisma/index.js";

const prisma = new PrismaClient();

const historicalJumps = [
  {
    mission: "Observe the construction of the Great Pyramid of Giza.",
    destinationYear: -2560,
    plutoniumCores: 5,
    suppressParadoxCheck: false,
    travelerName: "Dr. Aris Thorne",
    travelerBirthYear: 1985,
  },
  {
    mission: "Attend the premiere of Beethoven's 9th Symphony.",
    destinationYear: 1824,
    plutoniumCores: 2,
    suppressParadoxCheck: false,
    travelerName: "Clara Schumann (Enthusiast)",
    travelerBirthYear: 1992,
  },
  {
    mission: "Document the signing of the Magna Carta.",
    destinationYear: 1215,
    plutoniumCores: 3,
    suppressParadoxCheck: true,
    travelerName: "Sir Alistair Cook",
    travelerBirthYear: 1970,
  },
  {
    mission: "Verify the existence of the Library of Alexandria at its peak.",
    destinationYear: -250,
    plutoniumCores: 8,
    suppressParadoxCheck: false,
    travelerName: "Elena Rodriguez",
    travelerBirthYear: 2001,
  },
  {
    mission: "Witness the first flight at Kitty Hawk.",
    destinationYear: 1903,
    plutoniumCores: 1,
    suppressParadoxCheck: false,
    travelerName: "Orville Wright Jr.",
    travelerBirthYear: 1955,
  },
  {
    mission: "Sample the vegetation from the Cretaceous Period.",
    destinationYear: -66000000,
    plutoniumCores: 12,
    suppressParadoxCheck: true,
    travelerName: "Botanist Bloom",
    travelerBirthYear: 2012,
  },
  {
    mission: "Attend the 1969 Woodstock Festival.",
    destinationYear: 1969,
    plutoniumCores: 1,
    suppressParadoxCheck: false,
    travelerName: "Summer Moonflower",
    travelerBirthYear: 1948,
  },
  {
    mission: "Observe the fall of the Berlin Wall.",
    destinationYear: 1989,
    plutoniumCores: 1,
    suppressParadoxCheck: false,
    travelerName: "Marcus Frei",
    travelerBirthYear: 1965,
  },
  {
    mission: "Consult with Leonardo da Vinci on helicopter designs.",
    destinationYear: 1505,
    plutoniumCores: 4,
    suppressParadoxCheck: true,
    travelerName: "Eng. Leo Volt",
    travelerBirthYear: 1990,
  },
  {
    mission: "Watch the landing of Apollo 11 from the lunar surface.",
    destinationYear: 1969,
    plutoniumCores: 10,
    suppressParadoxCheck: true,
    travelerName: "Neil Armstrong (Ghost)",
    travelerBirthYear: 2050,
  },
  {
    mission: "Investigate the origins of Stonehenge.",
    destinationYear: -3000,
    plutoniumCores: 6,
    suppressParadoxCheck: false,
    travelerName: "Morgana Le Fay",
    travelerBirthYear: 1982,
  },
  {
    mission: "Prevent the burning of the Library of Alexandria (Attempt 1).",
    destinationYear: 48,
    plutoniumCores: 7,
    suppressParadoxCheck: true,
    travelerName: "Guardian Alpha",
    travelerBirthYear: 2025,
  },
  {
    mission: "Participate in the first Olympic Games.",
    destinationYear: -776,
    plutoniumCores: 4,
    suppressParadoxCheck: false,
    travelerName: "Milo of Croton Jr.",
    travelerBirthYear: 1995,
  },
  {
    mission: "Capture high-res photos of a live T-Rex.",
    destinationYear: -67000000,
    plutoniumCores: 15,
    suppressParadoxCheck: true,
    travelerName: "National Geo-Temporal",
    travelerBirthYear: 2030,
  },
  {
    mission: "Taste the original recipe of Coca-Cola.",
    destinationYear: 1886,
    plutoniumCores: 1,
    suppressParadoxCheck: false,
    travelerName: "Foodie Frank",
    travelerBirthYear: 1988,
  },
  {
    mission: "Listen to the Sermon on the Mount.",
    destinationYear: 30,
    plutoniumCores: 5,
    suppressParadoxCheck: false,
    travelerName: "Faith Walker",
    travelerBirthYear: 1960,
  },
  {
    mission: "Study the Mayan astronomy firsthand.",
    destinationYear: 800,
    plutoniumCores: 3,
    suppressParadoxCheck: false,
    travelerName: "Dr. Ixchel Sun",
    travelerBirthYear: 1978,
  },
  {
    mission: "Visit the 1893 World's Columbian Exposition.",
    destinationYear: 1893,
    plutoniumCores: 2,
    suppressParadoxCheck: false,
    travelerName: "Nikola Tesla Fan",
    travelerBirthYear: 1994,
  },
  {
    mission: "Recover a sample of the extinct Dodo bird.",
    destinationYear: 1650,
    plutoniumCores: 4,
    suppressParadoxCheck: true,
    travelerName: "Conservationist Cass",
    travelerBirthYear: 2005,
  },
  {
    mission: "Witness the coronation of Charlemagne.",
    destinationYear: 800,
    plutoniumCores: 3,
    suppressParadoxCheck: false,
    travelerName: "History Buff Bob",
    travelerBirthYear: 1950,
  },
];

async function main() {
  console.log("Starting seed...");
  for (const jump of historicalJumps) {
    await prisma.jumpRequest.create({
      data: jump,
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
