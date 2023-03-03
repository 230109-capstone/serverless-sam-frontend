import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store'


interface ErrorType {
  loading: boolean,
  error: boolean,
  message: string
}

const api = axios.create({
  baseURL: `bdx5a9kkg3.execute-api.us-east-1.amazonaws.com/Prod`
})

function ViewReimbursements() {

  const [tickets, setTickets] = useState<any[]>([]);
  const [fetch, setFetch] = useState<ErrorType>({loading: true, error: false, message: ''})
  const { user: User } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const fetchTickets = async () =>{
      setFetch({...fetch, loading: true});
      try {
        const result = await api.get(`/reimbursements`, {headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }});
        setFetch({loading:false, error: false, message: ""})
        setTickets(result.data)

      } catch (err:any) {
        setFetch({error:true, message:err.response.data.error, loading:false})
      }
    }
  
    fetchTickets(); 
  }, [])
  


  return (
    <div>
      {
        fetch.loading ? <h1>Loading</h1> :
        fetch.error ? <h1>{fetch.message}</h1> :
        <div>
          {
            tickets.map(ticket => (
              <ul key={ticket.id}>
                <li><img src={'s3bucketlink'} alt={ticket.status}/></li>
                <li>{ticket.description}</li>
                <li>{ticket.amount}</li>
                <li>{ticket.status}</li>
                {
                  User.role === 'finance_manager' && ticket.status === 'pending' ? 
                  <li>
                    <button >Approve</button>
                    <button >Deny</button>
                  </li> :
                  <></>
                }
              </ul>
            ))
          }
          
        </div>
      }
    </div>
  )
}

export default ViewReimbursements