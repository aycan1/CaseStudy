import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Navbar from "../components/Navbar";


import { useAuth } from "../context/AuthContext";
import PrescriptionModal from "../components/PrescriptionModal";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { deletePatient } from "../store/patinetSlice";

const PatientsPage: React.FC = () => {
  const patients = useAppSelector((state) => state.patients.patients);
  const dispatch = useAppDispatch();

  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePatientDetail = (id: number) => {
    router.push(`/hasta-detay/${id}`);
  };

  const handleViewPrescription = (id: number) => {
    setSelectedPatientId(id);
    setIsPrescriptionModalOpen(true);
  };

  const handleAddNewPatient = () => {
    router.push("/new-patient");
  };

  const handleDeletePatient = (id: number) => {
    dispatch(deletePatient(id));
  };

  return (
    <Container>
      <Navbar />
      <h1>Hasta Listesi</h1>
      <Table>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Doğum Tarihi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.surname}</td>
              <td>{patient.birthDate}</td>
              <td>
                <Button onClick={() => handlePatientDetail(patient.id)}>
                  Hasta Detayına Git
                </Button>
                <Button onClick={() => handleViewPrescription(patient.id)}>
                  Reçeteyi Görüntüle
                </Button>
                <Button onClick={() => handleDeletePatient(patient.id)}>
                  Hastayı Sil
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isPrescriptionModalOpen && selectedPatientId && (
        <PrescriptionModal
          patientId={selectedPatientId}
          onClose={() => setIsPrescriptionModalOpen(false)}
        />
      )}

      <Button onClick={handleAddNewPatient}>Yeni Hasta Ekle</Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const Button = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

export default PatientsPage;
