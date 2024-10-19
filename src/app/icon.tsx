import { ImageResponse } from "next/og";
import { FaUserAstronaut } from "react-icons/fa";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 25,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "999px",
        }}
      >
        <FaUserAstronaut />
      </div>
    ),
    {
      ...size,
    }
  );
}
