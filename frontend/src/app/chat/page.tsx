"use client"

import { useEffect, useState } from "react";


import classNames from "classnames";
import useChat, { chatsLength, useAuth, useTheme } from "@/store/store";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import Chats from "@/components/Chat/Chats";
import GptIntro from "@/components/ui/GptIntro";
import DefaultIdeas from "@/components/DefaultIdea/DefaultIdeas";
import UserQuery from "@/components/UserInput/UserQuery";
import { IonIcon } from "@ionic/react";
import { addOutline, chevronBackOutline, codeOutline, menuOutline } from "ionicons/icons";



function App() {
  const [active, setActive] = useState(false);
  const isChatsVisible = useChat(chatsLength);
  const addNewChat = useChat((state: any) => state.addNewChat);
  const userHasApiKey = useAuth((state: any) => state.apikey);
  const [theme] = useTheme((state: any) => [state.theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="App  font-montserrat md:flex ">
      <Navbar active={active} setActive={setActive} />
      <div className="">
        <button
          type="button"
          className="shadow fixed p-2 h-8 w-8 text-sm top-4 left-4 border-2 hidden md:inline-flex dark:text-white text-gray-700 dark:border border-gray-400 rounded-md items-center justify-center"
          onClick={() => setActive(true)}
        >
          <IonIcon icon={chevronBackOutline} />
        </button>
      </div>
      <div className="p-3 z-10 flex items-center justify-between bg-black border-b sticky top-0  text-gray-300 md:hidden">
        <button onClick={() => setActive(true)} className=" text-2xl flex">
          <IonIcon icon={menuOutline} />
        </button>
        <h2>New chat</h2>
        <button className="text-2xl flex items-center" onClick={addNewChat}>
          <IonIcon icon={addOutline} />
        </button>
      </div>
      <main
        className={classNames(" w-full transition-all duration-500", {
          "md:ml-[260px]": active,
        })}
      >
        {isChatsVisible ? <Header /> : <GptIntro />}
        {isChatsVisible && <Chats />}
        <div
          className={classNames(
            "fixed left-0 px-2  right-0 transition-all duration-500 bottom-0 dark:shadow-lg py-1 shadow-md backdrop-blur-sm bg-black dark:bg-dark-primary/10",
            {
              "dark:bg-black ": isChatsVisible,
              "md:ml-[260px]": active,
            }
          )}
        >
          <div className="max-w-2xl md:max-w-[50%] mx-auto">
            {!isChatsVisible && (
              <>
                <div className="mb-[100px] ">
                  <h1 className="text-7xl w-fit font-medium bg-gradient-to-r from-[#1d8efc] to-[#e85169] text-transparent bg-clip-text">Hello, Niranjan</h1>
                  <p>Share your problem with us. </p>
                </div>
                <DefaultIdeas />
              </>
            )}

            <div className="dark:bg-inherit">
              <UserQuery />
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
