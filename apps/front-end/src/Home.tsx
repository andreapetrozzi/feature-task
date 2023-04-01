import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { PORT } from "../../back-end/src/constants";
import { FakeDatum } from "../../back-end/src/types";

import "./App.css";
import { format } from "date-fns";

export default function Home() {
  
  // Funzione cambia sfondo
  function handleClick() {
    document.body.style.backgroundColor = 'gray';
  }

  const dataQuery = useQuery("repoData", () =>
    fetch(`http://localhost:${PORT}/data`).then(
      (res): Promise<FakeDatum[]> => res.json()
    )
  );
  const renderCounterRef = useRef<number>(0);
  const renderCounterElementRef = useRef<HTMLElement>(null);
  const [[from, to], setFromTo] = useState([0, 11]);

  // Start
  const ages = dataQuery.data?.map((datum) => {
    const birthDate = new Date(datum.birthday);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  });

  const maxAge = ages ? Math.max(...ages) : null;
  const minAge = ages ? Math.min(...ages) : null;
  const meanAge = ages ? Math.round(ages.reduce((a, b) => a + b) / ages.length) : null;
  const medianAge = ages ? ages.sort()[Math.floor(ages.length / 2)] : null;

  const premiumUsers = dataQuery.data?.filter((datum) => datum.subscriptionTier === "premium");
  const percentagePremium = premiumUsers ? Math.round((premiumUsers.length / dataQuery.data.length) * 100) : null;

  const descriptionListArray = [
    { key: "Records", value: dataQuery.data?.length },
    { key: "Max age", value: maxAge },
    { key: "Min age", value: minAge },
    { key: "Mean age", value: meanAge },
    { key: "Median age", value: medianAge },
    { key: "Percentage of premium", value: percentagePremium ? `${percentagePremium}%` : null },
    { key: "Records", value: dataQuery.data?.length },
  ];

  useEffect(() => {
    renderCounterRef.current = renderCounterRef.current + 1;
    if (renderCounterElementRef.current !== null) {
      renderCounterElementRef.current.innerHTML =
        renderCounterRef.current.toString();
    }
  });

  if (dataQuery.isLoading) {
    return (
      <div className="full-centered">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleClick}>Change background color</button>
      <div>
        <dl>
          <div className="key-value">
            <dt>Number of renders</dt>
            <dd ref={renderCounterElementRef} id="counter">
              ?
            </dd>
          </div>
          {descriptionListArray.map((item, index) => {
            return (
              <div key={index} className="key-value">
                <dt>{item.key}</dt>
                <dd>{item.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Birth Date</th>
            <th>Account type</th>
            <th>Cat</th>
          </tr>
        </thead>
        <tbody>
          {dataQuery.data?.slice(from, to).map((datum, index) => {
            return (
              <tr key={index}>
                <td>{datum.name}</td>
                <td>{datum.lastName}</td>
                <td>{datum.email.toLowerCase()}</td>
                <td>{datum.city}</td>
                <td>{format(new Date(datum.birthday), "dd/MM/yyyy")}</td>
                <td>{datum.subscriptionTier}</td>
                <td>{datum.pet.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bottom-bar">
        <button
          onClick={() => {
            setFromTo(([from, to]) => [from - 10, to - 10]);
          }}
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            setFromTo(([from, to]) => [from + 10, to + 10]);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
