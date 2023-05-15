import React from "react";
import { Button, Divider, Modal, Form } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";
import EmployerUpdateConfirmByEmployeeService from "../../../services/employerUpdateConfirmByEmployeeService";
import EmployerService from "../../../services/employerService";

export default function UpdateEmployerSettingModal({
  triggerButton,
  employer,
}) {
  const [open, setOpen] = React.useState(false);

  let employerUpdateConfirmByEmployeeService =
    new EmployerUpdateConfirmByEmployeeService();

  let EmployeeSchema = Yup.object().shape({
    companyName: Yup.string().required("Tên công ty không được để trống!"),
    webAdress: Yup.string().required("Địa chỉ web không được để trống!"),
    phoneNumber: Yup.string().required("Số điện thoại không được để trống!"),
    email: Yup.string().required("Email không được để trống!"),
    password: Yup.string().required("Mật khẩu không được để trống!"),
  });
  const formik = useFormik({
    initialValues: {
      id: employer.id,
      email: employer.email,
      password: employer.password,
      companyName: employer.companyName,
      webAdress: employer.webAdress,
      phoneNumber: employer.phoneNumber,
      activated: true,
      confirmByEmployee: false,
    },
    enableReinitialize: true,
    validationSchema: EmployeeSchema,

    onSubmit: (values) => {
      changeIsConfirmedByEmployee(employer.id);

      let employerUpdateConfirmByEmployee = {
        id: values.id,
        email: values.email,
        password: values.password,
        companyName: values.companyName,
        webAdress: values.webAdress,
        phoneNumber: values.phoneNumber,
        activated: true,
        confirmByEmployee: false,
      };
      employerUpdateConfirmByEmployeeService
        .add(employerUpdateConfirmByEmployee)
        .then(
          swal(
            "Thành công",
            "Thao tác hoàn tất. Cập nhật của bạn sẽ hoàn tất khi được nhân viên hệ thống phê duyệt.",
            "success"
          )
        );
    },
  });

  let changeIsConfirmedByEmployee = (employerId) => {
    let employerService = new EmployerService();
    employerService.changeIsConfirmedByEmployee(employerId);
  };

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={triggerButton}
        closeIcon
        size="tiny"
      >
        <Modal.Header>Cập nhật thông tin công ty</Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                name="email"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="E-Mail"
                placeholder="E-Mail"
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className={"ui left pointing red basic label"}>
                  {formik.errors.email}
                </div>
              )}
              <Form.Input
                fluid
                name="password"
                type="password"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="Mật khẩu"
                placeholder="Mật khẩu"
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <div className={"ui left pointing red basic label"}>
                  {formik.errors.password}
                </div>
              )}
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                name="companyName"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="Tên công ty"
                placeholder="Tên công ty"
                value={formik.values.companyName}
                onBlur={formik.handleBlur}
              />
              {formik.errors.companyName && formik.touched.companyName && (
                <div className={"ui left pointing red basic label"}>
                  {formik.errors.companyName}
                </div>
              )}
              <Form.Input
                fluid
                name="webAdress"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                label="Quảng cáo web"
                placeholder="Quảng cáo web"
                value={formik.values.webAdress}
                onBlur={formik.handleBlur}
              />
              {formik.errors.webAdress && formik.touched.webAdress && (
                <div className={"ui left pointing red basic label"}>
                  {formik.errors.webAdress}
                </div>
              )}
            </Form.Group>
            <Form.Input
              fluid
              name="phoneNumber"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              label="Số điện thoại"
              placeholder="Số điện thoại"
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <div className={"ui left pointing red basic label"}>
                {formik.errors.phoneNumber}
              </div>
            )}

            <Divider></Divider>
            <Button color="black" onClick={() => setOpen(false)}>
              Huỷ bỏ
            </Button>
            <Button
              content="Cập nhật"
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
