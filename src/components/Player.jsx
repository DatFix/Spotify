import React, { useContext } from 'react';
import { assets, songsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { Slider } from 'antd';

const Player = () => {

    const { seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong } = useContext(PlayerContext)

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='hidden lg:flex items-center gap-4 min-w-[250px]'>
                <img className='w-12' src={track.image} alt='' />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>

            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt='' />
                    <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt='' />
                    {playStatus ?
                        <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt='' />
                        :
                        <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt='' />
                    }
                    <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt='' />
                    <img className='w-4 cursor-pointer' src={assets.loop_icon} alt='' />
                </div>

                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minutes}:{time.currentTime.seconds}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] cursor-pointer'>
                        <hr ref={seekBar} className='hidden h-1 border-none w-0 bg-green-800 rounded-full' />
                        {/* <input
                            type='range'
                            min='0'
                            max={time.totalTime.seconds + time.totalTime.minutes * 60}
                            value={time.currentTime.seconds + time.currentTime.minutes * 60}
                            onClick={seekSong}
                            className='w-[60vw] max-w-[500px] cursor-pointer'
                        /> */}
                        <Slider
                            max={time.totalTime.seconds + time.totalTime.minutes * 60}
                            value={time.currentTime.seconds + time.currentTime.minutes * 60}
                            onChange={seekSong}
                            defaultValue={30}
                            tooltip={{
                                formatter: (value) => formatTime(value),
                            }}
                            style={{boxShadow: 'none',outline: 'none'}}
                        
                        />
                    </div>

                    <p>{time.totalTime.minutes}:{time.totalTime.seconds}</p>
                </div>
            </div>

            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <img className='w-4' src={assets.plays_icon} alt='' />
                <img className='w-4' src={assets.mic_icon} alt='' />
                <img className='w-4' src={assets.queue_icon} alt='' />
                <img className='w-4' src={assets.speaker_icon} alt='' />
                <img className='w-4' src={assets.volume_icon} alt='' />
                <div className='w-20 bg-slate-50 h-1 rounded'></div>
                <img className='w-4' src={assets.plays_icon} alt='' />
                <img className='w-4' src={assets.mini_player_icon} alt='' />
                <img className='w-4' src={assets.zoom_icon} alt='' />
            </div>
        </div>
    );
};

export default Player;