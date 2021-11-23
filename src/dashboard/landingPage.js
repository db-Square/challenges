import React from "react";
import Table from "../challenge/table";

import { Form } from "react-bootstrap";
import "./landing.css";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeData: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);

        this.setState({
          employeeData: result,
        });
      });
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
          content: <div>{s.name}</div>,
        },
        {
          content: <div>{s.email}</div>,
        },
        {
          content: <div>{s.role}</div>,
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
        title: "Name",
        // subTitle: "Duration",
      },
      {
        title: "Email",
        // subTitle: "2004-2006",
      },
      {
        title: "Role",
        // subTitle: "2004-2006",
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
    return (
      <div>
        <div class="page-Layout">
          <div class="item1">
            <div>{this.greeting()}</div>
            <div>Building Table Control</div>
            <div>
              I am Deeptanshu Belwal, Full Stack Developer, Bangalore, India
            </div>
          </div>

          <div class="item2">
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
          </div>
          <div class="item3">© copyright by db-Square</div>
        </div>
      </div>
    );
  }
}
