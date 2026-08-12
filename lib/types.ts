export type Receipt = {
  issuer: string;
  subject: string;
  score: number;
  sourceHash: string;
  issuedAt: string;
  credential: Record<string, unknown>;
};
