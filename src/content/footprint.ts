export interface FootprintLocation {
  country: string;
  /** ISO-style 2-letter shorthand shown on the map (full name on hover). */
  code: string;
  city: string;
  lat: number;
  lon: number;
  note?: string;
  /** Label offset in viewBox units, used to dodge dense clusters. */
  labelDx?: number;
  labelDy?: number;
  labelAnchor?: "start" | "middle" | "end";
}

/**
 * Hemco's global footprint. Coordinates are equator/prime-meridian
 * latitude / longitude, projected equirectangularly in the map view.
 */
export const footprint: FootprintLocation[] = [
  {
    country: "India",
    code: "IN",
    city: "Headquarters",
    lat: 22.5,
    lon: 78.0,
    note: "Headquarters · The works",
    labelDx: 0,
    labelDy: 18,
    labelAnchor: "middle",
  },
  {
    country: "United States",
    code: "US",
    city: "New York",
    lat: 40.7,
    lon: -74.0,
    labelDx: 10,
    labelDy: 4,
    labelAnchor: "start",
  },
  {
    country: "United States",
    code: "LV",
    city: "Las Vegas",
    lat: 36.17,
    lon: -115.14,
    labelDx: 0,
    labelDy: 18,
    labelAnchor: "middle",
  },
  {
    country: "Nigeria",
    code: "NG",
    city: "Lagos",
    lat: 6.52,
    lon: 3.38,
    labelDx: 10,
    labelDy: 4,
    labelAnchor: "start",
  },
  {
    country: "Ethiopia",
    code: "ET",
    city: "Addis Ababa",
    lat: 9.03,
    lon: 38.74,
    labelDx: 10,
    labelDy: 4,
    labelAnchor: "start",
  },
  // Europe cluster — fan labels around the cluster.
  {
    country: "United Kingdom",
    code: "UK",
    city: "London",
    lat: 51.5,
    lon: -0.1,
    labelDx: -10,
    labelDy: 4,
    labelAnchor: "end",
  },
  {
    country: "Netherlands",
    code: "NL",
    city: "Amsterdam",
    lat: 52.4,
    lon: 4.9,
    labelDx: -8,
    labelDy: -10,
    labelAnchor: "end",
  },
  {
    country: "Germany",
    code: "DE",
    city: "Berlin",
    lat: 52.5,
    lon: 13.4,
    labelDx: 8,
    labelDy: -10,
    labelAnchor: "start",
  },
  {
    country: "Estonia",
    code: "EE",
    city: "Tallinn",
    lat: 59.4,
    lon: 24.7,
    labelDx: 10,
    labelDy: 4,
    labelAnchor: "start",
  },
  {
    country: "Japan",
    code: "JP",
    city: "Tokyo",
    lat: 35.7,
    lon: 139.7,
    labelDx: 10,
    labelDy: 4,
    labelAnchor: "start",
  },
  {
    country: "Philippines",
    code: "PH",
    city: "Manila",
    lat: 14.6,
    lon: 120.9,
    labelDx: 10,
    labelDy: 4,
    labelAnchor: "start",
  },
  // South Asia cluster — fan around India.
  {
    country: "Nepal",
    code: "NP",
    city: "Kathmandu",
    lat: 27.7,
    lon: 85.3,
    labelDx: -10,
    labelDy: -10,
    labelAnchor: "end",
  },
  {
    country: "Bhutan",
    code: "BT",
    city: "Thimphu",
    lat: 27.5,
    lon: 89.6,
    labelDx: 10,
    labelDy: -10,
    labelAnchor: "start",
  },
];
