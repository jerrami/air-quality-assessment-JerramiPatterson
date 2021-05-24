export interface LabelValue {
  label: string;
  value: string;
}

export interface City {
  country: string;
  city: string;
  count: number;
  locations: number;
  firstUpdated: string;
  lastUpdated: string;
  parameters: string[];
}

interface ReadingParameter {
  average: number;
  count: number;
  displayName: string;
  firstUpdated: string;
  id: number;
  lastUpdated: string;
  lastValue: number;
  parameter: string;
  parameterId: number;
  unit: string;
}

interface ReadingSources {
  id: string;
  name: string;
  url?: string;
}

export interface CityReadings {
  city: string;
  coordinates: { latitude: number; longitude: number };
  country: string;
  entity: string;
  firstUpdated: string;
  id: number;
  isAnalysis: boolean;
  isMobile: boolean;
  lastUpdated: string;
  measurements: number;
  name: string;
  parameters: ReadingParameter[];
  sensorType: string;
  sources: ReadingSources[];
}
