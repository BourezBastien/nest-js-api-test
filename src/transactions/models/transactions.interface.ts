export interface Transactions {
    uuid: string;
    accountNumber: number;
    clientId: number;
    TransactionType: string;
    transactionAmount: number;
    TransactionStatus: string;
    createdAt: Date;
}
