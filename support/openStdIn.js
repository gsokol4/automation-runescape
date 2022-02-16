const process = require('process')

// Begin reading from stdin so the process does not exit.
process.stdin.resume()

process.on('SIGINT', () => {
  process.exit()
})

// Using a single function to handle multiple signals
function handle (signal) {
  console.log(`Received ${signal}`)
}

process.on('SIGINT', handle)
process.on('SIGTERM', handle)
