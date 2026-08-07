"use client";

import { useParams } from "next/navigation";

export default function ResumeBuilder() {
  const { id } = useParams();

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6">
      <div>
        <h2>Resume Form</h2>
      </div>

      <div>
        <h2>Preview</h2>

        <p>Selected Template: {id}</p>
      </div>
    </div>
  );
}
