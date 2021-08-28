import React from "react";
// import "react-dates/initialize";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import "../App.css";

export default class InfoTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rows: [], //Raw rows data obtained from API response
        tableRows: [], // Rows data for the?
        selectedOption: null,
        rowTrigger: false, // Trigger that indicates row data generated from raw data or not
        city: 'MUMBAI',
        columns: [{
            dataField: 'bank_name',
            text: 'Bank'
          }, {
            dataField: 'ifsc',
            text: 'IFSC'
          }, {
            dataField: 'branch',
            text: 'Branch'
          }, {
            dataField: 'bank_id',
            text: 'Bank ID'
          }, {
            dataField: 'address',
            text: 'Address'
          }],
        
        isLoaded: false, // Trigger that indicates detailed rows data fetched or not
      };
    }

    componentDidUpdate(prevProps) {
      if (this.props.city !== prevProps.city) {
        this.fetchRowData();
        this.setState({ tableRows : []});
        
      }
      
    }

    componentDidMount() {
        this.fetchRowData();
    }

    fetchRowData() {
      console.log(this.props.city)
      console.log(this.props.city + " Hello")
      fetch('https://vast-shore-74260.herokuapp.com/banks?city=' + this.props.city)
      .then(async response => {
          const data = await response.json();
          if (!response.ok) {
              // get error message from body or default to response statusText
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
          }

          this.setState({ rows: data, isLoaded: true })
          
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
    }

    breakRows = (rows) => {
        for (var i = 0; i < rows.length; i++) {
          this.generateRows(rows[i]);
        }
    };

    generateRows = (rows) => {
        let res, jsonObj;
        res = JSON.stringify(rows);
        jsonObj = JSON.parse(res);
        var obj = {};
        if (Object.keys(jsonObj).length) {
            this.state.tableRows.push(jsonObj);
        }
        (this.state.isLoaded = false);
        (this.state.rowTrigger = true);
        
    };
    render() {
      const { selectedOption } = this.state;
      const { SearchBar } = Search;

      const paginationOptions = {
        page: 0,
        sizePerPageList: [
          {
            text: "5",
            value: 5,
          },
          {
            text: "10",
            value: 10,
          },
        ],
        sizePerPage: 5,
        pageStartIndex: 0,
        paginationSize: 3,
        prePage: "Prev",
        nextPage: "NexfirstPage",
        lastPage: "Last",
        paginationPosition: "top",
      };
      return (
        
        <div>
         
            {this.state.isLoaded ? this.breakRows(this.state.rows) : ""}
            {this.state.rowTrigger ? (
            <BootstrapTable
            classes="table table-striped table-dark"
            wrapperClasses="table-responsive"
            keyField="bank_id"
            data={this.state.tableRows}
            columns={this.state.columns}
            pagination={paginationFactory(paginationOptions)}
                />
            ) : (
             <BootstrapTable
            classes="table table-striped table-dark"
            wrapperClasses="table-responsive"
            keyField="bank_id"
            data={this.state.tableRows}
            columns={this.state.columns}
            pagination={paginationFactory(paginationOptions)}   
            />
        )}
        {this.state.rowTrigger ? (this.state.rowTrigger = false) : ""}
        
        </div>
      );
    }
  }