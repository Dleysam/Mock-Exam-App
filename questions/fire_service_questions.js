// inside questions/fire_service_questions.js
const FIRE_SERVICE_QUESTIONS = [
  {
    "id": 1,
    "question": "Choose the correct spelling:",
    "options": {
      "A": "Accomodation",
      "B": "Accommodation",
      "C": "Acommodation",
      "D": "Acommoddation"
    },
    "answer": "B"
  },
  {
    "id": 2,
    "question": "Opposite of “Generous”:",
    "options": {
      "A": "Kind",
      "B": "Stingy",
      "C": "Friendly",
      "D": "Honest"
    },
    "answer": "B"
  },
  {
    "id": 3,
    "question": "Synonym of “Brave”:",
    "options": {
      "A": "Cowardly",
      "B": "Courageous",
      "C": "Weak",
      "D": "Fearful"
    },
    "answer": "B"
  },
  {
    "id": 4,
    "question": "Choose the correct sentence:",
    "options": {
      "A": "He go to the station.",
      "B": "He went to the station.",
      "C": "He going to the station.",
      "D": "He gone to the station."
    },
    "answer": "B"
  },
  {
    "id": 5,
    "question": "Fill in the blank: She ______ going to the market.",
    "options": {
      "A": "am",
      "B": "is",
      "C": "are",
      "D": "be"
    },
    "answer": "B"
  },
  {
    "id": 6,
    "question": "The man ______ car was stolen is my uncle.",
    "options": {
      "A": "which",
      "B": "whose",
      "C": "whom",
      "D": "who"
    },
    "answer": "B"
  },
  {
    "id": 7,
    "question": "Antonym of “Start”:",
    "options": {
      "A": "Stop",
      "B": "Begin",
      "C": "Commence",
      "D": "Move"
    },
    "answer": "A"
  },
  {
    "id": 8,
    "question": "Which is a correct plural form?",
    "options": {
      "A": "Childs",
      "B": "Childes",
      "C": "Children",
      "D": "Childrens"
    },
    "answer": "C"
  },
  {
    "id": 9,
    "question": "Choose the correct punctuation: “Where are you going”",
    "options": {
      "A": ".",
      "B": "!",
      "C": "?",
      "D": ","
    },
    "answer": "C"
  },
  {
    "id": 10,
    "question": "Synonym of “Quick”:",
    "options": {
      "A": "Slow",
      "B": "Fast",
      "C": "Steady",
      "D": "Lazy"
    },
    "answer": "B"
  },
  {
    "id": 11,
    "question": "Which word is a verb?",
    "options": {
      "A": "Run",
      "B": "Book",
      "C": "Table",
      "D": "Chair"
    },
    "answer": "A"
  },
  {
    "id": 12,
    "question": "“She sings beautifully” — the underlined word is an:",
    "options": {
      "A": "Adjective",
      "B": "Adverb",
      "C": "Noun",
      "D": "Verb"
    },
    "answer": "B"
  },
  {
    "id": 13,
    "question": "Which sentence is in the future tense?",
    "options": {
      "A": "I eat rice.",
      "B": "I am eating rice.",
      "C": "I will eat rice.",
      "D": "I ate rice."
    },
    "answer": "C"
  },
  {
    "id": 14,
    "question": "Choose the correct comparative form:",
    "options": {
      "A": "More good",
      "B": "Better",
      "C": "Best",
      "D": "Gooder"
    },
    "answer": "B"
  },
  {
    "id": 15,
    "question": "Probability of rolling an odd number on a fair die is:",
    "options": {
      "A": "1/6",
      "B": "1/3",
      "C": "1/2",
      "D": "2/3"
    },
    "answer": "C"
  },
  {
    "id": 16,
    "question": "If 3x = 18, find x.",
    "options": {
      "A": "3",
      "B": "6",
      "C": "9",
      "D": "12"
    },
    "answer": "B"
  },
  {
    "id": 17,
    "question": "Find the simple interest on ₦50,000 at 10% per annum for 2 years.",
    "options": {
      "A": "₦5,000",
      "B": "₦10,000",
      "C": "₦12,000",
      "D": "₦8,000"
    },
    "answer": "B"
  },
  {
    "id": 18,
    "question": "The square root of 144 is:",
    "options": {
      "A": "10",
      "B": "12",
      "C": "14",
      "D": "16"
    },
    "answer": "B"
  },
  {
    "id": 19,
    "question": "What is 25% of 640?",
    "options": {
      "A": "120",
      "B": "150",
      "C": "160",
      "D": "170"
    },
    "answer": "C"
  },
  {
    "id": 20,
    "question": "The ratio 2:5 is equivalent to:",
    "options": {
      "A": "4:15",
      "B": "6:15",
      "C": "5:12",
      "D": "10:20"
    },
    "answer": "B"
  },
  {
    "id": 21,
    "question": "Convert 0.75 to a fraction.",
    "options": {
      "A": "3/4",
      "B": "1/4",
      "C": "2/3",
      "D": "4/5"
    },
    "answer": "A"
  },
  {
    "id": 22,
    "question": "What is 15²?",
    "options": {
      "A": "215",
      "B": "225",
      "C": "250",
      "D": "300"
    },
    "answer": "B"
  },
  {
    "id": 23,
    "question": "If a fire truck travels 150 km in 3 hours, its average speed is:",
    "options": {
      "A": "45 km/h",
      "B": "50 km/h",
      "C": "60 km/h",
      "D": "75 km/h"
    },
    "answer": "B"
  },
  {
    "id": 24,
    "question": "A shop sells a hose for ₦20,000 at a profit of ₦5,000. The cost price is:",
    "options": {
      "A": "₦25,000",
      "B": "₦15,000",
      "C": "₦20,000",
      "D": "₦5,000"
    },
    "answer": "B"
  },
  {
    "id": 25,
    "question": "What is 2/5 of 250?",
    "options": {
      "A": "50",
      "B": "75",
      "C": "100",
      "D": "125"
    },
    "answer": "C"
  },
  {
    "id": 26,
    "question": "The Federal Fire Service operates under which ministry?",
    "options": {
      "A": "Health",
      "B": "Defence",
      "C": "Interior",
      "D": "Education"
    },
    "answer": "C"
  },
  {
    "id": 27,
    "question": "The Federal Fire Service was established in:",
    "options": {
      "A": "1945",
      "B": "1958",
      "C": "1963",
      "D": "1977"
    },
    "answer": "B"
  },
  {
    "id": 28,
    "question": "Highest rank in the FFS?",
    "options": {
      "A": "Assistant Fire Officer",
      "B": "Chief Fire Officer",
      "C": "Controller General",
      "D": "Deputy Controller"
    },
    "answer": "C"
  },
  {
    "id": 29,
    "question": "The FFS originated from:",
    "options": {
      "A": "Lagos Police Fire Brigade",
      "B": "Federal Housing Authority",
      "C": "Nigeria Police Force",
      "D": "Calabar Fire Squad"
    },
    "answer": "A"
  },
  {
    "id": 30,
    "question": "PPE stands for:",
    "options": {
      "A": "Public Protection Equipment",
      "B": "Personal Protective Equipment",
      "C": "Professional Protective Environment",
      "D": "People Protection Enforcement"
    },
    "answer": "B"
  },
  {
    "id": 31,
    "question": "The fire triangle consists of:",
    "options": {
      "A": "Oxygen, water, fuel",
      "B": "Heat, oxygen, fuel",
      "C": "Heat, carbon dioxide, fuel",
      "D": "Heat and oxygen only"
    },
    "answer": "B"
  },
  {
    "id": 32,
    "question": "Which is NOT in the fire triangle?",
    "options": {
      "A": "Oxygen",
      "B": "Heat",
      "C": "Fuel",
      "D": "Carbon dioxide"
    },
    "answer": "D"
  },
  {
    "id": 33,
    "question": "Red on fire service symbols indicates:",
    "options": {
      "A": "Safety",
      "B": "Emergency",
      "C": "Water",
      "D": "Danger/fire"
    },
    "answer": "D"
  },
  {
    "id": 34,
    "question": "Function of a smoke detector:",
    "options": {
      "A": "Extinguish fire",
      "B": "Locate people",
      "C": "Detect smoke and raise alarm",
      "D": "Ventilate building"
    },
    "answer": "C"
  },
  {
    "id": 35,
    "question": "Head of the Federal Fire Service is called:",
    "options": {
      "A": "Inspector General",
      "B": "Commandant",
      "C": "Controller General",
      "D": "Marshal"
    },
    "answer": "C"
  },
  {
    "id": 36,
    "question": "Which year was the FFS moved to the Ministry of Interior?",
    "options": {
      "A": "1992",
      "B": "1984",
      "C": "2000",
      "D": "2015"
    },
    "answer": "A"
  },
  {
    "id": 37,
    "question": "FFS motto is:",
    "options": {
      "A": "Safety First",
      "B": "Service Above Self",
      "C": "Fire Prevention Always",
      "D": "Your Safety, Our Concern"
    },
    "answer": "A"
  },
  {
    "id": 38,
    "question": "Nigeria’s emergency number for fire is:",
    "options": {
      "A": "122",
      "B": "112",
      "C": "911",
      "D": "199"
    },
    "answer": "B"
  },
  {
    "id": 39,
    "question": "The Nigerian Coat of Arms features which colors?",
    "options": {
      "A": "Red, white, blue",
      "B": "Black, green, white",
      "C": "Yellow, red, green",
      "D": "Green, blue, white"
    },
    "answer": "B"
  },
  {
    "id": 40,
    "question": "Who is the current Minister of Interior (2025)?",
    "options": {
      "A": "Rauf Aregbesola",
      "B": "Olubunmi Tunji-Ojo",
      "C": "Abba Moro",
      "D": "Danbazzau"
    },
    "answer": "B"
  },
  {
    "id": 41,
    "question": "The FFS collaborates with which emergency agency in disasters?",
    "options": {
      "A": "NEMA",
      "B": "NDLEA",
      "C": "FRSC",
      "D": "NSCDC"
    },
    "answer": "A"
  },
  {
    "id": 42,
    "question": "What type of agency is FFS?",
    "options": {
      "A": "Paramilitary",
      "B": "Civilian",
      "C": "Military",
      "D": "Private"
    },
    "answer": "A"
  },
  {
    "id": 43,
    "question": "Which rank comes after Assistant Controller?",
    "options": {
      "A": "Deputy Controller",
      "B": "Senior Superintendent",
      "C": "Chief Fire Officer",
      "D": "Inspector"
    },
    "answer": "A"
  },
  {
    "id": 44,
    "question": "FFS headquarters is located in:",
    "options": {
      "A": "Lagos",
      "B": "Abuja",
      "C": "Port Harcourt",
      "D": "Kano"
    },
    "answer": "B"
  },
  {
    "id": 45,
    "question": "Freely burning wood fires are best extinguished with:",
    "options": {
      "A": "Water",
      "B": "Foam",
      "C": "CO₂",
      "D": "Dry powder"
    },
    "answer": "A"
  },
  {
    "id": 46,
    "question": "Water is most effective for which fire class?",
    "options": {
      "A": "Class A",
      "B": "Class B",
      "C": "Class C",
      "D": "Class D"
    },
    "answer": "A"
  },
  {
    "id": 47,
    "question": "Which is NOT a recognized fire class?",
    "options": {
      "A": "A",
      "B": "B",
      "C": "E",
      "D": "D"
    },
    "answer": "C"
  },
  {
    "id": 48,
    "question": "Best extinguisher for electrical fires:",
    "options": {
      "A": "Water",
      "B": "Foam",
      "C": "CO₂",
      "D": "Wet chemical"
    },
    "answer": "C"
  },
  {
    "id": 49,
    "question": "Which extinguisher should NOT be used on electrical fires:",
    "options": {
      "A": "CO₂",
      "B": "Foam",
      "C": "Water",
      "D": "Dry powder"
    },
    "answer": "C"
  },
  {
    "id": 50,
    "question": "Most common cause of building fires:",
    "options": {
      "A": "Overloaded electrical circuits",
      "B": "Closed doors",
      "C": "Wet floor",
      "D": "Poor ventilation"
    },
    "answer": "A"
  },
  {
    "id": 51,
    "question": "PPE helps to prevent risks to:",
    "options": {
      "A": "Health and safety",
      "B": "National security",
      "C": "Equipment",
      "D": "Comfort"
    },
    "answer": "A"
  },
  {
    "id": 52,
    "question": "Safety helmets protect against:",
    "options": {
      "A": "Temperature extremes",
      "B": "Falling objects",
      "C": "Impact with fixed objects",
      "D": "All of the above"
    },
    "answer": "D"
  },
  {
    "id": 53,
    "question": "Blue in safety signs means:",
    "options": {
      "A": "Prohibited action",
      "B": "Mandatory action",
      "C": "Safe condition",
      "D": "Warning"
    },
    "answer": "B"
  },
  {
    "id": 54,
    "question": "Green in safety signage indicates:",
    "options": {
      "A": "Escape routes",
      "B": "Prohibition",
      "C": "Danger",
      "D": "Mandatory action"
    },
    "answer": "A"
  },
  {
    "id": 55,
    "question": "Foam extinguishers are most suitable for:",
    "options": {
      "A": "Class A fires",
      "B": "Class B fires",
      "C": "Class C fires",
      "D": "Class D fires"
    },
    "answer": "B"
  },
  {
    "id": 56,
    "question": "Wet chemical extinguishers are mainly used for:",
    "options": {
      "A": "Electrical fires",
      "B": "Cooking oil/fat fires",
      "C": "Flammable gases",
      "D": "Paper fires"
    },
    "answer": "B"
  },
  {
    "id": 57,
    "question": "The process of removing heat from fire is called:",
    "options": {
      "A": "Starvation",
      "B": "Cooling",
      "C": "Smothering",
      "D": "Ventilation"
    },
    "answer": "B"
  },
  {
    "id": 58,
    "question": "Removing oxygen from a fire is called:",
    "options": {
      "A": "Smothering",
      "B": "Cooling",
      "C": "Starvation",
      "D": "Damping"
    },
    "answer": "A"
  },
  {
    "id": 59,
    "question": "Starvation in firefighting means:",
    "options": {
      "A": "Removing heat",
      "B": "Removing fuel",
      "C": "Removing oxygen",
      "D": "Adding water"
    },
    "answer": "B"
  },
  {
    "id": 60,
    "question": "Flashover happens when:",
    "options": {
      "A": "Fire spreads slowly",
      "B": "All combustible materials ignite simultaneously",
      "C": "Fire is completely extinguished",
      "D": "Oxygen increases suddenly"
    },
    "answer": "B"
  },
  {
    "id": 61,
    "question": "Backdraft occurs when:",
    "options": {
      "A": "Oxygen is suddenly reintroduced to a smoldering fire",
      "B": "Fire is completely starved",
      "C": "Foam is applied incorrectly",
      "D": "Water is used in excess"
    },
    "answer": "A"
  },
  {
    "id": 62,
    "question": "Fire hydrants supply:",
    "options": {
      "A": "Foam",
      "B": "Water",
      "C": "CO₂",
      "D": "Steam"
    },
    "answer": "B"
  },
  {
    "id": 63,
    "question": "Fire blankets are mainly used for:",
    "options": {
      "A": "Large building fires",
      "B": "Small pan fires and clothing fires",
      "C": "Electrical fires",
      "D": "Metal fires"
    },
    "answer": "B"
  },
  {
    "id": 64,
    "question": "Fire load refers to:",
    "options": {
      "A": "Weight of fire truck",
      "B": "Total combustible material in a space",
      "C": "Pressure in hoses",
      "D": "Volume of water"
    },
    "answer": "B"
  },
  {
    "id": 65,
    "question": "Which is NOT a Nigerian road classification?",
    "options": {
      "A": "Trunk A",
      "B": "Trunk B",
      "C": "Trunk C",
      "D": "Trunk D"
    },
    "answer": "D"
  },
  {
    "id": 66,
    "question": "The body in charge of road safety in Nigeria is:",
    "options": {
      "A": "FFS",
      "B": "FRSC",
      "C": "NSCDC",
      "D": "NPF"
    },
    "answer": "B"
  },
  {
    "id": 67,
    "question": "Stop signs are shaped:",
    "options": {
      "A": "Round",
      "B": "Octagon",
      "C": "Triangle",
      "D": "Square"
    },
    "answer": "B"
  },
  {
    "id": 68,
    "question": "A yellow traffic light means:",
    "options": {
      "A": "Go",
      "B": "Stop immediately",
      "C": "Prepare to stop",
      "D": "Speed up"
    },
    "answer": "C"
  },
  {
    "id": 69,
    "question": "Zig-zag lines on roads indicate:",
    "options": {
      "A": "No parking",
      "B": "Speed bumps",
      "C": "School zone",
      "D": "Toll gate"
    },
    "answer": "A"
  },
  {
    "id": 70,
    "question": "The safest way to cross a road is:",
    "options": {
      "A": "Run quickly",
      "B": "Use pedestrian crossing",
      "C": "Cross at curves",
      "D": "Cross in the middle of traffic"
    },
    "answer": "B"
  }
];   
