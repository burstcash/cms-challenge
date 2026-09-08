# Transcripts

Your agent session logs go in this folder. We read them to see how you worked,
not to grade your tooling.

If you used Claude Code, run `/export` in the session and commit the file, or
commit the raw JSONL from `~/.claude/projects/<project>/<session-id>.jsonl`.

If you used any terminal-based agent, Codex included, record it with
`asciinema rec session.cast` and commit the `.cast` file.

If you used Cursor or another GUI tool, record the hardest ten minutes and
commit that. We do not want the whole session.

Sessions can get large, because tool results include the full contents of every
file the agent read. Gzipping anything big is fine.
