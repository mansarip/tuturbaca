# Projek : Tutur Baca

![Screenshot](/docs/screen.png)

Oleh: Luqman B. Shariffudin

## Kandungan

<!-- TOC start -->

- [Kenapa?](#kenapa)
- [Limitasi](#limitasi)
- [Development](#development)
  - [Stack](#stack)
  - [UI/UX](#ui-ux)
  - [Flow Speech-to-text](#flow-speech-to-text)
  - [Kenapa ada back-end?](#kenapa-ada-back-end)
  - [Local Development](#local-development)
- [Deployment](#deployment)
- [Penutup](#penutup)
<!-- TOC end -->

<!-- TOC --><a name="kenapa"></a>

## Kenapa?

Apabila saya melihat anak saya membaca dari buku, saya perasan bahawa dia seolah-olah hanya 'menghafal' suku kata tanpa memahami konteks ayatnya.

Walaupun anak saya sudah pandai bercakap dan kadang-kadang terdengar petah, dia masih menghadapi kesukaran untuk memahami makna penuh semasa membaca.

Jadi saya berfikir, mengapa kita tidak mencuba mengajarnya untuk 'membaca' berdasarkan apa yang dia ucapkan?

Dengan cara ini, dia akan memahami bahawa apa yang dia tuturkan sebenarnya dieja dengan cara yang tertentu. Ini akan membantunya menangkap keseluruhan perkataan secara visual, berbanding hanya suku kata demi suku kata.

<!-- TOC --><a name="limitasi"></a>

## Limitasi

|               | Mobile       | Chrome | Firefox            | Safari |
| ------------- | ------------ | ------ | ------------------ | ------ |
| Paparan       | ⚠️Tak sesuai | ✅ OK  | ✅ OK              | ✅ OK  |
| Rakaman Suara | Bergantung   | ✅ OK  | ⁉️ Ada delay start | ❌ Tak Jadi  |

<!-- TOC --><a name="development"></a>

## Development

Projek ini bergantung penuh pada speech-to-text API untuk berfungsi. Sekarang ini dah banyak penyedia yang menawarkan API untuk speech-to-text.

Secara spesifiknya, saya perlukan servis yang boleh kendali Bahasa Malaysia dengan baik. Saya sudah cuba beberapa API antaranya dari Google, OpenAI dan beberapa lagi yang saya tidak berapa ingat.

Jadi saya memilih untuk teruskan dengan OpenAI (produk yang berkaitan untuk ini adalah 'Whisper'). Antara sebabnya ialah ia boleh kendali Bahasa Malaysia pelbagai dialek/pasar dengan baik. Dan juga boleh buat prompt dengan GPT jika perlu.

<!-- TOC --><a name="stack"></a>

### Stack

- React
- Tailwind CSS
- Vite
- Hono (untuk back-end server)

<!-- TOC --><a name="ui-ux"></a>

### UI/UX

Projek ini adalah _single page app_. Satu muka sahaja, satu route sahaja. Dia lebih kepada interaktif untuk satu page itu sahaja.

Lagi benda penting yang saya perlu nyatakan ialah, **projek ini memang dibuat untuk digunakan di web browser pada desktop**. Jadi memang saya tiada rancangan setakat ini untuk menjadikannya responsive.

Dari segi grafik, saya mengambil ilham dari pelbagai sumber dari Pinterest dengan carian "kids game ui design". Jadi rupa bentuk button, background, ilustrasi dan segala elemen yang ada sebenarnya kearah bentuk "game UI".

Pemilihan jenis font pula dipengaruhi oleh reka bentuk huruf "a" kecil. Saya lebih cenderong untuk perkenalkan kepada anak-anak bentuk "a" yang bulat berbanding "a" yang bersimpul.

Ini kerana bagi saya, sebahagian mereka ada kekeliruan bila mana lihat huruf yang sama tapi bentuk berbeza. Dan ada yang teragak-agak (tidak yakin) bila baca kerana keliru.

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

Sebab nak lindungi _secret key_ OpenAI dari dicuri dan disalah guna oleh sesiapa. Saya hanya guna satu (1) endpoint sahaja, jadi mungkin anda tertanya kenapa tak guna Edge atau mana-mana serverless provider?

Entahlah. Mungkin antara sebabnya ialah projek ini perlukan Bun runtime.

Antara sebab lain adalah, walaupun hanya satu endpoint yang saya guna, tapi ia melibatkan FormData dan proses memuat-naik fail (audio/blob). Dari client-side -> endpoint -> Whisper.

Jadi saya rasa jika saya teruskan dengan serverless dan servis seumpamanya, mungkin saya akan banyak habiskan masa hanya untuk _configure_ dan _setting up environment_.

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

(_Ganti `sk-proj-XXXXXXXXXXXXXXXXX` dengan secret key anda._)

Mulakan server untuk development:

```
bun run dev
```

Boleh buka browser dan pergi ke:

```
http://localhost:5174
```

**Selesai**.

Nota: Command `bun run dev` akan jalankan kedua-dua server untuk front-end dan back-end (Hono). Anda boleh lihat dalam `package.json` kalau perlu _run_ server secara individu:

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
