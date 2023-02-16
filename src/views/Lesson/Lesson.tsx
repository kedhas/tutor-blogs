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
        console.log('courseJson ', courseJson)
        setData(courseJson);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHTML();
  }, [heading]);

  return (
    <>
      <div className="body-content">
        <div className="left">
          <LeftMenu menuItems={data as any[]} course={heading || ''} />
        </div>
        <div className="right">
          <DynamicHTML course={heading || ''} topic={subHeading || 'index'} />
        </div>
      </div>
    </>
  );
}

export default Lesson