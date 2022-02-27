module.exports = {
  apps : [
      {
        name: "botnet",
        script: "./server.js",
        instances: 1,
        watch: true,
        env: {
            "IP": "168.119.96.183",
            "NODE_ENV": "development"
        }
      }
  ]
}
