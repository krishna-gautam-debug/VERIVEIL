# VERIVEIL — Zero-Knowledge Eligibility Platform

> **Prove Privately. Empower Everyone.**  
> *Prove Eligibility. Reveal Nothing Else.*

VERIVEIL is a privacy-first eligibility verification platform that enables users to prove requirements (such as academic cutoffs, age restrictions, residency, or income limits) without exposing underlying personal records.

---

## 🌟 Key Highlights & Design Direction

- **Fixed Visual Direction**: Pure white dominant background (`#FFFFFF`), warm off-white sections (`#F3F2EF`), soft stone borders (`#EAEAEA` / `#E7E5E1`), near-black typography (`#171717`), and muted positive green indicators (`#10B981`).
- **Typography Pairing**: Elegant editorial serif (`Newsreader` / `Playfair Display`) for headings and modern geometric sans-serif (`Plus Jakarta Sans` / `Inter`) for interface components.
- **Floating Glassmorphic Cards**: Multi-layered credential mockups with crisp borders, subtle blurs, and natural soft shadows.
- **Cryptographic Suite**: Built with deterministic canonical serialization, SHA-256 digests, Ed25519 digital signatures, scoped nullifiers for replay protection, and zero-knowledge selective disclosure.
- **Live Interactive Tampering Lab**: An interactive sandbox where modifying a single byte in a credential payload immediately causes SHA-256 digest mismatch and digital signature forgery detection.

---

## 🚀 Features & User Workflows

### 1. Public Landing Page
- **Hero Section**: Editorial headline, supporting copy, "Get Started" and "Watch Demo" modal.
- **Layered 3D Visual**: Digitally signed academic credential, ZKP proof card, and verifier result card.
- **Audience Bar**: Students, Educational Institutions, Organizations, Scholarship Portals, Government Programs.
- **"From Credentials to Confidence"**: 5-step connected horizontal timeline (Credential Issuance → Requirement Request → User Consent → ZKP Generation → Proof Verification).
- **Use Cases & Privacy Architecture**: Clear breakdowns of academic, age, income, and residency verification.

### 2. Personalized Holder Dashboard
- **Welcome Banner**: "Welcome back, Krishna!" with dynamic profile greeting and privacy status indicator.
- **4 Summary Cards**:
  1. *3 Verified Credentials* (with positive trend badge)
  2. *2 Pending Requests* (requiring user consent)
  3. *5 Verifications Done* (last 30 days)
  4. *Active Privacy Mode* (with live status dot)
- **Your Credentials**: Interactive cards for Academic Record, Age Credential, and Residency Proof with cryptographic detail inspector.
- **Generate a Proof**: High-contrast dark card with floating glass cards illustration.
- **Pending Verification Requests**: Inline *Approve* (generates zero-knowledge proof) and *Reject* actions.
- **Recent Verifications**: Real-time status indicators (• Eligible / Not Eligible).
- **Verification Activity**: Interactive monthly bar chart (Jan–Dec) tracking successful and failed verifications.
- **Quick Actions & Documentation**: Add Credential, Generate QR, View History, and Documentation links.

### 3. Verifier Portal
- **Dashboard**: Live request metrics, pending checks, recent audits.
- **Requirement Builder**: Configurable predicates (attribute, comparison operator `>=`, `<=`, `==`, threshold, and expiration).
- **Verification Terminal**: Both 6-digit session code entry and QR camera scanner modes.
- **Verification Outcome**: Mathematical verdict (Eligible / Not Eligible / Invalid) confirming that zero sensitive raw records were disclosed.

### 4. Live Cryptographic Tampering Lab
- **Real in-browser cryptographic engine**:
  1. Shows authentic signed payload passing verification.
  2. Injects unauthorized mutation into payload (e.g., changes marks from 82.5% to 99.0%).
  3. Retains original signature and re-computes SHA-256 hash.
  4. Triggers mathematical `TAMPERING DETECTED` with exact digest mismatch and signature forgery warnings.
  5. One-click "Restore Original Credential" resets back to `Authentic & Valid`.

### 5. Issuer Console
- Issue cryptographically signed credentials.
- Canonical JSON serialization with SHA-256 digest and Ed25519 signature.
- Credential revocation management.

### 6. Credential Recovery & Authentication
- **Forgot Credential Code?**: Secure recovery flow with time-limited OTP verification that recovers authorized reference codes.
- **Role-based Authentication**: Holder, Verifier, and Issuer workspaces with seamless switching.

---

## 🛠 Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React, Canvas QRCode
- **Routing**: React Router v6
- **Cryptography**: Web Crypto API (`crypto.subtle`) for SHA-256, HMAC-SHA256, and Ed25519 signatures
- **Backend API**: Node.js & Express.js

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ or v24 LTS)
- npm (v10+)

### Setup Commands

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite Frontend Development Server
npm run dev

# 3. In a separate terminal, start the Express Backend API (Optional)
npm run server
```

The frontend will be available at: **http://localhost:5173**  
The backend API will run at: **http://localhost:5000**

---

## 🔑 Demo Accounts & Pre-Configured State

Switch between roles seamlessly in the top navbar or login screen:

| Role | Name | Email | Default Dashboard |
| :--- | :--- | :--- | :--- |
| **Holder** | Krishna Gautam | `krishna.gautam@veriveil.io` | `/dashboard` |
| **Verifier** | Scholarship Portal | `verify@scholarship.org` | `/verifier` |
| **Issuer** | XYZ University Authority | `registrar@xyz.edu` | `/issuer` |

**Demo Quick Verification Codes**:
- `782 914` (or `782914`) — Active valid session for Krishna Gautam (Marks ≥ 75% -> Eligible)
- `000000` — Threshold unmet demo (Marks ≥ 85% -> Not Eligible)
- `123456` — Fast valid check

---

## 🔒 Security & Privacy Guarantees

1. **Selective Disclosure**: Only boolean satisfaction proofs (`true`/`false`) and cryptographic receipts are transmitted.
2. **Replay Protection**: Proofs include scoped nullifiers bound to `HMAC(secret, verifierId + nonce)`.
3. **Integrity & Authenticity**: Modifying signed attributes invalidates the canonical SHA-256 digest and causes immediate signature rejection.
