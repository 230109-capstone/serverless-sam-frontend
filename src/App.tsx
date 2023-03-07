import Register from './Components/register/register';
import Login from './Components/Login/Login.'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ViewReimbursements from './Components/View-Reimbursement/ViewReimbursements';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/view-reimbursements' element={<ViewReimbursements />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
