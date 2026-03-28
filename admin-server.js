import express from 'express'
import { readFileSync, writeFileSync, utimesSync } from 'fs'
import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app  = express()
const PORT = 3006
const DATA = join(__dirname, 'src/data/content.json')

app.use(express.json())
app.use(express.static(join(__dirname, 'admin')))

// ── Read content ──────────────────────────────────────────────────────────────
app.get('/api/content', (_req, res) => {
  try {
    res.json(JSON.parse(readFileSync(DATA, 'utf-8')))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ── Save content ──────────────────────────────────────────────────────────────
app.post('/api/content', (req, res) => {
  try {
    writeFileSync(DATA, JSON.stringify(req.body, null, 2))
    // Touch content.js so Vite's file-watcher picks up the change and hot-reloads
    const contentJs = join(__dirname, 'src/data/content.js')
    const now = new Date()
    utimesSync(contentJs, now, now)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ── Deploy (git add → commit → push) ─────────────────────────────────────────
app.post('/api/deploy', (_req, res) => {
  const cmd = 'git add src/data/content.json && git commit -m "Update portfolio content" && git push'
  exec(cmd, { cwd: __dirname }, (err, stdout, stderr) => {
    res.json({
      ok:     !err,
      output: stdout || stderr || (err ? err.message : 'Done'),
    })
  })
})

app.listen(PORT, () => {
  console.log(`\n  Portfolio Admin Panel`)
  console.log(`  ─────────────────────────────────────────`)
  console.log(`  Local:   http://localhost:${PORT}`)
  console.log(`  ─────────────────────────────────────────`)
  console.log(`  Editing: src/data/content.json`)
  console.log(`  Run "npm run dev" in another terminal for live preview\n`)
})
