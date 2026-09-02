# CMS build exercise

Thanks for taking the time. This repo is the starting point, not a puzzle to solve. It is plain CRUD on a single table, and none of the four requirements below are implemented.

**Time.** Aim for about eight hours. You have one week. There is more here than eight hours holds, on purpose. Deciding what to build and what to leave is part of the exercise. If you run out of time, stop and tell us what you skipped and why. We would rather read that than get a complete submission that ate your weekend.

**Tools.** Use whatever AI coding agents and dev tools you normally use. Claude Code, Codex, Cursor, all fine, and we would rather you did. That is how the job works here, and how you use them is part of what we are evaluating. Please keep and send your session logs or prompt history.

---

## Setup

Requires Node 20 or newer.

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000. You should see two seeded items and be able to create and edit them.

The background worker runs as a separate process:

```bash
npm run worker
```

| Command | Does |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run worker` | Background worker, separate process |
| `npm run db:generate` | Generate a migration from `src/db/schema.ts` |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:seed` | Reset and reseed content |
| `npm run db:reset` | Delete the database, migrate, reseed |
| `npm test` | Vitest |
| `npm run typecheck` | `tsc --noEmit` |

If setup does not work on your machine, tell us. That is a bug in our repo, not a mark against you.

---

## What to build

A content management system where editors work on drafts and publish them live.

### Must have

1. **Draft and live are separate.** Editing the draft does not change what is live.
2. **Publishing is atomic.** A crash partway through a publish must never leave the live version half-written.
3. **Concurrent edits do not silently clobber.** Two editors working on the same item must not quietly overwrite each other.
4. **Scheduled publishing.** An editor can schedule an item to go live later, and it must still happen if the process restarts before then.

### Only if you have time

- Version history with rollback
- A draft-versus-live diff view
- A preview of the draft

### The UI needs

- A list of items showing which ones have a draft that differs from live
- An editor for a single item
- Publish and schedule controls
- Some way to see that a scheduled publish is pending

Items can be just a title and a body. We do not care about rich text, media uploads, authentication, roles and permissions, or deployment. None of that is evaluated. Spend the time on the four must-haves.

---

## What is already here

Next.js App Router, TypeScript, tRPC, Drizzle and SQLite. Everything is wired and running so you are not spending hour one on setup.

| Path | What it is |
| --- | --- |
| `src/db/schema.ts` | Starter schema. One table. Models no drafts, no publishing, no scheduling. |
| `src/db/seed.ts` | Two rows so the list is not empty |
| `src/server/router.ts` | Starter tRPC router. Plain CRUD. `update` is last-write-wins. |
| `src/app/page.tsx` | Item list |
| `src/app/items/[id]/page.tsx` | Item editor |
| `src/worker/index.ts` | Worker that ticks and does nothing yet |
| `src/app/globals.css` | Deliberately plain styles |

The stack is fixed, so please stay on Next.js, tRPC, Drizzle and SQLite. Everything inside it is yours: change the schema, replace the router, throw out the styles, restructure directories. Nothing in here is a constraint to work around, and the starter code is not a design we are attached to.

Two spots are worth reading before you start. `src/db/schema.ts` deliberately does not model draft, live, publishing or scheduling, because designing that is the exercise and the schema is the first thing we read. And `src/worker/index.ts` exists because a scheduled publish has to survive that process restarting, which an in-memory timer inside the web app does not.

---

## What to send us

1. **This repo**, with your work in it. Commit history is useful to us, so please do not squash everything into one commit.
2. **A pull request against your own `main`**, using the PR template in `.github/`. Treat it as though a colleague has to review and ship it.
3. **A `README` section or separate file with evidence.** Show us it works. Real command output, request and response pairs, test output, screenshots, or a short recording. Not a description of what you tested.
4. **`DECISIONS.md`**, filled in. The stub explains what we are after.
5. **Your agent session logs or prompt history.** Whatever form they come in.

---

## How we read it

Evidence and `DECISIONS.md` first, then the schema, then the code. That is the order we read each other's work here.

We are not counting lines and we are not impressed by a large framework. A small, boring, well-evidenced submission with clear reasoning beats a clever one. Scope decisions are evaluated as much as code is.

There is no hidden test suite. We read the submission ourselves, and some of what we are looking for is judgment rather than passing output. If part of this brief seems underspecified, say so. Emailing us a question during the week is a good thing to do, not an imposition.

---

## One thing to know up front

At the in-person round we will introduce bugs into this codebase and ask you to find them while we watch, on your laptop with your own tools. Build something you can still navigate a week later. That is a hint about what to optimize for.

---

Questions: reply to the thread we sent this on. We answer quickly and it does not count against you.
