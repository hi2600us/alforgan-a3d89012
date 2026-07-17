import { hydrateRoot, } from "react-dom/client";
import { createRoot } from "react-dom/client";
import Home from "./Home";
import "../styles.css";

const el = document.getElementById("root")!;
if (el.hasChildNodes()) {
  hydrateRoot(el, <Home />);
} else {
  createRoot(el).render(<Home />);
}
