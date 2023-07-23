import React, { useEffect, useState } from "react";
import "./style.css";
const URL = "https://opentdb.com/api.php?amount=1";


export default function Home() {
    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);


    let toShake = (a) => {
        for (let i = 0; i < a.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    };

    function GetData() {
        fetch(URL)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                const { category, question, correct_answer, incorrect_answers } = data.results[0];
                const possbaleAns = [...incorrect_answers, correct_answer];
                setCategory(category);
                setQuestion(question);
                setCorrectAnswer(correct_answer);
                toShake(possbaleAns);
                setAnswers(possbaleAns);
            })
            .catch((error) => console.error(error));
    }
    useEffect(() => {
        GetData();
    }, []);

    let clearResultHandeler = () => {
        setScore(0);
        setIncorrectAnswers(0);
    }

    let selectAns = (event, qus) => {

        if (document.querySelector(".active")) {
            const activeAns = document.querySelector('.active')

            activeAns.classList.remove('active');
        }
        event.target.classList.add('active');
    }


    let validateAns = (event) => {
        event.preventDefault();

        if (document.querySelector('.active')) {

            const userAnswer = document.querySelector(".questions .active");

            if (userAnswer.innerText === correctAnswer) {
                setScore((prev) => prev + 1);
            } else {
                setIncorrectAnswers((perv) => perv + 1);
            }
            document.querySelector('.active').classList.remove('active');
            GetData();
        }
    }

    return (

        <div>
            <div className="container container-questions">
                <div id="app" className="row">
                    <div className="totals">
                        <span className="badge badge-success">{score}</span>
                        <span className="badge badge-danger">{incorrectAnswers}</span>
                    </div>
                    <div className="col-12">
                        <div className="row justify-content-between heading">
                            <p className="category">category: {category}</p>
                        </div>
                        <p>{question}</p>
                    </div>

                    <div className="questions row justify-content-around mt-4">
                        {answers.map((answer, ind) => (
                            <li key={ind} onClick={selectAns} className="col-12 col-md-5">{answer}</li>
                        ))}
                    </div>


                </div>
                <div className="row justify-content-center">
                    <div className="col-md-7 text-center">
                        <a href={''} className="btn btn-primary btn-lg mt-5" id="check-answer" onClick={validateAns}>
                            Check
                        </a>
                    </div>

                    <div className="col-md-5 text-right">
                        <a href={''} id="clear-storage" className="btn btn-danger btn-lg mt-5" onClick={clearResultHandeler}>
                            Clear Results
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );

}