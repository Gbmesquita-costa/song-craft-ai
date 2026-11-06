import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("joins class names and drops falsy values", () => {
    expect(cn("px-2", false, undefined, null, "font-bold")).toBe(
      "px-2 font-bold"
    );
  });

  it("supports conditional object syntax", () => {
    expect(cn("btn", { "btn-active": true, "btn-disabled": false })).toBe(
      "btn btn-active"
    );
  });

  it("lets later Tailwind utilities override conflicting earlier ones", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    expect(cn("text-red-500", "text-blue-600")).toBe("text-blue-600");
  });
});
