import React, { useState, useEffect } from "react";
import Select, { OptionsType } from "react-select";
import rest, { RestQueryResult } from "../utils/rest";
import { City, LabelValue } from "../api/models";
import { Spinner } from "react-bootstrap";
import { citiesStore } from "../store/cities";
import { titleCase } from "title-case";

interface LocationPickerProps {}

const namedCityMap: Map<string, City> = new Map();

export const LocationPicker: React.FC<LocationPickerProps> = () => {
  const [options, setOptions] = useState<LabelValue[]>([]);
  const [selected, setSelected] = useState<LabelValue[]>([]);
  const [loading, setLoading] = useState(true);
  const setCityOne = citiesStore(state => state.setCityOne);
  const setCityTwo = citiesStore(state => state.setCityTwo);

  useEffect(() => {
    const loadCities = async () => {
      const { results } = (await rest.get("/v2/cities", {
        params: {
          limit: 1000,
          page: 1,
          offset: 0,
          sort: "asc",
          country_id: "us",
          order_by: "city"
        }
      })) as RestQueryResult<City>;
      if (results) {
        setLoading(false);
        if (results.length > 0) {
          const namedCities = results.filter(c => !parseFloat(c.city));
          const cityOptions: LabelValue[] = [];
          for (const c of namedCities) {
            namedCityMap.set(c.city, c);
            cityOptions.push({
              label: titleCase(c.city.toLocaleLowerCase()),
              value: c.city
            });
          }
          setOptions(cityOptions);
        }
      }
    };
    loadCities();
  }, []);

  const onChange = (val: OptionsType<LabelValue>) => {
    setSelected(val as LabelValue[]);
    setCityOne(val[0] ? namedCityMap.get(val[0].value)! : undefined);
    setCityTwo(val[1] ? namedCityMap.get(val[1].value)! : undefined);
  };

  return (
    <div className="mt-3">
      {loading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {options.length > 0 && (
        <div>
          <h1 className="text-center">Select Two Cities to Compare</h1>
          <Select
            isMulti
            onChange={val => onChange(val)}
            isLoading={loading}
            placeholder="Search for a city ..."
            options={selected.length > 1 ? [] : options}
            noOptionsMessage={() =>
              "You may only compare two cities at a time."
            }
          />
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
