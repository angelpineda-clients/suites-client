import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Drawer } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/Loader/Loader";
import "react-toastify/dist/ReactToastify.css";

type DrawerPosition = "top" | "left" | "bottom" | "right";

type DrawerProps = {
  children: ReactElement | null;
  position?: DrawerPosition;
};

type UiContextValue = {
  setIsLoading: (value: boolean) => void;
  showDrawer: (props: DrawerProps) => void;
};

interface UiProviderProps {
  children: ReactNode;
}

type DrawerState = {
  content: ReactElement | null;
  position: DrawerPosition;
};

const UiContext = createContext<UiContextValue | undefined>(undefined);

export default function UiProvider({ children }: UiProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [drawerProps, setDrawerProps] = useState<DrawerState>({
    content: null,
    position: "right",
  });

  const showDrawer = useCallback(({ children, position = "right" }: DrawerProps) => {
    setDrawerProps({
      content: children,
      position,
    });
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerProps((previous) => ({
      ...previous,
      content: null,
    }));
  }, []);

  const isDrawerOpen = Boolean(drawerProps.content);

  const value = useMemo<UiContextValue>(
    () => ({
      setIsLoading,
      showDrawer,
    }),
    [setIsLoading, showDrawer]
  );

  return (
    <UiContext.Provider value={value}>
      {children}
      <div id="ui-portal"></div>
      <ToastContainer />
      {isLoading && <Loader />}
      {drawerProps.content && (
        <Drawer anchor={drawerProps.position} open={isDrawerOpen} onClose={closeDrawer}>
          {cloneElement(drawerProps.content, { closeDrawer })}
        </Drawer>
      )}
    </UiContext.Provider>
  );
}

export const useUiContext = () => {
  const context = useContext(UiContext);

  if (!context) {
    throw new Error("useUiContext must be used within UiProvider");
  }

  return context;
};
