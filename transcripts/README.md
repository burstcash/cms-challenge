# Transcripts

Your agent session logs go in this folder, whichever tool you used. We want them
as text. We read them to see how you worked, not to grade your tooling.

**Claude Code.** Run `/export` in the session and commit the file, or commit the
raw JSONL from `~/.claude/projects/<project>/<session-id>.jsonl`.

**Codex, or any other terminal-based agent.** Record with
`asciinema rec session.cast` and commit the `.cast` file. A `script -q
session.txt` capture, or scrollback saved straight to a file, works as well.

**Cursor, Copilot Chat, Windsurf, or another editor GUI.** Use the tool's own
export if it has one. Otherwise select the whole thread and paste it into a
`.md` file here.

**A browser chat, like claude.ai or ChatGPT.** Paste the conversation into a
`.md` file, or commit a share link inside one.

One file per session, named so we can read them in order. Sessions can get
large, because tool results include the full contents of every file the agent
read. Gzipping anything big is fine.
