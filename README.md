# Building Spotify with Next.js+ tailwindcss + Recoil

This project is based on youtube tutorial https://www.youtube.com/watch?v=3xrko3GpYoU, which allows user to control player on Spotify Application

## What you need:

1. Spotify premium account
2. Developer account from https://developer.spotify.com/

## Step 1: Clone this project and create `.env.local`

`.env.local`

```
NEXTAUTH_URL=[your url]
NEXT_PUBLIC_CLIENT_ID=[your client id from https://developer.spotify.com/]
NEXT_PUBLIC_CLIENT_SECRET=[your client secret from https://developer.spotify.com/]
JWT_SECRET=[your jwt secret]
```

## Step 2: add https://[your url]/api/auth/callback/spotify to https://developer.spotify.com/

## Step 3: Start the project

`yarn`

```
Development: yarn dev
Production": yarn start
Build : yarn build
```

`npm`

```
Development: npm run dev
Production": npm start
Build : npm run build
```
