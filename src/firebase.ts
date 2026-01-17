import 'firebase/compat/messaging'

import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDQ-tFgt3tiXzNHvzbrZmIvzmnFtLj7y6A',
  appId: '1:100527961304:web:cd18b5d3bcca5943b013ad',
  authDomain: 'react-pwa-90777.firebaseapp.com',
  messagingSenderId: '100527961304',
  projectId: 'react-pwa-90777',
  storageBucket: 'react-pwa-90777.appspot.com',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

export const getToken = (setTokenFound: (token: string) => void) => {
  messaging
    .getToken({
      vapidKey:
        'BNG1x266t7SCRTpLEeV11BYGsObLLo_C5IavB9XK2KnQ29GC4a-v81VlbpPDwa1YytXFq8j5TEEuYa74Ujr_M3o',
    })
    .then((currentToken: string) => {
      if (currentToken) {
        // console.log('current token for client: ', currentToken)
        setTokenFound(currentToken)
      } else {
        // console.log('No registration token available. Request permission to generate one.')
        setTokenFound('')
      }
    })
    .catch(
      (err: unknown) => err
      // console.log('An error occurred while retrieving token. ', err)
    )
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload: unknown) => {
      resolve(payload)
    })
  })
