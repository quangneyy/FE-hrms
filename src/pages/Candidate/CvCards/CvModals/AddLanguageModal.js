import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Dropdown } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import CvLanguageService from "../../../../services/cvLanguageService";
import LanguageService from "../../../../services/languageService";

export default function AddLinkModal({ triggerButton }) {
  const [open, setOpen] = useState(false);

  const [languages, setLanguages] = useState([]);

  let cvLanguageService = new CvLanguageService();

  useEffect(() => {
    let language = new LanguageService();
    language.getAll().then((result) => setLanguages(result.data.data));
  }, []);

  const languagesOptions = languages.map((language, index) => ({
    key: index,
    text: language.name,
    value: language.id,
  }));

  let LanguageAddSchema = Yup.object().shape({
    level: Yup.number()
      .min(0, "Có thể nhập tối thiểu 0")
      .max(5, "Có thể nhập tối đa 5")
      .required("Cấp độ không được để trống!"),

    language: Yup.object({
      id: Yup.number().required("ID không được để trống!"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      level: "",
      language: {
        id: "",
      },
    },
    validationSchema: LanguageAddSchema,
    onSubmit: (values) => {
      values.candidate = { id: 16 }; //fake id
      cvLanguageService.add(values).then((result) => {
        if (result.data.success) {
          window.location.reload();
        }
      });
    },
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
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
        <Modal.Header>Thêm ngôn ngữ</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Field>
                <Dropdown
                  clearable
                  item
                  placeholder="Ngôn ngữ"
                  search
                  selection
                  onChange={(event, data) => {
                    handleChangeSemantic(data.value, "language.id");
                  }}
                  onBlur={formik.onBlur}
                  id="language.id"
                  value={formik.values.language.id}
                  options={languagesOptions}
                />

                {formik.errors.language?.id && formik.touched.language?.id && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.language?.id}
                  </div>
                )}
              </Form.Field>
              <Form.Field>
                <input
                  style={{ marginTop: "1em" }}
                  name="level"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.level}
                  onBlur={formik.handleBlur}
                  placeholder="Bạn ở cấp độ từ 0 đến 5"
                />
                {formik.errors.level && formik.touched.level && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.level}
                  </div>
                )}
              </Form.Field>
              <Button content="Thêm vào" icon="add" type="submit" />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}
