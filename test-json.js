async function test() {
  let response = { text: async () => "<html>", status: 200, ok: true };
  let data;
  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : {};
  } catch (err) {
    throw new Error(`Server returned an invalid response. Status: ${response.status}`);
  }
}
test().catch(e => console.log(e.message));
