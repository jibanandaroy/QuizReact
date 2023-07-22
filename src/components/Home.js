import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const URL = "https://opentdb.com/api.php?amount=1";


export default function Home() {
    const [data, setData] = useState([]);
    const [possibleAnswer, setpossibleAnswer] = useState([]);
    const [correctAnswerCount, setcorrectAnswerCount] = useState(0);
    const [incorrectAnswerCount, setincorrectAnswerCount] = useState(0);
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [isButtonClick, setisButtonClick] = useState(false);

    function GetData() {
        fetch(URL)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data.results);
                setData(data.results);
                setpossibleAnswer(data.results.incorrect_answers);
                setQuestion(data.results.question);
                setCategory(data.results.category);
            })
    }
    useEffect(() => {
        GetData();

     


    }, [data]);

   function buttonHandler(){
        setisButtonClick((prev)=>!prev)
        
   }
  
    return (

        <div>
            <div className="container container-questions">
                <div id="app" className="row">
                    <div className="col-12">
                        <div className="row justify-content-between heading">
                            <p className="category">category: {category}</p>

                        </div>
                        <p>{question}</p>
                    </div>
                    <div className="questions row justify-content-around mt-4">
                        {/* <li className="col-12 col-md-5"></li> */}
                    </div>

                    <div className="totals">
                        <span className="badge badge-success">{0}</span>
                        <span className="badge badge-danger">{0}</span>
                    </div>


                </div>
                <div className="row justify-content-center">
                    <div className="col-md-7 text-center">
                        <a href={''} className="btn btn-primary btn-lg mt-5" id="check-answer" onClick={buttonHandler}>Check</a>
                    </div>

                    <div className="col-md-5 text-right">
                        <a href={''} id="clear-storage" className="btn btn-danger btn-lg mt-5">Clear Results</a>
                    </div>
                </div>
            </div>
        </div>
    );

}

