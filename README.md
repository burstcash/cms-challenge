# CMS build exercise

A take-home for the Technical Support Engineer role at Glide.

Budget about eight hours, and take up to a week. There is more here than eight hours holds. Choosing what to build and what to skip is part of the exercise, so if you run out of time, write down what you left and why.

Use whatever AI coding agents you normally use. Claude Code, Codex, Cursor, all fine. Keep your session logs and send them with your submission.

## Setup

Node 20 or newer.

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000. Two seeded items should appear, and you should be able to create and edit them.

The background worker is a separate process:

```bash
npm run worker
```

If setup fails, tell us. That is our bug. Email vishnu@withglide.com.

| Command | Does |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run worker` | Background worker |
| `npm run db:generate` | Generate a migration from `src/db/schema.ts` |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:seed` | Reset and reseed content |
| `npm run db:reset` | Drop the database, migrate, reseed |
| `npm test` | Vitest |
| `npm run typecheck` | `tsc --noEmit` |

## What to build

A CMS where editors work on drafts and publish them live.

Required:

1. **Draft and live are separate.** Editing a draft does not change what is live.
2. **Publishing is atomic.** A crash partway through a publish must not leave the live version half-written.
3. **Concurrent edits do not silently clobber.** Two editors on one item must not overwrite each other without anyone noticing.
4. **Scheduled publishing.** An editor can schedule an item to go live later. The schedule survives a process restart.

Optional, only with time left over: version history with rollback, a draft-versus-live diff, a draft preview.

The UI needs a list showing which items have unpublished changes, an editor for one item, publish and schedule controls, and some indication that a scheduled publish is pending.

An item can be a title and a body. Skip rich text, media uploads, authentication, roles, and deployment. None of it is evaluated.

## What is already here

Next.js App Router, TypeScript, tRPC, Drizzle, SQLite. Wired and running.

| Path | What it is |
| --- | --- |
| `src/db/schema.ts` | One table: id, title, body, timestamps |
| `src/db/seed.ts` | Two rows |
| `src/server/router.ts` | tRPC router. CRUD only. `update` is last-write-wins. |
| `src/app/page.tsx` | Item list |
| `src/app/items/[id]/page.tsx` | Item editor |
| `src/worker/index.ts` | Worker loop that currently does nothing |
| `src/app/globals.css` | Minimal styles |

Stay on this stack. Everything inside it is yours. Change the schema, replace the router, delete the styles, restructure directories.

Two notes. The starter schema models no draft, no live version, no publishing and no scheduling, because designing that is the exercise. The worker exists because requirement 4 rules out an in-memory timer in the web app.

## What to send

1. Your copy of this repo, with commit history. Please do not squash it into one commit. Keep it private, and add all three of us as read collaborators so we can open it:

   | GitHub | Email |
   | --- | --- |
   | `vishnuchakr` | vishnu@withglide.com |
   | `coreyloftus` | corey@withglide.com |
   | `JoeWithGlide` | joseph@withglide.com |

   If a GitHub handle does not resolve, invite the email address instead, or just email us a link.

2. A pull request against your own `main`, using the PR template in `.github/`.
3. Evidence that it works, in the PR or the README. Command output, request and response pairs, test output, screenshots, or a recording. Cover the cases above, not the happy path.
4. `DECISIONS.md`, filled in. The stub explains what goes in it.
5. Your agent session logs.

Send the submission to vishnu@withglide.com, copying corey@withglide.com and joseph@withglide.com.

## How we read it

Evidence and `DECISIONS.md` first, then the schema, then the code.

Small and well-evidenced beats large and clever. Scope decisions count for as much as the code does.

There is no hidden test suite. We read the submission ourselves, and part of what we are reading for is judgment rather than output.

If something here is underspecified, ask. Questions during the week are welcome and are not held against you. vishnu@withglide.com.

## The next round

At the in-person round we will introduce bugs into this codebase and ask you to find them while we watch, on your laptop with your own tools. Build something you can still navigate a week later.
