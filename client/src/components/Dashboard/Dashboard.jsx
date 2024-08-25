import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import './dashboard.scss';
import './sidebar.scss';
import logo from './ivis-logo.svg';
import { getChatGptResponse } from '../../api/api'




function Dashboard() {
  const { id } = useParams(); // Use the parameter name defined in the route
  const [tabContent, setTabContent] = useState(null); // Initialize with null

  const location = useLocation();
  const tabId = location.pathname.split("/")[2];

  const [answer, setAnswer] = useState('');
  const [analysis, setAnalysis] = useState('');
  // const [submitted, setSubmitted] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    const fetchTabContent = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/posts/posts/${tabId}`); 
        setTabContent(res.data);
        console.log("get answer answer: " + answer)
        // console.log(` get answer  ${tabContent.answer}` )
      } catch (error) {
        console.error("Error fetching tab content:", error);
      }
    };

    fetchTabContent();
  }, [tabId]);
   const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
   };

   const handleCheck = async () => {
    if (answer.trim() !== '') {
      const chatGptPrompt = `
      Bitte überprüfen und analysieren Sie den folgenden Text auf Grammatik, Rechtschreibung und Ausdruck. Dein Response von dem bot sollte so aussehen, als wäre es keine Nachricht von einem Chat, muss mit "Ihre Fehler: " starten und soll in einem HTML format sein damit ich das in einen div einfuegen kann. Ich benötige eine detaillierte Analyse des Textes mit Erklärungen zu allen Hauptfehlern dieses Texts: [${answer}]`;
      const response = await getChatGptResponse(chatGptPrompt);
      // const submitted = 1;

      // const answerAnalys = {
      //   answer: answer,
      //   analys: response
      // }


      setAnalysis(response);
      setIsSubmitted(true);

      // Update the analysis in the database
      // await axios.post(`/posts/${tabId}/update`, {
      //   answer: response,
      // });
      
      try {
        // console.log("analys " + answerAnalys.analys)
        // await axios.post(`http://localhost:8800/posts/posts/${tabId}`, answerAnalys);
        await axios.post(`http://localhost:8800/posts/posts/${tabId}`, {
          answer: answer,
            analys: response,
            submitted: 1
        });
        console.log("post answer answer: " + answer)
        // console.log(` post answer  ${tabContent.answer}` )
      } catch (err) {
        console.log(err);
      }
      // window.location.reload();
    }
  };


  if (!tabContent) {
    // Handle loading state
    return <div>Loading...</div>;
  }

  const submitted = () => {
    if (!isSubmitted) {
      return (
    <div>
      <h4 className="header4">Antwort:</h4>
      <textarea placeholder="Bitte geben Sie Ihre Antwort ein" className="answerTextarea" value={answer} onChange={handleAnswerChange} />
      <button className="fertigButton" onClick={handleCheck}>Fertig</button>
    </div>
)
    } else {
      return (
    <div>
      <h4 className="header4">Antwort:</h4>
{/* <textarea readonly placeholder="Bitte geben Sie Ihre Antwort ein" className="answerTextarea" value={answer} onChange={handleAnswerChange} >{answer}</textarea> */}
      <pre>{answer}</pre>
      <h4 className="header4">Feedback:</h4>
      <pre>{analysis}</pre>
    </div>
    )
    }
  };

  return (

    
    <div className="dashboard" >
      
      <h3 className="header">{tabContent.tabname}</h3>
      
      {/* <p>ID: {tabContent.id}</p> */}
      <h4 className="header4">Aufgabe:</h4>
      <pre>{tabContent.question}</pre>
     
           {tabContent.submitted  ? (

              <div >
              <h4 className="header4">Antwort:</h4>
              {/* <textarea readOnly>{tabContent.answer}</textarea>
              <textarea readOnly>{tabContent.analys}</textarea> */}

              <pre>{tabContent.answer}</pre>
              <h4 className="header4">Feedback:</h4>

              <pre>{tabContent.analys}</pre>
              {/* <p>Your Answer:</p>
              <p>{answer}</p>
              <p>Analysis: {analysis}</p> */}
              </div>
              ) : (
                submitted()

                // <div>
                //   <p>Your Answer:</p>
                //   <textarea value={answer} onChange={handleAnswerChange} />
                //   <button onClick={handleCheck}>Check</button>
                // </div>
              )}

     
          </div>
  );
}

export default Dashboard;
