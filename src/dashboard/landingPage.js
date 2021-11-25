import React from "react";
import Table from "../challenge/table";
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./landing.css";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeData: [],
      filter: null,
    };
  }

  componentDidMount() {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        if (result && result.length > 0) {
          result.forEach((element) => {
            element.isDisable = true;
          });

          this.setState({
            employeeData: result,
          });
        } else {
          this.setState({
            employeeData: [],
          });
        }
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
    const gridData = this.state.employeeData;

    const filterdata = gridData.find((s) => s.id === row.id);
    filterdata.isDisable = false;

    this.setState({
      employeeData: gridData,
    });
  };

  onRowDelete = (row) => {
    const gridData = this.state.employeeData;
    const filterdata = gridData.filter((s) => s.id !== row.id);
    this.setState({
      employeeData: filterdata,
    });
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
    const { employeeData, filter } = this.state;

    const dataToShow = filter
      ? employeeData.filter((d) => d.name.includes(filter))
      : employeeData;

    return dataToShow.map((s, index) => {
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
          content: (
            <div>
              <input
                type="text"
                id="email"
                name="email"
                value={s.email}
                disabled={s.isDisable}
              />
            </div>
          ),
        },
        {
          content: (
            <div>
              <input
                type="text"
                id="role"
                name="role"
                value={s.role}
                disabled={s.isDisable}
              />
            </div>
          ),
        },
        {
          content: (
            <div>
              <button onClick={() => this.onRowEdit(s)}>
                <Icon.PencilSquare />
              </button>
              <span style={{ marginLeft: "2px" }}>
                <button onClick={() => this.onRowDelete(s)}>
                  <Icon.Trash />
                </button>
              </span>
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
    // console.log("onRowClick", row);
  };

  onfilterData = (param) => {
    // console.log("onfilterData", param.target.value);
    this.setState({ filter: param.target.value });
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
