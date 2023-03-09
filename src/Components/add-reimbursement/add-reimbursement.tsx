import React, { useState } from 'react';
import axios from 'axios';
import { remoteUrl } from '../../models/URL';

function ReimbursementSubmit(/*props: { refreshReimbursements: () => void }*/) {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(''); 

    async function submitReimbursement() {
        try {
            const response = await axios.post(remoteUrl + '/reimbursements', { "amount": amount, "description": description, "image": image }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.status === 201 || response.status === 200) {
                alert('Reimbursement successfully submitted!');
                // props.refreshReimbursements();
            }
            
        } catch (err: any) {
            alert(err);
        }
    }

    const getBase64 = (file:any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = error => {
                reject(error);
            }
        })
    }

    const handleFileUpload = async (e:any) => {
        const file = e.target.files[0];
        const base64 = await getBase64(file);
        setImage(String(base64));
    }

    return (
        <>
            <form onSubmit={(event) => { event.preventDefault() }}>
                <label htmlFor="amount">Amount</label>
                <input onChange={(e) => { setAmount(Number(e.target.value)) }} value={amount} type="number" id="amount" name="amount" placeholder="Amount" />
                <label htmlFor="description">Description</label>
                <input onChange={(e) => { setDescription(e.target.value) }} value={description} type="text" id="description" name="description" placeholder="Description"/>
                <label htmlFor="file">Image</label>
                <input onChange={ e => { handleFileUpload(e) }} type="file" id="file" name="file"/>
                <button onClick={submitReimbursement}>Submit</button>
            </form>
        </>
    )
}

export default ReimbursementSubmit;

{/*{image ? (
    <img src={image} alt='smiley'/>
) : ""}

, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}*/}