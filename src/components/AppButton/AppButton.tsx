import type { ButtonProps } from "@mui/material";
import { AppButtonRoot, type AppButtonVariant } from "./AppButton.styled";

export interface AppButtonProps extends Omit<ButtonProps, "color"> {
  appVariant?: AppButtonVariant;
  block?: boolean;
}

export function AppButton({ appVariant = "primary", block = false, ...rest }: AppButtonProps) {
  return <AppButtonRoot appVariant={appVariant} block={block} {...rest} />;
}

export default AppButton;
