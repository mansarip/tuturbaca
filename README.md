# Projek : Tutur Baca

![Screenshot](/docs/screen.png)

Oleh: Luqman B. Shariffudin

[TOC]

## Kenapa?

Apabila saya melihat anak saya membaca dari buku, saya perasan bahawa dia seolah-olah hanya 'menghafal' suku kata tanpa memahami konteks ayatnya.

Walaupun anak saya sudah pandai bercakap dan kadang-kadang terdengar petah, dia masih menghadapi kesukaran untuk memahami makna penuh semasa membaca.

Jadi saya berfikir, mengapa kita tidak mencuba mengajarnya untuk 'membaca' berdasarkan apa yang dia ucapkan?

Dengan cara ini, dia akan memahami bahawa apa yang dia tuturkan sebenarnya dieja dengan cara yang tertentu. Ini akan membantunya menangkap keseluruhan perkataan secara visual, berbanding hanya suku kata demi suku kata.

## Development

### Stack

- React
- Tailwind CSS
- Vite
- Hono (untuk back-end server)

### Flow Speech-to-text

1. Pengguna menekan butang "Rakam Suara".
2. Hasil rakaman, yang berbentuk Blob, akan dimuat naik ke back-end melalui API.
3. Kemudian, back-end akan menghantar fail tersebut untuk ditranskripsi menggunakan Whisper API dari OpenAI.
4. Whisper API akan mengembalikan hasil transkripsi dalam bentuk teks ke back-end.
5. Back-end akan menghantar respons ke UI.
6. Hasil transkripsi akan dipaparkan pada skrin.

### Kenapa ada back-end?

Sebab nak lindungi *secret key* OpenAI dari dicuri dan disalah guna oleh sesiapa.

### Local Development

Projek ini menggunakan **Bun** untuk development. Pastikan ada sudah install Bun untuk mula.

[menyusul kemudian...]

## Deployment

Bahagian ni kalau nak tahu kena bayar 😏

## Penutup

Tidak ada yang saya harapakan melainkan manfaat untuk orang lain. Baik anak-anak atau mereka yang sedang belajar membaca, atau pun para developer yang sedang memahami projek ini.

Jika ada sumbangan idea, atau ingin menyumbang dari segi pembangunan, boleh hantarkan PR dan kita boleh sama-sama tengok nanti.

Terima kasih.
