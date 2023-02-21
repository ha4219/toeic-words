import React from 'react';
import { addData } from '../util';
import loadData from '../data.json';
import './KoToEn.css';

const DEFAULT = 10;

function App() {
  const allData = loadData.data;

  const [index, setIndex] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [isWrong, setIsWrong] = React.useState(false);

  const cur = page * DEFAULT + index;

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      answer: { value: string };
    };
    if (target.answer.value === allData[cur].en) {
      target.answer.value = '';
      if (index === 9) {
        setPage((prev) => prev + 1);
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    } else {
      setIsWrong(true);
      const utter = new SpeechSynthesisUtterance(allData[cur].en);
      window.speechSynthesis.speak(utter);
    }
  };

  const handlePage = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      page: { value: number };
    };
    setPage(target.page.value);
    setIndex(0);
  };

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIndex(0);
    setIsWrong(false);
  };

  React.useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  return (
    <div className="App">
      <form className="set-page" onSubmit={handlePage}>
        <label>page: </label>
        <input type="number" name="page" />
      </form>
      {isWrong ? (
        <div className="wrong">
          <div>틀림</div>
          <div>
            <span>answer:</span>
            <b> {allData[cur].en}</b>
          </div>
          <div>
            <button onClick={handleRefresh} autoFocus>
              refresh
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="continue">
          <div className="full-div">{allData[cur].ko}</div>
          <input
            type="text"
            className="input"
            name="answer"
            autoComplete="off"
            autoFocus
          />
          <div className="half-div">{cur}</div>
        </form>
      )}
    </div>
  );
}

export default App;
