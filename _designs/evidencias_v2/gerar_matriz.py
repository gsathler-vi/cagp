#!/usr/bin/env python3
import csv
import os

all_routes = [
    'index', 'curso', 'calouros', 'pesquisa', 'percurso',
    'optativas', 'acg', 'estagio', 'tcc', 'documentos',
    'faq', 'sobre', 'gestao', 'mapa-do-site', 'estagio-tcc'
]

routes_b = ['calouros', 'faq', 'estagio', 'optativas']
routes_c = ['index', 'acg', 'documentos', 'percurso']

cells = []
cell_id = 1

# 1. Camada A (60 celulas)
for r in all_routes:
    for w, h in [(280, 653), (360, 640), (768, 1024), (1440, 900)]:
        cells.append({
            'id': f"A{cell_id:03d}",
            'camada': 'A',
            'rota': r,
            'largura': w,
            'altura': h,
            'modo': 'web',
            'prefs': 'none'
        })
        cell_id += 1

# 2. Camada B (32 celulas)
b_specs = [
    (360, 640, 'web', 'contrast'),
    (360, 640, 'web', 'dyslexia'),
    (360, 640, 'web', 'font-xl'),
    (360, 640, 'web', 'reduced-motion'),
    (360, 640, 'web', 'dark'),
    (360, 640, 'web', 'print'),
    (700, 900, 'web', 'none'),
    (640, 360, 'web', 'none')
]
cell_id_b = 1
for r in routes_b:
    for w, h, modo, prefs in b_specs:
        cells.append({
            'id': f"B{cell_id_b:03d}",
            'camada': 'B',
            'rota': r,
            'largura': w,
            'altura': h,
            'modo': modo,
            'prefs': prefs
        })
        cell_id_b += 1

# 3. Camada C (60 celulas)
c_specs = [
    (360, 640, 'web', 'contrast'),
    (360, 640, 'web', 'dyslexia'),
    (360, 640, 'web', 'font-xl'),
    (360, 640, 'web', 'reduced-motion'),
    (360, 640, 'web', 'dark'),
    (360, 640, 'web', 'print'),
    (360, 640, 'web', 'zoom200'),
    (360, 640, 'web', 'keyboard'),
    (360, 640, 'standalone', 'none'),
    (360, 640, 'offline', 'none'),
    (412, 915, 'web', 'none'),
    (700, 900, 'web', 'none'),
    (507, 800, 'web', 'none'),
    (1024, 768, 'web', 'none'),
    (640, 360, 'web', 'none')
]
cell_id_c = 1
for r in routes_c:
    for w, h, modo, prefs in c_specs:
        cells.append({
            'id': f"C{cell_id_c:03d}",
            'camada': 'C',
            'rota': r,
            'largura': w,
            'altura': h,
            'modo': modo,
            'prefs': prefs
        })
        cell_id_c += 1

output_csv = os.path.join(os.path.dirname(__file__), 'matriz_celulas.csv')
with open(output_csv, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['id', 'camada', 'rota', 'largura', 'altura', 'modo', 'prefs'])
    writer.writeheader()
    writer.writerows(cells)

print(f"Sucesso: {len(cells)} celulas geradas em {output_csv}")