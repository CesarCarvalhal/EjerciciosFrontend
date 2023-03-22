import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./screens/main/Main";
import About from "./screens/about/About";
import Example from "./screens/examples/Examples";
import NotFound from "./screens/notfund/NotFound";
import Invoices from "./screens/invoices/Invoices";
import MultiplicationTable from "./screens/multiplicationtable/MultiplicationTable";
import Dashboard from "./screens/dashboard/Dashboard";
import Question from "./screens/question/Question";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/examples" element={<Example />}></Route>
      <Route path="/invoices/:invoiceId" element={<Invoices/>}></Route>
      <Route path="/multiplication/:multiplicationNumber" element={<MultiplicationTable/>}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="/dashboards/:dashboardId" element={<Dashboard/>}></Route>
      <Route path="/dashboards/:dashboardId/questions/:questionId" element={<Question/>}></Route>
    </Routes>
  );
}

export default App;
