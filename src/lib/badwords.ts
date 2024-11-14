export const badWords = [
  "hate",
  "stupid",
  "idiot",
  "dumb",
  "racist",
  "sexist",
  "tanga",
  "gago",
  "ulol",
  "bobo",
  "tang ina",
  "tangina",
  "bugo",
  "bogo",
  "ulol",
  "yawa",
  "bulok",
  "puta",
  "pota",
  "fuck",
  "puke",
];

export const contentGuidelines = {
  title: "Community Guidelines",
  rules: [
    "Be respectful to others",
    "No hate speech or harassment",
    "No profanity or offensive language",
    "Keep discussions constructive",
    "No spamming or excessive caps",
  ],
};

export const normalizeText = (text: string): string => {
  return text.replace(/(\w)\1{2,}/g, '$1');
};
