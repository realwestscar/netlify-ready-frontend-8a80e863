
import "./styles.css";
import RingSizeCalculator from "./components/RingSizeCalculator";

const App = () => {
  return (
    <div className="ring-sizer-app">
      <header>
        <h1>Patrick Boghossian Ring Sizer</h1>
      </header>
      <main>
        <h2>Ring Size Calculator</h2>
        <RingSizeCalculator />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Patrick Boghossian. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
