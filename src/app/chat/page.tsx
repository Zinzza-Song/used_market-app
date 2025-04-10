import getCurrentUser from '@/serverActions/getCurrentUser'
import React from 'react'
import ChatClient from './ChatClient'

const ChatPage = async () => {
  const currentUser = await getCurrentUser()

  return <ChatClient currentUser={currentUser} />
}

export default ChatPage
