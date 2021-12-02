import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useTable } from "./useTable";
import Pagination from "./pagination";
import "./table.css";

const Table = (params) => {
  const {
    headers,
    rows,
    perPageCount,
    allowPagination,
    onRowClick,
    isFilterAllowed,
    onfilterData,
    startingPage,
    deleteAll,
  } = params;

  const {
    rowsPerPage,
    currentRows,
    totalPages,
    numberOfPage,
    currentpage,
    doPaginate,
    doPrev,
    doNext,
  } = useTable(rows, startingPage, perPageCount);

  return (
    <div>
      {isFilterAllowed && (
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            onChange={onfilterData}
          />
        </InputGroup>
      )}

      <table className="table-container">
        <tr>
          {headers.map((s) => {
            return (
              <th>
                {!s.headerCheckBox ? (
                  <div className="header-Cell">
                    <div>{s.title}</div>
                    {s.subTitle && <div>{s.subTitle}</div>}
                  </div>
                ) : (
                  <div>
                    <Form>
                      <Form.Check
                        type="checkbox"
                        onChange={s.headerCheckEvent}
                      />
                    </Form>
                  </div>
                )}
              </th>
            );
          })}
        </tr>
        {currentRows.map((row) => (
          <tr onClick={onRowClick ? onRowClick(row) : null}>
            {row.map((cell) => (
              <td>{cell.content}</td>
            ))}
          </tr>
        ))}
      </table>

      <div style={{ display: "flex" }}>
        <div>
          <Button variant="danger" onClick={deleteAll}>
            Delete All
          </Button>
        </div>
        <div style={{ flex: "auto" }}>
          {allowPagination && rows.length > rowsPerPage && (
            <Pagination
              numberOfPage={numberOfPage}
              totalRows={rows.length}
              currentPage={currentpage}
              doPaginate={doPaginate}
              doPrev={doPrev}
              doNext={doNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Table.defaultProps = {
  startingPage: 1,
  perPageCount: 10,
  onRowClick: undefined,
};

export default Table;
