import React from "react";
import Table from "../challenge/table";
import { tableData } from "./applicationData";
import { Form } from "react-bootstrap";
import "./dashboard.css";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentTitle: "",
      employeeData: tableData,
    };
  }

  getDatetime = () => {
    const date = new Date();
    return date.toDateString();
  };

  greeting = () => {
    var today = new Date();
    var curHr = today.getHours();

    return curHr < 12
      ? "Good morning"
      : curHr < 18
      ? "Good afternoon"
      : "Good evening";
  };

  onSideMenuClick = (param) => {
    this.setState({ contentTitle: param });
  };

  onRowEdit = (row) => {
    alert(`Edit the selected Record ${row.name}`);
  };

  onRowDelete = (row) => {
    alert(`Delete the selected Record ${row.name}`);
  };

  rowCheckChange = (e) => (row) => {
    const ischeck = e.target.checked;
    const empData = this.state.employeeData;
    const selectedRow = empData.filter((s) => s.id === row.id)[0];
    selectedRow.isChecked = ischeck;

    this.setState({
      employeeData: empData,
    });
  };

  getRows = () => {
    const { employeeData } = this.state;
    console.log("employeeData", employeeData);
    return employeeData.map((s, index) => {
      return [
        {
          content: (
            <div>
              <Form>
                <Form.Check
                  type="checkbox"
                  checked={s.isChecked}
                  onChange={(e) => this.rowCheckChange(e)(s)}
                />
              </Form>
            </div>
          ),
        },
        {
          content: (
            <div>
              {s.name}
              {index}
            </div>
          ),
        },
        {
          content: <div>{s.salary1}</div>,
        },
        {
          content: <div>{s.salary2}</div>,
        },
        {
          content: <div>{s.salary3}</div>,
        },
        {
          content: (
            <div>
              <button onClick={() => this.onRowEdit(s)}>Edit</button>
              <button onClick={() => this.onRowDelete(s)}>Delete</button>
            </div>
          ),
        },
      ];
    });
  };

  getHeaders = () => {
    return [
      {
        title: "#",
        headerCheckBox: true,
        headerCheckEvent: this.onHeaderCheckEvent,
      },
      {
        title: "Employee Name",
        subTitle: "Duration",
      },
      {
        title: "Company 1",
        subTitle: "2004-2006",
      },
      {
        title: "Company 2",
        subTitle: "2004-2006",
      },
      {
        title: "Company 3",
        subTitle: "2006-2010",
      },
      {
        title: "",
      },
    ];
  };

  onHeaderCheckEvent = (e) => {
    // console.log("onHeaderCheckEvent", e.target.checked);
    // alert(`Header checkbox is selected ${e.target.checked}`);
    const ischeck = e.target.checked;
    const empData = this.state.employeeData;
    empData.forEach((element) => {
      element.isChecked = ischeck;
    });

    this.setState({
      employeeData: empData,
    });
  };

  onRowClick = (row) => {
    console.log("onRowClick", row);
  };

  onfilterData = (param) => {
    console.log("onfilterData", param.target.value);
  };

  render() {
    const { contentTitle } = this.state;

    return (
      <div>
        <div className="top">
          <div>{this.greeting()}, Bangalore, India</div>
          <div>Deeptanshu Belwal, Full Stack Developer</div>
        </div>
        <div className="left">
          <div className="sidebar">
            <button onClick={() => this.onSideMenuClick("Table")}>
              Table Control
            </button>
            <button onClick={() => this.onSideMenuClick("Date")}>
              Date Control
            </button>
          </div>
        </div>
        <div className="main">
          <h2>{contentTitle}</h2>
          <p>this is new contol</p>
          {contentTitle === "Table" && (
            <Table
              headers={this.getHeaders()}
              rows={this.getRows()}
              perPageCount={10}
              allowPagination={false}
              onRowClick={this.onRowClick()}
              isFilterAllowed={true}
              onfilterData={this.onfilterData}
              allowPagination={true}
            ></Table>
          )}
        </div>
      </div>
    );
  }
}
