module.exports = {
  apps : [
      {
        name: "botnet",
        script: "./server.js",
        watch: true,
        env: {
            "IP": "127.0.0.1",
        }
      }
  ]
}
