/* React */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactElement,
} from "react";
/* Libraries */
import { v4 as uuid } from "uuid";
/* Components */
import ModalContainer from "./components/ModalContainer";
import { IModal } from "./interfaces/Modal";

type ShowModalInput = {
  element: ReactElement;
  title?: string | ReactElement;
};

type ModalContextValue = {
  showModal: (value: ShowModalInput) => {
    closeModal: () => void;
  };
  removeModal: (id: string) => void;
};

interface Props {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider = ({ children }: Props) => {
  const [modals, setModals] = useState<IModal[]>([]);

  const removeModal = useCallback((id: string) => {
    setModals((previousModals) => previousModals.filter((modal) => modal?.id !== id));
  }, []);

  const showModal = useCallback(
    ({ element, title = "" }: ShowModalInput) => {
      const newModal = { id: uuid(), element, title };

      setModals((previousModals) => [...previousModals, newModal]);

      return {
        closeModal: () => removeModal(newModal.id),
      };
    },
    [removeModal]
  );

  const value = useMemo<ModalContextValue>(
    () => ({
      showModal,
      removeModal,
    }),
    [removeModal, showModal]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalContainer modals={modals} />
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within ModalProvider");
  }

  return context;
};
