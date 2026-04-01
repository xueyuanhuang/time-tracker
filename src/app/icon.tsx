import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4h16v2c0 4-3.5 7.5-8 10c4.5 2.5 8 6 8 10v2H8v-2c0-4 3.5-7.5 8-10c-4.5-2.5-8-6-8-10V4z"
            stroke="#18181b"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M11 6c0 3 2.2 5.5 5 7.5C18.8 11.5 21 9 21 6H11z"
            fill="#18181b"
            opacity="0.25"
          />
          <path
            d="M11 26c0-3 2.2-5.5 5-7.5c2.8 2 5 4.5 5 7.5H11z"
            fill="#18181b"
            opacity="0.15"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
