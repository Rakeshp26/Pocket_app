import { Home } from "./pages/Home/Home";
import { ModalProvider } from "./components/Modal/ModalContext";

function App() {
  return (
   <>
    <ModalProvider>
      <Home />
    </ModalProvider>
   </>
  );
}

export default App;
