"use client";

type SectionLinkProps = {
  targetId: string;
  label: string;
  variant?: "primary" | "secondary";
};

export function SectionLink({ targetId, label, variant = "primary" }: SectionLinkProps) {
  return (
    <button
      className={`actionButton ${variant === "secondary" ? "secondary" : ""}`}
      onClick={() => {
        const element = document.getElementById(targetId);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", window.location.pathname);
      }}
      type="button"
    >
      {label}
    </button>
  );
}
