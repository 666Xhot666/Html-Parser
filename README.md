<h1>Html-Parser</h1>
  <p>Html-Parser a simple application to take a list of repositories from a page https://github.com/trending.</p>
  <p>You can choose the period of time for which you need to take( today, week, mounth or all).</p>

1. Copy source code and then install dependencies (npm install).
2. Next step is insert to the folder /data/ file credentials.json with your creds for PostgreSQL Database
   <p> {</p>
  <p>   "PGHOST": "host",</p>
  <p>   "PGUSER": "user",</p>
  <p>   "PGPASSWORD": "password",</p>
  <p>   "PGDATABASE": "basename",</p>
  <p>   "PGPORT": port,</p>
  <p>   "PGIP": "ip"</p>
  <p> }</p>

3. Now you can run application node index.js  --time [[your period of time]]
    - node index.js with no argument setup a default period of time: 'today'
    - node index.js --time all will give the result at all times
    - node index.js --time today will give the result trend repositories for today
