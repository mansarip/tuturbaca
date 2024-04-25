import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.get("/", (c) => c.text("Hah! Buat apa tu?!"));

app.post("/upload", async (c) => {
  const body = await c.req.parseBody();
  const formData = new FormData();
  formData.append("file", body["file"], "audio.mp4");
  formData.append("model", "whisper-1");
  formData.append("response_format", "text");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.OPENAI_KEY,
    },
    body: formData,
  });

  if (!res.ok) {
    c.status(500);
    return c.json({
      success: false,
      messsage: "Transcribe failed!",
      raw: await res.json(),
    });
  }

  let resultText = (await res.text()) ?? "";

  if (resultText === "") {
    c.status(500);
    return c.text("Maaf, proses audio gagal! Sila cuba sekali lagi.");
  }

  return c.text(resultText);
});

export default {
  port: 3001,
  fetch: app.fetch,
};
