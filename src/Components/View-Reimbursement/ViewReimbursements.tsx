import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface ErrorType {
  loading: boolean,
  error: boolean,
  message: string
}

const api = axios.create({
  baseURL: `someurl.com`
})

function ViewReimbursements() {

  const [tickets, setTickets] = useState<any[]>([]);
  const [fetch, setFetch] = useState<ErrorType>({loading: true, error: false, message: ''})

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
              </ul>
            ))
          }
          
        </div>
      }
    </div>
  )
}

export default ViewReimbursements