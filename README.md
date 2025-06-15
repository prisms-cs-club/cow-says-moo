# Cow Says Moo

[Cow Says Moo](https://github.com/prisms-cs-club/cow-says-moo) is a web project developed by the [Computer Science Club](https://github.com/prisms-cs-club) of [PRISMS](https://prismsus.org/) for displaying House activities, scores, schedules, etc.

The project is developed with [Svelte](https://svelte.dev/), a front-end framework for webpages. Data of House events and scores are stored in [Firebase](http://firebase.google.com/).

## How to Run 'Cow Says Moo'?

Before you start, make sure you have a google developer account which can be used for authorization. For more information, please see [Google OAuth](https://developers.google.com/identity/protocols/oauth2#1.-obtain-oauth-2.0-credentials-from-the-dynamic_data.setvar.console_name.).

First, clone this repo to your computer.

```bash
git clone https://github.com/prisms-cs-club/cow-says-moo
```

Create a file named `.env` in the project's root folder. Put the Google OAuth API Keys into the file.

```bash
GOOGLE_CLIENT_ID=<Your-Google-Client-ID>
GOOGLE_CLIENT_SECRET=<Your-Google-Client-Secret>
AUTH_SECRET=<Your-Auth-Secret>
```

Then, run command:

```bash
npm run dev
```

Which should launch a server on your local computer. You can then access the webpage in your browser with the link printed on your terminal.

## Project Structure

- `src/`: Source code
- `static/`: Static resources
