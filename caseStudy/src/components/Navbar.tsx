import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Nav>
      <NavItems>
        <NavItem>
          <StyledLink href="/patients">Hasta Listesi</StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink href="/new-patient">Yeni Hasta Ekle</StyledLink>
        </NavItem>
      </NavItems>
      <LogoutButton onClick={logout}>Çıkış Yap</LogoutButton>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItems = styled.div`
  display: flex;
`;

const NavItem = styled.div`
  margin-right: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #e9ecef;
    color: #007bff;
  }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

export default Navbar;
