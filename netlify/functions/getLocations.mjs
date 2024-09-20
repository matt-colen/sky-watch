export default async (request) => {
  const { query } = request.queryStringParameters;
  const apiKey = process.env.API_KEY;

  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );
    const data = await res.json();
    return new Response(JSON.stringify({ message: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
