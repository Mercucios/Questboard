# Questboard

A project board powered by AI-assisted workflows using Claude Code.

## Features

- Automated issue handling via `@claude` mentions
- AI-assisted code review on pull requests
- GitHub Actions integration with Claude Code

## Usage

### Trigger Claude on Issues or PRs

Mention `@claude` in any issue or pull request comment to get AI assistance:

```
@claude Please review this code and suggest improvements.
```

```
@claude Implement the feature described in this issue.
```

### Automated Code Review

Pull requests automatically receive a Claude Code review when opened or updated.

## Setup

1. Add your `CLAUDE_CODE_OAUTH_TOKEN` to the repository secrets.
2. The workflows in `.github/workflows/` handle the rest automatically.

## Workflows

| Workflow | File | Trigger |
|---|---|---|
| Claude Code | `claude.yml` | Issue/PR comments with `@claude` |
| Claude Code Review | `claude-code-review.yml` | Pull request opened/updated |

## License

MIT
