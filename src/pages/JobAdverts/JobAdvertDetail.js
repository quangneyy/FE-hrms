import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Rail,
  Segment,
  Header,
  Table,
  Button,
  Icon,
  Label,
} from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";

export default function JobAdvertDetail() {
  let { id } = useParams();

  const [jobAdvert, setJobAdvert] = useState({});

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getById(id)
      .then((result) => setJobAdvert(result.data.data));
  }, []);

  let segmentBottom = {
    marginBottom: "35em",
  };

  return (
    <div>
      <Segment textAlign="center" style={segmentBottom}>
        <Rail internal position="left">
          <Segment inverted color="teal">
            Thông tin đăng tuyển dụng
          </Segment>

          <Table basic="very" celled collapsing>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Vị trí công việc</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.jobPosition?.position}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="location arrow" />
                      Thành phố
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>{jobAdvert?.city?.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Loại việc làm</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.employmentType?.name}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Loại hoạt động</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.workingType?.name}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Số Vị trí Mở</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.openPositionCount}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Phạm vi lương</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.minSalary}
                  <Icon name="try" />
                  <Label>~</Label> {jobAdvert?.maxSalary}
                  <Icon name="try" />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="calendar" />
                      Hạn nộp hồ sơ
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.applicationDeadline}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Giải trình</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{jobAdvert?.description}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Rail>

        <Rail internal position="right">
          <Segment inverted color="brown">
            Thông tin liên lạc
          </Segment>
          <Table basic="very" celled collapsing>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="building" />
                      Tên công ty
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.employer?.companyName}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="mail" />E Mail
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>{jobAdvert?.employer?.email}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>
                  <Header as="h4">
                    <Header.Content>
                      <Icon name="phone" />
                      Số điện thoại
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.employer?.phoneNumber}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4">
                    <Header.Content>Web Site</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell collapsing>
                  {jobAdvert?.employer?.webAdress}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Rail>
        <Button positive>ÁP DỤNG</Button>
      </Segment>
    </div>
  );
}
