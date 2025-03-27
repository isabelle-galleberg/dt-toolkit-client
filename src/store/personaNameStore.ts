import { create } from 'zustand';

interface PersonaState {
  name: string;
  setName: (name: string) => void;
}

export const usePersonaNameStore = create<PersonaState>((set) => ({
  name: localStorage.getItem('personaName') || '',
  setName: (name) => {
    localStorage.setItem('personaName', name);
    set({ name });
  },
}));
