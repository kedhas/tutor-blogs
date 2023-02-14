import { useEffect, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DynamicHTML from "../../Components/DynamicHTML";
import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import './Lesson.css'


function Lesson() {
  const { heading, subHeading } = useParams();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchHTML = async () => {
      try {
        const response = await fetch(`/data/${heading}.json`);
        const courseJson = await response.json();
        // console.log('courseJson ', courseJson)
        setData(courseJson);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHTML();
  }, [heading]);

  return (
    <>
    <table>
  <tr>
    <td className="left-column">
          <LeftMenu menuItems={data as any[]} course={heading || ''} />
    </td>
    <td className="right-column">
          <DynamicHTML course={heading || ''} topic={subHeading || 'index'} />
    </td>
  </tr>
</table>
      {/* <div className="container">
        <div className="left-column" >
          <LeftMenu menuItems={data as any[]} course={heading || ''} />
        </div>
        <div className="right-column" >
          <DynamicHTML course={heading || ''} topic={subHeading || 'index'} />
        </div>
      </div> */}
      {/* <Container>
        <Row>
          <Col md={9} lg={9}>
            <DynamicHTML course={heading || ''} topic={subHeading || 'index'} />
          </Col>
          <Col md={3} lg={9}>
            <LeftMenu menuItems={data as any[]} course={heading || ''} />
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default Lesson;