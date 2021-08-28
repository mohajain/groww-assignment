import React from "react";
// import "react-dates/initialize";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
import { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import "../App.css";
import InfoTable from "./InfoTable";

export default class CityFilter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 'MUMBAI'
      };
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
    
      return (
        <div className="dropdown">
          <div className="ml-3 mr-3">
                      
        <select onChange={this.handleChange}>
          <option value="MUMBAI">MUMBAI</option>
          <option value="KOLKATA">KOLKATA</option>
          <option value="BANGALORE">BANGALORE</option>
          <option value="DELHI">DELHI</option>
          <option value="CHENNAI">CHENNAI</option>
        </select>
        </div>
        <div>
            <InfoTable
            city={this.state.value}
            />
        </div>
        </div>
      );
    }
  }