import { create } from 'zustand';
import { PersonaCard } from '../types/persona';

interface PersonaState {
  persona: PersonaCard | null;
  setPersona: (persona: PersonaCard) => void;
}

export const usePersonaStore = create<PersonaState>((set) => ({
  persona: null,
  setPersona: (persona) => set({ persona }),
}));
