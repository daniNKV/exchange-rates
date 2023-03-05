exports.handler = async function (event, context) {
    try {
      const value = process.env.ABSTRACT_KEY;
      const URL = `https://exchange-rates.abstractapi.com/v1/historical?api_key=${value}`
      
      return {
        statusCode: 200, 
        body: JSON.stringify({ URL }),
      };
    } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error }),
        };
  };
}