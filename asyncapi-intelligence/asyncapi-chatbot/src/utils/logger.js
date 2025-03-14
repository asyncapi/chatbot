const info = (message) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  };
  
  const error = (message) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
  };
  
  module.exports = {
    info,
    error
  };