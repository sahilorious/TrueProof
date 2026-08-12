import type { Receipt } from "./types";
import { mintCredential } from "./receipt";

export const localDemoReceipt: Receipt = mintCredential({
  issuer: "did:key:demo-trueproof",
  subject: "did:key:candidate",
  score: 97.4,
  sourceHash: "88ef97ebee3b42f0c8d444195932e21f1546be724f7dc44a70005dffae8824f4",
});
