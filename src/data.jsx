import { useState, useEffect } from "react";
import { Textarea } from "./components/ui/textarea";
import Texttospeech from './Text_to_speech';
import { generateAnswer } from "./Generate_response";
import './App.css'
import { Input } from "./components/ui/input";
import { Howl } from "howler";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { EditIcon, PlayIcon, StopCircleIcon } from "lucide-react";


export function Data(param) {

    const [items, setItems] = useState(param.items);
    const [editingIndex, setEditingIndex] = useState(null);
    const [inputValue, setInputValue] = useState(items[items.length - 1]);



    const toggleEdit = (index) => {
        console.log(index.index);
        setEditingIndex((prevIndex) => (prevIndex === index.index ? null : index.index));
    };

    const handleChange = (index, event) => {
        console.log(items[index]);
        const newItems = [...items];
        newItems[index] = event.target.value;
        setItems(newItems);
        console.log(event.target.value);

    };

    const fetchAndUpdateItems = async () => {

        for (let i = 0; i < 5; i++) {
            console.log(i);
            const newResponse = await generateAnswer(inputValue);
            if (newResponse) {
                setInputValue(newResponse);
                setItems(prevItems => [
                    ...prevItems,
                    newResponse,
                ]);

            }
        };
    }
    useEffect(() => {
        fetchAndUpdateItems();
    }, []);




    const [audioUrl, setAudioUrl] = useState(null);

    const handlePlayAudio = async (text) => {
        console.log(text);
        const url = await Texttospeech(text);
        setAudioUrl(url);
    };

    useEffect(() => {
        if (audioUrl) {
            const newSound = new Howl({
                src: [audioUrl],
                html5: true,
            });
            newSound.play();
            console.log(newSound);
        }
    }, [audioUrl]);

    return (
        <div>
            {
                items.map((item, index) => (
                    <div key={index}
                        className={`flex flex-col overflow-hidden justify-spacebetween
                            ${index % 2 === 0 ? 'items-start break-words w-[500px]' :
                                ' items-end justify-end word-break'}`}>
                        <div >
                            {
                                index % 2 === 0 ?
                                    (
                                        (editingIndex === index) ? (
                                            <div className="flex flex-ro overflow-hidden ">
                                                <div >
                                                    <Textarea className="p-2 overflow-auto  bg-blue-500 items-start m-2 break-words rounded-lg w-[450px]"
                                                        value={item}
                                                        onChange={(e) => handleChange(index, e)}
                                                    />
                                                </div>
                                                <div className="flex-co pt-5 justify-spacebetween pt-7">
                                                    <button onClick={() => toggleEdit({ index })}><EditIcon className="h-[18px] ,w-[17px]" /></button>
                                                    <button onClick={() => handlePlayAudio({ item })} ><PlayIcon className="h-[18px] ,w-[18px]" /></button>
                                                </div>
                                            </div>
                                        )
                                            :
                                            (<div className="flex flex-ro overflow-hidden">
                                                <div className="p-2 overflow-auto  bg-blue-500 items-start border-gray-300 m-2 break-words rounded-lg">
                                                    {item}
                                                </div>
                                                <div className="flex-co pt-5 justify-spacebetween ">
                                                    <button onClick={() => toggleEdit({ index })}><EditIcon className="h-[18px] ,w-[17px]" /></button>
                                                    <button onClick={() => handlePlayAudio({ item })} ><PlayIcon className="h-[18px] ,w-[18px]" /></button>
                                                </div>

                                            </div>)
                                    )
                                    :
                                    (
                                        (editingIndex === index) ? (
                                            <div className="flex flex-ro overflow-hidden words-break justify-self-end">
                                                <div className="flex-co pt-8 justify-spacebetween overflow-hidden">
                                                    <button onClick={() => toggleEdit({ index })}><EditIcon className="h-[18px] ,w-[18px]" /></button>
                                                    <button onClick={() => handlePlayAudio({ item })}><PlayIcon className="h-[18px] ,w-[18px]" /></button>
                                                </div>
                                                <div >
                                                    <Textarea className=" overflow-hidden items-end m-4 pl-4 w-[500px] items-end break-words rounded-lg"
                                                        value={item}
                                                        onChange={(e) => handleChange(index, e)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                            :
                                            (<div className="flex flex-ro overflow-hidden words-break justify-self-end w-[550px]">
                                                <div className="flex-co pt-4  justify-spacebetween overflow-hidden">
                                                    <button onClick={() => toggleEdit({ index })}><EditIcon className="h-[18px] ,w-[18px]" /></button>
                                                    <button onClick={() => handlePlayAudio({ item })}><PlayIcon className="h-[18px] ,w-[18px]" /></button>
                                                </div>
                                                <div className=" overflow-hidden bg-grey items-end border-white m-2 pl-4 rounded-lg items-end break-words rounded-lg w-[500px]">
                                                    {item}
                                                </div>
                                            </div>)
                                    )
                            }
                            <br></br>
                        </div>

                        <br></br>
                    </div>
                ))
            }
            <div className="fixed bottom-4 right-4">
                <Button onClick={() => fetchAndUpdateItems()}>fetch more....</Button>
            </div>
        </div>

    );
}

