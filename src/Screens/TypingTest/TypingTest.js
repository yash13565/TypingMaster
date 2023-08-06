import React, { useState, useEffect } from 'react';
import { options, randomParagraphs } from '../../Utils/Constant';
import style from './TypingTest.module.css'
import CustomSelect from '../../Components/Atoms/SelectField/CustomSelect';
import CustomInput from '../../Components/Atoms/Input/CustomInput';
import CustomTextArea from '../../Components/Atoms/TextField/CustomTextArea';
import CustomButton from '../../Components/Atoms/Button/CustomButton';


function TypingTest() {
    const [paragraph, setParagraph] = useState('')
    const [userInput, setUserInput] = useState('')
    const [timeDuration, setTimeDuration] = useState("1")
    const [timer, setTimer] = useState(null)
    const [remainingTime, setRemainingTime] = useState(timeDuration * 60);
    const [isChallengeStarted, setIsChallengeStarted] = useState(false);
    const [score, setScore] = useState(null);
    const [customTimeInput, setCustomTimeInput] = useState('');


    function getRandomParagraph() {
        const randomIndex = Math.floor(Math.random() * randomParagraphs.length)
        return randomParagraphs[randomIndex]
    };

    const startChallenge = () => {
        setIsChallengeStarted(true);
        const duration = timeDuration === 'custom' ? parseInt(customTimeInput) : parseInt(timeDuration);
        setRemainingTime(duration * 60);
        setScore(null);

       
        setUserInput('');

        if (paragraph === '' && timeDuration !== 'custom') {
            setParagraph(getRandomParagraph());
        } else if (paragraph === '' && timeDuration === 'custom') {
            setParagraph(getRandomParagraph());
            setTimeDuration(customTimeInput); 
        }
        setTimer(setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000));
    };



    const handleInputChange = (e) => {
        setUserInput(e.target.value)
    };

    const submitChallenge = () => {
        clearInterval(timer);
        setIsChallengeStarted(false);

        const paragraphWords = paragraph.trim().split(/\s+/);
        const userInputWords = userInput.trim().split(/\s+/);

        let correctWords = 0;
        for (let i = 0; i < paragraphWords.length; i++) {
            if (i < userInputWords.length && paragraphWords[i] === userInputWords[i]) {
                correctWords++;
            }
        }
        const accuracy = ((correctWords / paragraphWords.length) * 100).toFixed(2); 
        setScore(accuracy);
        setUserInput('');
        setParagraph('');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemaining = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isChallengeStarted && remainingTime === 0) {
            submitChallenge();
        }
        if (isChallengeStarted && timeDuration === 'custom' && remainingTime % 60 === 0) {
            setParagraph(getRandomParagraph());
        }
    }, [remainingTime, isChallengeStarted, timeDuration]);
    return (
        <>
            {!isChallengeStarted ? (
                <div className={style.challengecont}>
                    <p>Choose a test duration:</p>
                    <CustomSelect
                        options={options}
                        value={timeDuration}
                        onChange={(e) => {
                            const value = e.target.value;
                            setTimeDuration(value);
                            if (value === 'custom') {
                                setParagraph('');
                            }
                        }}
                        className={style.customselect}
                    />
                    {timeDuration === 'custom' && (
                        <CustomInput
                            type="number"
                            min="1"
                            placeholder="Custom duration in minutes"
                            value={customTimeInput}
                            onChange={(e) => setCustomTimeInput(e.target.value)}
                            className={style.customselect}
                        />
                    )}
                    <CustomTextArea
                        rows="10"
                        cols='70'
                        placeholder="Paste or type your paragraph here"
                        value={paragraph}
                        onChange={(e) => setParagraph(e.target.value)}
                        className={style.customtextarea}
                    />
                    <CustomButton text={'Start'} onClick={startChallenge} className={style.btn} />
                </div>
            ) : (

                <>
                    <p className={style.para}>Time remaining: {formatTime(remainingTime)}</p>
                    <div className={style.timer}>
                        <p className={style.para2}>Challenge Paragraph:</p>
                        <p className={style.para3}>{paragraph}</p>
                        <CustomTextArea
                            rows="10"
                            placeholder="Type the paragraph here"
                            value={userInput}
                            onChange={handleInputChange}
                            disabled={!isChallengeStarted}
                            className={style.textfield}
                        />
                        <br />
                        <CustomButton text={'Submit'} onClick={submitChallenge} className={style.btn} />
                    </div>
                </>
            )}
            {score !== null && (
                <div className={style.resultcont}>
                    <h2 style={{ color: 'green' }}>Test Result :</h2>
                    <p style={{ color: 'white', fontSize: '1.2rem', marginRight: '0.6rem' }}>
                        Score: {parseFloat(score).toFixed(2)} / {paragraph.trim().split(/\s+/).length+'00'}
                    </p>
                    <p style={{ color: 'white', fontSize: '1.2rem' }}>
                        Accuracy: {parseFloat(score).toFixed(2)}%
                    </p>
                    <p style={{ color: 'white', fontSize: '1.2rem' }}>
                        Speed: {parseFloat(score / timeDuration).toFixed(2)} words per minute
                    </p>
                </div>
            )}

        </>
    )
}

export default TypingTest