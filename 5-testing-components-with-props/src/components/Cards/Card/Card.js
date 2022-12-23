const Card = (props) => {
  const { name, phone, email } = props
  return (
    <div>
      <h1>{name}</h1>
      <p>{phone}</p>
      <p>{email}</p>
    </div>
  )
};

export default Card;