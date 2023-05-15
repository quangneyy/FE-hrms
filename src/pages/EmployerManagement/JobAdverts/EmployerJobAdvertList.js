import React, { useState, useEffect } from "react";
import { Table, Label } from "semantic-ui-react";
import JobAdvertService from "../../../services/jobAdvertService";

export default function EmployerJobAdvertList() {
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getAllByEmployerId(18) //fake id auth gerçekleşene kadar
      .then((result) => setJobAdverts(result.data.data));
  }, []);
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan="2">Thành phố</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Chức vụ</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Mở vị trí</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Cách làm việc</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">
              Loại hình kinh doanh
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Số tiền lương</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Hạn nộp hồ sơ</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Giải trình</Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              {" "}
              Tình huống
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Từ phía bạn</Table.HeaderCell>
            <Table.HeaderCell>Bởi quản trị viên</Table.HeaderCell>
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
              {jobAdvert.isConfirmedByEmployee ? (
                <Table.Cell>
                  <Label color="green" style={{ width: "100%" }}>
                    Tán thành
                  </Label>
                </Table.Cell>
              ) : (
                <Table.Cell>
                  <Label color="orange" style={{ width: "100%" }}>
                    Chờ phê duyệt
                  </Label>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
