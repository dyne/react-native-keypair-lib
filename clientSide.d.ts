export declare function sanitizeAnswers(answers: any): any;
export declare function recoveryKeypair(clientSideContractText: string, answers: any, PBKDF: string): Promise<any>;
export declare function verifyAnswers(clientSideContractText: string, answers: any, PBKDF: string, userPublicKey: string): Promise<boolean>;
