import React, { useState, useEffect } from "react";
import { Table, Label, Icon, Button } from "semantic-ui-react";
import EmployerService from "../../../services/employerService";
import EmployerUpdateConfirmByEmployeeService from "../../../services/employerUpdateConfirmByEmployeeService";

export default function AdminJobAdvertList() {
  const [
    employerUpdateConfirmByEmployees,
    setEmployerUpdateConfirmByEmployees,
  ] = useState([]);

  let employerUpdateConfirmByEmployeeService =
    new EmployerUpdateConfirmByEmployeeService();

  let employerService = new EmployerService();

  useEffect(() => {
    employerUpdateConfirmByEmployeeService
      .getAllByConfirmedFalse()
      .then((result) => setEmployerUpdateConfirmByEmployees(result.data.data));
  }, []);

  let changeIsConfirmedByEmployee = (employerId) => {
    employerService.changeIsConfirmedByEmployee(employerId);
  };

  let changeUpdateIsConfirmedByEmployee = (employerId) => {
    employerUpdateConfirmByEmployeeService.changeIsConfirmedByEmployee(
      employerId
    );
  };

  function handleConfirmedByEmployee(employer) {
    changeIsConfirmedByEmployee(employer.id);
    changeUpdateIsConfirmedByEmployee(employer.id);
    employerService.add(employer).then((result) => {
      console.log(result.data.data);
    });
    window.location.reload();
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tên công ty</Table.HeaderCell>
            <Table.HeaderCell>Trang Web:</Table.HeaderCell>
            <Table.HeaderCell>E-Mail</Table.HeaderCell>
            <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
            <Table.HeaderCell>Tình huống</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Sự chấp thuận{" "}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employerUpdateConfirmByEmployees.map((employer, index) => (
            <Table.Row key={index}>
              <Table.HeaderCell collapsing>
                {employer.companyName}
              </Table.HeaderCell>
              <Table.Cell>{employer.webAdress}</Table.Cell>
              <Table.Cell>{employer.email}</Table.Cell>
              <Table.Cell>{employer.phoneNumber}</Table.Cell>
              <Table.Cell>
                <Label color="orange" style={{ width: "100%" }}>
                  Đang chờ xác nhận
                </Label>
              </Table.Cell>

              <Table.Cell collapsing>
                <Button
                  onClick={() => handleConfirmedByEmployee(employer)}
                  color="green"
                  icon
                  labelPosition="left"
                >
                  <Icon name="checkmark" size="large" />
                  Chấp thuận
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
