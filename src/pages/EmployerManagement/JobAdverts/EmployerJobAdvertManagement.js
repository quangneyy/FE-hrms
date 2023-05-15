import React, { useState, useEffect } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import JobAdvertService from "../../../services/jobAdvertService";

export default function EmployerJobAdvertManagement() {
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getAllByEmployerId(18) //fake id auth gerçekleşene kadar
      .then((result) => setJobAdverts(result.data.data));
  }, []);

  let changeActivestatus = (id) => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService.changeActiveStatus(id).then((result) => {
      console.log(result.data);
    });
    window.location.reload();
  };

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Thành phố</Table.HeaderCell>
            <Table.HeaderCell>Chức vụ</Table.HeaderCell>
            <Table.HeaderCell>Mở Vị trí</Table.HeaderCell>
            <Table.HeaderCell>Cách làm việc</Table.HeaderCell>
            <Table.HeaderCell>Loại hình kinh doanh</Table.HeaderCell>
            <Table.HeaderCell>Số tiền lương</Table.HeaderCell>
            <Table.HeaderCell>Hạn nộp hồ sơ</Table.HeaderCell>
            <Table.HeaderCell>Giải trình</Table.HeaderCell>
            <Table.HeaderCell>Tình huống</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobAdverts.map((jobAdvert, key) => (
            <Table.Row key={key}>
              <Table.Cell>{jobAdvert.city.name}</Table.Cell>
              <Table.Cell>{jobAdvert.jobPosition.position}</Table.Cell>
              <Table.Cell>{jobAdvert.openPositionCount}</Table.Cell>
              <Table.Cell>{jobAdvert.workingType.name}</Table.Cell>
              <Table.Cell>{jobAdvert.employmentType.name}</Table.Cell>
              <Table.Cell>
                {jobAdvert.minSalary} ₺ - {jobAdvert.maxSalary} ₺
              </Table.Cell>
              <Table.Cell>{jobAdvert.applicationDeadline}</Table.Cell>
              <Table.Cell>{jobAdvert.description}</Table.Cell>

              {jobAdvert.isActivated ? (
                <Table.Cell>
                  <Button
                    onClick={() => changeActivestatus(jobAdvert.id)}
                    color="red"
                    icon
                    labelPosition="left"
                  >
                    <Icon name="eye slash outline" size="large" />
                    Di dời
                  </Button>
                </Table.Cell>
              ) : (
                <Table.Cell>
                  <Button
                    onClick={() => changeActivestatus(jobAdvert.id)}
                    color="green"
                    icon
                    labelPosition="left"
                  >
                    <Icon name="eye" size="large" />
                    Kích hoạt
                  </Button>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
