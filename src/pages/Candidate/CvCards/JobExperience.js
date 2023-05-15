import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Grid } from "semantic-ui-react";
import CvJobExperienceService from "../../../services/cvJobExperienceService";
import AddJobExperienceModal from "./CvModals/AddJobExperienceModal";
import UpdateJobExperienceModal from "./CvModals/UpdateJobExperienceModal";
import DeleteJobExperienceModal from "./CvModals/DeleteJobExperienceModal";

export default function JobExperience() {
  const [cvJobExperiences, setCvJobExperiences] = useState([]);

  let cvJobExperienceService = new CvJobExperienceService();

  useEffect(() => {
    cvJobExperienceService
      .getAllByCandidateIdOrderByLeaveDateDesc(16) //fake id
      .then((result) => setCvJobExperiences(result.data.data));
  }, []);

  return (
    <div>
      <Card
        inverted
        color="red"
        fluid
        style={{ marginLeft: "3em", marginTop: "3em" }}
      >
        <Card.Content>
          <Grid divided="vertically">
            <Grid.Row columns={3}>
              <Grid.Column>
                <AddJobExperienceModal
                  triggerButton={
                    <Button inverted floated="left" primary inverted>
                      <Icon name="plus" />
                      Thêm kinh nghiệm làm việc mới
                    </Button>
                  }
                />
              </Grid.Column>
              <Grid.Column>
                <Card.Header
                  style={{
                    marginTop: "1em",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Kinh nghiệm làm việc
                </Card.Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {cvJobExperiences.map((cvJobExperience, index) => (
            <Card fluid key={index}>
              <Card.Content>
                <UpdateJobExperienceModal
                  triggerButton={
                    <Button
                      inverted
                      floated="right"
                      color="green"
                      icon="pencil"
                    />
                  }
                  cvJobExperience={cvJobExperience}
                />

                <Grid columns="two">
                  <Grid.Row>
                    <Grid.Column>
                      <Card.Meta style={{ marginBottom: "3px" }}>
                        Nơi làm việc
                      </Card.Meta>
                      <Card.Header>{cvJobExperience.workplaceName}</Card.Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Card.Meta>Ngày cuối</Card.Meta>
                      {cvJobExperience.leaveDate == null ? (
                        <Card.Description>Tiếp tục làm việc </Card.Description>
                      ) : (
                        <Card.Description>
                          {cvJobExperience.leaveDate}
                        </Card.Description>
                      )}
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      <Card.Meta style={{ marginBottom: "3px" }}>
                        Vị trí
                      </Card.Meta>
                      <Card.Header>{cvJobExperience.position}</Card.Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Card.Meta style={{ marginBottom: "3px" }}>
                        Ngày bắt đầu
                      </Card.Meta>
                      <Card.Description>
                        {cvJobExperience.startDate}
                      </Card.Description>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <DeleteJobExperienceModal
                  triggerButton={
                    <Button inverted floated="right" color="red" icon="trash" />
                  }
                  cvJobExperience={cvJobExperience}
                />
              </Card.Content>
            </Card>
          ))}
        </Card.Content>
      </Card>
    </div>
  );
}
