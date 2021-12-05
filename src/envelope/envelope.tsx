import React, {useEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group'
import {gsap, Power1} from 'gsap'
import {useParams} from 'react-router-dom';
import {InviteTitle} from "./svg/inviteTitle";
import './envelope.scss'
import {InviteText} from "./svg/InviteText";
import ReactCardFlip from 'react-card-flip';


export const Envelope = () => {
    const [bShowInfo, setBShowInfo] = useState(true)
    let top = useRef(null);
    let card = useRef(null);
    let t1 = useRef();

    const {guest} = useParams<{guest?: string}>();

    const getGuestNames = () => {
        return guest?.split('-').join(', ');
    }

    const [toggled, setToggled] = useState(false);


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
                scale: 2.2,
            },
            2.5
        )

        .to(card,
            {
                ease: Power1.easeInOut,
                bottom: "25px",
                scale: 1,
                duration: 0.5,
                rotation: 0
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
                <div onClick={() => setToggled(!toggled)} className="card" ref={(el:any) => (card = el)}>
                <ReactCardFlip isFlipped={toggled} flipDirection="horizontal" flipSpeedFrontToBack={1.5} flipSpeedBackToFront={1.5}>
                    <InviteTitle/>
                    <InviteText names={getGuestNames()}/>
                </ReactCardFlip>

                </div>
                <svg onClick={play} className="env" viewBox="0 0 668 541" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 1">
                        <rect    id="bottom"
                                 x="84"
                                 y="368"
                                 width="500"
                                 height="150"
                                 fill="#afb382"/>
                        <path
                            id="left"
                            d="M335 368L83.75 517.822L83.75 218.178L335 368Z"
                            fill="#9fa376"
                        />
                        <path
                            id="right"
                            d="M333 368L584.25 517.822L584.25 218.178L333 368Z"
                            fill="#9fa376"
                        />
                    </g>
                </svg>
                <div className="top" ref={(el:any) => (top = el)}  onClick={play}/>
            </div>
        </>
    );
}
