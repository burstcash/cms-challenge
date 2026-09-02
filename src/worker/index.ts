/**
 * Background worker.
 *
 * Runs as a separate process: `npm run worker`, alongside `npm run dev`.
 *
 * Right now it ticks and does nothing. What it should do, and whether you need
 * it at all, is up to you. It exists because a scheduled publish has to survive
 * this process restarting, and an in-memory timer inside the web app does not.
 */
const TICK_MS = 1_000;

async function tick() {
  // Your work goes here.
}

async function main() {
  console.log(`Worker started. Ticking every ${TICK_MS}ms. Ctrl-C to stop.`);
  for (;;) {
    try {
      await tick();
    } catch (err) {
      console.error("Tick failed:", err);
    }
    await new Promise((resolve) => setTimeout(resolve, TICK_MS));
  }
}

main();
