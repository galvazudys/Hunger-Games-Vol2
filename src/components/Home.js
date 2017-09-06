import React, { Component } from 'react';
import picture from '../images/bbq.jpg';

class Home extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(193,191,234,1) 0%,rgba(216,208,239,1) 50%,rgba(235,233,249,1) 100%)',

                        backgroundImage: 'url(' + picture + ')',
                        margin: 'auto',
                        background: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                >
                    <h1 style={{ textAlign: 'center', padding: '300px 0' }}>
                        Hunger Games
                    </h1>
                </div>
            </div>
        );
    }
}

export default Home;
