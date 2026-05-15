// Build the SVG path for the world's landmass once, projected into the
// 1000x500 equirectangular viewBox used by WorldFootprint.

import landTopo from "world-atlas/land-110m.json";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

type Coord = [number, number];
type Ring = Coord[];
type Polygon = Ring[];

const projectLonLat = (lon: number, lat: number) => ({
  x: ((lon + 180) * 1000) / 360,
  y: ((90 - lat) * 500) / 180,
});

function ringToSubpath(ring: Ring): string {
  let d = "";
  for (let i = 0; i < ring.length; i++) {
    const [lon, lat] = ring[i];
    const { x, y } = projectLonLat(lon, lat);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + "Z";
}

function buildPath(): string {
  // world-atlas land-110m: a Topology with `objects.land` as a
  // GeometryCollection containing a single MultiPolygon for all landmass.
  const topology = landTopo as unknown as Topology<{
    land: GeometryCollection;
  }>;
  const collection = feature(topology, topology.objects.land);
  const polygons: Polygon[] = [];
  for (const f of collection.features) {
    const g = f.geometry;
    if (g.type === "Polygon") {
      polygons.push(g.coordinates as Polygon);
    } else if (g.type === "MultiPolygon") {
      for (const poly of g.coordinates) polygons.push(poly as Polygon);
    }
  }
  return polygons.flat().map(ringToSubpath).join(" ");
}

export const LAND_PATH = buildPath();
