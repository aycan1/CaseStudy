import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/reduxHooks";

import { updatePatient, Patient } from "../store/patinetSlice";

interface PatientModalProps {
  patient: Patient;
  onClose: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ patient, onClose }) => {
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updatePatient(editedPatient));
    setIsEditing(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Hasta Detayları</h2>
        <Form>
          <Label>
            Ad:
            <Input
              type="text"
              name="name"
              value={editedPatient.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Label>
          <Label>
            Soyad:
            <Input
              type="text"
              name="surname"
              value={editedPatient.surname}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Label>
          <Label>
            Doğum Tarihi:
            <Input
              type="date"
              name="birthDate"
              value={editedPatient.birthDate}
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
  max-width: 400px;
  width: 100%;
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

export default PatientModal;
