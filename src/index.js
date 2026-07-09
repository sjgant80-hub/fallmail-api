// fallmail-api · Express HTTP wrapper around fallmail-sdk · MIT · AI-Native Solutions
import express from 'express';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => res.json({ ok: true, tool: 'fallmail', version: '1.0.0' }));

app.post('/boot', async (req, res) => {
  try {
    const { boot } = await import('@ai-native-solutions/fallmail-sdk');
    const out = typeof boot === 'function' ? await boot(req.body) : { error: 'boot not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/refreshPeers', async (req, res) => {
  try {
    const { refreshPeers } = await import('@ai-native-solutions/fallmail-sdk');
    const out = typeof refreshPeers === 'function' ? await refreshPeers(req.body) : { error: 'refreshPeers not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/refresh', async (req, res) => {
  try {
    const { refresh } = await import('@ai-native-solutions/fallmail-sdk');
    const out = typeof refresh === 'function' ? await refresh(req.body) : { error: 'refresh not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/renderList', async (req, res) => {
  try {
    const { renderList } = await import('@ai-native-solutions/fallmail-sdk');
    const out = typeof renderList === 'function' ? await renderList(req.body) : { error: 'renderList not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/renderPreview', async (req, res) => {
  try {
    const { renderPreview } = await import('@ai-native-solutions/fallmail-sdk');
    const out = typeof renderPreview === 'function' ? await renderPreview(req.body) : { error: 'renderPreview not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/escapeHtml', async (req, res) => {
  try {
    const { escapeHtml } = await import('@ai-native-solutions/fallmail-sdk');
    const out = typeof escapeHtml === 'function' ? await escapeHtml(req.body) : { error: 'escapeHtml not callable' };
    res.json(out);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('fallmail-api listening on :' + PORT));
