import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout
import AppLayout from './components/layout/AppLayout';

// Public & Auth Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotCodePage from './pages/auth/ForgotCodePage';

// Holder Pages
import HolderDashboard from './pages/holder/HolderDashboard';
import CredentialsPage from './pages/holder/CredentialsPage';
import VerificationRequestsPage from './pages/holder/VerificationRequestsPage';
import GenerateProofPage from './pages/holder/GenerateProofPage';
import QRCodePage from './pages/holder/QRCodePage';

// Verifier Pages
import VerifierDashboard from './pages/verifier/VerifierDashboard';
import CreateRequestPage from './pages/verifier/CreateRequestPage';
import VerifyCodePage from './pages/verifier/VerifyCodePage';
import LiveTamperingLab from './pages/verifier/LiveTamperingLab';

// Issuer Pages
import IssuerDashboard from './pages/issuer/IssuerDashboard';
import IssueCredentialPage from './pages/issuer/IssueCredentialPage';

// Common Pages
import HistoryPage from './pages/common/HistoryPage';
import ProfilePage from './pages/common/ProfilePage';
import DocumentationPage from './pages/common/DocumentationPage';
import NotFoundPage from './pages/common/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication & Recovery */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-code" element={<ForgotCodePage />} />

          {/* Authenticated Workspace Shell */}
          <Route element={<AppLayout />}>
            {/* Holder Routes */}
            <Route path="/dashboard" element={<HolderDashboard />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/requests" element={<VerificationRequestsPage />} />
            <Route path="/generate-proof" element={<GenerateProofPage />} />
            <Route path="/qr-code" element={<QRCodePage />} />

            {/* Verifier Routes */}
            <Route path="/verifier" element={<VerifierDashboard />} />
            <Route path="/verifier/create-request" element={<CreateRequestPage />} />
            <Route path="/verifier/verify" element={<VerifyCodePage />} />
            <Route path="/verifier/results" element={<HistoryPage />} />

            {/* Live Tampering Lab */}
            <Route path="/tamper-lab" element={<LiveTamperingLab />} />

            {/* Issuer Routes */}
            <Route path="/issuer" element={<IssuerDashboard />} />
            <Route path="/issuer/issue" element={<IssueCredentialPage />} />
            <Route path="/issuer/credentials" element={<IssuerDashboard />} />
            <Route path="/issuer/keys" element={<DocumentationPage />} />

            {/* Common Authenticated Routes */}
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<ProfilePage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
          </Route>

          {/* 404 Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
