import { Button, type ButtonProps } from "@mui/material";
import { alpha, darken, styled, type CSSObject } from "@mui/material/styles";

export type AppButtonVariant = "primary" | "secondary" | "ghost";

interface StyledProps {
  appVariant?: AppButtonVariant;
  block?: boolean;
}

type AppButtonStyledProps = StyledProps & ButtonProps;

export const AppButtonRoot = styled(Button, {
  shouldForwardProp: (prop) => prop !== "appVariant" && prop !== "block",
})<AppButtonStyledProps>(({ theme, appVariant = "primary", block }) => {
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const variants: Record<AppButtonVariant, CSSObject> = {
    primary: {
      backgroundColor: primary,
      color: theme.palette.common.white,
      borderColor: primary,
      boxShadow: "none",
      "&:hover": {
        backgroundColor: darken(primary, 0.08),
        boxShadow: "none",
      },
    },
    secondary: {
      backgroundColor: secondary,
      color: theme.palette.common.white,
      borderColor: secondary,
      boxShadow: "none",
      "&:hover": {
        backgroundColor: darken(secondary, 0.08),
        boxShadow: "none",
      },
    },
    ghost: {
      backgroundColor: alpha(primary, 0.08),
      color: primary,
      borderColor: alpha(primary, 0.3),
      boxShadow: "none",
      "&:hover": {
        backgroundColor: alpha(primary, 0.15),
        borderColor: primary,
      },
    },
  };

  return {
    textTransform: "none",
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    paddingInline: theme.spacing(2.5),
    paddingBlock: theme.spacing(1.25),
    transition: "background-color 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
    width: block ? "100%" : "auto",
    ...variants[appVariant],
  };
});
