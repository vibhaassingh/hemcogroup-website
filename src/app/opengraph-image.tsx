import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hemco Group — A house of industries, built in India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "linear-gradient(135deg, #0a1f0c 0%, #16341c 55%, #0a1f0c 100%)",
          color: "#f3ead2",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            letterSpacing: "0.32em",
            fontSize: 22,
            color: "#d4b86a",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 56,
              height: 1,
              background: "#d4b86a",
              marginRight: 20,
            }}
          />
          Hemco Group · India · Est. 1998
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            A house of industries,
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
              color: "#d4b86a",
            }}
          >
            built in India.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "rgba(243, 234, 210, 0.7)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>Eleven brands · Seven sectors</span>
          <span>hemcogroup.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
