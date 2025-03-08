
// Type definitions for Google API Client
interface GoogleApiAuth2Instance {
  isSignedIn: {
    get: () => boolean;
  };
  signIn: () => Promise<any>;
  signOut: () => Promise<any>;
}

interface GoogleApiClient {
  init: (config: {
    apiKey: string;
    clientId: string;
    discoveryDocs: string[];
    scope: string;
  }) => Promise<void>;
  calendar: {
    events: {
      list: (params: any) => Promise<{
        result: {
          items: any[];
        };
      }>;
    };
  };
}

interface GoogleApi {
  load: (libraries: string, callback: () => void) => void;
  client: GoogleApiClient;
  auth2: {
    getAuthInstance: () => GoogleApiAuth2Instance;
    init: (params: any) => Promise<any>;
  };
}

interface Window {
  gapi: GoogleApi;
}
