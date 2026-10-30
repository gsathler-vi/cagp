#!/usr/bin/env bash
set -euo pipefail
root="$(git rev-parse --show-toplevel)"
cd "$root"

echo "=== VERIFICAÇÃO DE INTEGRIDADE FACTUAL (Zero Supressão) ==="
pattern='[0-9]{4}-[0-9]{4}|\(31\)[^ ]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+|F-20[0-9]{2}|Art\. ?[0-9]+|DCP ?[0-9]{3}'

tmp_head="/tmp/cagp_fatos_head.txt"
tmp_curr="/tmp/cagp_fatos_curr.txt"

# Extrair fatos do commit base HEAD
for f in *.qmd; do
  if git cat-file -e "HEAD:$f" 2>/dev/null; then
    git show "HEAD:$f" | grep -oE "$pattern" || true
  fi
done | sort -u > "$tmp_head"

# Extrair fatos do estado atual
for f in *.qmd; do
  grep -oE "$pattern" "$f" || true
done | sort -u > "$tmp_curr"

# Verificar se algum fato foi removido
missing="$(comm -23 "$tmp_head" "$tmp_curr")"
if [ -n "$missing" ]; then
  echo "FALHA: Fatos presentes no HEAD foram removidos no estado atual:"
  echo "$missing"
  exit 1
else
  echo "SUCESSO: Zero dados factuais ou regimentais removidos! (Total: $(wc -l < "$tmp_curr") itens verificados)"
fi
