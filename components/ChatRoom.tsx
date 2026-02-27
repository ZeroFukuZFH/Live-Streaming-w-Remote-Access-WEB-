"use client"

import { CornerDownLeft, User } from "lucide-react"
import { useState, KeyboardEvent, ChangeEvent, useContext } from "react"
import { ChatRoomContext } from './custom hooks/useChat'
import { Command, CommandDialog } from "./ui/command"
import { Button } from "./ui/button"
import { Field, FieldLabel, FieldDescription } from "./ui/field"
import { Input } from "@/components/ui/input"

export function ChatRoom() {
  const [client, setClient] = useState('')
  const [url, setUrl] = useState('')
  const [submitted, setSubmit] = useState(false)

  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    setOpen(false)
    setSubmit(true)
  }

  return (
    <div className="bg-[rgb(255,255,255,0.15)] h-screen max-h-[600] max-w-80 flex flex-col rounded-xl p-2 pl-4 pr-4 backdrop-blur-xs border-red">
      {submitted ?
        <>
          <ChatHeader />
          <ChatArea client={client} />
          <ChatBox client={client} />
        </>
        :
        <PopUpBox
          setOpen={setOpen}
          open={open}
          client={client}
          setClient={setClient}
          url={url}
          setUrl={setUrl}
          handleSubmit={handleSubmit}
        />
      }
    </div>
  )
}

function ChatHeader() {
  const [members, setMembers] = useState(0);
  return (
    <div className="flex justify-between pt-2 pb-2 ">
      <h1>Live Chat</h1>
      <div className="flex gap-2">
        <User scale={10} />
        {members}
      </div>
    </div>
  );
}

function ChatArea({ client }: { client: string }) {

  const { chats } = useContext(ChatRoomContext)

  return (
    <div className="border-t border-b pt-2 pb-2 h-full overflow-y-auto">
      {chats.map(user => (
        <div key={user.id}>
          {
            user.name == client ?
              <div className="flex flex-col items-end">
                <p className="text-sm">You</p>
                <p className="bg-red-600 pt-2 pb-2 pl-4 pr-4 max-w-fit rounded-2xl">
                  {user.message}
                </p>
              </div> :
              <div className="flex flex-col">
                <p className="text-sm">{user.name}</p>
                <p className="bg-[rgb(25,25,25)] pt-2 pb-2 pl-4 pr-4 max-w-fit rounded-2xl">
                  {user.message}
                </p>
              </div>
          }
        </div>
      ))}
    </div>
  )
}

function ChatBox({ client }: { client: string }) {

  const { send } = useContext(ChatRoomContext)

  const [message, setMessage] = useState('')
  const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (message.length <= 0) return
    if (event.key == 'Enter') {
      send(message, client)
      setMessage('')
    }
  }
  return (
    <>
      <div className="flex gap-2 pt-2 pb-2">

        <input
          className="border rounded-xl p-2 w-full focus:bg-white focus:text-black outline-none"
          placeholder="start typing..."
          onKeyDown={handleEnter}
          value={message}
          onChange={handleMessage}
        />
        <button className="bg-red-600 p-2 rounded-xl"><CornerDownLeft /></button>
      </div>
    </>
  )
}

interface PopUpBoxProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  client: string;
  setClient: (client: string) => void;
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: () => void;
}

function PopUpBox({ setOpen, open, client, setClient, url, setUrl, handleSubmit }:PopUpBoxProps) {
  return (
    <>
      <div className="flex flex-col h-full justify-center">
        <Button onClick={() => {
          setOpen(true);
        }} variant={'default'} className="bg-red-600 text-white">
          Join a Session
        </Button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <Field className="p-6">
            <h1 className="text-3xl">JOIN A SESSION</h1>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              placeholder="e.g jane doe..."
              value={client}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClient(e.target.value)}
            />
            <FieldDescription>
              Name to join room
            </FieldDescription>
            <FieldLabel htmlFor="url">URL</FieldLabel>
            <Input
              id="url"
              placeholder="place URL here..."
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            />
            <FieldDescription>
              your unique URL to join room
            </FieldDescription>
            <div className="flex flex-row items-center justify-end">
              <Button variant={'default'} className="bg-red-600 text-white" onClick={handleSubmit}>
                submit
              </Button>
            </div>
          </Field>
        </Command>
      </CommandDialog>
    </>
  );
}