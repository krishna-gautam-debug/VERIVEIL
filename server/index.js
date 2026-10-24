import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory persistent database for server runtime
let users = [
  {
    id: 'usr_krishna_772',
    name: 'Krishna Gautam',
    username: 'krishnag',
    email: 'krishna.gautam@veriveil.io',
    role: 'holder',
    memberSince: 'Oct 2024'
  }
];

let credentials = [
  {
    credentialId: 'CRD-ACAD-2024-001',
    credentialRef: 'VV-ACAD-9921',
    credentialType: 'Academic Record',
    issuer: 'XYZ University',
    holderId: 'usr_krishna_772',
    holderName: 'Krishna Gautam',
    status: 'Verified',
    validTill: 'Dec 2026',
    payload: {
      degree: 'B.Tech in Computer Science',
      graduationYear: 2025,
      attributes: {
        marksPercentage: 82.5,
        gpa: 3.85
      }
    }
  }
];

let verificationSessions = [
  {
    code: '782914',
    holderId: 'usr_krishna_772',
    status: 'Active',
    createdAt: Date.now(),
    expiresAt: Date.now() + 5 * 60 * 1000
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'VeriVeil Backend Enclave', timestamp: new Date().toISOString() });
});

// Auth Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const user = users.find(u => u.email === email) || {
    id: `usr_${Date.now()}`,
    name: email.split('@')[0],
    email,
    role: role || 'holder',
    memberSince: 'Oct 2024'
  };
  res.json({ success: true, user, token: 'mock_jwt_session_token_' + Date.now() });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, username, email, role } = req.body;
  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    username,
    email,
    role: role || 'holder',
    memberSince: 'Today'
  };
  users.push(newUser);
  res.status(201).json({ success: true, user: newUser });
});

// Credentials Endpoints
app.get('/api/credentials', (req, res) => {
  res.json({ credentials });
});

app.post('/api/credentials/issue', (req, res) => {
  const { holderName, holderEmail, credentialType, attributes } = req.body;
  const credId = `CRD-${Date.now().toString().slice(-6)}`;
  const credRef = `VV-${credentialType.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const canonicalPayload = {
    credentialType,
    holderName,
    holderEmail,
    attributes,
    timestamp: new Date().toISOString()
  };

  const digest = crypto.createHash('sha256').update(JSON.stringify(canonicalPayload)).digest('hex');

  const newCred = {
    credentialId: credId,
    credentialRef: credRef,
    credentialType,
    issuer: 'Authorized Educational Bureau',
    holderName,
    status: 'Verified',
    validTill: 'Oct 2027',
    payload: canonicalPayload,
    payloadDigest: digest,
    signature: crypto.createHmac('sha256', 'SERVER_ISSUER_KEY').update(digest).digest('hex')
  };

  credentials.push(newCred);
  res.status(201).json({ success: true, credential: newCred });
});

// Proof & Session Verification
app.post('/api/verify-session', (req, res) => {
  const { sessionCode } = req.body;
  const cleaned = String(sessionCode).replace(/\s+/g, '');
  const session = verificationSessions.find(s => s.code === cleaned);

  if (!session || Date.now() > session.expiresAt) {
    return res.status(400).json({ valid: false, error: 'Session code invalid or expired' });
  }

  res.json({
    valid: true,
    outcome: 'Eligible',
    condition: 'Academic Marks ≥ 75%',
    nullifier: '0x' + crypto.randomBytes(16).toString('hex')
  });
});

app.listen(PORT, () => {
  console.log(`[VERIVEIL] Server running on http://localhost:${PORT}`);
});
