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
import { AuthState } from "../../models/AuthState";
import { remoteUrl } from "../../models/URL";
import { Reimbursement, Status } from "../../models/Reimbursement";

interface ErrorType {
  loading: boolean,
  error: boolean,
  message: string
}

function ViewReimbursements() {

  const [tickets, setTickets] = useState<any[]>([]);
  const [fetch, setFetch] = useState<ErrorType>({loading: true, error: false, message: ''})
  const [filter, setFilter] = useState<string> ('');
  const user: AuthState = useSelector((state: RootState) => state.user)

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
        console.log(user.user.role);
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

    const approveReimbursement = (ticket: Reimbursement) => {
        ticket.status = Status.APPROVED;
        console.log("Approve", ticket);
    }

    const denyReimbursement = (ticket: Reimbursement) => {
        ticket.status = Status.DENIED;
        console.log("Deny", ticket);
    }


    return (
        <Container fluid>
        {fetch.loading ? <h1>Loading</h1> 
        : fetch.error ? <h1>{fetch.message}</h1> 
        : <>
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
                    <Card.Img variant="top" src={ticket.imageUrl} alt={ticket.status}/>
                    <Card.Body>
                        <Card.Text>{ticket.description}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{`$${ticket.amount}`}</ListGroup.Item>
                        <ListGroup.Item>{ticket.status}</ListGroup.Item>
                        <ListGroup.Item>{ticket.submitter}</ListGroup.Item>
                    </ListGroup>
                    {
                        user.user.role === 'finance_manager' && ticket.status == Status.PENDING ? 
                            <Card.Body>
                                <Button variant='success' onClick={() => approveReimbursement(ticket)}>Approve</Button>
                                <Button variant='danger' onClick={() => denyReimbursement(ticket)}>Deny</Button>
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