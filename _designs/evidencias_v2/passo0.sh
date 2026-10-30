#!/usr/bin/env bash
set -euo pipefail
root="$(git rev-parse --show-toplevel)"
plan="$root/AGENTS.md"
paths="$(grep -o '`\(impeccable\|apple-design\|m3-expressive\|quarto-authoring\|brand-yml\|alt-text\)/[^`]*\.md`' "$plan" | tr -d '`' | sort -u)"
count="$(printf '%s\n' "$paths" | wc -l)"
if [ "$count" -lt 40 ]; then
  echo "ERRO: Poucos caminhos detectados ($count)"
  exit 1
fi
bad=0
while read -r p; do
  if [ ! -f "$root/.agents/skills/$p" ]; then
    echo "CAMINHO AUSENTE: $p"
    bad=1
  fi
done <<< "$paths"
if [ "$bad" -eq 0 ]; then
  echo "OK: Todos os $count caminhos de skills em AGENTS.md existem no disco!"
fi
exit $bad
