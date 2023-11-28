import { getFirestore } from "firebase/firestore";
import { useMemo } from "react";
import { app } from "@config/firebase";

export function useFirestore() {
    return useMemo(() => getFirestore(app), []) 
}