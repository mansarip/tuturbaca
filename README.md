# Projek : Tutur Baca

![Screenshot](/docs/screen.png)

Oleh: Luqman B. Shariffudin

## Kandungan
<!-- TOC start -->
* [Kenapa?](#kenapa)
* [Development](#development)
    + [Stack](#stack)
    + [Flow Speech-to-text](#flow-speech-to-text)
    + [Kenapa ada back-end?](#kenapa-ada-back-end)
    + [Local Development](#local-development)
* [Deployment](#deployment)
* [Penutup](#penutup)
<!-- TOC end -->

<!-- TOC --><a name="kenapa"></a>
## Kenapa?

Apabila saya melihat anak saya membaca dari buku, saya perasan bahawa dia seolah-olah hanya 'menghafal' suku kata tanpa memahami konteks ayatnya.

Walaupun anak saya sudah pandai bercakap dan kadang-kadang terdengar petah, dia masih menghadapi kesukaran untuk memahami makna penuh semasa membaca.

Jadi saya berfikir, mengapa kita tidak mencuba mengajarnya untuk 'membaca' berdasarkan apa yang dia ucapkan?

Dengan cara ini, dia akan memahami bahawa apa yang dia tuturkan sebenarnya dieja dengan cara yang tertentu. Ini akan membantunya menangkap keseluruhan perkataan secara visual, berbanding hanya suku kata demi suku kata.

<!-- TOC --><a name="development"></a>
## Development

<!-- TOC --><a name="stack"></a>
### Stack

- React
- Tailwind CSS
- Vite
- Hono (untuk back-end server)

<!-- TOC --><a name="flow-speech-to-text"></a>
### Flow Speech-to-text

1. Pengguna menekan butang "Rakam Suara".
2. Hasil rakaman, yang berbentuk Blob, akan dimuat naik ke back-end melalui API.
3. Kemudian, back-end akan menghantar fail tersebut untuk ditranskripsi menggunakan Whisper API dari OpenAI.
4. Whisper API akan mengembalikan hasil transkripsi dalam bentuk teks ke back-end.
5. Back-end akan menghantar respons ke UI.
6. Hasil transkripsi akan dipaparkan pada skrin.

<!-- TOC --><a name="kenapa-ada-back-end"></a>
### Kenapa ada back-end?

Sebab nak lindungi *secret key* OpenAI dari dicuri dan disalah guna oleh sesiapa.

<!-- TOC --><a name="local-development"></a>
### Local Development

Projek ini menggunakan **Bun** untuk development.

Pastikan ada sudah install Bun untuk mula: https://bun.sh/docs/installation

Git clone projek ini ke local:

```
git clone git@github.com:mansarip/tuturbaca.git
```

Masuk ke folder projek dan install segala dependencies:

```
cd tuturbaca
bun install
```

Cipta `.env` file untuk letak OpenAI secret key. Dalam file `.env` tersebut:

```
OPENAI_KEY=sk-proj-XXXXXXXXXXXXXXXXX
```

(*Ganti `sk-proj-XXXXXXXXXXXXXXXXX` dengan secret key anda.*)

Mulakan server untuk development:

```
bun run dev
```

Boleh buka browser dan pergi ke:

```
http://localhost:5174
```

**Selesai**.

Nota: Command `bun run dev` akan jalankan kedua-dua server untuk front-end dan back-end (Hono). Anda boleh lihat dalam `package.json` kalau perlu *run* server secara individu:

```
bun run dev:fe #vite
bun run dev:be #hono
```

<!-- TOC --><a name="deployment"></a>
## Deployment

Bahagian ni kalau nak tahu kena bayar.

<!-- TOC --><a name="penutup"></a>
## Penutup

Tidak ada yang saya harapakan melainkan manfaat untuk orang lain. Baik anak-anak atau mereka yang sedang belajar membaca, atau pun para developer yang sedang memahami projek ini.

Jika ada sumbangan idea, atau ingin menyumbang dari segi pembangunan, boleh hantarkan PR dan kita boleh sama-sama tengok nanti.

Terima kasih.
