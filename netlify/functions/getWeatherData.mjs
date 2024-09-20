export default async (request, context) => {
  const apiKey = process.env.API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=London,UK&appid=${apiKey}&units=metric`
  );
  const data = await res.json();

  return new Response(JSON.stringify({ message: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
