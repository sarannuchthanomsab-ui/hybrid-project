import React from 'react'
import {Card , Container, Table} from 'react-bootstrap';


export default function Customer() {
  return (
    <Container>
        <Card>
             <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>ชื่อ - นามสกุล</th>
      <th>เบอร์โทร</th>
      <th>อีเมล</th>
      <th>วันเกิด</th>
      <th>ที่อยู่</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>สรัลนุช ถนอมทรัพย์</td>
      <td>098-584-4487</td>
      <td>Sarannuch.Th@hotmail.com</td>
      <td>1995-11-14</td>
      <td>44 ม.3 ต.นิคมพัฒนา...</td>
    </tr>
     <tr>
      <td>2</td>
      <td>สมชาย ใจดี</td>
      <td>098-XXX-XXXX</td>
      <td>XXX@hotmail.com</td>
      <td>1995-XX-XX</td>
      <td>4 ม.3 ต.นิคมพัฒนา...</td>
    </tr>
     <tr>
      <td>3</td>
      <td>สมศรี ใจงาม</td>
      <td>098-XXX-XXXX</td>
      <td>XXX@hotmail.com</td>
      <td>1995-XX-XX</td>
      <td>14 ม.3 ต.นิคมพัฒนา...</td>
    </tr>
  </tbody>
</Table>
        </Card>
    </Container>
  )
}

