import React, { createContext, useContext, useState, useEffect } from 'react';
import { sha256, signPayload, verifyCredential, generateZKPProof } from '../utils/crypto';

const AppContext = createContext(null);

const DEFAULT_USER = {
  id: 'usr_krishna_772',
  name: 'Krishna Gautam',
  username: 'krishnag',
  email: 'krishna.gautam@veriveil.io',
  role: 'holder', // 'holder', 'verifier', 'issuer'
  memberSince: 'Oct 2024',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  privacyMode: true,
};

const INITIAL_CREDENTIALS_RAW = [
  {
    credentialId: 'CRD-ACAD-2024-001',
    credentialRef: 'VV-ACAD-9921',
    credentialType: 'Academic Record',
    issuer: 'XYZ University',
    issuerKeyId: 'KEY-XYZ-PUB-2024',
    issueDate: '2024-09-10',
    expirationTimestamp: '2026-12-31T23:59:59Z',
    revoked: false,
    holderName: 'Krishna Gautam',
    status: 'Verified',
    validTill: 'Dec 2026',
    iconType: 'academic',
    payload: {
      credentialType: 'Academic Record',
      holderId: 'usr_krishna_772',
      institution: 'XYZ University',
      degree: 'B.Tech in Computer Science',
      graduationYear: 2025,
      attributes: {
        marksPercentage: 82.5,
        gpa: 3.85,
        major: 'Computer Science',
        enrolledStatus: 'Active Graduate'
      }
    }
  },
  {
    credentialId: 'CRD-AGE-2024-082',
    credentialRef: 'VV-AGE-4412',
    credentialType: 'Age Credential',
    issuer: 'Govt. Authority (Mock)',
    issuerKeyId: 'KEY-GOV-PUB-2024',
    issueDate: '2024-01-15',
    expirationTimestamp: '2030-01-15T23:59:59Z',
    revoked: false,
    holderName: 'Krishna Gautam',
    status: 'Verified',
    validTill: 'Jan 2030',
    iconType: 'user',
    payload: {
      credentialType: 'Age Credential',
      holderId: 'usr_krishna_772',
      issuingAuthority: 'Govt. Identity Bureau',
      attributes: {
        age: 22,
        isOver18: true,
        isOver21: true,
        legalStatus: 'Citizen'
      }
    }
  },
  {
    credentialId: 'CRD-RES-2024-119',
    credentialRef: 'VV-RES-3829',
    credentialType: 'Residency Proof',
    issuer: 'Local Authority (Mock)',
    issuerKeyId: 'KEY-LOC-PUB-2024',
    issueDate: '2024-08-01',
    expirationTimestamp: '2027-08-01T23:59:59Z',
    revoked: false,
    holderName: 'Krishna Gautam',
    status: 'Verified',
    validTill: 'Aug 2027',
    iconType: 'location',
    payload: {
      credentialType: 'Residency Proof',
      holderId: 'usr_krishna_772',
      issuingAuthority: 'Metropolitan Housing Registry',
      attributes: {
        jurisdiction: 'Metro District',
        residencyDurationYears: 4,
        status: 'Permanent Resident'
      }
    }
  }
];

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('veriveil_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem('veriveil_active_role');
    return saved || 'holder';
  });

  const [credentials, setCredentials] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Pending verification requests (matching Image 1)
  const [requests, setRequests] = useState([
    {
      id: 'req-01',
      organization: 'Scholarship Portal',
      conditionLabel: 'Marks ≥ 75%',
      attributeName: 'marksPercentage',
      operator: '>=',
      threshold: 75,
      timeAgo: '2 hours ago',
      credentialType: 'Academic Record',
      status: 'pending',
      nonce: 'nonce_98327a',
      disclosureInfo: {
        required: 'Verification that Academic Marks are at least 75%',
        keptPrivate: 'Exact marks percentage (82.5%), GPA, transcripts, personal student ID'
      }
    },
    {
      id: 'req-02',
      organization: 'University Admission',
      conditionLabel: 'Age ≥ 18',
      attributeName: 'age',
      operator: '>=',
      threshold: 18,
      timeAgo: '1 day ago',
      credentialType: 'Age Credential',
      status: 'pending',
      nonce: 'nonce_44192b',
      disclosureInfo: {
        required: 'Verification that applicant age is at least 18 years',
        keptPrivate: 'Exact Date of Birth, National ID number, address, full profile'
      }
    }
  ]);

  // Recent Verifications list (matching Image 1)
  const [recentVerifications, setRecentVerifications] = useState([
    {
      id: 'v-01',
      title: 'Scholarship Portal',
      condition: 'Marks ≥ 75%',
      outcome: 'Eligible',
      timeAgo: '10 mins ago',
      statusType: 'eligible',
      icon: 'academic'
    },
    {
      id: 'v-02',
      title: 'Skill Development Program',
      condition: 'Age ≥ 18',
      outcome: 'Eligible',
      timeAgo: '2 days ago',
      statusType: 'eligible',
      icon: 'user'
    },
    {
      id: 'v-03',
      title: 'College Internship',
      condition: 'Marks ≥ 75%',
      outcome: 'Not Eligible',
      timeAgo: '5 days ago',
      statusType: 'not-eligible',
      icon: 'lock'
    },
    {
      id: 'v-04',
      title: 'Housing Application',
      condition: 'Residency Proof',
      outcome: 'Eligible',
      timeAgo: '1 week ago',
      statusType: 'eligible',
      icon: 'home'
    }
  ]);

  // Active QR verification session
  const [activeSession, setActiveSession] = useState({
    code: '782 914',
    rawCode: '782914',
    expiresInSeconds: 284,
    status: 'Active',
    createdTime: new Date().toISOString()
  });

  // Tamper lab state
  const [tamperCredentialData, setTamperCredentialData] = useState(null);
  const [tamperedState, setTamperedState] = useState({
    isTampered: false,
    modifiedField: null,
    originalValue: null,
    tamperedValue: null,
    verificationResult: null
  });

  // Initialize cryptographic signatures for all credentials
  useEffect(() => {
    async function initCrypto() {
      const initialized = await Promise.all(
        INITIAL_CREDENTIALS_RAW.map(async (c) => {
          const digest = await sha256(c.payload);
          const sig = await signPayload(c.payload);
          return {
            ...c,
            payloadDigest: digest,
            signature: sig,
            signedAt: new Date().toISOString()
          };
        })
      );
      setCredentials(initialized);
      setTamperCredentialData(JSON.parse(JSON.stringify(initialized[0])));
      setIsInitializing(false);
    }
    initCrypto();
  }, []);

  // Save user & role
  useEffect(() => {
    localStorage.setItem('veriveil_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('veriveil_active_role', activeRole);
  }, [activeRole]);

  // Approve a verification request
  const approveRequest = async (requestId) => {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    // Find matching credential
    const cred = credentials.find(c => c.credentialType === req.credentialType);
    if (!cred) {
      alert(`No valid credential found for ${req.credentialType}`);
      return;
    }

    try {
      const proof = await generateZKPProof({
        credential: cred,
        attributeName: req.attributeName,
        operator: req.operator,
        threshold: req.threshold,
        verifierId: req.organization,
        requestNonce: req.nonce
      });

      // Update state
      setRequests(prev => prev.filter(r => r.id !== requestId));
      setRecentVerifications(prev => [
        {
          id: `v-${Date.now()}`,
          title: req.organization,
          condition: req.conditionLabel,
          outcome: proof.satisfied ? 'Eligible' : 'Not Eligible',
          timeAgo: 'Just now',
          statusType: proof.satisfied ? 'eligible' : 'not-eligible',
          icon: req.credentialType.includes('Academic') ? 'academic' : 'user',
          proofPackage: proof
        },
        ...prev
      ]);

      return proof;
    } catch (err) {
      alert(`Error approving request: ${err.message}`);
    }
  };

  // Reject a verification request
  const rejectRequest = (requestId) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  // Issue a new credential (Issuer workflow)
  const issueNewCredential = async (newCredData) => {
    const credId = `CRD-${Date.now().toString().slice(-6)}`;
    const credRef = `VV-${newCredData.credentialType.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const payload = {
      credentialType: newCredData.credentialType,
      holderName: newCredData.holderName,
      holderEmail: newCredData.holderEmail,
      issuedBy: currentUser.name,
      attributes: newCredData.attributes,
      issueTimestamp: new Date().toISOString()
    };

    const digest = await sha256(payload);
    const signature = await signPayload(payload);

    const credential = {
      credentialId: credId,
      credentialRef: credRef,
      credentialType: newCredData.credentialType,
      issuer: currentUser.name,
      issuerKeyId: 'KEY-ISSUER-ACTIVE',
      issueDate: new Date().toISOString().split('T')[0],
      expirationTimestamp: new Date(Date.now() + 365*24*60*60*1000).toISOString(),
      revoked: false,
      holderName: newCredData.holderName,
      status: 'Verified',
      validTill: 'Oct 2027',
      iconType: 'academic',
      payload,
      payloadDigest: digest,
      signature
    };

    setCredentials(prev => [credential, ...prev]);
    return credential;
  };

  // Revoke a credential
  const revokeCredential = (credentialId) => {
    setCredentials(prev => prev.map(c => 
      c.credentialId === credentialId ? { ...c, revoked: true, status: 'Revoked' } : c
    ));
  };

  // Switch role helper
  const switchRole = (role) => {
    setActiveRole(role);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeRole,
        setActiveRole: switchRole,
        credentials,
        requests,
        recentVerifications,
        activeSession,
        setActiveSession,
        approveRequest,
        rejectRequest,
        issueNewCredential,
        revokeCredential,
        tamperCredentialData,
        setTamperCredentialData,
        tamperedState,
        setTamperedState,
        isInitializing
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
