import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate(); // <-- ใช้สำหรับเปลี่ยนหน้า

  const [login, setLogin] = useState({
    field_id: 6167718,  // ใส่ field_id ที่ถูกต้องของคุณ
    row_id: "",
    password:"",
  });

  const handleInputChange = (field, value) => {
    setLogin((prevLogin) => ({
      ...prevLogin,
      [field]: value,
    }));
  };

  function signIn() {

    if (!login.row_id || !login.password) {
      alert("กรุณาระบุ User ID และ Password ให้ครบถ้วน");
      return; 
    }

    let data = {
      field_id: login.field_id,
      row_id: login.row_id,
      password: login.password,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.baserow.io/api/database/fields/password-authentication/",
      headers: {
        Authorization: "Token j56eCaWRVQprbZH5LrjUJR0Tz1ykQweR",
      },
      data: data,
    };

axios.request(config)
  .then((response) => {
    console.log("เข้าสู่ระบบสำเร็จ:", response.data);

    // บันทึกว่าเข้าสู่ระบบแล้ว
    localStorage.setItem("auth_user_id", login.row_id);

    alert("เข้าสู่ระบบสำเร็จ!");

    navigate("/home");
  })

      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error);
        alert("เข้าสู่ระบบไม่สำเร็จ: " + (error.response?.data?.detail || error.message));
      });
  }

  return (
    <div className="modal show" style={{ display: "block", position: "initial" }}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>เข้าสู่ระบบ</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              value={login.row_id}
              onChange={(e) => handleInputChange("row_id", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={login.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="success" onClick={signIn}>
            เข้าสู่ระบบ
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
