import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => (
    <div className="player-wrapper">
        <ReactPlayer
            className="react-player"
            url={url}
            controls
            width="100%"
            height="100%"
        />
    </div>
);

export default VideoPlayer;

