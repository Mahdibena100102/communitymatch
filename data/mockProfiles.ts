export type Profile = {
  id: string;
  age: number;
  dob: string;         
  heightM: number;      
  weightKg: number;     
  profession: string;
  ethnicity: string;
  about: string;
  lookingFor: string;
};

export const mockProfiles: Profile[] = [
  {
    id: "T5NSJ23",
    age: 23,
    dob: "01/01/2002",
    heightM: 1.74,
    weightKg: 73,
    profession: "Software Developer",
    ethnicity: "Some Country",
    about: "I like simple living, deen, and building a family.",
    lookingFor: "Someone kind, practicing, and serious about marriage.",
  },
  {
    id: "A91KD10",
    age: 22,
    dob: "10/10/2002",
    heightM: 1.68,
    weightKg: 60,
    profession: "Teacher",
    ethnicity: "Some Country",
    about: "Family oriented and calm.",
    lookingFor: "Respect, honesty, and clear communication.",
  },
  {
    id: "Z77PQ55",
    age: 24,
    dob: "03/05/2001",
    heightM: 1.8,
    weightKg: 80,
    profession: "Electrician",
    ethnicity: "Some Country",
    about: "Hardworking and serious.",
    lookingFor: "A supportive spouse to grow together.",
  },
];