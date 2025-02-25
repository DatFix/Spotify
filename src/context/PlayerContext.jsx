import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const getCurrentId = localStorage.getItem("currentId")

    const [track, setTrack] = useState(songsData[parseInt(getCurrentId)])
    const [playStatus, setPlayStatus] = useState(false)
    const [currentPlayingId, setCurrentPlayingId] = useState()
    const [time, setTime] = useState({
        currentTime: {
            seconds: 0,
            minutes: 0
        },
        totalTime: {
            seconds: 0,
            minutes: 0
        }
    })

    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        localStorage.setItem("currentId", id)
        await setTrack(songsData[id])
        setCurrentPlayingId(id)
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play()
            setCurrentPlayingId(track.id - 1)
            console.log("id:::::::::::::", id);

            setPlayStatus(true)
        }
    }

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play()
            setCurrentPlayingId(track.id + 1)
            setPlayStatus(true)
        }
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }
    

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {

                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100) + "%")

                setTime({
                    currentTime: {
                        seconds: Math.floor(audioRef.current.currentTime % 60),
                        minutes: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        seconds: Math.floor(audioRef.current.duration % 60),
                        minutes: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioRef])



    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        next,
        previous,
        seekSong,
        currentPlayingId
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider