import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal, Form, Divider } from "semantic-ui-react";
import CvJobExperienceService from "../../../../services/cvJobExperienceService";
import * as Yup from "yup";

export default function UpdateJobExperienceModal({
  triggerButton,
  cvJobExperience,
}) {
  const [open, setOpen] = useState(false);

  let cvJobExperienceService = new CvJobExperienceService();

  const UpdateJobExperienceSchema = Yup.object().shape({
    workplaceName: Yup.string().required(
      "Tên doanh nghiệp không được để trống!"
    ),
    position: Yup.string().required("Vị trí không được để trống!"),
    startDate: Yup.date()
      .nullable()
      .required("Ngày bắt đầu không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      workplaceName: cvJobExperience.workplaceName,
      position: cvJobExperience.position,
      leaveDate: cvJobExperience.leaveDate ? cvJobExperience.leaveDate : "",
      startDate: cvJobExperience.startDate,
    },
    validationSchema: UpdateJobExperienceSchema,
    onSubmit: (values) => {
      cvJobExperience.workplaceName = values.workplaceName;
      cvJobExperience.position = values.position;
      cvJobExperience.startDate = values.startDate;
      cvJobExperience.leaveDate = values.leaveDate;
      cvJobExperienceService.add(cvJobExperience).then((result) => {
        if (result.data.success) {
          window.location.reload();
        }
      });
    },
  });

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={triggerButton}
        size="tiny"
      >
        <Modal.Header>Sửa thông tin giáo dục</Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                name="workplaceName"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="Nơi làm việc"
                placeholder="Tên doanh nghiệp"
                value={formik.values.workplaceName}
                onBlur={formik.handleBlur}
              />
              {formik.errors.workplaceName && formik.touched.workplaceName && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.workplaceName}
                </div>
              )}
              <Form.Input
                fluid
                name="position"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="Chức vụ"
                placeholder="Chức vụ"
                value={formik.values.position}
                onBlur={formik.handleBlur}
              />
              {formik.errors.position && formik.touched.position && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.position}
                </div>
              )}
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                type="date"
                name="startDate"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="Ngày bắt đầu"
                value={formik.values.startDate}
                onBlur={formik.handleBlur}
              />
              {formik.errors.startDate && formik.touched.startDate && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.startDate}
                </div>
              )}
              <Form.Input
                fluid
                type="date"
                name="leaveDate"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="Ngày cuối"
                value={formik.values.leaveDate}
                onBlur={formik.handleBlur}
              />
            </Form.Group>

            <Divider></Divider>
            <Button color="black" onClick={() => setOpen(false)}>
              Hủy bỏ
            </Button>
            <Button
              content="Thêm vào"
              labelPosition="right"
              icon="checkmark"
              type="submit"
              positive
            />
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
