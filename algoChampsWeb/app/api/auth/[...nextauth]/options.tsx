import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider  from "next-auth/providers/credentials";
//#keep .env.local in your dev environemnt to be kept secret/. Automaticaly goes to .gitignore

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-username'
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-password'
        }
      },
      async authorize(credentials) {
        //just hard code user info for now to test, but would run on the server to get user info from DB
        console.log('Authorize function called', credentials);
        console.log('GitHub ID:', process.env.GITHUB_ID);
				console.log('GitHub Secret:', process.env.GITHUB_SECRET);
        const user = { id: '29', name: 'Jerry', password: 'nextauth' }
        if (credentials?.username === user.name &&
          credentials?.password === user.password) {
          return user; 
        } else {
          return null
        }
      },
    })
	],
	 pages: {
	 	signIn: '/default-room',//redirects user after signing in using github
	 },
};