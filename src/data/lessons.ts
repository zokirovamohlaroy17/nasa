import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 'quyosh-tizimi',
    title: 'Quyosh Tizimi: Bizning Uyimiz',
    description: 'Quyosh va uning atrofidagi sayyoralar haqida asosiy ma\'lumotlar.',
    category: 'astronomiya',
    rewardPoints: 100,
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000',
    content: `
## Quyosh Tizimi Haqida

Quyosh tizimi - bu Quyosh va uning atrofida aylanuvchi barcha samoviy jismlar majmuasidir. U taxminan 4.6 milliard yil oldin ulkan molekulyar bulutning gravitatsion qulashi natijasida paydo bo'lgan.

### 1. Quyosh - Bizning Yulduzimiz
Quyosh tizimi massasining 99.8 foizini Quyosh tashkil etadi. U asosan vodorod va geliydan iborat bo'lib, o'zida termoyadroviy sintez jarayoni orqali energiya ishlab chiqaradi.

### 2. Sayyoralar
Quyosh tizimida 8 ta asosiy sayyora mavjud:
* **Ichki sayyoralar (Toshli):** Merkuriy, Venera, Yer va Mars.
* **Tashqi sayyoralar (Gaz gigantlari):** Yupiter va Saturn.
* **Muz gigantlari:** Uran va Neptun.

### 3. Kichik jismlar
Bundan tashqari, asteroidlar kamari (Mars va Yupiter o'rtasida), Koyper kamari va ko'p sonli kometalar ham mavjud.
    `,
    quiz: {
      id: 'quiz-quyosh-tizimi',
      rewardPoints: 150,
      questions: [
        {
          id: 'q1',
          text: 'Quyosh tizimi massasining necha foizini Quyosh tashkil etadi?',
          options: ['50%', '75%', '90%', '99.8%'],
          correctAnswerIndex: 3
        },
        {
          id: 'q2',
          text: 'Qaysi sayyora "Qizil sayyora" deb ataladi?',
          options: ['Venera', 'Mars', 'Merkuriy', 'Saturn'],
          correctAnswerIndex: 1
        },
        {
          id: 'q3',
          text: 'Eng katta sayyora qaysi?',
          options: ['Yer', 'Neptun', 'Yupiter', 'Saturn'],
          correctAnswerIndex: 2
        }
      ]
    }
  },
  {
    id: 'yulduzlar-hayoti',
    title: 'Yulduzlar Qanday Tug\'iladi va O\'ladi?',
    description: 'Yulduzlarning evolyutsiyasi: tumandliklardan qora tuynuklargacha.',
    category: 'fizika',
    rewardPoints: 120,
    imageUrl: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1000',
    content: `
## Yulduzlar Evolyutsiyasi

Yulduzlar - bu koinotning asosiy energiya manbalari. Ular millionlab va hatto milliardlab yillar davomida yashaydi.

### 1. Tug'ilish
Yulduzlar "Nebula" (Tumandlik) deb ataladigan ulkan chang va gaz bulutlarida tug'iladi. Gravitatsiya bu gazlarni siqadi va natijada "Protostellar" (Yulduzsimon jism) paydo bo'ladi.

### 2. Asosiy Ketma-ketlik
Yulduz o'z yadrosida vodorodni geliyga aylantira boshlaganda, u barqaror holatga o'tadi. Quyosh hozirda aynan shu bosqichda.

### 3. O'lim Bosqichlari
Yulduzning massasiga qarab, uning o'limi turlicha bo'lishi mumkin:
* **Kichik va o'rta yulduzlar:** Qizil gigant bo'lib, keyin Oq mitti (White Dwarf) ga aylanadi.
* **Massiv yulduzlar:** Supernova portlashi bilan tugaydi va ortidan Neytron yulduzi yoki **Qora tuynuk** qoldiradi.
    `,
    quiz: {
      id: 'quiz-yulduzlar',
      rewardPoints: 200,
      questions: [
        {
          id: 'q1',
          text: 'Yulduzlar qayerda tug\'iladi?',
          options: ['Qora tuynuklarda', 'Nebula (Tumandlik)larda', 'Galaktika markazida', 'Sayyoralar ichida'],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Eng massiv yulduzlar portlashidan keyin nima paydo bo\'lishi mumkin?',
          options: ['Qora tuynuk', 'Oq mitti', 'Sayyora', 'Oy'],
          correctAnswerIndex: 0
        }
      ]
    }
  },
  {
    id: 'galaktikalar',
    title: 'Galaktikalar: Koinot Orollari',
    description: 'Somon yo\'li va koinotdagi boshqa ulkan tuzilmalar haqida.',
    category: 'kosmologiya',
    rewardPoints: 150,
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1000',
    content: `
## Galaktikalar

Galaktika - bu yulduzlar, gazlar, chang va qorong'u moddaning gravitatsiya yordamida bog'langan ulkan tizimidir.

### 1. Galaktika turlari
Edvin Xabbl galaktikalarni shakliga qarab uch guruhga bo'lgan:
* **Spiral galaktikalar:** Bizning Somon yo'li aynan shunday shaklda.
* **Elliptik galaktikalar:** Tuxumsimon shaklda, ko'pincha eski yulduzlardan iborat.
* **Noto'g'ri (Irregular) galaktikalar:** Aniq shaklga ega bo'lmagan galaktikalar.

### 2. Somon Yo'li
Bizning galaktikada taxminan 100-400 milliard yulduz bor. Uning markazida "Sagittarius A*" deb ataladigan ulkan qora tuynuk joylashgan.

### 3. Andromeda
Andromeda bizga eng yaqin yirik galaktikadir. Taxminan 4 milliard yildan keyin Somon yo'li va Andromeda to'qnashib, yangi galaktika hosil qiladi.
    `,
    quiz: {
      id: 'quiz-galaktikalar',
      rewardPoints: 250,
      questions: [
        {
          id: 'q1',
          text: 'Bizning galaktika qanday nomlanadi?',
          options: ['Andromeda', 'Somon yo\'li', 'M87', 'Katta Magellan buluti'],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Somon yo\'li qanday turdagi galaktika?',
          options: ['Elliptik', 'Noto\'g\'ri', 'Spiral', 'Kvadrat'],
          correctAnswerIndex: 2
        }
      ]
    }
  }
];
