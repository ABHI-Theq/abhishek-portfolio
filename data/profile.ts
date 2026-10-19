export interface LeetCodeStats {
  contestRating: number;
  globalRanking: string;
  topPercent: string;
  rank: number;
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  badges: number;
  level: string;
  activeDays: number;
  maxStreak: number;
}

export interface Profile {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  resumeUrl: string;
  leetcodeStats: LeetCodeStats;
}

export const profile: Profile = {
  name: "Abhishek Sharma",
  email: "abhi03085e@gmail.com",
  github: "https://github.com/ABHI-Theq",
  linkedin: "https://linkedin.com/in/abhishek-sharma-a24900278",
  leetcode: "https://leetcode.com/ABHI-Theq",
  resumeUrl:
    "https://drive.google.com/file/d/1c-Om1To_xUZpw8tnE1GhfKc6nEDEoagR/view?usp=sharing",
  leetcodeStats: {
    contestRating: 1975,
    globalRanking: "~26,071/888,637",
    topPercent: "3.04%",
    rank: 9078,
    solved: 1463,
    easy: 317,
    medium: 821,
    hard: 325,
    badges: 19,
    level: "Knight",
    activeDays: 347,
    maxStreak: 286,
  },
};
