// @ai-native-solutions/fallmail-api
// Express HTTP wrapper around @ai-native-solutions/fallmail-sdk.
import express from 'express';
import { FallMail, InProcessLink, MemoryPod, MemoryStore } from '@ai-native-solutions/fallmail-sdk';

const PORT = Number(process.env.PORT || 3020);
const MY_DID = process.env.FALLMAIL_DID || 'did:key:zApiNode' + Math.floor(Math.random() * 1e6);

const identity = { did: MY_DID };
const link = new InProcessLink({ ownId: MY_DID });
const mail = await new FallMail({ fallid: identity, falllink: link, fallpod: new MemoryPod(), fallstore: new MemoryStore() }).ready();

const app = express();
app.use(express.json({ limit: '25mb' }));

app.get('/health', (_req, res) => res.json({ ok: true, service: 'fallmail-api', version: '1.0.0', did: mail.myDid() }));

app.get('/identity', (_req, res) => res.json({ did: mail.myDid() }));

app.post('/send', async (req, res) => {
  try {
    const { toDid, subject, body, attachments } = req.body || {};
    const r = await mail.send(toDid, subject || '', body || '', attachments || []);
    res.json({ ok: true, ...r });
  } catch (e) { res.status(400).json({ ok: false, error: e.message }); }
});

app.get('/inbox',  async (_req, res) => res.json({ ok: true, items: await mail.inbox() }));
app.get('/outbox', async (_req, res) => res.json({ ok: true, items: await mail.outbox() }));
app.get('/drafts', async (_req, res) => res.json({ ok: true, items: await mail.drafts() }));
app.get('/trash',  async (_req, res) => res.json({ ok: true, items: await mail.trash() }));

app.post('/drafts', async (req, res) => {
  try { res.json({ ok: true, record: await mail.saveDraft(req.body || {}) }); }
  catch (e) { res.status(400).json({ ok: false, error: e.message }); }
});
app.delete('/drafts/:id', async (req, res) => {
  await mail.deleteDraft(req.params.id);
  res.json({ ok: true });
});

app.post('/read/:id', async (req, res) => {
  const rec = await mail.read(req.params.id);
  res.json({ ok: !!rec, record: rec });
});
app.delete('/message/:id', async (req, res) => {
  const ok = await mail.delete(req.params.id);
  res.json({ ok });
});
app.post('/restore/:id', async (req, res) => {
  const ok = await mail.restore(req.params.id);
  res.json({ ok });
});

app.post('/inject', async (req, res) => {
  try {
    const rec = await mail._inject(req.body);
    res.json({ ok: true, record: rec });
  } catch (e) { res.status(400).json({ ok: false, error: e.message }); }
});

app.listen(PORT, () => console.log('fallmail-api listening on :' + PORT + ' did=' + mail.myDid()));
