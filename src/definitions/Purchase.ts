import { Timestamp } from "firebase/firestore";

export interface Purchase {
    ticket_id: number;
    user_id: number;
    timestamp: Timestamp
}