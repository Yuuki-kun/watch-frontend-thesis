const allowedDomains = [
  "gmail.com",
  "email.com",
  "yahoo.com",
  "hotmail.com",
  "aol.com",
  "icloud.com",
];
export const EMAIL_REGEX = new RegExp(
  `^[\\w.%+-]+@(${allowedDomains.join("|")})$`,
  "i"
);

export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const NAME_REGEX = /^[A-Za-z\s]+$/;
