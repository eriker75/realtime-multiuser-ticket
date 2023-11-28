import { Col, Container, Form, Row } from "react-bootstrap"
import { products } from "./data/products"
import TicketCard from "./components/TicketCard"
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setUser } from "./redux/features/userReducer";

function App() {

  const dispatch = useAppDispatch();
  const { id } = useAppSelector(state => state.userReducer);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUser({
      id: Number(e.target.value),
      name: "User"
    }));
  }

  return (
    <div>
      <Form className="w-50 mx-auto">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Current User Id</Form.Label>
          <Form.Control type="number" placeholder="User Id #number" onChange={handleUserChange} value={String(id)} />
        </Form.Group>
      </Form>

      <Container>
        <Row xs={1} sm={2} md={2} lg={4} xl={4} className="g-3">
          {products.map((product) => (
            <Col key={product.id} className="gap-2">
              <TicketCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default App
