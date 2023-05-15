import React from "react";
import {
  Grid,
  Segment,
  Container,
  Icon,
  Image,
  Label,
  Statistic,
} from "semantic-ui-react";

export default function HomePage() {
  return (
    <div>
      <Segment
        placeholder
        style={{ marginTop: "35px", height: "35em" }}
        inverted
        color="grey"
      >
        <Grid columns={4} stackable textAlign="center">
          <Grid.Row verticalAlign="middle">
            <Image
              fluid
              rounded
              floated="right"
              size="big"
              src={"../assets/homepagesegment.jpg"}
            />

            <Grid.Column style={{ marginLeft: "10px" }}>
              <Label size="massive" as="a" color="teal" tag>
                Công việc gì làm gì
                <Icon link name="help" />
              </Label>
              <Label
                style={{ marginTop: "15px" }}
                size="massive"
                as="a"
                color="teal"
                tag
              >
                Làm thế nào để bạn biết khi nào bạn cần thay đổi công việc{" "}
                <Icon link name="help" />
              </Label>
              <Label
                style={{ marginTop: "15px" }}
                size="massive"
                as="a"
                color="teal"
                tag
              >
                Làm thế nào để có được cơ hội thực tập từ xa
                <Icon link name="help" />
              </Label>
              <Label
                style={{ marginTop: "15px" }}
                size="massive"
                as="a"
                color="teal"
                tag
              >
                Mẹo để tăng khả năng sáng tạo của bạn
                <Icon link name="warning" />
              </Label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Container style={{ marginTop: "4em" }}>
        <Grid centered style={{ marginBottom: "2em" }}>
          <label style={{ fontSize: "25px", fontFamily: "Arial" }}>
            Các loại công việc
          </label>
        </Grid>

        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Grid.Row>
                <Image rounded contain src={"../assets/full-time.jpg"} />
              </Grid.Row>
              <Grid.Row textAlign="left" style={{ marginTop: "6px" }}>
                <Label color="orange">Full Time</Label>
              </Grid.Row>
              <Grid.Row style={{ marginTop: "2em" }}>
                <Image rounded contain src={"../assets/remote.jpg"} />
              </Grid.Row>
              <Grid.Row textAlign="left" style={{ marginTop: "6px" }}>
                <Label color="olive">Remote</Label>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column style={{ marginLeft: "5em", marginRight: "5em" }}>
              <Grid.Row>
                <Image rounded contain src={"../assets/stajyer.jpg"} />
              </Grid.Row>
              <Grid.Row textAlign="left" style={{ marginTop: "6px" }}>
                <Label color="brown">Internship</Label>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <Grid.Row>
                <Image rounded contain src={"../assets/part-time.jpg"} />
              </Grid.Row>
              <Grid.Row textAlign="left" style={{ marginTop: "6px" }}>
                <Label color="violet">Part Time</Label>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Statistic.Group
          textAlign="center"
          style={{ marginLeft: "26em", marginTop: "3em" }}
        >
          <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Công ty</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>31,200</Statistic.Value>
            <Statistic.Label>Quảng cáo tuyển dụng</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Người tìm việc</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Container>
    </div>
  );
}
