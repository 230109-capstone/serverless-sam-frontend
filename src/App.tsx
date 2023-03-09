import Register from './Components/register/register';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ViewReimbursements from './Components/View-Reimbursement/ViewReimbursements';
import ReimbursementSubmit from './Components/add-reimbursement/add-reimbursement';
import Login from './Components/Login/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/view-reimbursements' element={<ViewReimbursements />} />
                <Route path='/reimbursements' element={<ReimbursementSubmit/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
