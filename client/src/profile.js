import React, { useState } from 'react';

export default function Profile() {

    const [inputText, setInputText] = useState("Jyothi Sri Kanagala");
    const [inputText1, setInputText1] = useState("I have took SE this semester");
    return (
        <div>
            <div className='edit'>
                <div>
                    <nav className="nav1"> <ul>
                        <li>
                            <a><img className='imageicon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgdzg89MyUycUZwZkHd55KPxbCxWymvqUQEE7LbjXZZYAcalFZNkNytjSeyZcikwDcWg4&usqp=CAU" ></img></a>
                        </li>
                        <li>
                            <a>Jyothi </a>
                        </li>
                    </ul></nav>
                    <div className='row'>
                        <div className='col-sm-2'>

                            <img className="image" src="https://i.pinimg.com/564x/a6/58/32/a65832155622ac173337874f02b218fb--people-icon-avatar.jpg" />
                        </div>

                        <div className='col-sm-8'>
                            <p className='DisplayData'>{inputText}</p>
                            <p className='DisplayData1'>{inputText1}</p>
                        </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <p>Edit Name : </p></div>
                        <div className='col-sm-8'>
                            <textarea
                                value={inputText}
                                onChange={e => setInputText(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <p>Edit description : </p></div>
                        <div className='col-sm-8'>
                            <textarea
                                value={inputText1}
                                onChange={e => setInputText1(e.target.value)}
                            />
                        </div>

                    </div>

                </div>
            </div>

        </div>


    );
}