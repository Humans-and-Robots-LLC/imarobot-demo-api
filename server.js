const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// CORS for browser demo
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

// Fake JWT — looks real but is entirely static
const FAKE_JWT =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9." +
  "eyJpc3MiOiJodW1hbnNhbmRyb2JvdHMuYWkiLCJzdWIiOiJhZ2VudDo" +
  "4ZjNhMWI3YyIsIm5hbWUiOiJPdXRyZWFjaEJvdCIsInNjb3BlcyI6WyJ" +
  "yZWFkOmFjY291bnRzIiwic2VuZDptZXNzYWdlcyJdLCJ0cnVzdCI6ImR" +
  "vbWFpbl92ZXJpZmllZCIsImlhdCI6MTcxMjAwMDAwMCwiZXhwIjoxNzEy" +
  "MDg2NDAwfQ." +
  "MEUCIBp2Yk8x7L3VzQr4jKdF5t0HYw9kN3pXsGzVbRqTcA7uAiEA3fD" +
  "vH8sR1k5YbWmQpZ0xJ7nKcU2wE4gVtL9oR6yXhM";

// Canned agent records
const AGENTS = [
  {
    id: "agent:8f3a1b7c",
    name: "OutreachBot",
    issuer: "humansandrobots.ai",
    scopes: ["read:accounts", "send:messages"],
    trust_level: "domain_verified",
    status: "active",
    registered_at: "2026-03-28T14:22:00Z",
  },
  {
    id: "agent:2d9e4f0a",
    name: "FinanceBot",
    issuer: "humansandrobots.ai",
    scopes: ["read:accounts", "initiate:transfer", "read:transactions"],
    trust_level: "domain_verified",
    status: "active",
    registered_at: "2026-03-30T09:15:00Z",
  },
  {
    id: "agent:c7b51e3d",
    name: "HRBot",
    issuer: "humansandrobots.ai",
    scopes: ["read:employees", "update:records"],
    trust_level: "domain_verified",
    status: "active",
    registered_at: "2026-04-01T11:45:00Z",
  },
  {
    id: "agent:a1f08c92",
    name: "ComplianceBot",
    issuer: "humansandrobots.ai",
    scopes: ["read:audit_logs", "flag:violations"],
    trust_level: "domain_verified",
    status: "active",
    registered_at: "2026-04-02T08:30:00Z",
  },
];

const VERIFICATIONS = [
  { agent_id: "agent:8f3a1b7c", name: "OutreachBot", result: "valid", checked_at: "2026-04-02T17:58:12Z", latency_ms: 12 },
  { agent_id: "agent:2d9e4f0a", name: "FinanceBot", result: "valid", checked_at: "2026-04-02T17:55:44Z", latency_ms: 9 },
  { agent_id: "agent:c7b51e3d", name: "HRBot", result: "valid", checked_at: "2026-04-02T17:50:01Z", latency_ms: 14 },
  { agent_id: "agent:a1f08c92", name: "ComplianceBot", result: "revoked", checked_at: "2026-04-02T17:42:30Z", latency_ms: 11 },
];

// POST /agents/register
app.post("/agents/register", (req, res) => {
  const name = (req.body && req.body.name) || "DemoBot";
  res.json({
    success: true,
    agent: {
      id: "agent:" + Math.random().toString(16).slice(2, 10),
      name,
      issuer: "humansandrobots.ai",
      scopes: req.body?.scopes || ["read:accounts", "send:messages"],
      trust_level: "domain_verified",
      status: "active",
      registered_at: new Date().toISOString(),
    },
    token: FAKE_JWT,
  });
});

// GET /verify/:token
app.get("/verify/:token", (req, res) => {
  res.json({
    valid: true,
    agent: AGENTS[0],
    verified_at: new Date().toISOString(),
    latency_ms: Math.floor(Math.random() * 15) + 5,
  });
});

// GET /demo/agents
app.get("/demo/agents", (req, res) => res.json({ agents: AGENTS }));

// GET /demo/verifications
app.get("/demo/verifications", (req, res) => res.json({ verifications: VERIFICATIONS }));

// GET /health
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`imarobot-demo-api listening on :${PORT}`));
