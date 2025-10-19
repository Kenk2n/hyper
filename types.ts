
export enum RelationshipStrength {
  Strong = 'Strong',
  Warm = 'Warm',
  Cold = 'Cold',
}

export enum VisibilityLevel {
  Private = 'Private',
  MetadataOnly = 'Metadata-only',
  Contactable = 'Contactable',
  Full = 'Full',
}

export enum IntroRequestStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Declined = 'Declined',
    Connected = 'Connected',
}

export interface Contact {
  id: string;
  name: string;
  emails: string[];
  company: string;
  companyId: string;
  title: string;
  team?: string;
  lastContacted: string;
  relationshipStrength: RelationshipStrength;
  owner: string;
  visibility: VisibilityLevel;
  tags: string[];
  linkedinUrl?: string;
  phone?: string;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  region: string;
  networkScore: number;
  knownContacts: number;
  isWatchlisted: boolean;
}

export interface ReconnectContact {
    contact: Contact;
    reason: string;
}

export interface IntroRequest {
    id: string;
    targetContactName: string;
    targetCompany: string;
    introducerName: string;
    status: IntroRequestStatus;
    requestedAt: string;
}

export type ViewType = 'Onboarding' | 'Contacts' | 'Network';

export interface FunnelDataPoint {
  name: string;
  value: number;
}

export interface IntroducerDataPoint {
  name: string;
  introductions: number;
}

export interface Connector {
  name: string;
  relationshipStrength: RelationshipStrength;
}

export interface SearchResultItem {
  contact: Contact;
  connectors: Connector[];
}
