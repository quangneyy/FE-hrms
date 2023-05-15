import React, { useState, useEffect } from "react";
import { Table, Label, Icon, Button } from "semantic-ui-react";
import JobAdvertService from "../../../services/jobAdvertService";

export default function AdminJobAdvertList() {
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getAllByIsConfirmedByEmployeeFalse()
      .then((result) => setJobAdverts(result.data.data));
  }, []);

  let changeIsConfirmedByEmployee = (jobAdvertId) => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService.changeIsConfirmedByEmployee(jobAdvertId).then((result) => {
      console.log(result.data);
    });
    window.location.reload();
  };

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tên công ty</Table.HeaderCell>
            <Table.HeaderCell>Thành phố</Table.HeaderCell>
            <Table.HeaderCell>Chức vụ</Table.HeaderCell>
            <Table.HeaderCell>Mở vị thế</Table.HeaderCell>
            <Table.HeaderCell>Cách làm việc</Table.HeaderCell>
            <Table.HeaderCell>Loại hình kinh doanh</Table.HeaderCell>
            <Table.HeaderCell>Số tiền lương</Table.HeaderCell>
            <Table.HeaderCell>Hạn nộp hồ sơ</Table.HeaderCell>
            <Table.HeaderCell>Giải trình</Table.HeaderCell>
            <Table.HeaderCell> Bởi nhà tuyển dụng</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Sự chấp thuận{" "}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobAdverts.map((jobAdvert, key) => (
            <Table.Row key={key}>
              <Table.HeaderCell collapsing>
                {jobAdvert.employer.companyName}
              </Table.HeaderCell>
              <Table.Cell>{jobAdvert.city.name}</Table.Cell>
              <Table.Cell>{jobAdvert.jobPosition.position}</Table.Cell>
              <Table.Cell>{jobAdvert.openPositionCount}</Table.Cell>
              <Table.Cell>{jobAdvert.workingType.name}</Table.Cell>
              <Table.Cell>{jobAdvert.employmentType.name}</Table.Cell>
              <Table.Cell collapsing>
                {jobAdvert.minSalary} ₺ - {jobAdvert.maxSalary} ₺
              </Table.Cell>
              <Table.Cell collapsing>
                {jobAdvert.applicationDeadline}
              </Table.Cell>
              <Table.Cell>{jobAdvert.description}</Table.Cell>
              {jobAdvert.isActivated ? (
                <Table.Cell>
                  <Label color="green" style={{ width: "100%" }}>
                    Tích cực
                  </Label>
                </Table.Cell>
              ) : (
                <Table.Cell>
                  <Label color="orange" style={{ width: "100%" }}>
                    Thụ động
                  </Label>
                </Table.Cell>
              )}

              <Table.Cell collapsing>
                <Button
                  onClick={() => changeIsConfirmedByEmployee(jobAdvert.id)}
                  color="green"
                  icon
                  labelPosition="left"
                >
                  <Icon name="checkmark" size="large" />
                  Chấp thuận
                </Button>

                <Button color="red" icon labelPosition="left">
                  <Icon name="remove" size="large" />
                  Di dời
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
