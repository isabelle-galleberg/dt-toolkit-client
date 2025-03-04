import { create } from 'zustand';
import { PersonaCard } from '../types/persona';

interface PersonaState {
  persona: PersonaCard | null;
  setPersona: (persona: PersonaCard) => void;
}

export const usePersonaStore = create<PersonaState>((set) => ({
  persona: JSON.parse(localStorage.getItem('persona') || 'null'),
  setPersona: (persona) => {
    localStorage.setItem('persona', JSON.stringify(persona));
    set({ persona });
  },
}));
