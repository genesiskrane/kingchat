import { useApp } from './app'
import { useAuth } from './auth'
import { useChat } from './chat'
import { useUser } from './user'
import { useRoom } from './room'
import { useSockets } from './sockets/'

export const useActions = () => ({
  ...useApp(),
  ...useUser(),
  ...useAuth(),
  ...useChat(),
  ...useRoom(),
  ...useSockets()
})
