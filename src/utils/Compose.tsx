import { ReactElement, ReactNode } from "react";

type Provider = ({ children }: { children: ReactNode }) => ReactElement;

interface Props {
  components: Provider[];
  children: ReactElement;
}

export default function Compose({ components = [], children }: Props) {
  return components.reduceRight((acc, Component) => {
    return <Component>{acc}</Component>;
  }, children);
}
