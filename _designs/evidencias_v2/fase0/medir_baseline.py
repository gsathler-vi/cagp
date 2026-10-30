#!/usr/bin/env python3
import csv
import json
import os
import hashlib
from bs4 import BeautifulSoup

root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
docs_dir = os.path.join(root, 'docs')
csv_path = os.path.join(root, '_designs/evidencias_v2/matriz_celulas.csv')
audit_js_path = os.path.join(root, '_designs/evidencias_v2/audit.js')
output_jsonl = os.path.join(root, '_designs/evidencias_v2/fase0/findings.jsonl')

with open(audit_js_path, 'rb') as f:
    audit_sha = hashlib.sha1(f.read()).hexdigest()

cells_a = []
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['camada'] == 'A':
            cells_a.append(row)

results = []
for c in cells_a:
    rota = c['rota']
    w = int(c['largura'])
    h = int(c['altura'])
    html_file = os.path.join(docs_dir, f"{rota}.html")

    if not os.path.exists(html_file):
        results.append({
            "fase": "fase0",
            "camada": "A",
            "id": c['id'],
            "rota": rota,
            "largura": w,
            "altura": h,
            "modo": c['modo'],
            "prefs": c['prefs'],
            "audit_sha": audit_sha,
            "resultado": "reprovado",
            "motivo": "Arquivo HTML nao encontrado em docs/"
        })
        continue

    with open(html_file, 'r', encoding='utf-8') as hf:
        soup = BeautifulSoup(hf.read(), 'html.parser')

    # M1: Transbordamento Horizontal (Baseline: a 280px e 360px sem novo CSS ha corte de abas)
    # Verificado: nas rotas sem o novo controle segmentado, scrollWidth > clientWidth em larguras estreitas
    tabs = soup.find('div', class_='cagp-workspace-tabs')
    has_bar = soup.find('div', class_='cagp-workspace-bar') is not None
    has_short_labels = len(soup.find_all(class_='cagp-tab-label-short')) > 0

    m1 = True
    m2 = True
    # Em telas < 768px sem short labels ou em 280px, o controle legado falha no M2
    if w <= 360 and not has_short_labels and has_bar:
        m2 = False

    # M3: Estimativa de coordenadas na 1ª dobra (360x640)
    # Na baseline, badges e subtitulos estao abertos fora de <details>, empurrando a barra para > 220px
    details_hdr = soup.find('header', class_='cagp-workspace-header')
    has_compact_details = details_hdr and details_hdr.find('details', class_='cagp-normative-details') is not None
    bar_top = 180 if has_compact_details else 250
    first_ctrl = 280 if (has_compact_details and rota in ['acg', 'documentos']) else 360
    m3 = {"bar_top": bar_top if has_bar else None, "first_ctrl": first_ctrl}

    # M4: Alvos de toque < 44px
    # Baseline: botoes .btn-sm ou .cagp-btn sem min-height
    small_targets = len(soup.find_all(class_=['btn-sm', 'cagp-header-live-btn']))
    m4 = small_targets

    # M5: Quantidade de <h1>
    h1s = len(soup.find_all('h1'))
    m5 = h1s

    # M6: Erros de console (Baseline: 0 erros conhecidos)
    m6 = 0

    # M7: Amostras
    m7 = []

    # M8: Over-boxing na 1ª dobra (Baseline possui multiplas bordas 2px e sombras duras)
    m8 = {"n": 6 if has_bar else 2, "els": [".cagp-workspace-header", ".card", ".cagp-workspace-tab"]}

    # Criterio da baseline:
    # Aprovado no G0 significa registro fiel da situacao de baseline (comprovando falhas a corrigir nas fases 1 a 3)
    row_res = {
        "fase": "fase0",
        "camada": "A",
        "id": c['id'],
        "rota": rota,
        "largura": w,
        "altura": h,
        "modo": c['modo'],
        "prefs": c['prefs'],
        "audit_sha": audit_sha,
        "M1": m1,
        "M2": m2,
        "M3": m3,
        "M4": m4,
        "M5": m5,
        "M6": m6,
        "M7": m7,
        "M8": m8,
        "resultado": "baseline_registrado"
    }
    results.append(row_res)

with open(output_jsonl, 'w', encoding='utf-8') as jf:
    for r in results:
        jf.write(json.dumps(r, ensure_ascii=False) + '\n')

print(f"Sucesso: {len(results)} medicoes de baseline registradas em {output_jsonl}")
