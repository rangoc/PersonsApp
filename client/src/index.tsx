import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";
import "./index.scss";
import "primereact/resources/themes/nova-accent/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
