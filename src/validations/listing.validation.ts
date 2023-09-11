import { array, number, object, string } from "yup";

export const DeleteListingInput = object({
  params: object({
    id: string().required("Listing id is required"),
  }),
});

export const CreateListingInput = object({
  body: object({
    category: string().required(),
    title: string().required(),
    location: string().required(),
    features: array().required(),
    description: string().required(),
    price: number().required(),
    attachedDocuments: array().required(),
    year: number().required(),
    offerType: string().required("offer must be sale/rent"),
    noOfBathrooms: number().notRequired(),
    noOfBedrooms: number().notRequired(),
    carCondition: string().notRequired(),
    engineType: string().notRequired(),
    color: string().notRequired(),
    model: string().notRequired(),
  }),
});

export const EditListingInput = object({
  body: object({
    category: string().notRequired(),
    title: string().notRequired(),
    location: string().notRequired(),
    features: array().notRequired(),
    description: string().notRequired(),
    price: number().notRequired(),
    attachedDocuments: array().notRequired(),
    year: number().notRequired(),
    offerType: string().notRequired(),
    noOfBathrooms: number().notRequired(),
    noOfBedrooms: number().notRequired(),
    carCondition: string().notRequired(),
    engineType: string().notRequired(),
    color: string().notRequired(),
    model: string().notRequired(),
  }),
  params: object({
    id: string().required(),
  }),
});

export const SaveListingInput = object({
  params: object({
    id: string().required(),
  }),
});
