import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {}, // Simplified for tracking
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

let userIp: string = 'unknown';

// Fetch IP once per session
const fetchIp = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    userIp = data.ip;
  } catch (e) {
    console.error('IP resolution failed', e);
  }
};

fetchIp();

export const trackVisit = async (path: string) => {
  try {
    await addDoc(collection(db, 'visits'), {
      timestamp: serverTimestamp(),
      ip: userIp,
      path,
      userAgent: navigator.userAgent,
      sessionId: sessionStorage.getItem('cc_sessionId') || createSession()
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, 'visits');
  }
};

export const trackRemoval = async (fileName: string, fileSize: number, duration: number) => {
  try {
    await addDoc(collection(db, 'removals'), {
      timestamp: serverTimestamp(),
      ip: userIp,
      fileName,
      fileSize,
      duration
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, 'removals');
  }
};

export const trackEvent = async (eventName: string, data: any = {}) => {
  try {
    await addDoc(collection(db, 'events'), {
      timestamp: serverTimestamp(),
      ip: userIp,
      eventName,
      ...data
    });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, 'events');
  }
};

function createSession() {
  const id = Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('cc_sessionId', id);
  return id;
}
