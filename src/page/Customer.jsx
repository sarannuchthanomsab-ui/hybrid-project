import React, { useEffect, useState } from 'react';
import { Card, Container, Table, Image, Button, Modal, Form, ButtonGroup } from 'react-bootstrap';
import axios from "axios";


export default function Customer() {

    // สร้าง state สำหรับเก็บข้อมูลลูกค้า
    const [customersList, setCustomersList] = useState([]); 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // สร้าง state สำหรับเก็บข้อมูลลูกค้า 
    const [customerFormData, setCustomerFormData] = useState({ 
        id: 0,
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        birthday: "",
        address: "",
        avartar: "", 
    });


    // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าใน Form
    const handleInputChange = (name, value) => {
        setCustomerFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    function listCustomer() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.baserow.io/api/database/rows/table/709213/?user_field_names=true',
            headers: {
                'Authorization': 'Token j56eCaWRVQprbZH5LrjUJR0Tz1ykQweR'
            }
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                // เก็บข้อมูลลูกค้าใน state
                setCustomersList(response.data.results); 
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
                setLoading(false);
            });
    }
    //สร้าง function การเพิ่มข้อมูล
    function createCustomers() {
      if(customerFormData.first_name.length <=0 ||
          customerFormData.last_name.length <= 0){
          alert("โปรดระบุข้อมูลให้ครบถ้วน");
          return false;
}
      let data = {
        first_name: customerFormData.first_name,
        last_name: customerFormData.last_name,
        phone: customerFormData.phone,
        email: customerFormData.email,
        avartar: customerFormData.avartar,
        birthday: customerFormData.birthday,
        address: customerFormData.address
        };
        let config = {    
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.baserow.io/api/database/rows/table/709213/?user_field_names=true",
        headers: {
        Authorization: "Token j56eCaWRVQprbZH5LrjUJR0Tz1ykQweR",
        },
        data : data
        };
        axios
        .request(config)
        .then((response) => {
            setShow(false); ///ปิด Modal
            listCustomer(); ///โหลด Data ใหม่หลังจากบันทึกข้อมูลเสร็จ
            resetCustomerForm(); /// clear state
        })
        .catch((error) => {
        console.log(error);
        setError("เกิดขอ้ผิดพลาดในการโหลดขอ้มูล");
        });
    }
    // เพิ่มฟังก์ชันสำหรับการแก้ไขข้อมูลลูกค้า
        const handleEdit = (selectedCustomer) => {
            setCustomerFormData({
                id: selectedCustomer.id,
                first_name: selectedCustomer.first_name || "",
                last_name: selectedCustomer.last_name || "",
                phone: selectedCustomer.phone || "",
                email: selectedCustomer.email || "",
                avartar: selectedCustomer.avartar || "",
                birthday: selectedCustomer.birthday || "",
                address: selectedCustomer.address || "",
            });
            setShow(true);
        };

    //รียกใช้ function updateCustomers เพื่อแก้ไขข้อมูล
     function updateCustomers(row_id) {
        let data = {
        first_name: customerFormData.first_name,
        last_name: customerFormData.last_name,
        phone: customerFormData.phone,
        email: customerFormData.email,
        avartar: customerFormData.avartar,
        birthday: customerFormData.birthday,
        address: customerFormData.address
        };
        let config = {    
        method: "patch",
        maxBodyLength: Infinity,
        url: `https://api.baserow.io/api/database/rows/table/709213/${row_id}/?user_field_names=true`,
        headers: {
        Authorization: "Token j56eCaWRVQprbZH5LrjUJR0Tz1ykQweR",
        },
        data : data
        };
        axios
        .request(config)
        .then((response) => {
        setShow(false); ///ปิด Modal
        listCustomer(); ///โหลด Data ใหม่หลังจากบันทึกข้อมูลเสร็จ
        resetCustomerForm(); /// clear state
        })
        .catch((error) => {
        console.log(error);
        setError("เกิดขอ้ผิดพลาดในการโหลดขอ้มูล");
        });
    }  
    
    //รียกใช้ function deleteCustomers เพื่อลบข้อมูล
    function deleteCustomers(row_id,firstName) {
        const confirmDelete = window.confirm(
            `คุณต้องการลบข้อมูลของ ${firstName} ใช่หรือไม่?`
            );
                if (!confirmDelete) {
                    return false;
            }
        let config = {
            method: "delete",
            maxBodyLength: Infinity,
            url:`https://api.baserow.io/api/database/rows/table/709213/${row_id}/?user_field_names=true`,
            headers: {
            Authorization: "Token j56eCaWRVQprbZH5LrjUJR0Tz1ykQweR",
            },
            };
            axios
            .request(config)
            .then((response) => {
            // เก็บข้อมูลลูกค้าใน state
            setShow(false);
            listCustomer();
            resetCustomerForm(); /// clear state
            })
            .catch((error) => {
            console.log(error);
            setError("เกิดขอ้ผดิพลาดในการโหลดขอ้มูล");
            });
        }
    // เพิ่มฟังก์ชันรีเซ็ต state customer
        const resetCustomerForm = () => {
            setCustomerFormData({
                id: 0,
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                avartar: "",
                birthday: "",
                address: "",
            });
        };
    // เรียกใช้ function listCustomer
    useEffect(() => {
        listCustomer();
    }, []);

    if (loading) {
        return <Container><p>กำลังโหลดข้อมูล...</p></Container>;
    }

    if (error) {
        return <Container><p style={{ color: 'red' }}>{error}</p></Container>;
    }
    return (
        <Container className="p-4">
            <Card>
                <Card.Header>
                    <Button variant="primary" onClick={(e)=>[handleShow(),resetCustomerForm()]}>เพิ่มข้อมูล</Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>ฟอร์มข้อมูลลูกค้า</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {}
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>ชื่อ</Form.Label>
                                <Form.Control type="text" placeholder="โปรดระบุชื่อ"
                                    value={customerFormData.first_name}
                                    onChange={(e) => handleInputChange('first_name', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>นามสกุล</Form.Label>
                                <Form.Control type="text" placeholder="โปรดระบุนามสกุล"
                                    value={customerFormData.last_name}
                                    onChange={(e) => handleInputChange('last_name', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>เบอร์โทร</Form.Label>
                                <Form.Control type="tel" placeholder="โปรดระบุเบอร์โทรศัพท์"
                                    value={customerFormData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>อีเมล</Form.Label>
                                <Form.Control type="email" placeholder="โปรดระบุอีเมล (name@example.com)"
                                    value={customerFormData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBirthday">
                                <Form.Label>วันเกิด</Form.Label>
                                <Form.Control type="date" placeholder="[birthday]"
                                    value={customerFormData.birthday}
                                    onChange={(e) => handleInputChange('birthday', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formavartar">
                                <Form.Label>รูปภาพ</Form.Label>
                                <Form.Control type="url" placeholder="โปรดระบุ url image"
                                    value={customerFormData.avartar} 
                                    onChange={(e) => handleInputChange('avartar', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formAddress">
                                <Form.Label>ที่อยู่</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="" 
                                    value={customerFormData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>ปิด</Button>
                            <Button variant="success" onClick={() => customerFormData.id
                                    ? updateCustomers(customerFormData.id)
                                    : createCustomers()
                                    }>บันทึก</Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Header>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>รูปภาพ</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>เบอร์โทร</th>
                            <th>อีเมล</th>
                            <th>วันเกิด</th>
                            <th>ที่อยู่</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {}
                        {customersList.length > 0 ? (customersList.map((customer, index) => (
                            <tr key={customer.id || index}>
                                <td>{index + 1}</td>
                                <td><Image src={customer.avartar} roundedCircle style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                <td>{customer.first_name || "-"} {customer.last_name || "-"}</td>
                                <td>{customer.phone || "-"}</td>
                                <td>{customer.email || "-"}</td>
                                <td>{customer.birthday || "-"}</td>
                                <td>{customer.address || "-"}</td>
                                <td><ButtonGroup aria-label="Basic example">
                                        <Button variant="warning" onClick={(e)=> handleEdit(customer)}>แก้ไข</Button>
                                        <Button variant="danger"onClick={(e)=> deleteCustomers(customer.id,customer.first_name)}>ลบ</Button>
                                    </ButtonGroup></td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center"> ไม่พบข้อมูลลูกค้า </td> {}
                            </tr>)}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}