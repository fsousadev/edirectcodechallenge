# EDirect Code Challenge

This branch is intended only for playing with [Auth Server](https://github.com/fsousadev/AuthServer) meaning security measures and good pratices are not being taken so deployemnt should not happen.

-----------------------------------------------------------------------------------------------------------

Please, follow the next instructions:
 
1. Go to directories Frontend and Backend and run `npm i`

2. Create a `.env` file in the root directory of Backend with this content
```
SERVER_HOSTNAME=127.0.0.1
SERVER_PORT=3001
DATABASE_URL=mongodb+srv://Public:123456Aa@cluster0-gzhtc.mongodb.net/test?retryWrites=true&w=majority
JWTSECRET=rickandmorty
```

3. Run `start_all.bat` to start server and client in your OS default browser
