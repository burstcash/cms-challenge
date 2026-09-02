import { db } from "./index";
import { contentItems } from "./schema";

/**
 * One row, so the list page is not empty on first run.
 * Extend this as your schema grows. It is a convenience, not a fixture we check.
 */
async function main() {
  await db.delete(contentItems);
  await db.insert(contentItems).values([
    {
      title: "Autumn hours",
      body: "Our branches move to winter hours on the first Monday of November.",
    },
    {
      title: "Mobile app maintenance",
      body: "The app will be unavailable Sunday from 2am to 4am.",
    },
  ]);
  console.log("Seeded 2 content items.");
}

main();
