import { renderToString } from "react-dom/server";
import Home from "./Home";

export function render(lang: "ar" | "en" = "ar"): string {
  return renderToString(<Home lang={lang} />);
}
