import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';



function ReimbursementSubmit(/*props: { refreshReimbursements: () => void }*/) {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(''); 

    async function submitReimbursement() {
        const response = await axios.post('https://bdx5a9kkg3.execute-api.us-east-1.amazonaws.com/Prod/reimbursements', { "amount": amount, "description": description, "image": image }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 201) {
            alert('Reimbursement successfully submitted!');
            // props.refreshReimbursements();
        }
    }

    return (
        <>
            <form onSubmit={(event) => { event.preventDefault() }}>
                <label htmlFor="amount">Amount</label>
                <input onChange={(e) => { setAmount(Number(e.target.value)) }} value={amount} type="number" id="amount" name="amount" />
                <label htmlFor="description">Description</label>
                <input onChange={(e) => { setDescription(e.target.value) }} value={description} type="text" id="description" name="description" />
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <button onClick={submitReimbursement}>Submit</button>
            </form>
        </>
    )
}

export default ReimbursementSubmit;