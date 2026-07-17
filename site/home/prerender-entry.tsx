import { renderToString } from "react-dom/server";
import Home from "./Home";

export function render(): string {
  return renderToString(<Home />);
}
