import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams, useHistory } from 'react-router-dom';
import { getRoom } from '../../http';

import styles from './Room.module.css';

const Room = () => {
    const {id: roomId} = useParams();
    const user = useSelector(state => state.auth.user)
    const {clients, provideRef, handleMute} = useWebRTC(roomId, user);
    const history = useHistory();
    const [room, setRoom] = useState(null);
    const [isMute, setMute] = useState(true);

    useEffect(() => {
        handleMute(isMute, user.id);
    }, [isMute]);

    const handManualLeave = () => {
        history.push('/rooms');
    };

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            // console.log(data);
            setRoom((prev) => data);
        };

        fetchRoom();
    }, [roomId]);

    const handleMuteClick = (clientId) => {
        if (clientId !== user.id) {
            return;
        }
        setMute((prev) => !prev);
    };

    return (
        <div>
            <div className="container">
                <button onClick={handManualLeave} className={styles.goBack}>
                    <img src="/images/arrow-left.png" alt="arrow-left" />
                    <span>All voice rooms</span>
                </button>
            </div>
            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    {<h2 className={styles.topic}>{room?.topic}</h2>}
                    <div className={styles.actions}>
                        {/* <button className={styles.actionBtn}>
                            <img src="/images/palm.png" alt="palm-icon" />
                        </button> */}
                        <button
                            onClick={handManualLeave}
                            className={styles.actionBtn}
                        >
                            <img src="/images/win.png" alt="win-icon" />
                            <span>Leave quietly</span>
                        </button>
                    </div>
                </div>
                <div className={styles.clientsList}>
                    {clients.map((client, idx) => {
                            return(
                                <div className={styles.client} key={client.id}> 
                                    <div className={styles.userHead} >
                                        <audio 
                                            autoPlay
                                            ref = {(instance) => {
                                                provideRef(instance, client.id);
                                            }}
                                        ></audio>

                                        <img className={styles.userAvatar} src={client.avatar} alt="avatar" />
                                        
                                        <button
                                            onClick={() =>
                                                handleMuteClick(client.id)
                                            }
                                            className={styles.micBtn}
                                        >
                                            {client.muted ? (
                                                <img
                                                    className={styles.mic}
                                                    src="/images/mic-mute.png"
                                                    alt="mic"
                                                />
                                             ) : (
                                                <img
                                                    className={styles.micImg}
                                                    src="/images/mic.png"
                                                    alt="mic"
                                                />
                                            )}
                                        </button>
                                    </div>
                                    <h4>{client.name}</h4>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    )
};

export default Room;
