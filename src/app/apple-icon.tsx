import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)",
          borderRadius: 40,
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="120"
          height="120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 4h16v2c0 4-3.5 7.5-8 10c4.5 2.5 8 6 8 10v2H8v-2c0-4 3.5-7.5 8-10c-4.5-2.5-8-6-8-10V4z"
            stroke="#fafafa"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M11 6c0 3 2.2 5.5 5 7.5C18.8 11.5 21 9 21 6H11z"
            fill="#fafafa"
            opacity="0.3"
          />
          <path
            d="M11 26c0-3 2.2-5.5 5-7.5c2.8 2 5 4.5 5 7.5H11z"
            fill="#fafafa"
            opacity="0.2"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
