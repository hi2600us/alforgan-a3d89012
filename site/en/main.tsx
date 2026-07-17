import { hydrateRoot, createRoot } from "react-dom/client";
import Home from "../home/Home";
import "../styles.css";

const el = document.getElementById("root")!;
if (el.hasChildNodes()) {
  hydrateRoot(el, <Home lang="en" />);
} else {
  createRoot(el).render(<Home lang="en" />);
}
