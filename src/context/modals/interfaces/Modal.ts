import { type ReactElement } from "react";

export interface IModal {
  id: string;
  element: ReactElement;
  title?: string | ReactElement;
}
