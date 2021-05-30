import { useProductContext } from "../../contexts/Products-Context";

export function Sidebar() {
  const { state, dispatch } = useProductContext();

  return (
    <div>
      <div
        className="btnPrimary"
        onClick={() => {
          dispatch({ type: "RESET" });
        }}
      >
        RESET
      </div>
      <div className="asideTitle">SORT BY</div>
      <div className="radioBtnDiv">
        <label>
          <input
            type="radio"
            name="sort"
            value={state.sortBy}
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
            }
            checked={state.sortBy && state.sortBy === "PRICE_HIGH_TO_LOW"}
          />{" "}
          High To Low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value={state.sortBy}
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
            }
            checked={state.sortBy && state.sortBy === "PRICE_LOW_TO_HIGH"}
          />{" "}
          Low To High
        </label>
      </div>

      <div className="asideTitle">PRICE RANGE</div>
      <label>
        <input
          className="slider"
          type="range"
          min="1200"
          max="72000"
          value={state.priceRange}
          onChange={(e) =>
            dispatch({ type: "PRICE_RANGE", payload: e.target.value })
          }
        />
        Value : ₹{state.priceRange}
      </label>
    </div>
  );
}
