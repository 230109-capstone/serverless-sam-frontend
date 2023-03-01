export interface Reimbursement {
    reimbursementID: string;
    description: string;
    amount: number;
    image: string;
    status: Status
}

export enum Status {
    APPROVED = "APPROVED",
    DENIED = "DENIED",
    PENDING = "PENDING"
}