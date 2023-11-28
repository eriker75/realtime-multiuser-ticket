import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Product } from "../data/products";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useFirestore } from "@hooks/useFirestore";
import { Purchase } from "@definitions/Purchase";
import { useAppSelector } from "@hooks/redux";
import { Timestamp } from 'firebase/firestore';

interface Props {
  product: Product;
}

function TicketCard({ product }: Props) {
  const { id, section, row, price, column, quantity } = product;
  const { id: user_id } = useAppSelector(state => state.userReducer);

  const db = useFirestore();

  const createIfNotExists = async (data: Purchase) => {
    const ref = doc(db, "purchases", String(data.ticket_id));
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) {
      await setDoc(ref, data);
    }
    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBuy = (_: React.MouseEvent<HTMLButtonElement>) => {
    if (price && id) {
      createIfNotExists({
        ticket_id: id,
        user_id,
        timestamp: Timestamp.now(),
      });
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>
        <b>
          {section} | row: {row} | col: {column}
        </b>
      </Card.Header>
      <Card.Body>
        <Card.Title>Quantity: {quantity}</Card.Title>
        <Card.Text>Price: {price}$</Card.Text>
        <Button variant="primary" onClick={(event) => handleBuy(event)}>
          BUY
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}

export default TicketCard;
