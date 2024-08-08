import React, { useState } from "react"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Chatbox } from "./Chatbox";
import './App.css';



export function SelectDemo() {

  const characters = [
    'Donald Trump',
    'Peter Griffin',
    'Kamala Harris',
    'Ryan Reynolds (Deadpool)',
    'Hugh Jackman (Wolverine)',
  ];

  const [selectedCharacter1, setSelectedCharacter1] = useState('');
  const [selectedCharacter2, setSelectedCharacter2] = useState('');

  const handleSelect1 = (value) => {
    setSelectedCharacter1(value);
  };

  const handleSelect2 = (value) => {
    setSelectedCharacter2(value);
  };

  const availableCharacters1 = selectedCharacter2
    ? characters.filter(char => char !== selectedCharacter2)
    : characters;

  const availableCharacters2 = selectedCharacter1
    ? characters.filter(char => char !== selectedCharacter1)
    : characters;

  return (
    <div className="centered-container">
      <div className="centered-content">
        <Select onValueChange={handleSelect1}>
          <SelectTrigger >
            <SelectValue placeholder="Character 1" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Characters</SelectLabel>
              {availableCharacters1.map((character, index) => (
                <SelectItem key={index} value={character}>{character}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <br></br>

        <Select onValueChange={handleSelect2}>
          <SelectTrigger>
            <SelectValue placeholder="Character 2" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Characters</SelectLabel>
              {availableCharacters2.map((character, index) => (
                <SelectItem key={index} value={character}>{character}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Separator className="my-4" />
        <div className="flex items-center justify-center">
          <Chatbox selectedCharacter1={selectedCharacter1} selectedCharacter2={selectedCharacter2} 
          ></Chatbox>
        </div>
      </div>
    </div>
  );
};

// export default SelectDemo;
