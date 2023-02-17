import { Button } from '@mui/material';
import { useEffect, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DynamicHTML from "../../Components/DynamicHTML";
import { SubTopic, Topic } from "../../models/Models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './LessonView.css'

function LessonView() {
  const { heading, subHeading } = useParams();
  const [data, setData] = useState<Topic[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic>({} as Topic);
  const [activeSubTopic, setActiveSubTopic] = useState<SubTopic>({} as SubTopic);
  const [activeSubTopicIndex, setActiveSuInbtopicIndex] = useState<number>(0);
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [menuExpanded, setMenuExpanded] = useState<boolean>(true);
  const navigate = useNavigate();

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
  const getHeader = () => (
    <div className="header">
      <div className="header-left">
        {/* <img src="logo.png" alt="Logo" className="logo" /> */}
        <Link to={`/`}>Home</Link>
      </div>
      <div className="header-middle">
        <input type="text" placeholder="Search" className="search-bar" />
      </div>
      <div className="header-right">
        <button className="menu-toggle"
          onClick={() => setMenuExpanded(!menuExpanded)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );

  const getLeftMenu = () => {
    const course = heading || ''

    return (
      <div className="menu">
        {!!data?.length && data.map((topic, topicIndex: number) => (
          <div key={topic.title}>
            {topic.fileName ?
              <div className="heading1-link" key={topic.title}
                onClick={() => {
                  setActiveTopic(topic);
                  navigate(`/${course}/${topic.fileName}`)
                }}>{topic.title}</div>
              : <div className="heading1-nolink" key={topic.title}>{topic.fileName}</div>}

            {!!topic?.subTitles?.length && topic.subTitles.map((subTopic: SubTopic, subtopIndex: number) => (
              <>
                <div
                  key={subTopic.fileName + subtopIndex}
                  className={`heading2-link ${activeSubTopic === subTopic ? "active" : ""
                    }`}
                  onClick={() => {
                    setActiveTopic(topic);
                    setActiveSubTopic(subTopic);
                    setActiveTopicIndex(topicIndex)
                    setActiveSuInbtopicIndex(subtopIndex);
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
    console.log(next)
    console.log('activeTopicIndex ', activeTopicIndex)
    console.log('activeSubTopicIndex ', activeSubTopicIndex)
    let topicIx = 0;
    let subTopicIx = 0;

    if (next && activeSubTopicIndex === data[activeTopicIndex].subTitles.length - 1) {
      console.log(`case if`)
      topicIx = activeTopicIndex + 1;
      subTopicIx = 0;
    } else if (!next && activeSubTopicIndex === 0) {
      console.log(`case if else`)
      topicIx = activeTopicIndex - 1;
      subTopicIx = data[topicIx].subTitles.length - 1;
    } else {
      console.log(`case else`)
      topicIx = activeTopicIndex;
      subTopicIx = activeSubTopicIndex + (next ? 1 : -1);
    }
    setActiveTopicIndex(topicIx);
    setActiveSuInbtopicIndex(subTopicIx);
    setActiveTopic(data[topicIx]);
    setActiveSubTopic(data[topicIx].subTitles[subTopicIx]);
    navigate(`/${course}/${data[topicIx].subTitles[subTopicIx].fileName}`)
  }

  return (
    <>
      {getHeader()}
      <div className="body-content">
        {menuExpanded && <div className="left">
          {getLeftMenu()}
        </div>}
        <div className={menuExpanded ? "right-with-menu" : 'right-no-menu'}>
          <DynamicHTML course={heading || ''} topic={subHeading || 'index'} />
        </div>
      </div>
      <div className="bottom-nav-container">
        <Button onClick={() => navigateLesson(false)}>
          {!(activeSubTopicIndex === 0 && activeTopicIndex === 0) &&
            <><FontAwesomeIcon icon={faArrowLeft} /><span>&nbsp;&nbsp;Previous</span></>}
        </Button>
        <Button onClick={() => navigateLesson(true)} className="right-nav-button">
          {!(activeSubTopicIndex === activeTopic?.subTitles?.length - 1 && activeTopicIndex === data.length - 1)
            && <><span>Next&nbsp;&nbsp;</span> <FontAwesomeIcon icon={faArrowRight} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}
        </Button>
      </div>
    </>
  );
}

export default LessonView