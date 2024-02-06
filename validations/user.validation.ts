import { date, number, object, string } from "yup";

export const EditUserInput = object({
  body: object({
    firstName: string().notRequired(),
    lastName: string().notRequired(),
    otherNames: string().notRequired(),
    about: string().notRequired(),
    website: string().notRequired(),
    facebookUrl: string().notRequired(),
    instagramUrl: string().notRequired(),
    address: string().notRequired(),
    country: string().notRequired(),
    state: string().notRequired(),
    city: string().notRequired(),
    nationality: string().notRequired(),
    sex: string().notRequired(),
    dob: date().notRequired(),
    phoneNumber1: number().notRequired(),
    phoneNumber2: number().notRequired(),
  }),
});

export const GetUserProfileInput = object({
  params: object({
    id: string().required("Provide user id"),
  }),
});
