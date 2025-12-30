import './Quiz.css'
import { useEffect, useRef, useState } from 'react';
import { FaChartBar } from "react-icons/fa";
import { FaCaretRight  } from "react-icons/fa";
import { data } from '../../assets/data';

export const Quiz = () => { 

    let [index,setIndex]= useState(0)
    //let [question,setquestion]= useState(data[index]);
    let [lock,setlock]= useState(false);
    let [score,setScore]= useState(0);
    let [finished,setFinished]= useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    const question = data[index];

    let option_refs = [Option1,Option2,Option3,Option4];

     const checkquestion = (e,answer) => {
        if(!lock){
        setlock(true);
        if(answer === question.ans){
            e.target.classList.add('bg-success', 'text-white');
            setScore(prev => prev + 1);

        }else{
            e.target.classList.add('bg-danger', 'text-white');
            option_refs[question.ans-1].current.classList.add('bg-success', 'text-white');
            
        }}
    };

    const next = () => {
        if(lock){
        setlock (false);
      option_refs.forEach(option => {
      option.current.classList.remove('bg-success', 'bg-danger', 'text-white');
      });
        if(index + 1 < data.length){
            setIndex(prev => prev + 1);
        }else{
           setFinished(true);
        }
    }
}

const reset = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
    setlock(false);
}

    return (
       
        <div className='container d-flex justify-content-center contante'>
            <div className="card">
            <div className="card-body"> 
             <h5 className="card-title text-uppercase text-center">Quiz APP <FaChartBar /></h5>   
            {finished? 
            <>
            <div className='row text-center my-5'>
             <p className="card-title finished_message text-uppercase ">
            Quiz Finished! Your score is <span>{score}</span> out of <span>{data.length}</span>
             </p>
            <button className='btn btn-primary' onClick={reset}>Reset</button>   
            </div>
            </> : 
            <>
             
            <p className="card-text">{index+1} {question.question}</p>
                    <ul className="list-group">
                    <li ref={Option1} onClick={(e)=>{checkquestion(e,1)}} className="list-group-item list-group-item-action"><FaCaretRight /> {question.option1}</li>
                    <li ref={Option2} onClick={(e)=>{checkquestion(e,2)}} className="list-group-item list-group-item-action"><FaCaretRight /> {question.option2}</li>
                    <li ref={Option3} onClick={(e)=>{checkquestion(e,3)}} className="list-group-item list-group-item-action"><FaCaretRight /> {question.option3}</li>
                    <li ref={Option4} onClick={(e)=>{checkquestion(e,4)}} className="list-group-item list-group-item-action"><FaCaretRight /> {question.option4}</li>
                    </ul>
                  <div className='btn-next my-3 text-center'>
                <button className='btn btn-primary' onClick={next}>Next Question</button>
            </div>   
            </>
            }
           
            </div>
          
           
            
            <div className='total-of-question'>
               <p> Question {index + 1} of {data.length}</p>
            </div>
            </div>
            
        </div>
        
    )
}