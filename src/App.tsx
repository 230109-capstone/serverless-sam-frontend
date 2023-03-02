import Register from './Components/register/register';
import Login from './Components/Login/Login.'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
