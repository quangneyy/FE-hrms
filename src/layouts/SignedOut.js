import React from "react";
import { Button } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Button inverted onClick={signIn}>
        Đăng nhập
      </Button>
      <Button inverted style={{ marginLeft: "3px" }}>
        Đăng nhập nhà tuyển dụng
      </Button>
    </div>
  );
}
