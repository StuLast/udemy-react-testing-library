import Pets from './components/Pets/Pets';
import cats from './mocks/cats.json'

function App() {

  return (
    <div className="container">
      <Pets cats={cats} />
    </div>
  );
}

export default App;
