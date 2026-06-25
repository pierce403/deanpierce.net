---
name: curator
description: Create, revise, consolidate, and prune the repo-local skill library for deanpierce.net. Use when adding or editing SKILLS.md, changing files under skills/, importing reusable guidance from recurse.bot, or turning repeated repository workflows into durable procedures.
---

# Curator

## Overview

Maintain this repository's skill catalog as a small set of reusable procedures, not a pile of one-off notes. Keep `SKILLS.md` compact and put task details in `skills/<name>/SKILL.md`.

## Workflow

1. Read `SKILLS.md`, `AGENTS.md`, and any existing skill being changed.
2. Decide whether the lesson belongs in `AGENTS.md`, an existing skill, a new skill, or nowhere.
3. Prefer updating an existing skill when the procedure is closely related. Create a new skill only when it has a distinct trigger and workflow.
4. Keep each `SKILL.md` concise: required YAML frontmatter with only `name` and `description`, then actionable instructions.
5. Keep `description` trigger-focused because it is the part agents see before loading the skill body.
6. Add `references/`, `scripts/`, or `assets/` only when they reduce repeated work or keep bulky details out of `SKILL.md`.
7. Update `SKILLS.md` whenever skills are added, renamed, removed, or materially repurposed.
8. Update `AGENTS.md` if the change creates a new repository convention that future agents must know.

## Skill Shape

Use this minimum shape:

```markdown
---
name: skill-name
description: What the skill does, plus concrete triggers for when to use it.
---

# Skill Name

## Overview

One or two sentences.

## Workflow

Actionable steps.
```

## Validation

Run the available validator after structural changes:

```bash
python3 /home/pierce/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/<name>
```

Then search `SKILLS.md` and `skills/` for leftover scaffold markers before committing.
