import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import './Cards.css';


const Cards = (props) => {
  const { cats } = props;
  return (
    <div>
      <div className="pet-cards-container">
        {cats.map(cat => {
          return (
            <Card
              key={cat.id}
              name={cat.name}
              phone={cat.phone}
              email={cat.email}
              image={cat.image}
              isFavoured={cat.favoured}
            />
          )
        }
        )}
      </div>
    </div>
  );
};

export default Cards;