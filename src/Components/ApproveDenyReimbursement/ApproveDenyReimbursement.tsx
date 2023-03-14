import React, { useState } from 'react'
import axios from 'axios'
import { remoteUrl } from '../../models/URL'
import { Reimbursement, Status } from '../../models/Reimbursement'
import { updateReimbursement, reimbursementSlice } from '../../redux/slices/reimbursementSlice'

const api = axios.create({    
    baseURL: remoteUrl
})

const ApproveDenyReimbursement = (props: any) => {

    const [status, setStatus] = useState('Pending')

    // async function updateReimbursement(id: any, status: string) {
    //     const response = await axios.patch(
    //         remoteUrl + `/reimbursements/${id}/status`, 
    //         {
    //             params: {
    //                 "reimbursementID": id,
    //                 "status": status
    //             }
    //         }
    //     )
    // }

    

    return (
        <>
        <h5>Approve/Deny Reimbursement</h5>
        <select name="Status" id="">
            <option value="Approve">Approve</option>
            <option value="Deny">Deny</option>
        </select>
        <button>Submit</button>
        </>
    )
}

export default ApproveDenyReimbursement
