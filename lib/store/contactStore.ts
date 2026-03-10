import { create } from "zustand";

interface ContactPrefill {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface ContactStore {
  prefill: ContactPrefill;
  setPrefill: (data: ContactPrefill) => void;
  clearPrefill: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  prefill: {},
  setPrefill: (data) => set({ prefill: data }),
  clearPrefill: () => set({ prefill: {} }),
}));
