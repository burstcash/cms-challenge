import { describe, expect, it } from "vitest";
import { contentItems } from "../src/db/schema";

/**
 * A single smoke test so `npm test` works out of the box.
 * Delete it once you have real tests. We do read your tests.
 */
describe("starter scaffold", () => {
  it("exposes a content items table", () => {
    expect(contentItems).toBeDefined();
  });
});
