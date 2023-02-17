import { useEffect, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import DynamicHTML from "../../Components/DynamicHTML";
import { SubTopic, Topic } from "../../models/Models";
import './LessonView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function LessonView() {
  const { heading, subHeading } = useParams();
  const [data, setData] = useState<Topic[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic>({} as Topic);
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic>({} as SubTopic);
  const [activeSuInbtopicIndex, setActiveSuInbtopicIndex] = useState<number>(0)
  const navigate = useNavigate();

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

  const getLeftMenu = () => {
    const course = heading || ''

    return (
      <div className="menu">
        {!!data?.length && data.map((topic) => (
          <div key={topic.title}>
            {topic.fileName ?
              <div className="heading1-link" key={topic.title}
                onClick={() => {
                  setActiveTopic(topic);
                  navigate(`/${course}/${topic.fileName}`)
                }}>{topic.title}</div>
              : <div className="heading1-nolink" key={topic.title}>{topic.fileName}</div>}

            {!!topic?.subTitles?.length && topic.subTitles.map((subTopic: SubTopic, index: number) => (
              <>
                <div
                  key={subTopic.fileName + index}
                  className={`heading2-link ${activeSubTopic === subTopic ? "active" : ""
                    }`}
                  onClick={() => {
                    setActiveTopic(topic);
                    setActiveSubTopic(subTopic);
                    setActiveSuInbtopicIndex(index);
                    navigate(`/${course}/${subTopic.fileName}`)
                  }}
                >
                  {subTopic.displayName}
                </div>
                <br />
              </>
            ))}
          </div>
        ))}
      </div>
    );
  }

  const navigateLesson = (next = true) => {
    const course = heading || ''
    const sbTopic = activeTopic.subTitles[activeSuInbtopicIndex + (next ? 1 : -1)]
    setActiveSubTopic(sbTopic);
    setActiveSuInbtopicIndex(activeSuInbtopicIndex + (next ? 1 : -1));
    navigate(`/${course}/${sbTopic.fileName}`)
  }

  return (
    <>
      <div className="body-content">
        <div className="left">
          {getLeftMenu()}
        </div>
        <div className="right">
          <DynamicHTML course={heading || ''} topic={subHeading || 'index'} />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            {activeSuInbtopicIndex > 0 && <button style={{ border: 'none', backgroundColor: 'transparent', marginRight: '50px' }}
              onClick={() => navigateLesson(false)}>
              <FontAwesomeIcon icon={faArrowLeft} /> <span style={{ fontSize: '1.2rem' }}>Previous</span>
            </button>}
            {activeSuInbtopicIndex < (activeTopic?.subTitles?.length - 1) && <button style={{ border: 'none', backgroundColor: 'transparent', marginLeft: '50px' }}
              onClick={() => navigateLesson(true)}>
              <span style={{ fontSize: '1.2rem' }}>Next</span> <FontAwesomeIcon icon={faArrowRight} />
            </button>}
          </div>
        </div>
        {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <button style={{ border: 'none', backgroundColor: 'transparent' }}>
            <FontAwesomeIcon icon={faArrowLeft} /> Previous
          </button>
          <button style={{ border: 'none', backgroundColor: 'transparent' }}>
            Next <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div> */}
      </div>
    </>
  );
}

export default LessonView