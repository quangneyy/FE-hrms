import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Label, Icon } from "semantic-ui-react";

export default function AdminManagementMenu() {
  const activeItem = ["jobadvert", "setting", "updateemployer"];
  return (
    <div>
      <Menu vertical>
        <Menu.Header as="h4" style={{ marginTop: "15px" }}>
          BẢNG QUẢN TRỊ
        </Menu.Header>
        <Menu.Item
          as={NavLink}
          exact
          to="/admin"
          name="setting"
          active={activeItem === "setting"}
        >
          <Label color="grey">
            <Icon name="setting" />
          </Label>
          Thông tin
        </Menu.Item>

        <Menu.Item
          as={NavLink}
          to="/admin/updateemployermanagement"
          name="updateemployer"
          active={activeItem === "updateemployer"}
        >
          <Label color="grey">
            <Icon name="check" />
          </Label>
          Các công ty đang chờ phê duyệt cập nhật
        </Menu.Item>

        <Menu.Item
          as={NavLink}
          to="/admin/jobadvertmanagement"
          name="jobadvert"
          active={activeItem === "jobadvert"}
        >
          <Label color="grey">
            <Icon name="check" />
          </Label>
          Quảng cáo đang chờ phê duyệt
        </Menu.Item>
      </Menu>
    </div>
  );
}
