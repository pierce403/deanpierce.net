---
name: recurse-advice-sync
description: Review https://recurse.bot guidance and adapt useful agent-etiquette, memory, and skill-library advice to deanpierce.net. Use when the user asks to pull down the Recurse guide, check weekly advice, update repo-local skills from Sparkle's conventions, or decide whether new advice belongs in AGENTS.md, SKILLS.md, or a skill folder.
---

# Recurse Advice Sync

## Overview

Use Recurse guidance as a source of patterns, then adapt only the parts that reduce friction for this repository.

## Workflow

1. Fetch the current guide from `https://recurse.bot/`.
2. Extract the sections relevant to repository etiquette, instruction files, memory, skills, and the weekly advice loop.
3. Treat Sparkle's conventions as examples, not universal law.
4. Compare the advice against `AGENTS.md`, `SKILLS.md`, and existing `skills/*/SKILL.md` files.
5. Decide where each useful lesson belongs:
   - `AGENTS.md` for mandatory repo operations and conventions future agents must see.
   - `SKILLS.md` for the compact skill catalog.
   - `skills/<name>/SKILL.md` for reusable procedures.
   - No change for advice that does not fit this repo.
6. Use `curator` when adding, removing, renaming, or materially changing skills.
7. Use `publish-site-change` to validate, commit, push, and verify the update.

## Current Adaptation

This repo currently adopts:

- Root `SKILLS.md` as the compact catalog.
- `skills/<name>/SKILL.md` for detailed procedures.
- `curator` as the default skill for maintaining the skill library.
- `publish-site-change` as the closeout path for the repo's build, commit, push, and deploy rule.

This repo does not currently adopt a root `MEMORY.md` tree. Add one only when the user asks for repo-local memory or a repeated need makes it clearly useful.

## Source Handling

The guide is date-sensitive. Fetch it live when the user asks for the latest Recurse advice, and summarize the relevant changes rather than copying large chunks.
