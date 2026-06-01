import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 'quyosh-tizimi',
    title: 'Quyosh Tizimi: Geliotsentrik Dinamika',
    description: 'Quyosh tizimining shakllanishi, gravitatsion gidrostatik muvozanat va sayyoralar tasnifi.',
    category: 'astronomiya',
    rewardPoints: 100,
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000',
    content: `
## Quyosh Tizimining Gidrostatik Geliotsentrik Dinamikasi

Quyosh tizimi taxminan **4.568 milliard yil oldin** ulkan molekulyar bulutning gravitatsion kollapsi (qulashi) natijasida hosil bo'lgan. Ushbu tizimning markazida Quyosh joylashgan bo'lib, u umumiy massaning taxminan **99.86%** qismini o'zida jamlagan.

### 1. Quyosh - Bizning Termoyadroviy Reaktorimiz
Quyosh yulduzi asosan vodorod (~73%) va geliy (~25%) elementlaridan tashkil topgan. Uning qa'ridagi bosim va harorat (**15 million Kelvin**) shunchalik yuqoriki, u yerda **proton-proton zanjiri** orqali termoyadroviy sintez sirkulatsiyasi sodir bo'ladi. Har soniyada taxminan 600 million tonna vodorod geliyga sintezlanadi va ulkan miqdordagi gamma nurlari ko'rinishida fotonlar ajralib chiqadi. Bu jarayon yulduzda gravitatsion qulashga qarshi turuvchi tashqi radiatsion bosimni hosil qiladi, buni biz **gidrostatik muvozanat** deb ataymiz.

### 2. Sayyoralarning Gravitatsion Tasnifi
Quyosh atrofida aylanuvchi 8 ta yagona asosiy sayyoralar ikkita yirik guruhga tasniflanadi:
* **Yer guruhidagi (Toshli) sayyoralar:** Merkuriy, Venera, Yer va Mars. Ular asosan og'ir metallar va silikat mineral birikmalaridan iborat bo'lib, o'rtacha zichligi yuqori ($3.9 - 5.5 \\text{ g/cm}^3$) va qattiq sirtga ega.
* **Gaz va Muz Gigantlari (Jovian sayyoralar):** Yupiter, Saturn, Uran va Neptun. Yupiter va Saturn asosan vodorod va geliydan iborat gaz gigantlari bo'lsa, Uran va Neptun tarkibida suv muzzasi, ammiak va metall gidridlari yuqori bo'lgan muz gigantlaridir. Ularning barchasi o'zining mustahkam halqa va ko'p sonli tabiiy yo'ldoshlar tizimiga ega.

### 3. Koyper Kamari va Oort Buluti
Tizimning chekkalarida asosan kometa va kashf qilinmagan muzlagan asteroidlar klasterlari saqlanadi. Neptun orbitasidan tashqarida joylashgan **Koyper kamari** mitti sayyoralar (masalan, Pluton) va kometalarning vatani hisoblansa, Quyosh tizimining gravitatsion ta'sir chegarasida joylashgan **Oort buluti** trillionlab muzli ob'ektlar va uzoq davriy kometalarning sferik zaxirasidir.
    `,
    quiz: {
      id: 'quiz-quyosh-tizimi',
      rewardPoints: 150,
      questions: [
        {
          id: 'q1',
          text: 'Quyosh yulduzida qulashga qarshi turuvchi ichki radiatsion bosim va tashqi gravitatsion kuch orasidagi muvozanat qanday ataladi?',
          options: [
            'Termodinamik barqarorlik',
            'Gidrostatik muvozanat',
            'Izotermik sirkulatsiya',
            'Sinergetik singulyarlik'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Quyosh tizimining gravitatsion ta\'sir doirasi chegarasida joylashgan sferik muzli kometa va ob\'ektlar buluti qanday nomlanadi?',
          options: [
            'Koyper kamari',
            'Asteroidlar halqasi',
            'Oort buluti',
            'Lagranj klasteri'
          ],
          correctAnswerIndex: 2
        },
        {
          id: 'q3',
          text: 'Quyosh yadrosidagi termoyadroviy sintez jarayonida vodorod qaysi elementga aylanadi?',
          options: [
            'Uglerod',
            'Geliy',
            'Kislorod',
            'Litiy'
          ],
          correctAnswerIndex: 1
        }
      ]
    }
  },
  {
    id: 'yulduzlar-hayoti',
    title: 'Yulduzlar Evolyutsiyasi va Nukleosintez',
    description: 'Yulduzlarning Jeans beqarorligidan mitti yulduz, neytron yulduzi va qora tuynukgacha bo\'lgan evolyutsion tsikli.',
    category: 'fizika',
    rewardPoints: 120,
    imageUrl: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1000',
    content: `
## Yulduzlar Evolyutsiyasi va Elementlar Nukleosintezi

Yulduzlar - koinotning asosiy kimyoviy elementlar "zavodi" hisoblanadi. Koinotdagi vodorod va geliydan og'irroq bo'lgan barcha metall va biologik elementlar (**uglerod, kislorod, temir**) yulduzlar evolyutsiyasi davomida shakllangan.

### 1. Jinz Beqarorligi va Protostarlar
Yulduzlar tug'ilishi uchun ulkan gaz-chang bulutlarida (Diffuziya tumandliklarida) **Jinz (Jeans) beqarorligi** yuzaga kelishi kerak. Tashqi zarba to'lqinlari (masalan, yaqin atrofdagi Supernova portlashi) ta'sirida bulut massasi gravitatsion bosim ostida toraya boshlaydi. Tushayotgan zarrachalarning kinetik energiyasi yadro haroratini oshiradi va **Protostellar** (yosh yulduzsimon jism) shakllanadi. Harorat 10 million Kelvinga yetganda, asosiy vodorod reaktsiyasi ishga tushadi va yulduz barqaror bosqichga o'tadi.

### 2. Massaga Bog'liq Bo'lgan O'lim Bosqichlari
Yulduzning butun umri va uning so'nggi taqdiri faqat uning **boshlang'ich massasi** bilan belgilanadi:
* **Kichik va o'rta massali yulduzlar (< 8 Solar Mass):** Vodorod tugagach, yulduz kengayib **Qizil gigantga** aylanadi. Geliy uglerodga sintezlangandan so'ng, tashqi qatlamlarini tashlab, sayyoraviy tumandlik hosil qiladi. Uning o'zi esa o'ta zich, faqat elektron degenerativ bosimi hisobiga ushlab turiladigan **Oq mitti (White Dwarf)** yulduzga aylanadi (bu bosqichda Chandrasekhar chegarasi max 1.44 Solar Mass amal qiladi).
* **Massiv yulduzlar (> 8 Solar Mass):** U yadrosida temir elementigacha bo'lgan chuqur sintez bosqichini o'taydi. Yadro og'irlashganda, u o'z gravitatsiyasini ushlab turolmaydi va sekundning ulushida **Supernova (O'ta yangi yulduz)** portlashi yuz beradi. Qolgan yadro o'ta siqilib, neytronlar degenerativ bosimi bilan ushlab turiladigan **Neytron yulduzi** yoki gravitatsion kuchni yutib yuboradigan **Qora tuynuk** hosil qiladi.
    `,
    quiz: {
      id: 'quiz-yulduzlar',
      rewardPoints: 200,
      questions: [
        {
          id: 'q1',
          text: 'Oq mitti yulduzlar o\'z vaznini gravitatsion siqilishga qarshi qaysi kuch yordamida muvozanatda saqlab turadi?',
          options: [
            'Proton termoyadroviy bosimi',
            'Elektronlarning degeneratsiya (aynigan) bosimi',
            'Neytronlarning nuklonik kuchlari',
            'Karkasli elektrostatik tortishish'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Oq mitti yulduzning maksimal massasi chegarasini belgilovchi qoida qanday nomlanadi?',
          options: [
            'Xabbl chegarasi',
            'Chandrasekhar chegarasi (1.44 Solar Mass)',
            'Schwarzschild radiusi',
            'Kepler qonuni'
          ],
          correctAnswerIndex: 1
        }
      ]
    }
  },
  {
    id: 'galaktikalar',
    title: 'Galaktikalar Dinamikasi va To\'qnashuvlar',
    description: 'Somon yo\'li, elliptik va spiral galaktikalar strukturasini aniqlovchi gravitatsion zichlik to\'lqinlari.',
    category: 'kosmologiya',
    rewardPoints: 150,
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1000',
    content: `
## Galaktikalar Dinamikasi va zichlik to'lqinlari nazariyasi

Galaktika - bu yulduzlar, yulduzlararo gazlar, chang, kosmik plazma va ko'zga ko'rinmas **qorong'u moddaning** gravitatsion tizimidir. Koinotda yuz milliardlab galaktikalar guruhlangan.

### 1. Hubble Ketma-ketligi va Spiral Tuzilmalar
Astronom Edvin Xabbl galaktikalarni tashqi ko'rinishi bo'yicha tasniflagan:
* **Spiral galaktikalar (S):** Cho'zilgan spiral yenglariga ega, bizning Somon yo'li hamda Andromeda shunday shaklda. Spiral armlar - gaz zichligi yuqori bo'lgan doimiy aylanuvchi to'lqinlar hisoblanadi. Ularni tushuntirish uchun **zichlik to'lqinlari nazariyasi** qo'llaniladi.
* **Elliptik galaktikalar (E):** Aylanasimon yoki tuxumsimon bo'lib, ularda yangi yulduz hosil bo'lishi to'xtagan va asosan eski, sarg'ish mitti yulduzlardan tashkil toptandir.
* **Noto'g'ri (Irr) galaktikalar:** Aniq geometrik va simmetrik markazga ega bo'lmagan tizimlar.

### 2. Somon Yo'li Markazi: Sagittarius A*
Biz yashayotgan Somon Yo'li diametri taxminan 100 000 yorug'lik yiliga teng bo'lgan spiral galaktikadir. Uning markazida massasi Quyoshdan taxminan **4.1 million marta** katta bo'lgan o'ta og'ir **Sagittarius A*** nomli qora tuynuk joylashgan. Ushbu yadro atrofidagi yulduzlar sekundiga minglab kilometr tezlikda aylanadi, bu esa galaktikamiz markazining kuchli gravitatsiyasini isbotlaydi.

### 3. Somon Yo'li - Andromeda To'qnashuvi
Andromeda galaktikasi bizdan 2.5 million yorug'lik yili uzoqlikda bo'lib, bizga qarab minutiga 110-120 km tezlikda yaqinlashmoqda. Taxminan **4.5 milliard yildan keyin** ushbu ikki yirik spiral galaktika o'zaro gravitatsiyalari ta'sirida ulkan to'qnashuvni boshidan o'tkazadi va natijada yangi, "Milkomeda" deb ko'prik qilingan ulkan elliptik galaktika vujudga keladi.
    `,
    quiz: {
      id: 'quiz-galaktikalar',
      rewardPoints: 250,
      questions: [
        {
          id: 'q1',
          text: 'Somon Yo\'li galaktikamiz markazida joylashgan o\'ta o\'g\'ir va faol qora tuynuk qanday nomlanadi?',
          options: [
            'Cygnus X-1',
            'Sagittarius A*',
            'Messier 87',
            'Kepler-186f'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Galaktikalarning spiral yenglarida yangi yulduzlar paydo bo\'lishini tushuntiruvchi fizik nazariya qaysi?',
          options: [
            'Nisbiylik nazariyasi',
            'Zichlik to\'lqinlari nazariyasi',
            'Gidravlik turbulentlik',
            'Kvant superpozitsiyasi'
          ],
          correctAnswerIndex: 1
        }
      ]
    }
  },
  {
    id: 'qora-tuynuklar',
    title: 'Qora Tuynuklar: Event Horizon va Gidrodinamika',
    description: 'Eynshteynning umumiy nisbiylik nazariyasi, Shvarschild radiusi va gravitatsion vaqt sekinlashishi sirlari.',
    category: 'fizika',
    rewardPoints: 150,
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=1000',
    content: `
## Qora Tuynuklar: Gravitatsion Singulyarlik va Fazoviy Geometriya

Qora tuynuk - koinotning egilgan fazoviy-vaqt sohasidagi o'ta kuchli gravitatsiyaga ega ob'ekti bo'lib, undan hatto koinotdagi eng tez zarracha - **yorug'lik to'lqinlari (fotonlar)** ham chiqib keta olmaydi.

### 1. Shvarschild Radiusi va Singulyarlik
Albert Eynshteynning Umumiy Nisbiylik nazariyasidan foydalanib, nemis fizigi Karl Shvarschild har qanday massaning qora tuynuk holatiga kelish chegarasini, ya'ni **Shvarschild radiusi ($R_s$)** formulasini ishlab chiqdi:
$$R_s = \\frac{2GM}{c^2}$$
Bu yerda $G$ - gravitatsion doimiy, $M$ - ob'ekt massasi, $c$ - yorug'lik tezligi. Agar Yerni uning barcha massasi bilan birga bor-yo'g'i taxminan **9 millimetr** o'lchamgacha siqsak, u qora tuynukga aylanadi. Gravitatsiya markazda cheksiz zichlik nuqtasini - **singulyarlikni** hosil qiladi.

### 2. Event Horizon (Voqealar Gorizonti)
Qora tuynukni o'rab turgan geometrik chegara **Voqealar Gorizonti** deb ataladi. Undan uzoqroqda bo'lgan jism hali qochib ketishi mumkin, biroq ushbu chegaradan o'tilganda, kutilayotgan kosmik jism uchun barcha kelajak koordinatalari qora tuynuk markazidagi singulyarlikka olib boradi. Bu chegarada vaqt cheksiz sekinlashadi (**Gravitatsion vaqt dilatsiyasi**). Tashqaridagi kuzatuvchi uchun voqealar gorizontiga tushayotgan astronavt abadiy "muzlab" qoladi.

### 3. Akkretion Disk va Hawking Radiatsiyasi
Qora tuynuklar ko'rinmas bo'lsa-da, ularni atrofidagi **akkretion disk** - o'ta yuqori tezlikda aylanib, qizib nurlanayotgan gaz quyunlari orqali aniqlash mumkin. Bundan tashqari, Stiven Xoking kashf etgan **Hawking nurlanishi** tufayli qora tuynuklar asta-sekin kvant tebranishlar hisobiga tana massasini yo'qotib, bug'lanib boradi.
    `,
    quiz: {
      id: 'quiz-qora-tuynuklar',
      rewardPoints: 200,
      questions: [
        {
          id: 'q1',
          text: 'Har qanday sferik simmetrik massaning voqealar gorizonti o\'lchamini hisoblaydigan formula va radius chegarasi nima deb ataladi?',
          options: [
            'Eynshteyn koordinatasi',
            'Kepler metrikasi',
            'Shvarschild radiusi',
            'Plank limiti'
          ],
          correctAnswerIndex: 2
        },
        {
          id: 'q2',
          text: 'Qora tuynuk va vaqt o\'rtasidagi munosabatda quyidagilarning qaysi biri to\'g\'ri?',
          options: [
            'Vaqt butunlay sinxron tezlashadi',
            'Voqealar gorizontida vaqt gravitatsion ta\'sir ostida cheksiz sekinlashadi',
            'Fazoda vaqt yo\'nalishini o\'zgartirmaydi',
            'Kvant bog\'lanishi orqali vaqt oqimi to\'xtaydi'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q3',
          text: 'Stiven Xoking qora tuynuklarning kvant effektlari orqali qanday jarayonga uchrashini nazariy isbotladi?',
          options: [
            'Termoyadroviy portlash',
            'Tana massasini yo\'qotib bug\'lanish (Xoking nurlanishi)',
            'Gidrostatik kengayish',
            'Qorong\'u energetik sintez'
          ],
          correctAnswerIndex: 1
        }
      ]
    }
  },
  {
    id: 'katta-portlash',
    title: 'Katta Portlash va Kosmologik Evolyutsiya',
    description: 'Fazoning kengayishi, Xabbl-Lemaytr qonuni va Koinotning Relikt nurlanishi fondi.',
    category: 'kosmologiya',
    rewardPoints: 150,
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=1000',
    content: `
## Katta Portlash va Koinotning Dinamik Kengayishi

Koinot qanday va qachon boshlangan? Bugungi kunda eng ishonchli ilmiy tushuncha **Katta Portlash (Big Bang)** nazariyasi bo'lib, u koinotimizning taxminan **13.78 milliard yil oldin** o'ta issiq va cheksiz zich nuqtadan (singulyarlikdan) boshlanganini ta'kidlaydi.

### 1. Fazo Kengayishi va Hubble-Lemaître Qonuni
Muhim kashfiyot: Katta Portlash - bu mavjud fazo ichidagi portlash emas, balki **fazoning o'zining kengayishidir**. 1929-yilda Edvin Xabbl galaktikalar bizdan uzoqlashayotganini va masofa qanchalik uzoq bo'lsa, tezlik shunchalik yuqoriligini aniqladi (**Hubble-Lemaître qonuni**: $v = H_0 \\cdot d$). Bu qonun koinotimiz faol kengayayotganining va o'tmishda hamma narsa bitta nuqtada bo'lganining isbotidir.

### 2. Kosmik Mikrotolqinli Relikt Nurlanishi (CMB)
Katta portlashdan taxminan 380 000 yil o'tgach, koinot harorati ~3000 Kelvingacha pasaygan. Natijada birinchi marta elektronlar protonlar bilan birikib neytral vodorod atomlarini hosil qilgan (Rekombinatsiya davri) va fotonlar koinot bo'ylab to'siqsiz tarqala boshlagan. Ushbu birinchi fotonlar nuri bugungi kunda **Kosmik Relikt Nurlanishi (CMB)** tarzida mikrotolqinlar diapazonida butun osmondan qayd etiladi. Uning harorati hozirda mutlaq noldan **2.73 Kelvin** yuqori.

### 3. Lambda-CDM modeli va Qorong'u Energiya
Koinot massasining atigi **4.9%** qismi odatiy bariyon modda (atomlar, yulduzlar, biz) dan iborat. Qolgan **26.8%** qismini gravitatsiyani hosil qiluvchi ko'rinmas **Qorong'u modda (Dark Matter)** va koinotning tezlashib kengayishiga sabab bo'layotgan antikuch - **Qorong'u energiya (Dark Energy, ~68.3%)** tashkil etadi. Bu zamonaviy kosmologiyaning **$\Lambda\\text{-CDM}$** (Lambda Cold Dark Matter) standart modelining asosidir.
    `,
    quiz: {
      id: 'quiz-katta-portlash',
      rewardPoints: 200,
      questions: [
        {
          id: 'q1',
          text: 'Katta portlashdan 380 ming yil o\'tib paydo bo\'lgan, bugungi kunda butun osmon fonida qayd etiladigan elektromagnit to\'lqinlar qanday ataladi?',
          options: [
            'Gamma chaqnashlar',
            'Relikt nurlanishi (Cosmic Microwave Background - CMB)',
            'Rentgen fon nurlari',
            'Gravitatsion shovqin'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Koinotning umumiy tarkibi ulushida eng katta ulushga ega bo\'lgan, fazoning tezlashib kengayishiga zamin yaratuvchi omil nima?',
          options: [
            'Bariyon modda',
            'Qorong\'u modda',
            'Qorong\'u energiya (Dark Energy)',
            'Yulduzlararo plazma'
          ],
          correctAnswerIndex: 2
        }
      ]
    }
  },
  {
    id: 'ekzosayyoralar',
    title: 'Ekzosayyoralar va Biomarkerlarni Izlash',
    description: 'Tranzit fotometriyasi, radial tezlik va hayot zonasi (Goldilocks) sharoitlarida hayot izlari.',
    category: 'astronomiya',
    rewardPoints: 100,
    imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=1000',
    content: `
## Ekzosayyoralar va Yerdan Tashqaridagi Biomarkerlar Tahlili

**Ekzosayyora (Exoplanet)** - Quyosh tizimidan tashqaridagi boshqa har qanday begona yulduz atrofida aylanuvchi sayyoradir. Hozirgi kunda ilm-fanda 5000 dan ortiq ekzosayyora kashf etilgan bo'lib, eng asosiy maqsad ularda **biologik hayot** izlarini topishdir.

### 1. Ekzosayyoralar topish metodologiyasi
Sayyoralarning massasi o'zlari aylanadigan yulduzlariga nisbatan juda kichik bo'lgani uchun ularni bevosita teleskopda ko'rish mudhish darajada qiyin. Shuning uchun astronomlar asosan ikki bilvosita metoddan foydalanishadi:
* **Tranzit fotometriyasi (Transit):** Sayyora o'z yulduzi oldidan o'tayotganda yulduz yorug'ligining kuchsiz pasayishi (yorug'lik grafigi pasayish egrisi) qayd etiladi. Bu Kepler va TESS kosmik teleskoplarining eng asosiy kashfiyot usulidir.
* **Radial tezlik metodi (Radial Velocity):** Sayyoraning gravitatsiyasi tufayli yulduz o'z o'qi atrofida biroz tebranadi. Bu esa yulduz spektrining Dopler effekti ostida vaqti-vaqti bilan ko'k va qizil rangga siljishiga sabab bo'ladi.

### 2. Yashash Zonasi (Goldilocks Zone)
Yulduz atrofida sayyora sirtida suyuq holatdagi suv vaqtinchalik mavjud bo'la oladigan masofa diapazoni **Xayot zonasi (Habitable Zone)** yoki **"Oltin soch" (Goldilocks) zonasi** deb ataladi. Agar sayyora yulduzga juda yaqin bo'lsa, suv bug'lanib ketadi; agar juda uzoq bo'lsa, muzlab qoladi.

### 3. Spektroskopik Biomarkerlar tahlili
NASAning James Webb kosmik teleskopi yordamida ekzosayyora atmosferasidan o'tayotgan yulduz nurlarining elektromagnit to'lqinlarini ushlab, ulardagi biomarkerlarni o'rganish mumkin. Havoda **vodorod, metan ($CH_4$), kislorod ($O_2$), suv bug'i ($H_2O$) va karbonat angidrid ($CO_2$)** kabi gazlarning yutilish liniyalari topilsa, bu o'sha olis sayyorada biologik hayot faoliyatining o'ta muhim belgisidir.
    `,
    quiz: {
      id: 'quiz-ekzosayyoralar',
      rewardPoints: 150,
      questions: [
        {
          id: 'q1',
          text: 'Begona sayyora o\'z yulduzi yuzasini to\'sib o\'tganda, yulduz yorug\'ligining vaqtincha pasayishini kuzatish orqali sayyorani aniqlash metodologiyasi nima deyiladi?',
          options: [
            'Gravitatsion mikrolinzalash',
            'Tranzit fotometriyasi',
            'Dopler spektroskopiyasi',
            'Radiometrik skanerlash'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Sayyora sirtida suyuq suv mavjud bo\'lishi va hayot asosi shakllanishi uchun optimal masofadagi yashash hududi qaysi nom bilan mashhur?',
          options: [
            'Eynshteyn maydoni',
            'Goldilocks (Yashash) zonasi',
            'Orbital apogey diapazoni',
            'Issiq Yupiter maydoni'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q3',
          text: 'James Webb kosmik teleskopi ekzosayyoralarda hayot belgilarini izlash uchun asosan qaysi spektral usuldan foydalanadi?',
          options: [
            'Radio nurlanish translyatsiyasi',
            'Tranzit atmosfera spektroskopiyasi',
            'Rentgen nurlari tahlili',
            'Radar interferometriyasi'
          ],
          correctAnswerIndex: 1
        }
      ]
    }
  },
  {
    id: 'gravitatsion-tolqinlar',
    title: 'Gravitatsion To\'lqinlar va Spacetime Tebranishi',
    description: 'Eynshteynning 100 yillik nazariyasi tasdig\'i: LIGO observatoriyasi va neytron yulduzlari to\'qnashuvi.',
    category: 'fizika',
    rewardPoints: 130,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    content: `
## Gravitatsion To'lqinlar: Fazoviy Geometrik Ripples

1916-yilda Albert Eynshteyn o'zining Umumiy Nisbiylik nazariyasida o'ta tez harakatlanuvchi katta massali ob'ektlar fazo-vaqtda xuddi suv yuzasidagi to'lqinlar kabi tebranishlar hosil qiladi, degan gipotezani ilgari surgandi. Ushbu tebranishlar **Gravitatsion to'lqinlar** deb ataladi.

### 1. To'lqin Tabiyati va Fazoning Torayishi
Gravitatsion to'lqinlar yorug'lik tezligida harakat qiladi va yo'l-yo'lakay o'zi o'tgan fazoni navbat bilan siqadi va kengaytiradi. Biroq, bu o'zgarishlar shunchalik mikroskopik darajadaki, uzoq masofadagi qora tuynuklar to'qnashuvidan kelgan to'lqin Yerdagi fazoni bor-yo'g'i proton o'lchamidan **ming marta kichik** miqyosda o'zgartiradi.

### 2. LIGO va tarixiy ochilish (GW150914)
2015-yil 14-sentyabrda **LIGO (Laser Interferometer Gravitational-Wave Observatory)** observatoriyasining ikki ulkan 4 kilometrlik interferometrik vakuum trubalari tarixda birinchi marta gravitatsion to'lqinni (GW150914 kodi ostida) muvaffaqiyatli aniqladi. Ushbu to'lqin Yerga yetib kelishidan 1.3 milliard yil oldin, massalari Quyoshdan 36 va 29 marta katta bo'lgan ikkita qora tuynuk birlashganda fazoga tarqalgan edi. Bu kashfiyot fizika olamida yangi davr - **Gravitatsion astronomiya** davrini ochib berdi.

### 3. Multi-Messenger astronomiyasi
2017-yilda ikkita neytron yulduzining birlashishi ham gravitatsion to'lqinlar, ham dunyodagi oddiy elektromagnit teleskoplar (yorug'lik, yadroviy nurlar) yordamida parallel ravishda aniqlandi. Bu ilm-fanga hodisalarni ham eshitish, ham ko'rish imkonini yaratdi. Koinotning chuqur, zim-ziyo sirlarini o'rganishda gravitatsion to'lqinlar eng kuchli va ideal ko'zoynak hisoblanadi.
    `,
    quiz: {
      id: 'quiz-gravitatsion-tolqinlar',
      rewardPoints: 180,
      questions: [
        {
          id: 'q1',
          text: 'Fazo-vaqt matosining kinetik tebranishlari bo\'lgan gravitatsion to\'lqinlar qanday tezlikda harakatlanadi?',
          options: [
            'Tovush tezligida',
            'Yorug\'lik tezligida ($c$)',
            'Cheksiz yuqori tezlikda',
            'Sayyora orbital tezligida'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Tarixda birinchi marta gravitatsion to\'lqinlarni muvaffaqiyatli qayd etgan lazer interferometri laboratoriyasi qanday nomlanadi?',
          options: [
            'CERN',
            'LIGO',
            'Hubble Space Lab',
            'James Webb spektr'
          ],
          correctAnswerIndex: 1
        }
      ]
    }
  },
  {
    id: 'mars-giri',
    title: 'Mars Paleogidrologiyasi va Kelajak Kosmik Koloniyalari',
    description: 'Qizil sayyorada qadimgi suv oqimlari gidravlikasi, magnetosfera degradatsiyasi va terraformatsiya fizikasi chalinchlar.',
    category: 'astronomiya',
    rewardPoints: 110,
    imageUrl: 'https://images.unsplash.com/photo-1612892483236-42d68a57623d?auto=format&fit=crop&q=80&w=1000',
    content: `
## Mars Paleogidrologiyasi va Kelajak Kolonizatsiyasi Muammolari

Mars bugungi kunda o'ta sovuq (o'rtacha harorat $-63^\\circ\\text{C}$), juda siyrak karbonat angidridli atmosferaga ega qumli cho'l hisoblanadi. Biroq, NASA roverlarining so'nggi ilmiy tadqiqotlari shuni ko'rsatadiki, Marsning o'tmishida hamma narsa butunlay boshqacha bo'lgan.

### 1. Mars Paleogidrologiyasi: Suv Izlari
Curiosity va Perseverance roverlarining Gale hamda Jezero kraterlarida olib borgan geologik qazishmalari qadimgi daryolar to'kilgan deltalarni va ko'l loyqalarini aniqladi. Tuproq tarkibidagi gil minerallari, gidratlangan silikatlar va sulfatlar faqatgina suyuq suvning **millionlab yillar** davomida faol harakat qilgani natijasida paydo bo'lishi mumkin. Marsda qachonlardir Yerdagi kabi iliq okean va qalin atmosfera qatlami mavjud bo'lgan.

### 2. Atmoferaning Yo'qolishi: Dinamo Effektining To'xtashi
Nima uchun Mars global suv manbalarini yo'qotdi? Javob uning geologik hayotida:
* Mars o'lchami Yerga nisbatan kichik bo'lgani uchun uning yadrosi tezroq sovub qolgan.
* Yadro sovishi natijasida faol suyuq magnetik oqim to'xtadi va sayyoradagi global **geomagnit dinamo generatori** yo'qoldi.
* Magnit maydoni kamaygach, Mars Quyoshdan kelayotgan o'ta kuchli proton va ion shamollari hujumiga himoyasiz qoldi. Quyosh shamollari sayyoradagi qalin atmosferani sekundiga yuzlab grammlab uchirib, koinotga purkadi. Atmosfera bosimi kamayishi bilan barcha ochiq suvlar bug'lanib koinot fazosga g'oyib bo'lgan, qolgani esa sirt ostidagi abadiy muzloqlarga (regolit osti muzliklariga) aylanib ketgan.

### 3. Terraformatsiya: Fizik muammolar
Kelajakda insoniyatni Marsga koloniya sifatida joylashtirishdagi asosiy fizik to'siqlar:
* **Siyrak atmosfera:** Insoniy nafas olish va sirtda suyuq suvni stabil ushlash uchun bosim yetarli emas (Yer bosimining 1% gacha).
* **Magnit maydonining yo'qligi:** Kosmik nurlanish va Quyosh radiatsiyasi sirtdagi barcha ozuqa va hujayralarni vayron qiladi.
* **Perchloratlar muammosi:** Mars tuprog'i inson va o'simliklar uchun o'ta zaharli xlor organik tuzlaridan tuzilgandir.
    `,
    quiz: {
      id: 'quiz-mars',
      rewardPoints: 150,
      questions: [
        {
          id: 'q1',
          text: 'Mars nima sababdan o\'z magnit maydoni (magnetosfera) himoyasi va geomagnit tizimini butunlay yo\'qotgan?',
          options: [
            'Asteroidlar urilishi sababli orbitasini o\'zgartirgan',
            'Suyuq yadroning sovishi tufayli ichki geomagnit dinamo efekti to\'xtagan',
            'Quyosh chaqnashlari yadroni to\'xtatib qo\'ygan',
            'Suv resurslarining bug\'lanib tugashi bilan qutblangan'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'q2',
          text: 'Mars qa\'rida daryo ko\'llari millionlab yillar davomida mavjud bo\'lganining eng katta geologik asosi qaysi ruda va minerallar topilishi bilan isbotlangan?',
          options: [
            'Gidratlangan gil guruhlari va cho\'kindi gillari',
            'Vodorod dioksid gazlari',
            'Toshko\'mir va ruda jinslari',
            'Faol vulqon kullari'
          ],
          correctAnswerIndex: 0
        },
        {
          id: 'q3',
          text: 'Mars sirtidagi tuproqda joylashgan, inson terisi va organik o\'simliklar uchun mutlaq zaharli hisoblangan tuzlar qanday nomlanadi?',
          options: [
            'Kalsiy karbonatlar',
            'Natriy sulfatlar',
            'Perxloratlar (Perchlorates)',
            'Gidrogidridlar'
          ],
          correctAnswerIndex: 2
        }
      ]
    }
  }
];
