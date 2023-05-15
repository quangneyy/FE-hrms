import React from "react";
import CvLanguageService from "../../../../services/cvLanguageService";
import { Modal, Header, Icon, Button } from "semantic-ui-react";

export default function DeleteLanguageModal({ triggerButton, cvLanguage }) {
  const [open, setOpen] = React.useState(false);

  let cvLanguageService = new CvLanguageService();

  const deleteCvLanguage = (language) => {
    cvLanguageService.delete(language).then((result) => console.log(result));
    window.location.reload();
  };
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={triggerButton}
      >
        <Header icon>
          <Icon name="trash" />
        </Header>
        <Modal.Content>
          <p>Bạn có chắc chắn muốn xóa ngôn ngữ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            <Icon name="remove" /> Huỷ bỏ
          </Button>
          <Button color="green" onClick={() => deleteCvLanguage(cvLanguage)}>
            <Icon name="checkmark" /> Đúng
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
