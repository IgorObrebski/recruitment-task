import React, { ContextType, useEffect, useState } from "react";
import { Profile } from "./components/Profile";
import Header from "./components/Header";
import { Form } from "./components/Form";
import "./App.css";
import { Routes, Route } from "react-router-dom";

interface Person {
  vehicles: [];
  created: string;
  id?: number | string;
  name: string;
  eye_color: string;
  age?: number;
}

export const GlobalContext = React.createContext<Person[] | []>([]);

function App() {
  const [person, setPerson] = useState<Person[]>([]);
  let [personId, setPersonId] = useState(1);

  useEffect(() => {
    fetch(`https://swapi.py4e.com/api/people/${personId}`).then((res) =>
      res.json().then((data) => setPerson([data]))
    );
  }, [personId]);

  const changeId = () => {
    setPersonId(personId + 1);
  };

  return (
    <>
      <GlobalContext.Provider value={person}>
        <Routes>
          <Route
            path='/'
            element={
              <div className='app'>
                <Header />
                {person.length > 0 ? (
                  <div>
                    {person.map((person) => (
                      <Profile name={person.name} eyeColor={person.eye_color} />
                    ))}
                  </div>
                ) : null}
                <button onClick={() => changeId()} className='btn-next'>
                  next profiles
                </button>
              </div>
            }
          ></Route>
          <Route path='/form' element={<Form />}></Route>
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
