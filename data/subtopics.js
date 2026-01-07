// grade levels are based on recommended US school grades

const SUBTOPICS = {
  Math: [
    { name: "Algebra", gradeLevels: [6, 7, 8] },
    { name: "Geometry", gradeLevels: [9, 10] },
    { name: "Calculus", gradeLevels: [11, 12] },
    { name: "Statistics", gradeLevels: [11, 12] },
    { name: "Trigonometry", gradeLevels: [10, 11] },
  ],
  "English Language Arts": [
    { name: "Reading Comprehension", gradeLevels: [3, 4, 5] },
    { name: "Grammar", gradeLevels: [4, 5, 6] },
    { name: "Writing Composition", gradeLevels: [6, 7, 8] },
    { name: "Literary Analysis", gradeLevels: [9, 10] },
    { name: "Research Skills", gradeLevels: [11, 12] },
  ],
  Science: [
    { name: "Physics Foundations", gradeLevels: [9, 10] },
    { name: "Chemistry Basics", gradeLevels: [9, 10] },
    { name: "Biology Core", gradeLevels: [9, 10] },
    { name: "Earth Systems", gradeLevels: [6, 7, 8] },
    { name: "Environmental Science", gradeLevels: [10, 11, 12] },
  ],
  "Social Studies": [
    { name: "Civics", gradeLevels: [6, 7, 8] },
    { name: "US History Survey", gradeLevels: [8, 9, 10] },
    { name: "World History Themes", gradeLevels: [9, 10, 11] },
    { name: "Geography Skills", gradeLevels: [6, 7, 8] },
    { name: "Economics Intro", gradeLevels: [10, 11, 12] },
  ],
  History: [
    { name: "Ancient Civilizations", gradeLevels: [6, 7, 8] },
    { name: "Medieval History", gradeLevels: [7, 8, 9] },
    { name: "Modern World History", gradeLevels: [10, 11, 12] },
    { name: "US History Reconstruction", gradeLevels: [9, 10, 11] },
    { name: "History Research Methods", gradeLevels: [11, 12] },
  ],
  Geography: [
    { name: "Map Skills", gradeLevels: [4, 5, 6] },
    { name: "Physical Geography", gradeLevels: [7, 8, 9] },
    { name: "Human Geography", gradeLevels: [9, 10, 11] },
    { name: "GIS Basics", gradeLevels: [11, 12] },
    { name: "Regional Studies", gradeLevels: [7, 8, 9, 10] },
  ],
  Physics: [
    { name: "Mechanics", gradeLevels: [10, 11, 12] },
    { name: "Electricity and Magnetism", gradeLevels: [11, 12] },
    { name: "Waves and Optics", gradeLevels: [11, 12] },
  ],
  Chemistry: [
    { name: "Atomic Structure", gradeLevels: [9, 10] },
    { name: "Chemical Reactions", gradeLevels: [10, 11] },
    { name: "Stoichiometry", gradeLevels: [10, 11] },
  ],
  Biology: [
    { name: "Cell Biology", gradeLevels: [9, 10] },
    { name: "Genetics", gradeLevels: [10, 11] },
    { name: "Ecology", gradeLevels: [9, 10] },
  ],
  "Earth Science": [
    { name: "Plate Tectonics", gradeLevels: [6, 7, 8] },
    { name: "Weather and Climate", gradeLevels: [6, 7, 8] },
    { name: "Astronomy", gradeLevels: [7, 8, 9] },
  ],
  "Environmental Science": [
    { name: "Sustainability", gradeLevels: [9, 10, 11] },
    { name: "Ecosystems", gradeLevels: [9, 10] },
    { name: "Human Impact", gradeLevels: [10, 11, 12] },
  ],
  "Computer Science": [
    { name: "Programming Basics", gradeLevels: [7, 8, 9] },
    { name: "Data Structures", gradeLevels: [10, 11, 12] },
    { name: "Algorithms", gradeLevels: [11, 12] },
    { name: "Web Development", gradeLevels: [9, 10, 11, 12] },
    { name: "AI Fundamentals", gradeLevels: [11, 12] },
  ],
  "Foreign Languages": [
    { name: "Conversation Basics", gradeLevels: [6, 7, 8] },
    { name: "Grammar and Usage", gradeLevels: [7, 8, 9] },
    { name: "Reading Comprehension", gradeLevels: [8, 9, 10] },
    { name: "Writing Practice", gradeLevels: [9, 10, 11] },
    { name: "Cultural Studies", gradeLevels: [6, 7, 8, 9] },
  ],
  Spanish: [
    { name: "Basic Conversation", gradeLevels: [6, 7, 8] },
    { name: "Verb Conjugations", gradeLevels: [7, 8, 9] },
    { name: "Reading Comprehension", gradeLevels: [9, 10, 11] },
  ],
  French: [
    { name: "Basic Conversation", gradeLevels: [6, 7, 8] },
    { name: "Verb Conjugations", gradeLevels: [7, 8, 9] },
    { name: "Reading Comprehension", gradeLevels: [9, 10, 11] },
  ],
  German: [
    { name: "Basic Conversation", gradeLevels: [6, 7, 8] },
    { name: "Verb Conjugations", gradeLevels: [7, 8, 9] },
    { name: "Reading Comprehension", gradeLevels: [9, 10, 11] },
  ],
  "Mandarin Chinese": [
    { name: "Pinyin and Tones", gradeLevels: [6, 7, 8] },
    { name: "Basic Characters", gradeLevels: [7, 8, 9] },
    { name: "Everyday Dialogues", gradeLevels: [8, 9, 10] },
  ],
  Latin: [
    { name: "Vocabulary and Roots", gradeLevels: [8, 9, 10] },
    { name: "Grammar and Syntax", gradeLevels: [9, 10, 11] },
    { name: "Translation Practice", gradeLevels: [10, 11, 12] },
  ],
  Art: [
    { name: "Drawing Fundamentals", gradeLevels: [4, 5, 6] },
    { name: "Color Theory", gradeLevels: [7, 8, 9] },
    { name: "Art History Overview", gradeLevels: [9, 10, 11] },
  ],
  Music: [
    { name: "Music Theory Basics", gradeLevels: [4, 5, 6] },
    { name: "Instrument Practice", gradeLevels: [5, 6, 7, 8] },
    { name: "Ensemble Skills", gradeLevels: [7, 8, 9] },
  ],
  "Drama/Theater": [
    { name: "Acting Techniques", gradeLevels: [7, 8, 9] },
    { name: "Script Analysis", gradeLevels: [9, 10, 11] },
    { name: "Stage Production", gradeLevels: [9, 10, 11, 12] },
  ],
  "Physical Education": [
    { name: "Fitness Fundamentals", gradeLevels: [3, 4, 5] },
    { name: "Team Sports Skills", gradeLevels: [6, 7, 8] },
    { name: "Health and Wellness", gradeLevels: [9, 10] },
  ],
  Health: [
    { name: "Nutrition Basics", gradeLevels: [4, 5, 6] },
    { name: "Human Body Systems", gradeLevels: [6, 7, 8] },
    { name: "Mental Health Awareness", gradeLevels: [9, 10] },
  ],
  Economics: [
    { name: "Microeconomics Intro", gradeLevels: [10, 11, 12] },
    { name: "Macroeconomics Intro", gradeLevels: [10, 11, 12] },
    { name: "Personal Finance", gradeLevels: [9, 10, 11, 12] },
  ],
  "Government/Civics": [
    { name: "Constitution Basics", gradeLevels: [7, 8, 9] },
    { name: "Civic Engagement", gradeLevels: [8, 9, 10] },
    { name: "Government Systems", gradeLevels: [9, 10, 11] },
  ],
  Psychology: [
    { name: "Developmental Psychology", gradeLevels: [11, 12] },
    { name: "Cognitive Psychology", gradeLevels: [11, 12] },
    { name: "Social Psychology", gradeLevels: [11, 12] },
  ],
  Sociology: [
    { name: "Social Institutions", gradeLevels: [11, 12] },
    { name: "Culture and Society", gradeLevels: [10, 11, 12] },
    { name: "Research Methods", gradeLevels: [11, 12] },
  ],
  Philosophy: [
    { name: "Ethics", gradeLevels: [11, 12] },
    { name: "Logic Basics", gradeLevels: [10, 11, 12] },
    { name: "Philosophy of Mind", gradeLevels: [11, 12] },
  ],
  "World Religions": [
    { name: "Major World Religions", gradeLevels: [9, 10, 11] },
    { name: "Beliefs and Practices", gradeLevels: [10, 11, 12] },
    { name: "Religion and Culture", gradeLevels: [11, 12] },
  ],
  Business: [
    { name: "Entrepreneurship", gradeLevels: [10, 11, 12] },
    { name: "Marketing Basics", gradeLevels: [10, 11, 12] },
    { name: "Accounting Fundamentals", gradeLevels: [11, 12] },
  ],
  "Career and Technical Education": [
    { name: "Career Exploration", gradeLevels: [6, 7, 8] },
    { name: "Technical Skills Intro", gradeLevels: [9, 10, 11] },
    { name: "Workplace Readiness", gradeLevels: [10, 11, 12] },
  ],
  "Life Skills": [
    { name: "Time Management", gradeLevels: [6, 7, 8] },
    { name: "Financial Literacy", gradeLevels: [8, 9, 10] },
    { name: "Communication Skills", gradeLevels: [7, 8, 9] },
  ],
};

export default SUBTOPICS;
