import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(3333, () => {
  console.log('🔥 Server started 🔥');
});
