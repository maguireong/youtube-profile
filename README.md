# Youtube Profile
> Special shout out to Brittany and her awesome [Spotify Profile](https://spotify-profile.herokuapp.com/) which provided me with the inspiration to create this
> A web app for visualizing personalized Youtube data

Built with a bunch of things, but to name a few:

- [Youtube Web API](https://developers.google.com/youtube/v3)
- [Create React App](https://github.com/facebook/create-react-app)
- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Setup

1. [Register a Youtube App](https://console.cloud.google.com/apis/dashboard) and add `http://localhost:3000/api/callback` as a Redirect URI in the app settings
1. Create an `.env` file in the root of the project based on `example.env`
1. `yarn install`
1. `yarn run dev`

## Deploying to Heroku

1. Create new heroku app

   ```bash
   heroku create app-name
   ```

2. Set Heroku environment variables

   ```bash
   heroku config:set CLIENT_ID=XXXXX
   heroku config:set CLIENT_SECRET=XXXXX
   heroku config:set REDIRECT_URI=https://app-name.herokuapp.com/callback
   heroku config:set FRONTEND_URI=https://app-name.herokuapp.com
   ```

3. Push to Heroku

   ```bash
   git push heroku master
   ```

4. Add `http://app-name.herokuapp.com/api/callback` as a Redirect URI in the youtube application settings

5. Once the app is live on Heroku, hitting http://app-name.herokuapp.com should be the same as hitting http://localhost:3000
