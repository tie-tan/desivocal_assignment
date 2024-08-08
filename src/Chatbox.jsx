import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ChatboxFooter } from "./Chatbox_Footer"
import { Data } from "./data";
import './App.css';


export function Chatbox(props) {
  const endOfDataRef = useRef(null);

  useEffect(() => {
    if (endOfDataRef.current) {
      endOfDataRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  let items = [`Hi, I am ${props.selectedCharacter1} and we are going to have a rap battle today`,
  `Hello, ${props.selectedCharacter1} are u ready for this fight with one and only ${props.selectedCharacter2}`,
    'Let,s begin the rap battle you start first then i will beat the hell out of you'];

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button disabled={!props.selectedCharacter1 || !props.selectedCharacter2}
          className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
        >Start Battle</Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col left-auto w-[900px] p-0">
        <div className="flex flex-col h-full">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-white text-center">Chatbox</DrawerTitle>
            <DrawerDescription className="text-gray-400 text-center">Rap battle between {props.selectedCharacter1} and {props.selectedCharacter2}</DrawerDescription>
          </DrawerHeader>

          <div className="overflow-y-scroll scroll-smooth">
            <Data items={items}> </Data>

          </div>

          <DrawerFooter>
            {/* <ChatboxFooter></ChatboxFooter> */}
          </DrawerFooter>

        </div>
      </DrawerContent>

    </Drawer>
  )
}
