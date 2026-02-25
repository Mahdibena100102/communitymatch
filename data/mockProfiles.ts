export type Profile = {
  firstName: string;
  surname: string;
  guardianName?: string;
  guardianSurname?: string
  guardianEmail?: string;
  guardianNumber?: number;
  userCode: string;
  gender: string
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
    firstName: "Aisha",
    surname: "Rahman",
    guardianName: "Khalid",
    guardianSurname: "Rahman",
    guardianEmail: "khalid.rahman@email.com",
    guardianNumber: 447912345678,
    userCode: "USR001",
    gender: "female",
    age: 22,
    dob: "2003-04-12",
    heightM: 1.65,
    weightKg: 58,
    profession: "Teacher",
    ethnicity: "Pakistani",
    about: "Calm and family-oriented. Enjoys reading and baking.Calm and family-oriented. Calm and family-oriented. Enjoys reading and baking.Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking.",
    lookingFor: "Practicing, responsible spouse with good character.CalmCalm and family-oriented. Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking. and family-oriented. Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking.Calm and family-oriented. Enjoys reading and baking."
  },
  {
    firstName: "Zain",
    surname: "Khan",
    userCode: "USR002",
    gender: "male",
    age: 26,
    dob: "1999-02-10",
    heightM: 1.78,
    weightKg: 75,
    profession: "Software Engineer",
    ethnicity: "Pakistani",
    about: "Focused and disciplined. Enjoys gym and tech.",
    lookingFor: "Kind and supportive wife who values deen."
  },
  {
    firstName: "Fatima",
    surname: "Ali",
    guardianName: "Omar",
    guardianSurname: "Ali",
    guardianEmail: "omar.ali@email.com",
    guardianNumber: 447923456781,
    userCode: "USR003",
    gender: "female",
    age: 25,
    dob: "2000-08-21",
    heightM: 1.7,
    weightKg: 62,
    profession: "Doctor",
    ethnicity: "Somali",
    about: "Ambitious and caring. Loves volunteering.",
    lookingFor: "Supportive and emotionally mature partner."
  },
  {
    firstName: "Omar",
    surname: "Abdullah",
    userCode: "USR004",
    gender: "male",
    age: 28,
    dob: "1997-11-30",
    heightM: 1.82,
    weightKg: 80,
    profession: "Business Analyst",
    ethnicity: "Egyptian",
    about: "Ambitious and family-driven.",
    lookingFor: "Practicing spouse with good manners."
  },
  {
    firstName: "Maryam",
    surname: "Hassan",
    guardianName: "Yusuf",
    guardianSurname: "Hassan",
    guardianEmail: "yusuf.hassan@email.com",
    guardianNumber: 447934567812,
    userCode: "USR005",
    gender: "female",
    age: 23,
    dob: "2002-06-09",
    heightM: 1.68,
    weightKg: 60,
    profession: "Pharmacist",
    ethnicity: "Nigerian",
    about: "Organised and compassionate.",
    lookingFor: "Responsible and God-conscious husband."
  },
  {
    firstName: "Bilal",
    surname: "Mahmoud",
    userCode: "USR006",
    gender: "male",
    age: 29,
    dob: "1996-09-05",
    heightM: 1.75,
    weightKg: 77,
    profession: "Civil Engineer",
    ethnicity: "Moroccan",
    about: "Calm personality, enjoys travel.",
    lookingFor: "Supportive and respectful wife."
  },
  {
    firstName: "Amina",
    surname: "Siddiqui",
    guardianName: "Farooq",
    guardianSurname: "Siddiqui",
    guardianEmail: "farooq.siddiqui@email.com",
    guardianNumber: 447967891245,
    userCode: "USR007",
    gender: "female",
    age: 21,
    dob: "2004-03-18",
    heightM: 1.58,
    weightKg: 52,
    profession: "University Student",
    ethnicity: "Indian",
    about: "Soft-spoken and creative.",
    lookingFor: "Patient and practicing husband."
  },
  {
    firstName: "Hassan",
    surname: "Ibrahim",
    userCode: "USR008",
    gender: "male",
    age: 27,
    dob: "1998-07-14",
    heightM: 1.8,
    weightKg: 78,
    profession: "Accountant",
    ethnicity: "Sudanese",
    about: "Thoughtful and analytical.",
    lookingFor: "Kind-hearted and family-oriented wife."
  },
  {
    firstName: "Safiya",
    surname: "Choudhury",
    guardianName: "Rashid",
    guardianSurname: "Choudhury",
    guardianEmail: "rashid.choudhury@email.com",
    guardianNumber: 447989123467,
    userCode: "USR009",
    gender: "female",
    age: 24,
    dob: "2001-12-11",
    heightM: 1.66,
    weightKg: 59,
    profession: "Lawyer",
    ethnicity: "Bangladeshi",
    about: "Confident and articulate.",
    lookingFor: "Honest and ambitious husband."
  },
  {
    firstName: "Yusuf",
    surname: "El-Sayed",
    userCode: "USR010",
    gender: "male",
    age: 30,
    dob: "1995-03-22",
    heightM: 1.83,
    weightKg: 85,
    profession: "Architect",
    ethnicity: "Egyptian",
    about: "Strategic thinker and family-oriented.",
    lookingFor: "Practicing and supportive wife."
  }
];
