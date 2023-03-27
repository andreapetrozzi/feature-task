import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { PORT } from "../../back-end/src/constants";
import { FakeDatum } from "../../back-end/src/types";

import "./App.css";
import { format } from "date-fns";

export default function Home() {
  const dataQuery = useQuery("repoData", () =>
    fetch(`http://localhost:${PORT}/data`).then(
      (res): Promise<FakeDatum[]> => res.json()
    )
  );
  const renderCounterRef = useRef<number>(0);
  const renderCounterElementRef = useRef<HTMLElement>(null);
  const [[from, to], setFromTo] = useState([0, 11]);

  const descriptionListArray = [
    { key: "Records", value: dataQuery.data?.length },
    { key: "Max age", value: "?" },
    { key: "Min age", value: "?" },
    { key: "Mean age", value: "?" },
    { key: "Median age", value: "?" },
    { key: "Percentage of premium", value: "?" },
    { key: "Records", value: "?" },
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
      <button>Change background color</button>
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
