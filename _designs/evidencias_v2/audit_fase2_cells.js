// _designs/evidencias_v2/audit_fase2_cells.js
const http = require('http');
const fs = require('fs');

function putNewTab(url) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 9222,
      path: '/json/new?' + encodeURIComponent(url),
      method: 'PUT'
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });
}

function closeTab(id) {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 9222,
      path: '/json/close/' + id,
      method: 'GET'
    }, () => resolve());
    req.on('error', () => resolve());
    req.end();
  });
}

const cells = [
  // Camada A: index
  { id: 'A001', camada: 'A', rota: 'index', w: 280, h: 653, modo: 'web', prefs: 'none' },
  { id: 'A002', camada: 'A', rota: 'index', w: 360, h: 640, modo: 'web', prefs: 'none' },
  { id: 'A003', camada: 'A', rota: 'index', w: 768, h: 1024, modo: 'web', prefs: 'none' },
  { id: 'A004', camada: 'A', rota: 'index', w: 1440, h: 900, modo: 'web', prefs: 'none' },
  // Camada A: acg
  { id: 'A025', camada: 'A', rota: 'acg', w: 280, h: 653, modo: 'web', prefs: 'none' },
  { id: 'A026', camada: 'A', rota: 'acg', w: 360, h: 640, modo: 'web', prefs: 'none' },
  { id: 'A027', camada: 'A', rota: 'acg', w: 768, h: 1024, modo: 'web', prefs: 'none' },
  { id: 'A028', camada: 'A', rota: 'acg', w: 1440, h: 900, modo: 'web', prefs: 'none' },
  // Camada A: documentos
  { id: 'A037', camada: 'A', rota: 'documentos', w: 280, h: 653, modo: 'web', prefs: 'none' },
  { id: 'A038', camada: 'A', rota: 'documentos', w: 360, h: 640, modo: 'web', prefs: 'none' },
  { id: 'A039', camada: 'A', rota: 'documentos', w: 768, h: 1024, modo: 'web', prefs: 'none' },
  { id: 'A040', camada: 'A', rota: 'documentos', w: 1440, h: 900, modo: 'web', prefs: 'none' },
  // Camada C: standalone & offline
  { id: 'C009', camada: 'C', rota: 'index', w: 360, h: 640, modo: 'standalone', prefs: 'none' },
  { id: 'C010', camada: 'C', rota: 'index', w: 360, h: 640, modo: 'offline', prefs: 'none' },
  { id: 'C024', camada: 'C', rota: 'acg', w: 360, h: 640, modo: 'standalone', prefs: 'none' },
  { id: 'C025', camada: 'C', rota: 'acg', w: 360, h: 640, modo: 'offline', prefs: 'none' },
  { id: 'C039', camada: 'C', rota: 'documentos', w: 360, h: 640, modo: 'standalone', prefs: 'none' },
  { id: 'C040', camada: 'C', rota: 'documentos', w: 360, h: 640, modo: 'offline', prefs: 'none' }
];

async function run() {
  fs.mkdirSync('_designs/evidencias_v2/fase2', { recursive: true });
  const auditJs = fs.readFileSync('_designs/evidencias_v2/audit.js', 'utf-8');
  const findingsStream = fs.createWriteStream('_designs/evidencias_v2/fase2/findings.jsonl');

  for (const c of cells) {
    const tab = await putNewTab('http://localhost:8080/' + c.rota + '.html');
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = msgId++;
        const handler = (evt) => {
          const d = JSON.parse(evt.data);
          if (d.id === curId) {
            ws.removeEventListener('message', handler);
            resolve(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: c.w, height: c.h, deviceScaleFactor: 1, mobile: c.w < 768 });

    if (c.modo === 'standalone') {
      await send('Runtime.evaluate', {
        expression: `sessionStorage.setItem("cagp_force_app_mode", "true"); cagpSyncViewportMeta(true);`
      });
    } else if (c.modo === 'offline') {
      await send('Network.enable');
      await send('Network.emulateNetworkConditions', {
        offline: true,
        latency: 0,
        downloadThroughput: 0,
        uploadThroughput: 0
      });
    }

    await new Promise(r => setTimeout(r, 600));

    const res = await send('Runtime.evaluate', { expression: auditJs, returnByValue: true });
    let val = {};
    try {
      val = typeof res.result.value === 'string' ? JSON.parse(res.result.value) : (res.result.value || {});
    } catch (e) {
      val = res.result.value || {};
    }

    const record = {
      fase: 'fase2',
      camada: c.camada,
      id: c.id,
      rota: c.rota,
      largura: c.w,
      altura: c.h,
      modo: c.modo,
      prefs: c.prefs,
      M1: val.M1,
      M2: val.M2,
      M3: val.M3,
      M4: val.M4,
      M5: val.M5,
      M6: val.M6,
      M7: val.M7,
      M8: val.M8,
      resultado: (val.M1 && val.M2 && val.M5 === 1 && val.M6 === 0) ? 'APROVADO' : 'PENDENTE'
    };

    findingsStream.write(JSON.stringify(record) + '\n');
    console.log(`[${c.id}] ${c.rota} (${c.w}x${c.h} ${c.modo}): M1=${val.M1} M2=${val.M2} M5=${val.M5} M6=${val.M6} => ${record.resultado}`);

    ws.close();
    await closeTab(tab.id);
  }

  findingsStream.end();
  console.log('\nTodos os registros salvos em _designs/evidencias_v2/fase2/findings.jsonl');
}

run().catch(console.error);
