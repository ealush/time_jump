import { PrismaClient } from "../src/app/generated/prisma";

const prisma = new PrismaClient();

const TRAVELERS = [
  "Doc Brown",
  "Marty McFly",
  "Sarah Connor",
  "The Doctor",
  "Bill S. Preston",
  "Ted Theodore Logan",
  "Hiro Nakamura",
  "James T. Kirk",
  "Kang the Conqueror",
  "Cable",
  "Bishop",
  "Booster Gold",
  "Sam Beckett",
  "Al Calavicci",
  "Phil Connors",
  "Old Biff Tannen",
  "H.G. Wells",
  "Rufus",
  "Donnie Darko",
  "Hermione Granger",
  "Barry Allen",
  "Eobard Thawne",
  "Nathan Drake",
  "Loki Laufeyson",
  "Nebula",
  "Cassie Lang",
  "John Connor",
  "Kyle Reese",
  "River Song",
  "Captain Jack Harkness",
];

const MISSIONS: { mission: string; yearRange: [number, number] }[] = [
  { mission: "Steal Caesar's salad recipe before he gets stabbed", yearRange: [-44, -44] },
  { mission: "Teach cavemen to do the Macarena", yearRange: [-999, -900] },
  { mission: "Deliver pizza to the builders of the Colosseum — extra olives", yearRange: [72, 80] },
  { mission: "Convince Leonardo da Vinci that NFTs are a bad idea", yearRange: [1490, 1519] },
  { mission: "Swap Shakespeare's quill with a ballpoint pen and watch chaos unfold", yearRange: [1599, 1603] },
  { mission: "Enter Genghis Khan's horse in a modern dressage competition", yearRange: [1206, 1227] },
  { mission: "Sell sunscreen to the Vikings before they discover Greenland", yearRange: [982, 986] },
  { mission: "Install Wi-Fi at the Library of Alexandria — password: BurnThis123", yearRange: [-300, -48] },
  { mission: "Bring a karaoke machine to Mozart's house party", yearRange: [1785, 1791] },
  { mission: "Teach Cleopatra how to take a proper selfie", yearRange: [-50, -30] },
  { mission: "Replace all of Newton's apples with oranges", yearRange: [1666, 1666] },
  { mission: "Introduce bubble wrap to medieval knights before jousting", yearRange: [1200, 1400] },
  { mission: "Give Galileo a telescope with a Instagram filter", yearRange: [1609, 1610] },
  { mission: "Bring noise-canceling headphones to the guy next to the Krakatoa eruption", yearRange: [1883, 1883] },
  { mission: "Open a Starbucks in ancient Rome — venti toga latte", yearRange: [100, 200] },
  { mission: "Deliver a cease-and-desist letter to whoever invented Mondays", yearRange: [-500, -400] },
  { mission: "Photobomb the signing of the Magna Carta", yearRange: [1215, 1215] },
  { mission: "Bring a GPS to Columbus so he stops getting lost", yearRange: [1492, 1492] },
  { mission: "Set up a food truck at the construction of the Great Wall", yearRange: [-700, -200] },
  { mission: "Introduce the ancient Greeks to dad jokes", yearRange: [-500, -300] },
  { mission: "Swap the Holy Grail with a novelty coffee mug that says 'World's Best Crusader'", yearRange: [1096, 1099] },
  { mission: "Bring sunglasses to everyone witnessing the first solar eclipse on record", yearRange: [-763, -763] },
  { mission: "Teach Napoleon how to play basketball — he needs the confidence", yearRange: [1799, 1815] },
  { mission: "Replace all of Beethoven's sheet music with 'Baby Shark' tabs", yearRange: [1800, 1827] },
  { mission: "Bring a lint roller to the Ice Age", yearRange: [-998, -950] },
  { mission: "Start a Yelp review page for medieval taverns", yearRange: [1300, 1400] },
  { mission: "Give Archimedes a rubber duck for his bathtub eureka moment", yearRange: [-250, -250] },
  { mission: "Deliver energy drinks to the builders of Stonehenge", yearRange: [-900, -800] },
  { mission: "Bring a selfie stick to the Battle of Hastings", yearRange: [1066, 1066] },
  { mission: "Install a revolving door at the gates of Troy", yearRange: [-800, -750] },
  { mission: "Open a escape room inside the actual Labyrinth of Crete", yearRange: [-600, -500] },
  { mission: "Bring autocorrect to medieval monks copying manuscripts", yearRange: [800, 1000] },
  { mission: "Set up a DJ booth at the fall of Constantinople", yearRange: [1453, 1453] },
  { mission: "Deliver air freshener to a Viking longship — urgent priority", yearRange: [900, 1000] },
  { mission: "Teach Marco Polo to say 'Marco Polo' in a swimming pool", yearRange: [1271, 1295] },
  { mission: "Bring a breathalyzer to the first Oktoberfest", yearRange: [1810, 1810] },
  { mission: "Install speed bumps on the Silk Road", yearRange: [200, 400] },
  { mission: "Give Michelangelo a paint roller so he can finish the ceiling faster", yearRange: [1508, 1512] },
  { mission: "Bring a fire extinguisher to the Great Fire of London — show up fashionably late", yearRange: [1666, 1666] },
  { mission: "Introduce rock-paper-scissors to settle the Hundred Years War", yearRange: [1337, 1453] },
  { mission: "Bring a printer to Gutenberg and watch his head explode", yearRange: [1440, 1450] },
  { mission: "Deliver a participation trophy to every losing gladiator", yearRange: [-100, 100] },
  { mission: "Teach the Aztecs how to make chocolate chip cookies", yearRange: [1400, 1500] },
  { mission: "Install a suggestion box at the court of Henry VIII", yearRange: [1509, 1547] },
  { mission: "Bring sunscreen SPF 9000 to the people of Pompeii — too little too late", yearRange: [79, 79] },
  { mission: "Start a book club with the monks of Lindisfarne — first pick: 'How to Survive Vikings'", yearRange: [793, 793] },
  { mission: "Deliver a 'You Are Here' map to the Bermuda Triangle in 1492", yearRange: [1492, 1492] },
  { mission: "Open a therapist's office next to the Oracle at Delphi", yearRange: [-600, -400] },
  { mission: "Bring spell-check to the Dead Sea Scrolls editorial team", yearRange: [-200, -100] },
  { mission: "Set up a lost-and-found booth at the sacking of Rome", yearRange: [410, 410] },
  { mission: "Convince Magellan to just use Google Maps", yearRange: [1519, 1522] },
  { mission: "Deliver fidget spinners to bored castle guards during the Middle Ages", yearRange: [1100, 1300] },
  { mission: "Bring a Roomba to sweep the Augean Stables", yearRange: [-800, -700] },
  { mission: "Teach Joan of Arc how to beatbox", yearRange: [1429, 1431] },
  { mission: "Install a complaint hotline at the Tower of Babel", yearRange: [-600, -500] },
  { mission: "Bring protein shakes to the Spartan 300", yearRange: [-480, -480] },
  { mission: "Deliver a resume template to Leonardo da Vinci — his was 15 pages", yearRange: [1482, 1482] },
  { mission: "Open a pet grooming salon for Egyptian cats in the pharaoh's court", yearRange: [-500, -200] },
  { mission: "Bring an umbrella to Noah — just in case his boat plan doesn't work out", yearRange: [-900, -800] },
  { mission: "Install a turnstile at the Colosseum — they're losing revenue", yearRange: [80, 200] },
  { mission: "Deliver a 'Live Laugh Love' sign to Attila the Hun's tent", yearRange: [434, 453] },
  { mission: "Bring noise complaints to the guy who invented bagpipes", yearRange: [1400, 1500] },
  { mission: "Set up a customer satisfaction survey after the Black Plague", yearRange: [1350, 1353] },
  { mission: "Give Marie Antoinette a bread-making class instead of cake advice", yearRange: [1789, 1789] },
  { mission: "Install a drive-through window at a medieval castle", yearRange: [1250, 1350] },
  { mission: "Bring a stress ball to whoever is building the Leaning Tower of Pisa", yearRange: [1173, 1372] },
  { mission: "Teach Pythagoras that his theorem will haunt students for millennia", yearRange: [-570, -495] },
  { mission: "Start a fantasy football league in actual medieval times", yearRange: [1100, 1200] },
  { mission: "Bring a label maker to the first museum curator in history", yearRange: [-280, -280] },
  { mission: "Give Alexander the Great a world map and say 'you missed a spot'", yearRange: [-336, -323] },
  { mission: "Deliver a Fitbit to a Roman chariot racer — 10,000 steps or bust", yearRange: [100, 300] },
  { mission: "Install air conditioning in the Sahara circa 500 CE", yearRange: [500, 500] },
  { mission: "Bring a laser pointer to confuse medieval cats at a witch trial", yearRange: [1450, 1600] },
  { mission: "Set up a 1-star TripAdvisor review for the Titanic", yearRange: [1912, 1912] },
  { mission: "Give the Wright Brothers a paper airplane and walk away", yearRange: [1903, 1903] },
  { mission: "Deliver a 'Mission Accomplished' banner to the year 2000 Y2K bunker", yearRange: [2000, 2000] },
  { mission: "Bring earplugs to the neighbors of the first ever garage band in 2500", yearRange: [2500, 2500] },
  { mission: "Install a vending machine at the future Mars colony cafeteria", yearRange: [2150, 2200] },
  { mission: "Open a couples counseling center for Romeo and Juliet's families", yearRange: [1300, 1400] },
  { mission: "Teach Benjamin Franklin that flying a kite in a storm is a OSHA violation", yearRange: [1752, 1752] },
  { mission: "Bring a leaf blower to the Garden of Eden — wait, wrong timeline", yearRange: [-999, -990] },
  { mission: "Set up a tip jar for whoever carved Mount Rushmore", yearRange: [1927, 1941] },
  { mission: "Deliver a 'no spoilers' sign to the Oracle at Delphi", yearRange: [-500, -400] },
  { mission: "Give Copernicus a spinning office chair — he'll appreciate the irony", yearRange: [1510, 1543] },
  { mission: "Bring a megaphone to Paul Revere — 'the British are coming' needs more bass", yearRange: [1775, 1775] },
  { mission: "Install a complaints department at the Roman Senate — they'll need it in March", yearRange: [-44, -44] },
  { mission: "Start a GoFundMe for the Lighthouse of Alexandria repairs", yearRange: [956, 1323] },
  { mission: "Bring a snow machine to the first Winter Olympics in ancient Greece — wait, wrong season", yearRange: [-776, -776] },
  { mission: "Teach future robots in 2800 to appreciate memes from the 2020s", yearRange: [2800, 2800] },
  { mission: "Deliver a 'Hang in There' cat poster to anyone alive during the Dark Ages", yearRange: [500, 800] },
  { mission: "Bring a PowerPoint projector to Martin Luther for his 95 Theses presentation", yearRange: [1517, 1517] },
  { mission: "Set up a food court at the future Lunar Base Alpha commissary", yearRange: [2350, 2400] },
  { mission: "Deliver a 'Works on My Machine' mug to the first computer programmer in 2950", yearRange: [2950, 2999] },
  { mission: "Bring an air horn to the future intergalactic chess championship", yearRange: [2700, 2750] },
  { mission: "Install a 'You Must Be This Tall to Ride' sign at the Trojan Horse", yearRange: [-800, -750] },
  { mission: "Open a daycare center next to the Spartan agoge — very different vibes", yearRange: [-700, -600] },
  { mission: "Deliver a motivational poster to the crew building the Panama Canal", yearRange: [1904, 1914] },
  { mission: "Bring IKEA assembly instructions to the builders of the Parthenon", yearRange: [-447, -432] },
  { mission: "Teach vikings to use indoor voices during raids", yearRange: [800, 900] },
  { mission: "Set up a toll booth on the Bridge of Sighs in Venice", yearRange: [1600, 1600] },
  { mission: "Give Nostradamus a magic 8-ball and see if he notices the downgrade", yearRange: [1555, 1566] },
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clampYear(year: number): number {
  return Math.max(-1000, Math.min(3000, year));
}

function randomDate(daysBack: number): Date {
  const now = Date.now();
  const offset = Math.random() * daysBack * 24 * 60 * 60 * 1000;
  return new Date(now - offset);
}

async function main() {
  console.log("Seeding 100 time jumps...\n");

  const jumps = MISSIONS.map(function (missionEntry) {
    const traveler = pick(TRAVELERS);
    const [lo, hi] = missionEntry.yearRange;
    const clampedLo = clampYear(lo);
    const clampedHi = clampYear(hi);
    const destinationYear =
      clampedLo === clampedHi ? clampedLo : randomInt(clampedLo, clampedHi);
    const birthYear = randomInt(1940, 2010);
    const plutoniumCores = randomInt(1, 12);
    const suppressParadoxCheck = Math.random() < 0.2;

    return {
      travelerName: traveler,
      mission: missionEntry.mission,
      birthYear,
      destinationYear,
      plutoniumCores,
      suppressParadoxCheck,
      createdAt: randomDate(90),
    };
  });

  for (const jump of jumps) {
    await prisma.jumpRequest.create({ data: jump });
  }

  console.log(`Done — inserted ${jumps.length} jump requests.`);
}

main()
  .catch(function (e) {
    console.error(e);
    process.exit(1);
  })
  .finally(function () {
    return prisma.$disconnect();
  });
