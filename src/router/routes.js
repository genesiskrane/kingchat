import { useAppStore } from '../stores';

const routes = [
  {
    path: '/',
    name: 'app',
    beforeEnter: (to, from, next) => {
      const store = useAppStore();

      if (to.path == '/') {
        if (to.path == '/' && store.app.isLoggedIn) next('/chats');
        else if (to.path == '/' && !store.app.isLoggedIn) next('/games');
      } else next();
    },

    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../pages/Home.vue')
      },
      {
        path: '/chats',
        name: 'chats',
        component: () => import('../pages/Chats.vue')
      },
      {
        path: '/rooms',
        name: 'Rooms',
        component: () => import('../pages/Rooms.vue'),
        children: [
          {
            path: ':room',
            component: () => import('../pages/Room.vue'),
            beforeEnter: async (to) => {
              const store = useAppStore();

              let roomInfo = await store.openRoom(to);
              return;
            }
          }
        ]
      },
      {
        path: '/games',
        name: 'Games',
        component: () => import('../pages/games/Index.vue')
      },
      {
        path: '/books',
        name: 'Genres',
        component: () => import('../pages/books/Index.vue')
      },
      {
        path: '/explore',
        name: 'explore',
        component: () => import('../pages/Explore.vue')
      },
      {
        path: '/notifications',
        component: () => import('../pages/Notifications.vue')
      },
      {
        path: '/bookmarks',
        component: () => import('../pages/Bookmarks.vue')
      },
      {
        path: '/communities',
        component: () => import('../pages/Communities.vue')
      },
      {
        path: '/spaces',
        component: () => import('../pages/Spaces.vue')
      },
      {
        path: '/profile',
        component: () => import('../pages/Profile.vue')
      },
      {
        path: '/store',
        name: 'store',
        component: () => import('../pages/Store.vue')
      }
    ]
  },
  {
    path: '/:username',
    name: 'page',
    component: () => import('../pages/Page.vue')
  },

  {
    path: '/chat',
    beforeEnter: (to, from) => {
      if (from.path !== '/') sessionStorage.setItem('route', JSON.stringify({ from: from.path }));
      to.query.origin = JSON.parse(sessionStorage.getItem('route')).from;
    },
    children: [{ path: ':username', component: () => import('../pages/Chat.vue') }]
  },
  {
    path: '/rooms'
  },
  {
    path: '/books',
    children: [
      {
        path: ':genre',
        component: () => import('../pages/books/Genre.vue'),
        beforeEnter: async (to) => {
          const store = useAppStore();
          await store.getGenre(to.params.genre);
        }
      }
    ]
  },
  {
    path: '/book',
    children: [
      {
        path: ':bookID',
        component: () => import('../pages/books/Book.vue'),
        beforeEnter: async (to) => {
          const store = useAppStore();
          await store.getBook(to.params.bookID);
        }
      }
    ]
  },
  {
    name: 'Game',
    path: '/games',
    component: () => import('../pages/games/Game.vue'),
    children: [
      { path: 'ludo', component: () => import('../pages/games/ludo/Index.vue') },
      { path: 'dice-merge', component: () => import('../pages/games/dice-merge/Index.vue') },
      { path: 'chess', component: () => import('../pages/games/chess/Index.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('../layouts/Auth.vue'),
    redirect: '/auth/login',
    children: [
      { path: 'signup', component: () => import('../pages/auth/SignUp.vue') },
      {
        path: 'login',
        component: () => import('../pages/auth/Login.vue')
      },
      {
        path: 'forgot-password',
        component: () => import('../pages/auth/ForgotPassword.vue')
      },
      {
        path: 'email-verification',
        component: () => import('../pages/auth/EmailVerification.vue')
      },
      {
        path: 'create-password',
        component: () => import('../pages/auth/CreatePassword.vue')
      },
      {
        path: 'pick-profile-picture',
        component: () => import('../pages/auth/PickProfilePicture.vue')
      },
      {
        path: 'create-username',
        component: () => import('../pages/auth/CreateUsername.vue')
      },
      {
        path: 'recovery-code-confirmation',
        component: () => import('../pages/auth/RecoveryCodeConfirmation.vue')
      },
      {
        path: 'reset-password',
        component: () => import('../pages/auth/ResetPassword.vue')
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
];

export default routes;
