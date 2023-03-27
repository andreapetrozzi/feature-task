export type FakeDatum = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  birthday: Date;
  phone: string;
  city: string;
  state: string;
  pet: {
    name: string;
    sex: "female" | "male";
  };
  subscriptionTier: string;
};
