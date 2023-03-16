import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { remoteUrl } from '../../models/URL';
import { useNavigate } from 'react-router';
import './add-reimbursement.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import Navbar from "../Navbar/Navbar";

function ReimbursementSubmit() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(''); 
    const [imageError, setImageError] = useState<boolean>(false)
    const aRef = useRef(null);
    const navigate = useNavigate();
    const userState = useSelector((state: RootState) => state.user)

    async function submitReimbursement(e:any) {
        if(image === ""){
            setImageError(true)
            return
        } else if (!localStorage.getItem('token')) {
            try {
                await axios.post(remoteUrl + '/reimbursements', { "amount": amount, "description": description, "image": image }, {});
            } catch (err:any) {
                alert(err.response.data.message.message);
            }
        } else if (localStorage.getItem('token') !== null) {
            try {
                const response = await axios.post(remoteUrl + '/reimbursements', { "amount": amount, "description": description, "image": image }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (response.status === 201 || response.status === 200) {
                        alert(response.data.message);
                        setAmount('');
                        setDescription('');
                        removeFile(aRef);
                        setImage('');
                        setImageError(false);
                }
            } catch (err: any) {
                if (err.response.data.message === 'tarHeaderChecksumMatches is not defined') {
                    alert('Please upload a jpeg or png version of your receipt instead.');
                    removeFile(aRef);
                    setImage('');
                } else if (err.response.data.message.errors) {
                    alert(err.response.data.message.errors);
                } else {
                    alert(err);
                }
            }
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

    useEffect(() => {
        if (!userState.isLoggedIn) {
            navigate('/')
        }
    }, [userState.isLoggedIn])

    return (
        <>
        <Navbar />
            <form id="addReimbursementsForm" onSubmit={(event) => { event.preventDefault() }}>
                <h1 className="form-header">Reimbursements Form</h1>
                {imageError ? <p className='missingImage' id={"error"}>Please provide an image</p> : ""}
                <label htmlFor="amount">Amount</label>
                <input onChange={(e) => { setAmount(e.target.value) }} value={amount} type="text" id="amount" name="amount" placeholder="Amount" /><br /><br />
                <label htmlFor="description">Description</label>
                <input onChange={(e) => { setDescription(e.target.value) }} value={description} type="text" id="description" name="description" placeholder="Description"/><br /><br />
                <label htmlFor="file">Image</label>
                <input onChange={ e => { handleFileUpload(e) }} ref={aRef} type="file" id="file" name="file" accept="image/png, image/jpeg"/>{image ? (<img id="form-picture" src={image} alt='receipt'/>) : ""}<br /><br />
                <button id="form-submit" onClick={submitReimbursement}>Submit</button>
            </form>
        </>
    )
}

export default ReimbursementSubmit;