import React, { Component } from 'react';
import picture from '../images/bbq.jpg';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1
                        style={{
                            color: '#8c64d6',
                            textAlign: 'center',
                            background:
                                'linear-gradient(to bottom, rgba(240,249,255,1) 0%,rgba(203,235,255,1) 47%,rgba(161,219,255,1) 100%)',
                            fontFamily: "'Sedgwick Ave Display'",
                            fontSize: '80px',
                            letterSpacing: '10px',
                            paddingBottom: '400px'
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: '10px'
                                }}
                            >
                                Is Your Dream
                                <span
                                    style={{
                                        color: '#f27e26',
                                        fontSize: '20px'
                                    }}
                                >
                                    having a Fit, healthy body ?
                                </span>
                            </p>
                        </div>
                        Hunger Games
                        <div>
                            <p style={{ color: '#23d160', fontSize: '20px' }}>
                                Lets play a "GAME"
                            </p>
                            <div
                                style={{
                                    color: '#f27e26',
                                    fontSize: '20px'
                                }}
                            >
                                To be just bit <em>Better</em> today
                            </div>
                        </div>
                        <div>
                            <Link to="/register">
                                <button
                                    style={{
                                        marginTop: '80px',
                                        padding: '20px 60px',
                                        borderRadius: '10px',
                                        border: 'solid #b991ff 3px ',
                                        background: 'rgba(0, 0, 0, 0)',
                                        color: '#b991ff',
                                        letterSpacing: '2px',
                                        fontSize: '30px',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <strong> Join Now! </strong>
                                </button>
                            </Link>
                        </div>
                    </h1>
                </div>
            </div>
        );
    }
}

export default Home;
