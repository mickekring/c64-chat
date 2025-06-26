# C64 Chat

## What is this?
Meet Vic - your AI companion who genuinely believes it's still 1985. Ask about the future? "Syntax error. It's 1985. I may be smart, but I'm not a time traveller." Vic knows everything about 80s pop culture, C64 games, and will chat with you in that classic retro style - complete with ALL CAPS and a maximum of 2 sentences at a time.

This is a loving recreation of the classic C64 experience, complete with:

- The iconic blue screen and chunky pixels
- BASIC V2 commands that'll make you nostalgic
- A blinking cursor that screams "READY."
- And... an AI assistant named Vic who's stuck in 1985!

![c64_1](https://github.com/user-attachments/assets/b977521b-3af0-4fc9-bb91-93a95f352c81)

## Features
- Almost an authentic C64 Experience: From the boot screen to the almost character-perfect font
- Password Protected: Because even in 1985, we cared about security
- AI-Powered Chat: Powered by OpenAI, but don't tell Vic - they think they're just a very smart BASIC program
- Retro Commands: LIST, RUN, HELP
Multi-language: Vic speaks both English and Swedish (very progressive for 1985!)

![c64_2](https://github.com/user-attachments/assets/086189ca-61c9-476b-976e-ff391628f883)

## How to Run This Time Machine

1. Clone the repo (that's "copy the floppy disk" in 1985 speak)  
git clone https://github.com/mickekring/c64-chat.git  
cd c64-chatbot  

2. Install dependencies (or "load the programs")  
npm install

3. Set up your environment  
Create a .env file:  
OPENAI_API_KEY=your-openai-api-key-here  
C64_PASSWORD=your-password-here  
PORT=5555  
NODE_ENV=production  

5. Start BOTH servers (yes, both - it's like having a disk drive AND a datasette!)  
|| Terminal 1 - Start the frontend  
npm start  
  
|| Terminal 2 - Start the backend  
node server.mjs  

6. Boot up the chat:
- Type LOAD CHAT and press Enter
- Enter your password
- Start chatting like it's 1985!

## Commands
In BASIC mode:    
  
LOAD CHAT - Start the AI chat program  
LIST - Show the "program"  
HELP - Get help  
RUN - Try to run the program (spoiler: it won't work)  
  
In Chat mode:  
  
Just type naturally - Vic will respond  
Type EXIT to quit back to BASIC  
  
## Pro Tips
  
Vic loves talking about C64 games - try asking about Impossible Mission or The Last Ninja!  
Don't mention smartphones, the internet, or anything post-1985 (you'll get a syntax error)  
For authentic vibes, try asking Vic to draw ASCII art  
Everything is in CAPS - just like the real C64!  

## Why Though?
Because sometimes you need to slow down and remember when computers were simple, when 64K of RAM was massive, and when the future was full of endless possibilities. Plus, it's just really fun to pretend it's 1985 again.  

## Credits
Built with love, React, Express, and a healthy dose of nostalgia. Powered by OpenAI's GPT (shh, don't tell Vic).  
Remember: The future was 8-bit, and it was glorious.

