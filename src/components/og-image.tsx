import React from "react";

export default function OgImage({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#171717",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          fontSize: "2.5rem",
          lineHeight: 1,
          background: "rgb(112,5,220)",
          color: "#fff",
          padding: "1rem 1.75rem",
          borderRadius: 9999,
        }}
      >
        {`tuna.one${url ? `/${url}` : ""}`}
      </div>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          position: "absolute",
          bottom: 100,
          left: 60,
          width: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#fff",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "5.25rem",
              lineHeight: 1,
              fontWeight: 600,
            }}
          >
            {title}
          </span>
        </div>
        {description && (
          <span
            style={{ fontSize: "2.5rem", color: "#fff", lineHeight: "2.75rem" }}
          >
            {description}
          </span>
        )}
      </span>
    </div>
  );
}

export class OpenGraphImage {}
