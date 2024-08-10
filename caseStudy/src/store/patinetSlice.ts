import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Medication {
  name: string;
  form: string;
  dose: string;
  instructions: string;
  quantity: string;
}

export interface Prescription {
  id: number;
  date: string;
  number: string;
  medications: Medication[];
  notes: string;
}

export interface Patient {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  prescription: Prescription | null;
}

interface PatientState {
  patients: Patient[];
}

export const loadState = (savedState?: string): PatientState => {
  try {
    if (savedState) {
      return JSON.parse(savedState);
    }
    const serializedState = localStorage.getItem("patientState");
    if (serializedState === null) {
      const initialData: PatientState = {
        patients: [
          {
            id: 1,
            name: "John",
            surname: "Doe",
            birthDate: "1990-01-01",
            prescription: null,
          },
          {
            id: 2,
            name: "Jane",
            surname: "Smith",
            birthDate: "1985-05-15",
            prescription: null,
          },
        ],
      };
      saveState(initialData);
      return initialData;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { patients: [] };
  }
};

const saveState = (state: PatientState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("patientState", serializedState);
  } catch {
    // Ignore write errors
  }
};

const initialState: PatientState = loadState();

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatient: (
      state,
      action: PayloadAction<Omit<Patient, "id" | "prescription">>
    ) => {
      const newPatient = {
        ...action.payload,
        id:
          state.patients.length > 0
            ? Math.max(...state.patients.map((p) => p.id)) + 1
            : 1,
        prescription: null,
      };
      state.patients.push(newPatient);
      saveState(state);
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
        saveState(state);
      }
    },
    deletePatient: (state, action: PayloadAction<number>) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload);
      saveState(state);
    },
    updatePrescription: (
      state,
      action: PayloadAction<{ patientId: number; prescription: Prescription }>
    ) => {
      console.log("Updating prescription:", action.payload);
      const patient = state.patients.find(
        (p) => p.id === action.payload.patientId
      );
      if (patient) {
        patient.prescription = action.payload.prescription;
        console.log("Prescription updated successfully", patient);
        saveState(state);
      } else {
        console.log("Patient not found", action.payload.patientId);
      }
    },
    setLoadedState: (state, action: PayloadAction<PatientState>) => {
      return action.payload;
    },
  },
});
export const {
  addPatient,
  updatePatient,
  deletePatient,
  updatePrescription,
  setLoadedState,
} = patientSlice.actions;

export default patientSlice.reducer;

export const saveStateMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    saveState(store.getState().patients);
    return result;
  };
