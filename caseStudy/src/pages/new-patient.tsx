import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addPatient } from "../store/patinetSlice";

function NewPatientPage() {
  const [patientData, setPatientData] = useState({
    name: "",
    surname: "",
    birthDate: "",
  });

  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const handlePatientInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPatient(patientData));
    router.push("/patients");
  };

  return (
    <Container>
      <Navbar />
      <h1>Yeni Hasta Kaydı</h1>
      <Form onSubmit={handleSubmit}>
        <h2>Hasta Bilgileri</h2>
        <Input
          type="text"
          name="name"
          value={patientData.name}
          onChange={handlePatientInputChange}
          placeholder="Ad"
          required
        />
        <Input
          type="text"
          name="surname"
          value={patientData.surname}
          onChange={handlePatientInputChange}
          placeholder="Soyad"
          required
        />
        <Input
          type="date"
          name="birthDate"
          value={patientData.birthDate}
          onChange={handlePatientInputChange}
          required
        />
        <Button type="submit">Kaydet</Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default NewPatientPage;
