import React from 'react'
import {Link} from 'react-router-dom'
import "./styles.css";


export default function Landing(){
    return(
        <div class="div">
            <div class="container"></div>
            <img class="img" src="https://th.bing.com/th/id/R.05e400648c0132d96cf71ff6bd0be3aa?rik=pTCfGdjt%2bX5apg&pid=ImgRaw&r=0" alt="dog img"/>
            <h1 class="title">WELCOME</h1>
            <Link to='/home'>
                <button class="btn">Get started</button>
            </Link>
            
        </div>
    )
}