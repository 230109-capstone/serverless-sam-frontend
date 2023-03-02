import Register from './Components/register/register';
import ViewReimbursements from "./Components/View-Reimbursement/ViewReimbursements";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter><Routes>
        <Route path='/users' element={<Register />} />
        <Route path='/view-reimbursements' element={<ViewReimbursements />} />
      </Routes></BrowserRouter></>
  );
}

export default App;
