import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Parties from "./pages/Parties";
import Candidates from "./pages/Candidates";
import Constituencies from "./pages/Constituencies";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import { BASE_URL } from "./utils/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: BASE_URL + "parties", element: <Parties /> },
      { path: BASE_URL + "candidates", element: <Candidates /> },
      { path: BASE_URL + "constituencies", element: <Constituencies /> },
      { path: BASE_URL + "vote", element: <Vote /> },
      { path: BASE_URL + "results", element: <Results /> },
      { path: BASE_URL + "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
