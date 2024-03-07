export interface INewsletterSubscription {
  email: string;
  _id: string;
  lastReceived: Date | number;
  createdAt: Date;
  updatedAt: Date;
}
