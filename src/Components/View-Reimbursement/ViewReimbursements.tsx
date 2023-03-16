import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { AuthState } from "../../models/AuthState";
import { remoteUrl } from "../../models/URL";
import { Reimbursement, Status } from "../../models/Reimbursement";
import { updateReimbursement } from "../../redux/slices/reimbursementSlice";
import { useNavigate } from "react-router";
import "./ViewReimbursements.css";
import Navbar from "../Navbar/Navbar";

interface ErrorType {
  loading: boolean,
  error: boolean,
  message: string
}

function ViewReimbursements() {

  const [tickets, setTickets] = useState<any[]>([]);
  const [fetch, setFetch] = useState<ErrorType>({loading: true, error: false, message: ''});
  const [filter, setFilter] = useState<string> ('');
  const user: AuthState = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

    const fetchTickets = async () =>{
        setFetch({...fetch, loading: true});
        try {
        const result = await axios.get(`${remoteUrl}/reimbursements`, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }});
        setFetch({loading:false, error: false, message: ""})
        setTickets(result.data.data)

        } catch (err: any) {
        if(err.response){
            setFetch({error:true, message:err.response.data.message, loading:false})
        }
        }
    }

    useEffect(() => {
        fetchTickets();
    }, []);
  

   const filteredTickets = useMemo(() => {
        if (!filter) {
            return tickets;
        }
        return tickets.filter((ticket) => ticket.status.includes(filter));
    }, [filter, tickets]);

    const approveReimbursement = (ticket: Reimbursement) => {
        ticket.status = Status.APPROVED;
        dispatch(updateReimbursement(ticket));
        navigate("/view-reimbursements");
    }

    const denyReimbursement = (ticket: Reimbursement) => {
        ticket.status = Status.DENIED;
        dispatch(updateReimbursement(ticket));
        navigate("/view-reimbursements");
    }


    return (
        <div>
            <Navbar/>
            <div className="container">
                {fetch.loading ? (
                    <h1 className="view-reimbursements-header">Loading</h1>
                    ) : fetch.error ? (
                        <h1 className="view-reimbursements-header">{fetch.message}</h1>
                        ) : (
                    <>
                        <div className="header">
                            <h1 className="view-reimbursements-header">Reimbursements</h1>
                            <div className="filter-container">
                                <button className="filter-button" onClick={() => setFilter('')}>
                                    All Tickets
                                </button>
                                <button className="filter-button" onClick={() => setFilter('PENDING')}>
                                    Pending
                                </button>
                                <button className="filter-button" onClick={() => setFilter('APPROVED')}>
                                    Approved
                                </button>
                                <button className="filter-button" onClick={() => setFilter('DENIED')}>
                                    Denied
                                </button>
                            </div>
                        </div>
                        <div className="row justify-content-center card-container">
                            {filteredTickets.map((ticket) => (
                                <div className="col-md-4 mb-4" key={ticket.id}>
                                    <div className="card">
                                        <img className="card-img-top card-image" src={ticket.imageUrl} alt={ticket.status} />
                                        <div className="card-body">
                                            <p className="card-text">{ticket.description}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Amount: ${ticket.amount}</li>
                                            <li className="list-group-item">Status: {ticket.status}</li>
                                            <li className="list-group-item">Submitter: {ticket.submitter}</li>
                                        </ul>
                                        {user.user.role === 'finance_manager' && ticket.status === Status.PENDING ? (
                                            <div className="card-body approve-deny-buttons">
                                                <button className="button approve" onClick={() => approveReimbursement(ticket)}>
                                                    Approve
                                                </button>
                                                <button className="button deny" onClick={() => denyReimbursement(ticket)}>
                                                    Deny
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ViewReimbursements
