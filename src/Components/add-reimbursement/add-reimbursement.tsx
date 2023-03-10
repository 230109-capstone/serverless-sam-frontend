import React, { useRef, useState } from 'react';
import axios from 'axios';
import { remoteUrl } from '../../models/URL';
import { useNavigate } from 'react-router';

function ReimbursementSubmit() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(''); 
    const aRef = useRef(null);
    const navigate = useNavigate();

    async function submitReimbursement(e:any) {
        try {
            const response = await axios.post(remoteUrl + '/reimbursements', { "amount": amount, "description": description, "image": image }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.status === 201 || response.status === 200) {
                alert('Reimbursement successfully submitted!');
                setAmount('');
                setDescription('');
                removeFile(aRef);
                setImage('');
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

    function removeFile(aRef:any) {
        aRef.current.value = null;
    }

    function goToViewPage() {  
        return navigate("/view-reimbursements");
    }

    return (
        <>
            <form onSubmit={(event) => { event.preventDefault() }}>
                <label htmlFor="amount">Amount</label>
                <input onChange={(e) => { setAmount(e.target.value) }} value={amount} type="text" id="amount" name="amount" placeholder="Amount" /><br /><br />
                <label htmlFor="description">Description</label>
                <input onChange={(e) => { setDescription(e.target.value) }} value={description} type="text" id="description" name="description" placeholder="Description"/><br /><br />
                <label htmlFor="file">Image</label>
                <input onChange={ e => { handleFileUpload(e) }} ref={aRef} type="file" id="file" name="file"/><br /><br />
                <button onClick={submitReimbursement}>Submit</button><button onClick={() => { goToViewPage() }}>View Reimbursements</button>
            </form>
            {image ? (<img src={image} alt='receipt'/>) : ""}
        </>
    )
}

export default ReimbursementSubmit;


