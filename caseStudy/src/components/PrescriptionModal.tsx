import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  updatePrescription,
  Prescription,
  Medication,
} from "../store/patinetSlice";

interface PrescriptionModalProps {
  patientId: number;
  onClose: () => void;
}

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  patientId,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const patient = useAppSelector((state) =>
    state.patients.patients.find((p) => p.id === patientId)
  );
  const [prescription, setPrescription] = useState<Prescription>({
    id: 0,
    date: "",
    number: "",
    medications: [],
    notes: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newMedication, setNewMedication] = useState<Medication>({
    name: "",
    form: "",
    dose: "",
    instructions: "",
    quantity: "",
  });

  useEffect(() => {
    console.log("PrescriptionModal: patient changed", patient);
    if (patient && patient.prescription) {
      console.log("Setting prescription from patient", patient.prescription);
      setPrescription(patient.prescription);
    }
  }, [patient]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMedication((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMedication = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      newMedication.name ||
      newMedication.form ||
      newMedication.dose ||
      newMedication.instructions ||
      newMedication.quantity
    ) {
      console.log("Adding medication:", newMedication);
      setPrescription((prev) => {
        const updatedPrescription = {
          ...prev,
          medications: [...prev.medications, newMedication],
        };
        console.log("Updated prescription:", updatedPrescription);
        return updatedPrescription;
      });
      setNewMedication({
        name: "",
        form: "",
        dose: "",
        instructions: "",
        quantity: "",
      });
    }
  };

  const handleRemoveMedication = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setPrescription((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
    dispatch(
      updatePrescription({
        patientId,
        prescription: {
          ...prescription,
          medications: prescription.medications.filter((_, i) => i !== index),
        },
      })
    );
  };

  const handleSave = () => {
    dispatch(updatePrescription({ patientId, prescription }));
    setIsEditing(false);
  };

  useEffect(() => {
    console.log("PrescriptionModal mounted");
    return () => {
      console.log("PrescriptionModal unmounted");
    };
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Reçete Bilgileri</h2>
        <Form>
          <Label>
            Tarih:
            <Input
              type="date"
              name="date"
              value={prescription.date}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Label>
          <Label>
            Reçete Numarası:
            <Input
              type="text"
              name="number"
              value={prescription.number}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Label>
          <h3>İlaçlar</h3>
          {prescription.medications.map((med, index) => (
            <MedicationSection key={index}>
              <p>
                <b>İlaç Adı:</b> {med.name}
              </p>
              <p>
                <b>Form:</b> {med.form}
              </p>
              <p>
                <b>Doz:</b> {med.dose}
              </p>
              <p>
                <b>Kullanım Talimatları:</b> {med.instructions}
              </p>
              <p>
                <b>Miktar:</b> {med.quantity}
              </p>
              {isEditing && (
                <SmallButton onClick={(e) => handleRemoveMedication(e, index)}>
                  İlacı Kaldır
                </SmallButton>
              )}
            </MedicationSection>
          ))}
          {isEditing && (
            <MedicationSection>
              <MedicationInput
                type="text"
                name="name"
                value={newMedication.name}
                onChange={handleMedicationChange}
                placeholder="İlaç Adı"
              />
              <MedicationInput
                type="text"
                name="form"
                value={newMedication.form}
                onChange={handleMedicationChange}
                placeholder="Form (tablet, kapsül, şurup vb.)"
              />
              <MedicationInput
                type="text"
                name="dose"
                value={newMedication.dose}
                onChange={handleMedicationChange}
                placeholder="Doz"
              />
              <MedicationInput
                type="text"
                name="instructions"
                value={newMedication.instructions}
                onChange={handleMedicationChange}
                placeholder="Kullanım Talimatları"
              />
              <MedicationInput
                type="text"
                name="quantity"
                value={newMedication.quantity}
                onChange={handleMedicationChange}
                placeholder="Miktar"
              />
              <Button onClick={handleAddMedication}>İlacı Kaydet</Button>
            </MedicationSection>
          )}
          <Label>
            Notlar:
            <TextArea
              name="notes"
              value={prescription.notes}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Label>
        </Form>
        <ButtonGroup>
          {isEditing ? (
            <>
              <Button onClick={handleSave}>Kaydet</Button>
              <Button onClick={() => setIsEditing(false)}>İptal</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
          )}
          <Button onClick={onClose}>Kapat</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin-top: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  height: 100px;
`;

const MedicationSection = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MedicationInput = styled(Input)`
  flex: 1 1 calc(33.33% - 7px);
  min-width: 120px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
const SmallButton = styled(Button)`
  width: auto;
  padding: 5px 10px;
  font-size: 14px;
`;

export default PrescriptionModal;
