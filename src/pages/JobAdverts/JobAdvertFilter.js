import React from "react";
import { Button, Input, Label, Menu } from "semantic-ui-react";

export default function JobAdvertFilter() {
  return (
    <div>
      <Menu vertical style={{ marginTop: "2em" }}>
        <Menu.Item>
          <Button primary>Các bộ lọc</Button>
        </Menu.Item>

        <Menu.Item>Các thành phố</Menu.Item>

        <Menu.Item>
          <Label>1</Label>
          Vị trí công việc
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search mail..." />
        </Menu.Item>
      </Menu>
    </div>
  );
}
