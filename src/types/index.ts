export type AppStateType = {
  lots: LotType[];
  lot: LotType;
  clientSecret: string;
};

export type LotType = {
  _id: string;
  zone: string;
  token: string;
  cover: string;
  siteCode: string;
  url: string;
  address: string;
  hourlyRate: number;
  payTime: number;
  percentage: number;
  owners: string[];
  payingApp: string;
};

export type AppearanceTheme = "stripe" | "night" | "flat";
export type AppearanceVariables = {
  colorPrimary: string;
  colorBackground: string;
  colorText: string;
};

export type Appearance = {
  theme: AppearanceTheme;
  variables: AppearanceVariables;
};
