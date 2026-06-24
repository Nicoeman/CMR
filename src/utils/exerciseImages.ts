/**
 * Curated high-quality workout photography from Unsplash
 * for realistic, high-contrast, professional fitness visual aids.
 */

const IMAGES_BY_CATEGORY: Record<string, string[]> = {
  Peito: [
    "photo-1571019614242-c5c5dee9f50b", // Bench press
    "photo-1534438327276-14e5300c3a48", // Chest push / weights
    "photo-1583454110551-21f2fa2afe61", // Athlete pushing dumbbells
    "photo-1517838277536-f5f99be501cd", // Dumbbells layout
    "photo-1517838277536-f5f99be501cd"  // Close up dumbbells
  ],
  Costas: [
    "photo-1605296867304-46d5465a25f1", // Deadlift pull / back
    "photo-1605296867424-35fc25c9212a", // Pull-ups bar
    "photo-1526506118085-60ce8714f8c5", // Lifting back
    "photo-1581009146145-b5ef050c2e1e"  // Heavy barbell pull
  ],
  Ombro: [
    "photo-1541534741688-6078c6bfb5c5", // Shoulder press
    "photo-1583454110551-21f2fa2afe61", // Heavy dumbbell shoulder action
    "photo-1534438327276-14e5300c3a48", // Barbell lift
    "photo-1605296867304-46d5465a25f1"  // Back shoulder barbell
  ],
  Bíceps: [
    "photo-1581009146145-b5ef050c2e1e", // Barbell biceps curl
    "photo-1584735935682-2f2b69dff9d2", // Dumbbell preacher curl
    "photo-1571019614242-c5c5dee9f50b", // Arm weights
    "photo-1517838277536-f5f99be501cd"  // Gym dumbbell curl
  ],
  Tríceps: [
    "photo-1530822847156-5df684ec5ee1", // Bar parallel tricep dips
    "photo-1598971639058-aba3c7f09a7d", // Cable triceps pushdown
    "photo-1541534741688-6078c6bfb5c5", // Tricep dumbbells overhead
    "photo-1605296867424-35fc25c9212a"  // Tricep dips on bar
  ],
  Pernas: [
    "photo-1574680096145-d05b474e2155", // Barbell back squat
    "photo-1434596994096-19d4e89a7159", // Leg day plates
    "photo-1517838277536-f5f99be501cd", // Leg squat bar setup
    "photo-1526506118085-60ce8714f8c5"  // Deadlift legs
  ],
  Glúteos: [
    "photo-1518310383802-640c2de311b2", // Hip thrust
    "photo-1574680096145-d05b474e2155", // Low squat for glutes
    "photo-1605296867304-46d5465a25f1", // Romanian deadlifts
    "photo-1534438327276-14e5300c3a48"  // Kettlebell swing
  ],
  Abdômen: [
    "photo-1517838277536-f5f99be501cd", // Core plank
    "photo-1571019613454-1cb2f99b2d8b", // Abs crunch on mat
    "photo-1598971639058-aba3c7f09a7d", // Hanging leg raise abs
    "photo-1583454110551-21f2fa2afe61"  // Abs twist / medicine ball
  ],
  Calistenia: [
    "photo-1598971639058-aba3c7f09a7d", // Pull-ups bar calisthenics
    "photo-1605296867424-35fc25c9212a", // Muscle-ups
    "photo-1530822847156-5df684ec5ee1", // Parallel bars
    "photo-1541534741688-6078c6bfb5c5"  // Push-ups bodyweight
  ]
};

const DEFAULT_FITNESS_IMAGE = "photo-1517838277536-f5f99be501cd"; // Gym dumbbells

/**
 * Returns a deterministic high-quality Unsplash image URL for a given exercise.
 * @param exerciseId The ID of the exercise
 * @param category The exercise category
 */
export function getExerciseImageUrl(exerciseId: string, category: string): string {
  // Normalize the category key to be accent-insensitive and case-insensitive
  const norm = (s: string) => (s || "").toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const normalizedCategory = norm(category);
  
  // Find the matching key in IMAGES_BY_CATEGORY
  const matchingKey = Object.keys(IMAGES_BY_CATEGORY).find(k => norm(k) === normalizedCategory);
  
  const images = matchingKey ? IMAGES_BY_CATEGORY[matchingKey] : (IMAGES_BY_CATEGORY["Calistenia"] || [DEFAULT_FITNESS_IMAGE]);
  
  // Deterministic select based on hash of exercise ID
  let hash = 0;
  for (let i = 0; i < (exerciseId || "").length; i++) {
    hash += exerciseId.charCodeAt(i);
  }
  const photoId = images[hash % images.length] || DEFAULT_FITNESS_IMAGE;
  
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&h=400&q=80`;
}

/**
 * Returns a larger hero banner image for workouts/spreadsheets based on objective.
 */
export function getObjectiveHeroImageUrl(objective: string): string {
  const objLower = objective.toLowerCase();
  let photoId = "photo-1517838277536-f5f99be501cd"; // default
  
  if (objLower.includes("hiper") || objLower.includes("massa")) {
    photoId = "photo-1581009146145-b5ef050c2e1e"; // Heavy lift
  } else if (objLower.includes("emag") || objLower.includes("perda") || objLower.includes("deficit")) {
    photoId = "photo-1517838277536-f5f99be501cd"; // Intense cardio/HIIT
  } else if (objLower.includes("def") || objLower.includes("esculp")) {
    photoId = "photo-1583454110551-21f2fa2afe61"; // Ripped bodyweight/dumbbells
  } else if (objLower.includes("for") || objLower.includes("carga")) {
    photoId = "photo-1605296867304-46d5465a25f1"; // Deadlift / pure strength
  }
  
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&h=500&q=85`;
}
