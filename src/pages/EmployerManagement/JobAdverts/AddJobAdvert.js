import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Dropdown,
  Input,
  TextArea,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import JobAdvertService from "../../../services/jobAdvertService";
import EmploymentTypeService from "../../../services/employmentTypeService";
import CityService from "../../../services/cityService";
import WorkingTypeService from "../../../services/workingTypeService";
import JobPositionService from "../../../services/jobPositionService";
import swal from "sweetalert";

export default function AddJobAdvert({ triggerButton }) {
  let jobAdvertService = new JobAdvertService();

  const [open, setOpen] = React.useState(false);
  const [jobPositions, setJobPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [workingTypes, setWorkingTypes] = useState([]);

  useEffect(() => {
    let employmentTypeService = new EmploymentTypeService();
    let cityService = new CityService();
    let workingTypeService = new WorkingTypeService();
    let jobPositionService = new JobPositionService();

    employmentTypeService
      .getAll()
      .then((result) => setEmploymentTypes(result.data.data));
    cityService.getAll().then((result) => setCities(result.data.data));
    workingTypeService
      .getAll()
      .then((result) => setWorkingTypes(result.data.data));
    jobPositionService
      .getAll()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  const jobPositionsOptions = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.position,
    value: jobPosition.id,
  }));
  const citiesOptions = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));

  const employmentTypeOptions = employmentTypes.map(
    (employmentType, index) => ({
      key: index,
      text: employmentType.name,
      value: employmentType.id,
    })
  );

  const workingTypeOptions = workingTypes.map((workingType, index) => ({
    key: index,
    text: workingType.name,
    value: workingType.id,
  }));

  const JobAdvertAddSchema = Yup.object().shape({
    jobPositionId: Yup.number().required(
      "Vị trí công việc không thể bỏ trống!"
    ),
    cityId: Yup.number().required("Thành phố không thể bỏ trống!"),
    employmentTypeId: Yup.number().required(
      "Loại việc làm không được để trống!"
    ),
    minSalary: Yup.number().min(0, "Nó không thể nhỏ hơn 0!"),
    maxSalary: Yup.number().min(0, "Nó không thể nhỏ hơn 0!"),
    openPositionCount: Yup.number()
      .min(0, "Số lượng vị trí mở không được nhỏ hơn 0!")
      .required("Số lượng vị trí mở không được để trống!"),
    applicationDeadline: Yup.date()
      .nullable()
      .required("Hạn nộp hồ sơ không được để trống!"),
    description: Yup.string().required("Mô tả công việc không được để trống!"),
    workingTypeId: Yup.number().required("Loại công việc không được để trống!"),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      jobPositionId: "",
      workingTypeId: "",
      employmentTypeId: "",
      minSalary: "",
      maxSalary: "",
      openPositionCount: "",
      applicationDeadline: "",
      cityId: "",
    },
    validationSchema: JobAdvertAddSchema,
    onSubmit: (values) => {
      let jobAdvert = {
        // Fake id verebilmek için values üzerinden ekletmedim
        applicationDeadline: values.applicationDeadline,
        city: {
          id: values.cityId,
        },
        description: values.description,
        employer: {
          id: 18, //Auth gelene kadar fake id
        },
        employmentType: {
          id: values.employmentTypeId,
        },
        jobPosition: {
          id: values.jobPositionId,
        },
        minSalary: values.minSalary,
        maxSalary: values.maxSalary,
        openPositionCount: values.openPositionCount,
        workingType: {
          id: values.workingTypeId,
        },
      };
      jobAdvertService
        .add(jobAdvert)
        .then((result) =>
          swal(`${result.data.message}`, `${jobAdvert.description}`, "success")
        );
    },
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Modal
        centered={false}
        closeIcon
        size="tiny"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={triggerButton}
      >
        <Modal.Header>Thêm tin tuyển dụng</Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
              <Dropdown
                clearable
                item
                placeholder="Vị trí công việc"
                search
                selection
                onChange={(event, data) => {
                  handleChangeSemantic(data.value, "jobPositionId");
                }}
                onBlur={formik.onBlur}
                id="jobPositionId"
                value={formik.values.jobPositionId}
                options={jobPositionsOptions}
              />

              {formik.errors.jobPositionId && formik.touched.jobPositionId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.jobPositionId}
                </div>
              )}
            </Form.Field>
            <Form.Field style={{ marginTop: "2em" }}>
              <Dropdown
                clearable
                item
                placeholder="Thành phố"
                search
                selection
                onChange={(event, data) => {
                  handleChangeSemantic(data.value, "cityId");
                }}
                onBlur={formik.onBlur}
                id="cityId"
                value={formik.values.cityId}
                options={citiesOptions}
              />

              {formik.errors.cityId && formik.touched.cityId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.cityId}
                </div>
              )}
            </Form.Field>
            <Form.Field style={{ marginTop: "2em" }}>
              <Dropdown
                clearable
                item
                placeholder="Loại việc làm"
                search
                selection
                onChange={(event, data) => {
                  handleChangeSemantic(data.value, "employmentTypeId");
                }}
                onBlur={formik.onBlur}
                id="employmentTypeId"
                value={formik.values.employmentTypeId}
                options={employmentTypeOptions}
              />
              {formik.errors.employmentTypeId &&
                formik.touched.employmentTypeId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.employmentTypeId}
                  </div>
                )}
            </Form.Field>
            <Form.Field style={{ marginTop: "2em" }}>
              <Dropdown
                clearable
                item
                placeholder="Loại làm việc"
                search
                selection
                onChange={(event, data) => {
                  handleChangeSemantic(data.value, "workingTypeId");
                }}
                onBlur={formik.onBlur}
                id="workingTypeId"
                value={formik.values.workingTypeId}
                options={workingTypeOptions}
              />
              {formik.errors.workingTypeId && formik.touched.workingTypeId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.workingTypeId}
                </div>
              )}
            </Form.Field>
            <Form.Group style={{ marginTop: "2em" }}>
              <Input
                style={{ width: "50%" }}
                icon="try"
                type="number"
                placeholder="Lương tối thiểu"
                value={formik.values.minSalary}
                name="minSalary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.minSalary && formik.touched.minSalary && (
                <div className={"ui left pointing red basic label"}>
                  {formik.errors.minSalary}
                </div>
              )}
              <Input
                style={{ width: "50%", marginLeft: "10px" }}
                type="number"
                icon="try"
                placeholder="Lương tối đa"
                value={formik.values.maxSalary}
                name="maxSalary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.maxSalary && formik.touched.maxSalary && (
                <div className={"ui left pointing red basic label"}>
                  {formik.errors.maxSalary}
                </div>
              )}
            </Form.Group>
            <Form.Group style={{ marginTop: "2em" }}>
              <Input
                style={{ width: "50%" }}
                id="openPositionCount"
                name="openPositionCount"
                error={Boolean(formik.errors.openPositionCount)}
                onChange={formik.handleChange}
                value={formik.values.openPositionCount}
                onBlur={formik.handleBlur}
                type="number"
                placeholder="Số Vị trí Mở"
              />
              {formik.errors.openPositionCount &&
                formik.touched.openPositionCount && (
                  <div className={"ui left pointing red basic label"}>
                    {formik.errors.openPositionCount}
                  </div>
                )}
              <Input
                style={{ width: "50%" }}
                type="date"
                error={Boolean(formik.errors.applicationDeadline)}
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "applicationDeadline")
                }
                value={formik.values.applicationDeadline}
                onBlur={formik.handleBlur}
                name="applicationDeadline"
                placeholder="Hạn nộp hồ sơ"
              />
              {formik.errors.applicationDeadline &&
                formik.touched.applicationDeadline && (
                  <div className={"ui left pointing red basic label"}>
                    {formik.errors.applicationDeadline}
                  </div>
                )}
            </Form.Group>
            <Form.Field style={{ marginTop: "2em" }}>
              <TextArea
                placeholder="Mô tả công việc"
                style={{ minHeight: 100 }}
                error={Boolean(formik.errors.description).toString()}
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.description}
                </div>
              )}
            </Form.Field>
            <div style={{ float: "right" }}>
              <Button
                style={{ marginBottom: "15px" }}
                content="Thêm vào"
                labelPosition="right"
                icon="add"
                primary
                type="submit"
              />
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
