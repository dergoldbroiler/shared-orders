import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";



// Create your SyncedStore store
export const store = syncedStore([{}]);

// Get the Yjs document and sync automatically using y-webrtc
const doc = getYjsDoc(store);
const webrtcProvider = new WebrtcProvider("my-document-id", doc);