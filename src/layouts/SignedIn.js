import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Image } from "semantic-ui-react";

export default function SignedIn({ signOut }) {
  return (
    <div>
      <Image
        avatar
        spaced="right"
        src="https://res.cloudinary.com/dlyhxsow4/image/upload/v1623779628/IMG_E4578_dneqc9.jpg"
      />
      <Dropdown pointing="top left" text="Hoà Bình">
        <Dropdown.Menu>
          <Dropdown.Item text="Thông tin của tôi" icon="info" />
          <Dropdown.Item
            as={NavLink}
            to="/employer/jobadvertlist"
            text="Nghề nghiệp"
            icon="info"
          />
          <Dropdown.Item onClick={signOut} text="Đăng xuất" icon="sign-out" />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
