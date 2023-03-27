import React, { useEffect, useState } from 'react';
import Axios from "axios";




export default function Add() {

    const [inputText, setInputText] = useState();
    const [inputDesc, setinputDesc] = useState();
    const [r1, setR1] = useState();
    const [FirstNo, setFirstNo] = useState(null);
    const [SecondNo, setSecondNo] = useState(null);

    const [result, setresult] = useState();
    const addition = () => {
        setR1(Number(FirstNo) + Number(SecondNo));

        Axios.get(`http://localhost:3000/add/${FirstNo}/and/${SecondNo}`).then((response) => {
            setresult(Number(response.data.addResult));
            console.log(response.data.addResult);
        });
    }

    return (
        <div className='text'>

            <div>
            <p>Please <a href="http://ec2-3-83-103-176.compute-1.amazonaws.com:3000/">click here</a> to view my Inventory.</p>
                <div>
                    <p>First number : </p></div>
                <div>
                    <textarea
                        value={inputText}
                        onChange={(event) => { setFirstNo(event.target.value) }}
                    />
                    <div>
                        <p>Second Number : </p></div>
                    <div>
                        <textarea
                            value={inputDesc}
                            onChange={(event) => { setSecondNo(event.target.value) }}
                        />
                    </div>
                    <div>
                        <p></p></div>
                    <div>
                        <button className='button' onClick={addition}>submit</button>
                    </div>
                    <div>
                        <p className='details'>Your Addition result (From Server) is : </p>
                    </div>
                    <div>
                        <p className='details' id='input'>{result}</p>
                    </div>
                    <div>
                        <p className='details'>Your Addition result (From ReactJS) is : </p>
                    </div>
                    <div>
                        <p className='details'>{(parseInt(FirstNo) + parseInt(SecondNo) || 0)}</p>
                    </div>

                </div>
               
            </div>
        </div>
    )
}