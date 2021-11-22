import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useTable } from "./useTable";
import Pagination from "./pagination";
import "./table.css";

const Table = (params) => {
  console.log("params", params);
  const {
    headers,
    rows,
    perPageCount,
    allowPagination,
    onRowClick,
    isFilterAllowed,
    onfilterData,
    startingPage,
  } = params;
  // headers can have  {title, subTitle,headerCheckBox,headerCheckEvent className}
  // onRowClick will return selected row

  const {
    rowsPerPage,
    currentRows,
    numberOfPage,
    currentPage,
    doPaginate,
    doPrev,
    doNext,
  } = useTable(rows, startingPage, perPageCount);

  console.log("currentRows", currentRows);
  console.log("currentPage", currentPage);
  console.log("numberOfPage", numberOfPage);
  console.log("rowsPerPage", rowsPerPage);

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
      <table>
        <tr>
          {headers.map((s) => {
            return (
              <th>
                {!s.headerCheckBox ? (
                  <div>
                    <p className="title">{s.title}</p>
                    {s.subTitle && <p className="subTitle">{s.subTitle}</p>}
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
      {allowPagination && rows.length > rowsPerPage && (
        <Pagination
        numberOfPage={numberOfPage}
          totalRows={rows.length}
          currentPage={currentPage}
          doPaginate={doPaginate}
          doPrev={doPrev}
          doNext={doNext}
        />
      )}
    </div>
  );
};

Table.defaultProps = {
  startingPage: 1,
  perPageCount: 10,
  onRowClick: undefined,
};

export default Table;
