import create from "zustand";
import { City } from "../api/models";

type CitiesStore = {
  cityOne?: City;
  cityTwo?: City;
  setCityOne: (city?: City) => void;
  setCityTwo: (city?: City) => void;
};

export const citiesStore = create<CitiesStore>(set => ({
  setCityOne: (city?: City) => {
    set({ cityOne: city });
  },
  setCityTwo: (city?: City) => {
    set({ cityTwo: city });
  }
}));
