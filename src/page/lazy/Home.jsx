import { Card, Container } from "react-bootstrap";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule'; // <-- เพิ่ม: Import rrulePlugin

const initialEvents = [
  {
    id: "1",
    title: "ประชุมทีม",
    start: new Date().toISOString().slice(0, 10) + "T09:00:00",
    end: new Date().toISOString().slice(0, 10) + "T10:00:00",
  },
  {
    id: "2",
    title: "สอน React",
    start: new Date().toISOString().slice(0, 10) + "T13:00:00",
  },
];

function Home() {
  return (
    <Container className="p-4">
      <Card>
        {/* แก้ไข: ลบโค้ดบล็อกที่ไม่ถูกต้องออกจาก Card.Body */}
        <Card.Body>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
              rrulePlugin, // rrulePlugin ต้องมีการติดตั้งและ import ด้วย
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "title",
              center: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              right: "today prev,next",
            }}
            locale="th"
            timeZone="local"
            events={initialEvents}
            height="auto"
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;