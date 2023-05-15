import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal, Form, Divider } from "semantic-ui-react";
import CvJobExperienceService from "../../../../services/cvJobExperienceService";
import * as Yup from "yup";

export default function AddEducationModal({ triggerButton }) {
  const [open, setOpen] = useState(false);

  let cvJobExperienceService = new CvJobExperienceService();

  const AddJobExperienceSchema = Yup.object().shape({
    workplaceName: Yup.string().required(
      "Tên nơi làm việc không được để trống!"
    ),
    position: Yup.string().required("Vị trí không được để trống!"),
    startDate: Yup.date()
      .nullable()
      .required("Ngày bắt đầu không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      workplaceName: "",
      position: "",
      leaveDate: "",
      startDate: "",
    },
    validationSchema: AddJobExperienceSchema,
    onSubmit: (values) => {
      values.candidate = { id: 16 }; //fake id
      cvJobExperienceService.add(values).then((result) => {
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
        <Modal.Header>Thêm kinh nghiệm làm việc</Modal.Header>
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
                <div className={"ui  pointing red basic label"}>
                  {formik.errors.startDate}
                </div>
              )}
              <Form.Input
                fluid
                type="date"
                name="finishDate"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="Ngày rời đi"
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
