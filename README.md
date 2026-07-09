# @ai-native-solutions/fallmail-api

Express HTTP wrapper around [`@ai-native-solutions/fallmail-sdk`](https://github.com/sjgant80-hub/fallmail-sdk) — call FallMail from any language over HTTP.

## Run

```bash
npm i -g @ai-native-solutions/fallmail-api
FALLMAIL_DID=did:key:zYourDid PORT=3020 fallmail-api
```

## Docker

```bash
docker compose up -d
```

## Endpoints

| Method | Path | Body | Description |
|---|---|---|---|
| GET  | `/health`       | — | health probe |
| GET  | `/identity`     | — | `{ did }` |
| POST | `/send`         | `{ toDid, subject, body, attachments? }` | encrypt + ship |
| GET  | `/inbox`        | — | inbox items |
| GET  | `/outbox`       | — | sent items |
| GET  | `/drafts`       | — | drafts |
| GET  | `/trash`        | — | trash |
| POST | `/drafts`       | `{ id?, toDid, subject, body }` | save/update draft |
| DELETE | `/drafts/:id` | — | delete draft |
| POST | `/read/:id`     | — | mark read |
| DELETE | `/message/:id`| — | move to trash |
| POST | `/restore/:id`  | — | restore from trash |
| POST | `/inject`       | wire envelope | debug: inject envelope |

## curl smoke

```bash
curl -s localhost:3020/health
curl -s localhost:3020/identity
curl -s -XPOST localhost:3020/send -H 'content-type: application/json' \
  -d '{"toDid":"did:key:zBob","subject":"hi","body":"sovereign"}'
curl -s localhost:3020/outbox
```

## License

MIT
