import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export type T__2 = string;
export type T__1 = bigint;
export interface Member {
    id: T__2;
    principal: Principal;
    name: string;
    email: string;
    kycStatus: T;
    phone: string;
    photo: ExternalBlob;
    amount: T__1;
}
export interface PublicMemberProfile {
    id: string;
    name: string;
    email: string;
    kycStatus: string;
    phone: string;
    photo: ExternalBlob;
    amount: T__1;
}
export interface UserProfile {
    memberId?: string;
    name: string;
    role: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteMember(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMember(id: string): Promise<PublicMemberProfile>;
    getMemberCount(): Promise<bigint>;
    getPendingKycCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    listMembers(): Promise<Array<PublicMemberProfile>>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveMember(id: string, profile: Member): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    updateKycStatus(id: string, status: T): Promise<void>;
}
