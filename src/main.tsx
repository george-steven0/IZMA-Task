import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./Routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.tsx";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Provider store={store}>
        <RouterProvider router={AppRoutes} />
        <App />
      </Provider>
    </DndProvider>
  </StrictMode>
);
