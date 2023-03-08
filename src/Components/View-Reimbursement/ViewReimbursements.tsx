import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';




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
        const result = await axios.get(`http://bdx5a9kkg3.execute-api.us-east-1.amazonaws.com/Prod/reimbursements`, {headers: {
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
  

   const filteredTickets = useMemo(() => {
        if (!filter) {
            return tickets;
        }
        return tickets.filter((ticket) => ticket.status.includes(filter));
    }, [filter, tickets]);


   function handleFilter(event: React.MouseEvent<HTMLInputElement>) {
      setFilter(event.currentTarget.value);
   }



  return (
    <Container fluid>
      {
        fetch.loading ? <h1>Loading</h1> :
        fetch.error ? <h1>{fetch.message}</h1> :
        <>
        <Container>
          <DropdownButton id="dropdown-item-button" title="Filter">
              <Dropdown.Item as="button" onClick={handleFilter} value='pending'>Pending</Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleFilter} value='approved'>Approved</Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleFilter} value='denied'>Denied</Dropdown.Item>
          </DropdownButton>
        </Container>
        <Row style={{ minWidth: "50vw" }}>
          {
            filteredTickets.map(ticket => (
              <Col key={ticket.id}>
                <Card style={{ width: '18rem' }} >
                  <Card.Img variant="top" src={'s3bucketlink'} alt={ticket.status}/>
                  <Card.Body>
                    <Card.Text>{ticket.description}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>{`$${ticket.amount}`}</ListGroup.Item>
                    <ListGroup.Item>{ticket.status}</ListGroup.Item>
                    <ListGroup.Item>{ticket.submitter}</ListGroup.Item>
                  </ListGroup>
                  {
                    User.role === 'finance_manager' && ticket.status === 'pending' ? 
                    <Card.Body>
                      <Button variant='success' >Approve</Button>
                      <Button variant='danger'>Deny</Button>
                    </Card.Body> :
                    <></>
                  }
                </Card>
              </Col>
            ))
          }
        </Row>
        </>
      }
    </Container>
  )
}

export default ViewReimbursements