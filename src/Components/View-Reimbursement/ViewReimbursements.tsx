import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store'


interface ErrorType {
  loading: boolean,
  error: boolean,
  message: string
}


function ViewReimbursements() {

  const [tickets, setTickets] = useState<any[]>([]);
  const [fetch, setFetch] = useState<ErrorType>({loading: true, error: false, message: ''})
  const [filter, setFilter] = useState<String> ('');
  const { user: User } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const fetchTickets = async () =>{
      setFetch({...fetch, loading: true});
      try {
        const result = await axios.get(`bdx5a9kkg3.execute-api.us-east-1.amazonaws.com/Prod/reimbursements`, {headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }});
        setFetch({loading:false, error: false, message: ""})
        setTickets(result.data.data)

      } catch (err: any) {
        setFetch({error:true, message:err.response.data.message, loading:false})
      }
    }
  
    fetchTickets(); 
  }, [])
  

  //  const filteredTickets = useMemo(() => {
  //       if (!filter) {
  //           return tickets;
  //       }
  //       return tickets.filter((ticket) => ticket.status.includes(filter));
  //   }, [filter, tickets]);




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
                <li>{ticket.submitter}</li>
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