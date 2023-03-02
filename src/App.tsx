import Register from './Components/register/register';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter><Routes>
        <Route path='/users' element={<Register />} />
      </Routes></BrowserRouter></>
  );
}

export default App;
