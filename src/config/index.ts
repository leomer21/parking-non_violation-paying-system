import { Appearance, LotType } from "../types";

export const defaultLotData: LotType = {
  _id: "",
  zone: "",
  token: "",
  cover: "",
  siteCode: "",
  url: "",
  address: "",
  hourlyRate: 0,
  payTime: 0,
  percentage: 0,
  payingApp: "",
  owners: [],
};

export const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#2687e8",
    colorBackground: "#FFFAF9",
    colorText: "#091C62",
  },
};
