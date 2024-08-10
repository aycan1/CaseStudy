import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import PrescriptionModal from "../../components/PrescriptionModal";
import { updatePatient } from "../../store/patinetSlice";

const HastaDetay: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const patients = useAppSelector((state) => state.patients.patients);
  const [patient, setPatient] = useState<any>(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && patients) {
      const foundPatient = patients.find((p) => p.id === Number(id));
      setPatient(foundPatient || null);
    }
  }, [id, patients]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const handleReceteGoruntule = () => {
    setIsPrescriptionModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updatePatient(patient));
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <Title>Hasta Detayları</Title>
        <Form>
          <h2>Hasta Bilgileri</h2>
          <Input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Ad"
          />
          <Input
            type="text"
            name="surname"
            value={patient.surname}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Soyad"
          />
          <Input
            type="date"
            name="birthDate"
            value={patient.birthDate}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <ButtonGroup>
            {isEditing ? (
              <Button onClick={handleSave}>Kaydet</Button>
            ) : (
              <Button onClick={handleEdit}>Düzenle</Button>
            )}
            <Button onClick={handleReceteGoruntule}>Reçeteyi Görüntüle</Button>
          </ButtonGroup>
        </Form>
      </Content>
      {isPrescriptionModalOpen && (
        <PrescriptionModal
          patientId={Number(id)}
          onClose={() => setIsPrescriptionModalOpen(false)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

export default HastaDetay;
