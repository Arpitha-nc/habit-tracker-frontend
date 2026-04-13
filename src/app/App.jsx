import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import Providers from "./providers";
import ToastContainer from "../components/ui/ToastContainer";

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
      <ToastContainer />
    </Providers>
  );
}

export default App;
