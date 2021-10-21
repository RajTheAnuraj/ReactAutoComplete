import React, { useState } from "react";


export default function AutoSuggest(props) {
    const {OnCommandCompleted, commandCollection} = props;
    const [text, setText] = useState("");
    const [tokens, setToken] = useState([]);
    const [multipleResults, setMultipleResults] = useState([]);
    const [lastSearchTerm, setLastSearchTerm] = useState("");
    const [lastReturnedResult, setLastReturnedResult] = useState(0);

    const doStuff = (evt) => {
        setText(prev => evt.target.value)
    }

    const keyDowned = (evt) => {
        if (evt.key == "Tab") {
            evt.preventDefault();
            setText(prev => GetSuggestion(prev + ""));
        }

        if (evt.key == " ") {
            RebuildWordsArray();
        }

        if(evt.key == "Enter"){
            if(OnCommandCompleted != null) OnCommandCompleted(text);
        }
    }

    const GetSuggestion = (currentText) => {
        let tokens = currentText.split(' ');
        tokens = tokens.filter(c => c != "");
        let removeLastElement = true;

        if (tokens.length > 0 && tokens[0] == "omt") {
            let lastToken = "", lastSwitch = "";
            let idx = tokens.length - 1;

            lastToken = tokens[idx];
            lastSwitch = tokens[idx - 1];

            if (/\/.*/.test(lastToken) && lastToken.length > 1) {
                //this means last token is a switch 
                lastSwitch = lastToken;
                lastToken = "*";
                removeLastElement = false;
            }

            if (/\/.*/.test(lastSwitch)) {
                const selectedSwitch = lastSwitch.substring(1, lastSwitch.length);

                if(multipleResults.length > 0 && lastSearchTerm == `${selectedSwitch}  ${lastToken}`){
                    let servingIndex = lastReturnedResult + 1;
                    if(servingIndex >= multipleResults.length) servingIndex = 0;
                    setLastReturnedResult(servingIndex);
                    setLastSearchTerm(`${selectedSwitch}  ${multipleResults[servingIndex]}`);
                    if(removeLastElement) tokens.splice(idx, 1);
                    tokens.push(multipleResults[servingIndex]);
                    return tokens.join(" ");
                }
                
                const matchingItem = FindMatchingItems(selectedSwitch, lastToken);
                if(matchingItem == null) return currentText;
                if (matchingItem.length > 0) {
                    if (matchingItem.length > 1) {
                        setMultipleResults(matchingItem);
                        setLastSearchTerm(`${selectedSwitch}  ${matchingItem[0]}`);
                    }
                    else if (matchingItem.length == 1) {
                        setMultipleResults([]);
                        setLastSearchTerm("");
                        setLastReturnedResult(0);
                    }
                    if(removeLastElement)
                    tokens.splice(idx, 1);
                    tokens.push(matchingItem[0]);
                    return tokens.join(" ");
                }
            }
        }
        return currentText;
    }

   
    const FindMatchingItems = (selectedSwitch, searchItem) => {
        searchItem = searchItem.toLowerCase();
        if (commandCollection[selectedSwitch] != null) {
            if(searchItem == "*") return commandCollection[selectedSwitch];
            return commandCollection[selectedSwitch].filter(c => c.startsWith(searchItem));
        }
    }

    const RebuildWordsArray = () => {
        const words = text.split(' ');
        setToken(oldWords => words);
    }

    return (<div style={{ width: 400 }}>
        <input
            className="autocomplete"
            spellCheck="false"
            placeholder="enter a command and press TAB for autocompletion ex: omt /s uploadconfig"
            onChange={(evt) => { doStuff(evt) }}
            onKeyDown={(evt) => { keyDowned(evt) }}
            value={text}
        />
    </div>);
}