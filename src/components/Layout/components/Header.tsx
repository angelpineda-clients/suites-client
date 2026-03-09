import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FBicon from "@/assets/images/Facebook_Logo_Primary.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth/AuthProvider";
import {
  ActionButton,
  ActionsStack,
  ContactLink,
  ContactNumbers,
  ContactStack,
  FbImage,
  FbLink,
  HeaderContainer,
  HeaderInfo,
  HeaderRoot,
  HeaderTitle,
  NavContainer,
  NavItem,
  NavList,
} from "./Header.styled";
import { Stack } from "@mui/material";

export const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <HeaderRoot>
      <HeaderContainer maxWidth={false} disableGutters>
        <NavItem to="/">
          <HeaderTitle variant="h1" component="h2">
            Suites Ordoñez
          </HeaderTitle>
        </NavItem>

        <HeaderInfo>
          <ContactStack>
            <ContactNumbers>
              <ContactLink href="tel:7444859626">Tel: (744) 485-9626</ContactLink>
              <ContactLink href="tel:7444856731">Tel: (744) 485-6731</ContactLink>
            </ContactNumbers>

            <FbLink href="https://www.facebook.com/suitesordonez/" rel="noopener" target="_blank">
              <Stack alignItems="center" justifyContent="center">
                <FbImage src={FBicon} alt="Facebook" />
              </Stack>
            </FbLink>
          </ContactStack>

          <NavContainer>
            <NavList>
              <li>
                <NavItem to="/about">Nosotros</NavItem>
              </li>
              <li>
                <NavItem to="/rooms">Habitaciones</NavItem>
              </li>
              <li>
                <NavItem to="/contact">Contacto</NavItem>
              </li>
            </NavList>
          </NavContainer>

          <ActionsStack>
            {auth.isAuthenticated ? (
              <ActionButton variant="outlined" onClick={() => auth.logout()}>
                logout
              </ActionButton>
            ) : (
              <ActionButton variant="outlined" onClick={() => navigate("/login")}>
                Login
              </ActionButton>
            )}

            <ActionButton variant="contained">
              <ShoppingCartIcon />
            </ActionButton>
          </ActionsStack>
        </HeaderInfo>
      </HeaderContainer>
    </HeaderRoot>
  );
};
