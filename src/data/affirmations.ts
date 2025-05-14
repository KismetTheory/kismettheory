
export interface Affirmation {
  text: string;
  author?: string;
}

export const affirmations: Affirmation[] = [
  {
    text: "I am a magnet for positive energy and abundance.",
  },
  {
    text: "My space is filled with light and harmony.",
  },
  {
    text: "I create beauty and peace wherever I go.",
  },
  {
    text: "My surroundings reflect my inner tranquility.",
  },
  {
    text: "I am connected to the healing energies of the earth.",
  },
  {
    text: "My home is a sanctuary of positive vibrations.",
  },
  {
    text: "I attract objects that elevate my spiritual journey.",
  },
  {
    text: "The energy I surround myself with elevates my consciousness.",
  },
  {
    text: "I am worthy of beauty and harmony in my environment.",
  },
  {
    text: "Every crystal I own amplifies my intentions.",
    author: "Crystal Wisdom"
  },
  {
    text: "My decor choices are extensions of my highest self.",
  },
  {
    text: "I transform spaces with intention and love.",
  }
];

// Function to get a random affirmation
export const getRandomAffirmation = (): Affirmation => {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  return affirmations[randomIndex];
};
