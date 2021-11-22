import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./pagination.css";

const Pagination = ({
  totalRows,
  numberOfPage,
  currentPage,
  doPaginate,
  doPrev,
  doNext,
}) => (
  <div style={{ display: "flex", justifyContent: "flex-end" }}>
    <div>
      <p>
        <span>{totalRows}</span> results
      </p>
    </div>
    <div>
      <ul class="pagination">
        <li data-testid="prev-button" onClick={doPrev}>
          <Icon.CaretLeftFill color="royalblue" />
        </li>
        {numberOfPage.map((pageNumber) => (
          <li
            data-testid="page-button"
            key={pageNumber}
            onClick={() => doPaginate(pageNumber)}
          >
            <span>{pageNumber}</span>
          </li>
        ))}
        <li data-testid="next-button" onClick={doNext}>
          <Icon.CaretRightFill color="royalblue" />
        </li>
      </ul>
    </div>
  </div>
);

export default Pagination;
