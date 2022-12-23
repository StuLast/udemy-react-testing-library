import styles from './App.module.css';
import Card from './components/Cards/Card/Card';

function App() {
  const cardProps = {
    email: 'test@test.com',
    image: {
      url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      alt: 'cute kitty'
    },
    isFavoured: false,
    name: 'Sydney',
    phone: '111-111-1111',
  }


  return (
    <div className="container">
      App Component
      <Card {...cardProps} />
    </div>
  );
}

export default App;
