import React, {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group'
import {gsap, Power1} from 'gsap'
import {useParams} from 'react-router-dom';
import './envelope.scss'

export const Envelope = () => {
    const [bShowInfo, setBShowInfo] = useState(true)
    let top = useRef(null);
    let card = useRef(null);
    let t1 = useRef();

    const {guest} = useParams<{guest?: string}>();

    const getGuestNames = () => {
        return guest?.split('-').join(' ');
    }

    useEffect(() => {
        // @ts-ignore
        t1.current = gsap.timeline({ paused: true, reversed: true })
            .to(top,
            {
                ease: Power1.easeInOut,
                rotateX: "0deg",
                duration: 0.5,
                zIndex: -1,
            },
            0
        )
            .to(card,
            {
                ease: Power1.easeInOut,
                bottom: "243px",
                scale: 0.95,
                boxShadow: "0 2px 5px 0 rgb(120 116 168 / 42%)",
            },
            0.5
        )
            .to(card, {
            duration: 0.1,
            zIndex: 10,
        })

        .to(card,
            {
                ease: Power1.easeInOut,
                scale: 2,
            },
            2.5
        )

        .to(card,
            {
                ease: Power1.easeInOut,
                bottom: "25px",
                scale: 1,
                duration: 0.5,
                rotation: 90
            },
            1.5
        );
    }, []);


    const play =  () => {
        // @ts-ignore
        t1.current.play();
        setBShowInfo(false)
    }

    const close = async () => {
        // @ts-ignore
        await t1.current.reverse();
        setBShowInfo(true)
    }


    return (
        <>
            <div className="container">
                <CSSTransition
                    in={bShowInfo}
                    timeout={300}
                    classNames='my-element'
                    unmountOnExit
                >
                    <div className='info-text' >
                        <h1>Нажмите на конверт!</h1>
                    </div>
                </CSSTransition>
                <div className="base"/>
                <div className="card" ref={(el:any) => (card = el)}>
                    <h2>{getGuestNames()}</h2>
                    <svg onClick={close} className="close" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path
                            d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
                    </svg>
                </div>
                <svg onClick={play} className="env" viewBox="0 0 668 541" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 1">
                        <rect
                            id="bottom"
                            x="84"
                            y="368"
                            width="500"
                            height="150"
                            fill="#555084"
                        />
                        <path
                            id="left"
                            d="M335 368L83.75 517.822L83.75 218.178L335 368Z"
                            fill="#5D5790"
                        />
                        <path
                            id="right"
                            d="M333 368L584.25 517.822L584.25 218.178L333 368Z"
                            fill="#5D5790"
                        />
                    </g>
                </svg>
                <div className="top" ref={(el:any) => (top = el)}  onClick={play}/>
            </div>
        </>
    );
}
