import { set1, set2 } from './drums.js';
import { useEffect, useState } from 'react';
import './App.css';


function App() {

    const [keyPressed, setKeyPressed] = useState('');
    const [currentSet, setKeySet] = useState(set1);
    const [keySetSwitch, setKeySwitch] = useState(true);

    useEffect(() => {
        const keypressed = (event) => {
            let a = document.getElementById(event.key.toUpperCase());
            if (a) { playAudio(a); }
        };

        const keyUp = (event) => {
            let b = document.getElementById(event.key.toUpperCase());
            if (b && b.classList.contains('drumpadOn')) { keyUpStyle(b); }
        };
        document.addEventListener('keyup', keyUp);
        document.addEventListener('keydown', keypressed);
        return () => {
            document.removeEventListener('keydown', keypressed);
            document.removeEventListener('keyup', keyUp);
        };
    }, []);
    function switchSets(event) {
        if (keySetSwitch) { event.currentTarget.className = "drumpadOn"; setKeySwitch(false); setKeySet(set2); }
        else { event.currentTarget.className = "drumpadOff"; setKeySwitch(true); setKeySet(set1); }
    }
    function mouseUp (event) { keyUpStyle(event.currentTarget); }
    function mouseDown(event) { playAudio(event.target); }
    function keyUpStyle(b) { b.className = "drum-pad drumpadOff";}
    function playAudio(t) {
        t.className = "drum-pad drumpadOn";
        setKeyPressed(t.title);
        t.querySelector('audio').play();
    }

    

    return (
       
    <div className="App">
          <div className="App-container">
              <div id="drum-machine">
                    <div id="display">
                        <div id="drumpads">
                            {
                                
                                currentSet.map(i => (
                                <div
                                    onMouseDown={mouseDown}
                                    className="drum-pad drumpadOff"
                                    title={i.id}
                                    id={i.keyTrigger}
                                    onMouseUp={mouseUp}>
                                    {i.keyTrigger}
                                    <audio id={i.keyTrigger}
                                        className="clip"
                                        src={i.url}></audio>
                                </div>))}

                        </div>
                        <button id="setSwitcherId" className="drumpadOff " onClick={switchSets}>Set 2</button>
                        <h4 id="title">{keyPressed}</h4>
                    </div>
                </div>
               
            </div>
            
    </div>
  );
}

export default App;
