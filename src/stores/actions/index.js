import { useApp } from './app'
import { useAuth } from './auth'
import { useChat } from './chat'
import { useUser } from './user'
export const useActions = () => ({
  ...useApp(),
  ...useUser(),
  ...useAuth(),
  ...useChat()
})
