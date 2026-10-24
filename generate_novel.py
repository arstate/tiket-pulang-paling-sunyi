import os
import json

os.makedirs("src/data/novels/misteri-mv-ibukota", exist_ok=True)

chapters_data = [
    {
        "id": 1,
        "number": "Bab 1",
        "title": "Undangan Berampel Hitam",
        "fullTitle": "BAB 1: Undangan Berampel Hitam",
        "excerpt": "Sebuah amplop tebal berampel hitam dengan inisial perak M.V. mendarat di meja kerja Arga, membuka kembali misteri masa lalu di ibukota.",
        "bgmId": "bgm-ch1",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Pagi di Surabaya menyambut dengan terik matahari yang memantul di atas aspal basah sisa hujan semalam. Di ruang kerja studio mini milik Arga, aroma kopi Toraja mengepul dari cangkir keramik putih yang diletakkan Fira dengan lembut di sebelah tablet grafis tempat Arga sedang merampungkan ilustrasi pesanan klien."
            },
            {
                "type": "paragraph",
                "html": "Namun, bukan deru mesin cetak atau pesanan desain yang merampas napas Arga pagi ini. Di antara tumpukan surat tagihan lama dan brosur pameran seni, sebuah amplop persegi berwarna hitam pekat dengan tekstur kertas linen berat tergeletak begitu saja. Di sudut kanan bawah amplop itu, tertera stempel lilin (wax seal) perak tua membentuk huruf inisial bersambung yang sangat dihafal Arga di luar kepala: <em>M.V.</em>"
            },
            {
                "type": "dialogue",
                "html": "\"Surat apa ini, Ga? Dari kemarin kurir pos meletakkannya di kotak surat depan tanpa suara,\" tanya Fira sambil merapikan tumpukan kertas sketsa di meja. Wajahnya menyiratkan rasa penasaran bercampur keraguan kecil saat melihat warna amplop yang terlampau kelam untuk ukuran undangan biasa."
            },
            {
                "type": "dialogue",
                "html": "\"Aku tidak tahu, Fir... Amplop hitam dengan inisial itu... terakhir kali kulihat lima tahun lalu di Menteng, sebelum semuanya hancur dan aku memilih pulang ke Surabaya,\" jawab Arga dengan suara tertahan. Jemarinya gemetar saat meraba emboss perak di permukaan amplop tersebut."
            },
            {
                "type": "paragraph",
                "html": "Fira menghentikan gerakannya. Napasnya terasa memburu seketika. Nama inisial itu bukanlah rahasia lagi di antara mereka; Maya Vianney, bayangan masa lalu yang paling dalam, perempuan maestro seni rupa ibukota yang pernah mengisi separuh jiwa Arga sebelum skandal tragis dan pengkhianatan meretakkan segalanya."
            },
            {
                "type": "paragraph",
                "html": "Dengan perlahan, Arga merobek sisi atas amplop. Selembar undangan art paper tebal berwarna gading jatuh ke pangkuannya. Tulisan tangan elegan bertinta emas mencatat sebuah undangan eksklusif: Pameran Retrospektif Seni Lukis Nasional di Galeri Menteng Raya, Jakarta, menghadirkan karya-karya maestro yang hilang dari dekade lalu. Dan di baris paling bawah, tertulis catatan tangan dengan tinta hitam: <em>'Arga, lukisan itu menunggumu pulang. Datanglah, atau kenangan ini akan terkubur selamanya. — M.'</em>"
            },
            {
                "type": "dialogue",
                "html": "\"Dia memanggilmu, Ga...\" bisik Fira lirih, manik matanya menatap tajam ke arah tulisan tangan tersebut. Ada getar kecemasan yang tak bisa disembunyikannya."
            },
            {
                "type": "dialogue",
                "html": "\"Kita harus ke Jakarta, Fira. Kita selesaikan semua hantu masa lalu ini sekali dan untuk selamanya,\" ucap Arga tegas, menatap lurus mata Fira untuk meyakinkan bahwa tidak ada lagi ruang bagi masa lalu di hatinya—selain Fira."
            }
        ]
    },
    {
        "id": 2,
        "number": "Bab 2",
        "title": "Stasiun Gubeng di Bawah Gerimis",
        "fullTitle": "BAB 2: Stasiun Gubeng di Bawah Gerimis",
        "excerpt": "Kereta malam meluncur meninggalkan Stasiun Gubeng membawa Arga dan Fira menuju ibukota, diiringi debar jantung dan ribuan tanya.",
        "bgmId": "bgm-ch2",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Gerimis tipis turun menyelimuti peron Stasiun Gubeng Surabaya saat kereta malam Gajayana bersiap diberangkatkan ke arah Jakarta Gambir. Lampu-lampu sorot peron memantulkan kilau kebasahan di badan gerbong baja eksekutif yang berdiri kokoh menanti."
            },
            {
                "type": "paragraph",
                "html": "Arga menggenggam erat tangan Fira di samping pintu masuk gerbong 3. Jaket denim kesayangannya terasa hangat membalut tubuhnya, sementara ransel di punggungnya berisi tablet, buku catatan, dan undangan berampel hitam yang kini tersimpan rapi di dalam amplop cokelat."
            },
            {
                "type": "dialogue",
                "html": "\"Tiket sudah di tangan, tempat duduk kita di gerbong tengah. Dingin banget ya malam ini, Fir?\" ujar Arga sambil merapikan selendang wol abu-abu di leher Fira."
            },
            {
                "type": "dialogue",
                "html": "\"Bukan udaranya yang dingin, Ga... tapi perjalanan ini. Rasanya seperti melompat ke dalam jurang waktu yang entah di mana dasarnya,\" jawab Fira tersenyum tipis, mencoba menutupi kegelisahan batinnya."
            },
            {
                "type": "paragraph",
                "html": "Peluit kondektur berbunyi panjang menyayat udara malam. Pintu otomatis gerbong menutup rapat dengan desis hidrolik yang berat. Kereta perlahan bergerak merayap meninggalkan rel demi rel Stasiun Gubeng, membelah malam menuju Jawa Barat dan berujung di jantung megapolitan Jakarta."
            },
            {
                "type": "paragraph",
                "html": "Di dalam kabin kereta yang ber-AC lembut, Arga menyandarkan kepalanya di kaca jendela. Di luar sana, lampu-lampu kota Surabaya berangsur lenyap digelapkan kegelapan malam dan hamparan sawah. Fira duduk di sebelahnya, menyandarkan kepala di bahu Arga, memberikan ketenangan yang selama ini menjadi sauh hidup Arga dari badai keputusasaan."
            },
            {
                "type": "dialogue",
                "html": "\"Aku di sini, Arga. Apapun yang menunggu kita di Jakarta nanti, kita hadapi bersama,\" bisik Fira pelan di tengah deru roda besi kereta yang bergemuruh di atas bantalan rel."
            },
            {
                "type": "paragraph",
                "html": "Arga mengangguk pelan, mengecup puncak kepala Fira. Namun di dalam benaknya, bayangan wajah Maya Vianney dengan senyum misterius dan tatapan tajamnya mulai berkelebat, menagih janji-janji masa muda yang terputus di ibukota."
            }
        ]
    },
    {
        "id": 3,
        "number": "Bab 3",
        "title": "Galeri Seni Menteng yang Senyap",
        "fullTitle": "BAB 3: Galeri Seni Menteng yang Senyap",
        "excerpt": "Arga dan Fira tiba di Galeri Menteng Raya yang megah dan senyap, tempat lukisan misterius karya M.V. dipamerkan.",
        "bgmId": "bgm-ch3",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Gedung galeri seni di kawasan Menteng, Jakarta Pusat, berdiri megah dengan arsitektur kolonial berpilar putih tinggi dan halaman luas yang dipenuhi pohon-pohon mahoni tua. Suasana di dalam galeri begitu senyap, hanya terdengar alunan musik klasik instrumental yang mengalun lembut dari pengeras suara tersembunyi."
            },
            {
                "type": "paragraph",
                "html": "Arga dan Fira melangkah masuk melewati pintu kaca besar berbingkai tembaga. Penjaga galeri berpakaian jas hitam rapi memeriksa undangan berampel hitam milik Arga dengan tatapan penuh hormat sebelum mempersilakan mereka masuk ke ruang utama pameran bertajuk <em>'ECHOES OF THE PAST'</em>."
            },
            {
                "type": "dialogue",
                "html": "\"Tempat ini... tidak banyak berubah sejak terakhir kali aku ke sini lima tahun lalu, sebelum agensiku kolaps dan aku kabur ke Surabaya,\" bisik Arga sambil mengamati lukisan-lukisan abstrak besar berbingkai emas di sepanjang dinding galeri."
            },
            {
                "type": "dialogue",
                "html": "\"Lihat ke sana, Ga... di ujung ruangan itu,\" tunjuk Fira dengan jemari yang sedikit gemetar."
            },
            {
                "type": "paragraph",
                "html": "Di dinding paling dalam ruang pameran, berdiri sebuah lukisan kanvas berukuran besar yang ditutupi tirai kain hitam beludru. Di bawahnya, sebuah plakat kuningan mengkilap memuat tulisan elegan: <em>'M.V. - THE UNFINISHED PROMISE (2021)'</em>."
            },
            {
                "type": "paragraph",
                "html": "Suasana di sekitar lukisan itu terasa magis sekaligus mencekam. Sejumlah kritikus seni dan kolektor kaya tampak berbisik-bisik di sudut ruangan, memandangi Arga dan Fira dengan tatapan penuh tanda tanya. Kehadiran Arga di galeri itu rupanya telah dinanti-nantikan oleh seseorang."
            },
            {
                "type": "dialogue",
                "html": "\"Selamat datang kembali di Jakarta, Arga Prasetya,\" sebuah suara wanita yang dingin, elegan, dan sangat dikenal merayap dari balik pilar marmer putih."
            },
            {
                "type": "paragraph",
                "html": "Arga dan Fira berbalik serempak. Di sana, berdiri sesosok wanita berbalut blazer sutra hitam rancangan desainer ternama, dengan tatapan mata setajam elang dan senyum tipis penuh rahasia: Maya Vianney."
            }
        ]
    },
    {
        "id": 4,
        "number": "Bab 4",
        "title": "Secangkir Kopi Bersama Bayangan Lama",
        "fullTitle": "BAB 4: Secangkir Kopi Bersama Bayangan Lama",
        "excerpt": "Pertemuan meja bundar di kafe eksklusif Menteng mempertemukan Arga, Fira, dan Maya Vianney dalam ketegangan psikologis yang tinggi.",
        "bgmId": "bgm-ch4",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Kafe semi-outdoor di teras belakang galeri seni Menteng menawarkan pemandangan taman tropis yang tenang di tengah riuhnya kemacetan ibukota. Di atas meja bundar marmer putih, tiga cangkir espresso mengepulkan uap tipis di udara sore yang mulai temaram."
            },
            {
                "type": "paragraph",
                "html": "Maya Vianney duduk bersilang kaki dengan anggun. Cincin berlian kecil di jari manisnya berkilau setiap kali tangannya menggerakkan sendok kecil pengaduk gula. Di seberangnya, Arga duduk tegap dengan Fira yang menggenggam erat telapak tangannya di bawah meja."
            },
            {
                "type": "dialogue",
                "html": "\"Aku tidak menyangka kamu benar-benar datang, Arga. Kupikir Surabaya telah membuatmu melupakan seluruh ambisimu di Jakarta,\" ucap Maya membuka percakapan dengan nada suara yang sengaja dibuat lembut namun menusuk."
            },
            {
                "type": "dialogue",
                "html": "\"Aku datang bukan untuk mengenang masa lalu, Maya. Aku datang untuk menuntaskan apa yang belum selesai dan memastikan kamu berhenti mengirim undangan misterius itu,\" balas Arga tegas, tatapannya tidak goyah sedikit pun."
            },
            {
                "type": "dialogue",
                "html": "Maya tertawa kecil, suara tawa yang dulu pernah menghipnotis Arga di malam-malam panjang pengerjaan proyek galeri nasional. Ia melirik sekilas ke arah Fira sebelum kembali menatap Arga lekat-lekat. \"Dan wanita di sebelahmu ini... gadis dari Surabaya yang mengajarimu arti kesederhanaan? Apakah dia tahu siapa kamu sebenarnya sebelum kecelakaan itu? Apakah dia tahu rahasia di balik lukisan kanvas besar di galeri itu?\""
            },
            {
                "type": "dialogue",
                "html": "\"Fira tahu segalanya tentang aku, Maya. Jauh lebih banyak daripada yang pernah kamu kenahui di balik ambisi egoismu,\" potong Fira dengan suara tenang namun penuh wibawa, memecah intimidasi yang coba dibangun oleh Maya."
            },
            {
                "type": "paragraph",
                "html": "Maya tertegun sejenak. Alisnya sedikit terangkat. Ia tidak menyangka gadis sederhana berkalung syal abu-abu di depannya memiliki keberanian mental sekuat itu menghadapi aura dominasinya."
            },
            {
                "type": "paragraph",
                "html": "\"Baiklah. Jika kalian menganggap ini sudah selesai, mari kita lihat apakah kalian masih bisa tersenyum setelah melihat lukisan utama di galeri itu dibuka malam ini,\" ucap Maya dingin, lalu bangkit berdiri meninggalkan meja tanpa menghabiskan kopinya."
            }
        ]
    },
    {
        "id": 5,
        "number": "Bab 5",
        "title": "Telepon Tengah Malam dari Jakarta",
        "fullTitle": "BAB 5: Telepon Tengah Malam dari Jakarta",
        "excerpt": "Ponsel berdering pukul dua belas malam di kamar hotel Menteng, membawa teror psikologis baru dan ancaman terselubung dari masa lalu.",
        "bgmId": "bgm-ch5",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Kamar hotel butik berdesain art-deco di kawasan Cikini terasa dingin. Jam dinding menunjuk tepat pukul 00.12 WIB. Di luar jendela, lampu-lampu jalanan Jakarta berkedip lesu di balik kaca berembun."
            },
            {
                "type": "paragraph",
                "html": "Tiba-tiba, suara dering ponsel di atas nakas memecah keheningan malam. Arga yang setengah terjaga segera meraih gawai tersebut. Layar menyala menampilkan nomor tak dikenal dengan awalan kode area Jakarta."
            },
            {
                "type": "dialogue",
                "html": "\"Halo? Siapa ini malam-malam?\" tanya Arga dengan suara serak."
            },
            {
                "type": "dialogue",
                "html": "\"Halo, Arga... Belum bisa tidur? Atau kamu sedang memikirkan apa yang terjadi di galeri besok pagi?\" suara di ujung telepon terdengar berbisik parau, diiringi suara desau angin malam dan deru kendaraan dari kejauhan."
            },
            {
                "type": "dialogue",
                "html": "\"Maya? Darimana kamu dapat nomor ini? Mau apa lagi malam-malam begini?\" sergah Arga bangkit dari tempat tidur, membuat Fira ikut terjaga dan menatapnya dengan cemas."
            },
            {
                "type": "dialogue",
                "html": "\"Aku hanya ingin mengingatkanmu, Arga... Lukisan itu bukan sekadar kanvas dan cat minyak. Itu adalah rekaman jiwa kita berdua. Fira tidak akan pernah paham betapa gelap dan indahnya masa lalu kita di ibukota. Kalau kamu masih ingin hidup tenang bersama gadis itu, tinggalkan Jakarta besok pagi sebelum pameran dibuka... atau kamu akan kehilangan segalanya untuk kedua kalinya.\""
            },
            {
                "type": "paragraph",
                "html": "Sambungan diputus sepihak. <em>Tut... tut... tut...</em>"
            },
            {
                "type": "dialogue",
                "html": "\"Dari Maya?\" tanya Fira lirih, menyentuh lengan Arga yang menegang."
            },
            {
                "type": "dialogue",
                "html": "\"Ya. Dia mencoba meneror kita, Fir. Gaya pikir aku masih Arga yang dulu—bodoh dan penakut,\" ucap Arga, merangkul Fira erat-erat untuk meyakinkan bahwa tidak ada ancaman yang bisa memisahkan mereka."
            }
        ]
    },
    {
        "id": 6,
        "number": "Bab 6",
        "title": "Pameran Nasional dan Lukisan yang Hilang",
        "fullTitle": "BAB 6: Pameran Nasional dan Lukisan yang Hilang",
        "excerpt": "Pameran seni dibuka secara megah, namun saat tirai dibuka, lukisan utama yang menampilkan rahasia M.V. justru raib dari bingkainya.",
        "bgmId": "bgm-ch6",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Pukul 10.00 pagi, Galeri Menteng Raya dipadati oleh para wartawan seni, kritikus ternama, dan para kolektor berdinas rapi. Kilatan lampu kamera berkelebat di sana-sini saat Menteri Kebudayaan memberikan sambutan pembukaan pameran seni retrospektif tahun ini."
            },
            {
                "type": "paragraph",
                "html": "Arga dan Fira berdiri di barisan tengah penonton. Maya Vianney berdiri di atas panggung kehormatan di sebelah kurator galeri, mengenakan gaun putih gading yang mencolok dan memancarkan aura kemenangan."
            },
            {
                "type": "dialogue",
                "html": "\"Dan kini, tibalah saatnya kita membuka mahakarya utama dari dekade lalu yang sempat hilang dari peredaran publik—'The Unfinished Promise' karya Maya Vianney dan Arga Prasetya!\" seru kurator galeri dengan mikrofon nirkabel."
            },
            {
                "type": "paragraph",
                "html": "Dua petugas galeri berjas hitam melangkah maju ke tengah ruangan, lalu menarik tali beludru hitam pembuka tirai penutup kanvas utama."
            },
            {
                "type": "paragraph",
                "html": "<i>Sreeet!</i>"
            },
            {
                "type": "paragraph",
                "html": "Tirai beludru jatuh ke lantai. Namun, suasana riuh tepuk tangan seketika membeku menjadi keheningan total yang mencekam."
            },
            {
                "type": "paragraph",
                "html": "Di dalam bingkai ukir emas besar berukuran dua kali dua meter itu... kanvas tersebut kosong melompong. Tidak ada goresan cat minyak, tidak ada potret masa lalu, yang ada hanyalah selembar kertas putih bertuliskan spidol hitam di tengah bingkai: <i>'Karya ini milik siapa yang berani merebutnya kembali.'</i>"
            },
            {
                "type": "paragraph",
                "html": "Para penonton mulai berbisik-bisik bingung. Maya Vianney di atas panggung tertegun pucat, senyum elegannya lenyap seketika digantikan kemarahan yang membara di balik manik matanya."
            },
            {
                "type": "dialogue",
                "html": "\"Ada permainan apa lagi ini?\" gumam Arga menatap tajam ke arah panggung."
            }
        ]
    },
    {
        "id": 7,
        "number": "Bab 7",
        "title": "Cincin Safir di Saku Jaket Denim",
        "fullTitle": "BAB 7: Cincin Safir di Saku Jaket Denim",
        "excerpt": "Sebuah cincin safir peninggalan masa lalu ditemukan tersembunyi di saku jaket denim Arga, membawa petunjuk baru tentang siapa dalang di balik kekacauan ini.",
        "bgmId": "bgm-ch7",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Di tengah kekacauan di ruang galeri utama, Arga dan Fira memilih menepi ke ruang arsip belakang galeri yang tenang atas bantuan seorang staf lama yang mengenali Arga."
            },
            {
                "type": "paragraph",
                "html": "Arga merogoh saku jaket denim kesayangannya untuk mencari kunci kamar hotel. Jemarinya tak sengaja meraba sebuah lipatan kain di dalam lapisan furing dalam jaket yang selama ini robek dan belum pernah dijahit."
            },
            {
                "type": "dialogue",
                "html": "\"Eh? Ada apa di dalam furing jaket ini?\" geming Arga, meraba sebuah benda keras berbentuk kotak kecil berlapis veludru biru tua."
            },
            {
                "type": "dialogue",
                "html": "\"Apa itu, Ga? Coba keluarkan,\" kata Fira penasaran."
            },
            {
                "type": "paragraph",
                "html": "Arga merobek sedikit jahitan furing tersebut dengan ujung kunci, lalu mengeluarkan sebuah kotak perhiasan kecil yang sudah berdebu. Saat dibuka, sebuah cincin emas putih bermahkotakan batu safir biru tua yang berkilau tajam tersemat di dalamnya. Di bawah cincin itu, terdapat secarik kertas catatan kecil bertuliskan tangan Maya lima tahun lalu: <i>'Simpan ini sampai kita siap meresmikan segalanya di ibukota.'</i>"
            },
            {
                "type": "paragraph",
                "html": "Fira menatap cincin safir itu dengan napas tertahan. Meskipun ia tahu itu adalah benda masa lalu, ada kejujuran mutlak di mata Arga saat Arga langsung meletakkan kotak itu ke atas meja di sebelah mereka tanpa sedikit pun keraguan."
            },
            {
                "type": "dialogue",
                "html": "\"Cincin ini... tertinggal di jaket ini sebelum aku kecelakaan dan meninggalkan Jakarta. Aku bahkan tidak pernah tahu cincin ini ada di sini,\" ucap Arga tulus menatap Fira. \"Cincin masa lalu yang tidak pernah punya arti bagiku sekarang, selain beban.\""
            },
            {
                "type": "dialogue",
                "html": "\"Aku percaya sama kamu, Arga. Tapi cincin ini adalah umpan. Seseorang sengaja menaruhnya di sana agar kita menemukannya di Jakarta, dan orang itu tahu persis ke mana kita harus melangkah berikutnya,\" jawab Fira dengan tatapan penuh keberanian."
            }
        ]
    },
    {
        "id": 8,
        "number": "Bab 8",
        "title": "Konfrontasi di Lobi Hotel Grand Surya",
        "fullTitle": "BAB 8: Konfrontasi di Lobi Hotel Grand Surya",
        "excerpt": "Arga dan Fira menghadapi Maya Vianney secara langsung di lobi Hotel Grand Surya, membongkar motif di balik teror dan hilangnya lukisan.",
        "bgmId": "bgm-ch8",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Lobi Hotel Grand Surya di kawasan Sudirman berkilau oleh pilar-pilar marmer hitam dan lampu gantung kristal raksasa. Di salah satu sofa sudut VIP yang privat, Maya Vianney duduk menyilangkan tangan dengan rokok elektrik tipis di jemarinya."
            },
            {
                "type": "paragraph",
                "html": "Arga dan Fira berjalan mendekat dengan langkah tegap tanpa ragu. Arga meletakkan kotak beludru berisi cincin safir tepat di atas meja kaca di hadapan Maya."
            },
            {
                "type": "dialogue",
                "html": "\"Permainanmu sudah berakhir, Maya. Lukisan itu kamu sendiri yang menyembunyikannya kan? Dan cincin ini... kamu yang menyelipkannya ke jaket denimku agar aku datang ke Jakarta dan tunduk padamu lagi?\" suara Arga bergetar menahan amarah."
            },
            {
                "type": "paragraph",
                "html": "Maya mendongak. Tidak ada kepanikan di wajahnya; yang ada justru senyum sinis yang semakin melebar."
            },
            {
                "type": "dialogue",
                "html": "\"Cerdas, Arga. Kamu memang tidak pernah bodoh dalam hal seni. Tapi kamu naif jika mengira aku ingin menghancurkanmu,\" kata Maya berdiri perlahan, merapikan blazernya. \"Aku melakukan semua ini karena lukisan itu dan cincin itu adalah bukti bahwa takdir kita belum selesai. Fira hanyalah singgah sementara di hidupmu setelah kamu nyaris mati di Surabaya.\""
            },
            {
                "type": "dialogue",
                "html": "\"Cukup, Maya!\" potong Fira dengan suara tajam yang menghentikan kalimat Maya. Fira melangkah maju hingga berdiri tepat di hadapan Maya. \"Arga bukan kanvas kosong yang bisa kamu lukis ulang sesukamu. Dia sudah memilih masa depannya—di Surabaya, bersama aku, dengan detak jantung yang baru dan jujur. Ambisimu tidak berhak merusak hidupnya lagi!\""
            },
            {
                "type": "paragraph",
                "html": "Maya tertegun menatap sorot mata Fira yang memancarkan ketulusan baja. Untuk pertama kalinya, sang maestro seni ibukota itu merasa kalah telak bukan oleh harta atau kuasa, melainkan oleh cinta sejati yang tidak bisa dibeli dengan galeri megah."
            },
            {
                "type": "dialogue",
                "html": "\"Baiklah... silakan kalian pulang ke Surabaya,\" ucap Maya dingin dengan suara gemetar. \"Tapi ingat, bayangan ibukota tidak akan pernah membiarkan kalian pergi dengan tenang.\""
            }
        ]
    },
    {
        "id": 9,
        "number": "Bab 9",
        "title": "Air Mata di Stasiun Pasar Senen",
        "fullTitle": "BAB 9: Air Mata di Stasiun Pasar Senen",
        "excerpt": "Di tengah keramaian Stasiun Pasar Senen, kelegaan dan air mata kebahagiaan tumpah saat Arga dan Fira bersiap naik kereta pulang ke Surabaya.",
        "bgmId": "bgm-ch9",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Suasana Stasiun Pasar Senen sore itu begitu padat oleh ribuan penumpang yang berdesakan menenteng tas dan kardus pulangnya ke berbagai kota di Jawa. Bau keringat, asap kereta diesel, dan suara pengumuman keberangkatan bergemuruh bersahut-sahutan di bawah atap baja stasiun."
            },
            {
                "type": "paragraph",
                "html": "Arga dan Fira berjalan beriringan menuju peron 2 tempat Kereta Api Airlangga tujuan Surabaya Pasarturi bersandar menunggu waktu keberangkatan."
            },
            {
                "type": "dialogue",
                "html": "\"Tiket sudah dipegang? Tidak ada yang tertinggal kan di hotel tadi?\" tanya Arga memastikan sambil merangkul pundak Fira."
            },
            {
                "type": "dialogue",
                "html": "\"Semua aman, Ga. Tas, tablet, dan... cincin safir itu sudah kita serahkan ke pihak keamanan galeri sesuai keputusanmu tadi,\" jawab Fira tersenyum lega. Air mata tipis mendadak menetes di sudut matanya. \"Ya Allah, rasanya seperti keluar dari labirin gelap yang menyesakkan.\""
            },
            {
                "type": "paragraph",
                "html": "Arga menghapus air mata di pipi Fira dengan ibu jarinya. Ia memeluk tubuh Fira erat-erat di tengah kerumunan orang yang berlalu-lalang di peron stasiun."
            },
            {
                "type": "dialogue",
                "html": "\"Terima kasih ya, Fir... karena selalu percaya padaku, bahkan saat bayangan masa lalu datang merongrong kita,\" bisik Arga tulus."
            },
            {
                "type": "dialogue",
                "html": "\"Kita pulang ya, Ga. Kembali ke Surabaya, ke rumah kita yang sebenarnya,\" balas Fira mengeratkan pelukannya."
            },
            {
                "type": "paragraph",
                "html": "Mereka berdua melangkah naik ke dalam gerbong kereta ekonomi eksekutif yang bersih, duduk berdampingan di dekat jendela kaca besar yang menghadap langsung ke peron seberang. Kereta bersiap membunyikan klakson panjangnya."
            }
        ]
    },
    {
        "id": 10,
        "number": "Bab 10",
        "title": "Bayangan di Jendela Kereta",
        "fullTitle": "BAB 10: Bayangan di Jendela Kereta",
        "excerpt": "Tepat saat kereta mulai berjalan meninggalkan Jakarta, sebuah bayangan familiar muncul di peron seberang—Maya Vianney berdiri tersenyum sinis memegang sketsa lama Arga, bertekad merebut Arga kembali.",
        "bgmId": "bgm-ch10",
        "paragraphs": [
            {
                "type": "paragraph",
                "html": "Roda besi kereta berdecit nyaring di atas rel, perlahan bergeser meninggalkan peron Stasiun Pasar Senen. Jakarta mulai merangkak mundur di balik jendela kaca gerbong, diiringi desau angin sore yang membawa aroma debu ibukota."
            },
            {
                "type": "paragraph",
                "html": "Fira menyandarkan kepalanya di bahu Arga, menutup mata dengan perasaan damai yang teramat sangat. Badai itu akhirnya berlalu. Mereka akan kembali ke Surabaya, merajut masa depan baru tanpa bayang-bayang masa lalu."
            },
            {
                "type": "paragraph",
                "html": "Namun, tepat saat kereta melaju kencang melewati ujung peron stasiun yang mulai sepi, tatapan Arga terpaku pada sesosok siluet wanita berbalut trench coat hitam yang berdiri tegak di peron seberang jalur rel."
            },
            {
                "type": "paragraph",
                "html": "Jantung Arga seolah berhenti berdegup seketika."
            },
            {
                "type": "paragraph",
                "html": "Di balik kaca jendela kereta yang bergeser cepat, Maya Vianney berdiri tanpa payung di bawah langit senja Jakarta yang kelabu. Wajahnya pucat namun memancarkan senyuman sinis yang membekukan darah. Di tangan kanannya, Maya mengangkat tinggi-tinggi selembar sketsa lama karya Arga dari masa kuliah—sketsa wajah Arga dan Maya yang dulu disangka telah musnah."
            },
            {
                "type": "paragraph",
                "html": "Tanpa suara, bibir Maya bergerak membentuk kalimat yang terbaca jelas oleh Arga di balik deru kereta: <em>'Kamu tidak akan pernah bisa lepas dariku, Arga... Fira hanya meminjammu.'</em>"
            },
            {
                "type": "paragraph",
                "html": "Kereta melesat kencang meninggalkan bayangan itu jauh di belakang, menembus terowongan gelap menuju rel panjang ke timur. Tapi di dalam hati Arga, teror itu belum usai—Maya Vianney bertekad bulat merebut Arga kembali dari sisi Fira, apapun taruhannya."
            }
        ]
    }
]

for ch in chapters_data:
    words = sum(len(p["html"].split()) for p in ch["paragraphs"])
    ch["wordCount"] = words
    ch["readTimeMinutes"] = max(1, words // 200)
    ch["isFinal"] = (ch["id"] == len(chapters_data))

total_words = sum(ch["wordCount"] for ch in chapters_data)
total_read_time = sum(ch["readTimeMinutes"] for ch in chapters_data)

novel_content = f'''// Data Novel Buku Kedelapan: Misteri M.V. Ibukota
import {{ NovelData }} from "../../../types/novel";

export const MISTERI_MV_IBUKOTA_DATA: NovelData = {json.dumps({
  "slug": "misteri-mv-ibukota",
  "title": "Misteri M.V. Ibukota",
  "subtitle": "Sebuah Novel Karya Bachtiar Aryansyah Putra",
  "tagline": "Ketika undangan dari masa lalu membuka kembali rahasia M.V. dan menguji ketulusan cinta Fira di jantung Jakarta",
  "author": "Bachtiar Aryansyah Putra",
  "genre": "Misteri / Drama Psikologis / Romansa Realis",
  "seriesName": "Semesta Tiket Pulang",
  "seriesPart": "Buku Kedelapan: Misteri M.V. Ibukota",
  "status": "Tamat",
  "publishDate": "Oktober 2026",
  "coverAccent": "#2C3E50",
  "featured": False,
  "totalChapters": len(chapters_data),
  "totalWords": total_words,
  "totalReadTimeMinutes": total_read_time,
  "synopsis": "Arga mengira lembaran masa lalunya di ibukota telah tertutup rapat di balik reruntuhan agensi dan kecelakaan di Gumitir. Namun sebuah amplop berampel hitam dengan inisial perak M.V. tiba di Surabaya, memanggilnya kembali ke Galeri Menteng Jakarta. Bersama Fira yang setia mendampingi, Arga menghadapi teka-teki lukisan yang hilang, konfrontasi di Lobi Hotel Grand Surya, hingga cincin safir tersembunyi di saku jaket denim. Di akhir perjalanan, sebuah cliffhanger menghentak: Maya Vianney berdiri di peron seberang Stasiun Pasar Senen, tersenyum sinis sambil memegang sketsa masa lalu, bertekad merebut Arga kembali dari sisi Fira.",
  "quote": "Masa lalu tidak pernah benar-benar mati di ibukota; ia hanya menunggu kereta yang tepat untuk kembali menagih janji.",
  "chapters": chapters_data
}, indent=2, ensure_ascii=False)};
'''

with open("src/data/novels/misteri-mv-ibukota/index.ts", "w", encoding="utf-8") as f:
    f.write(novel_content)

print("Successfully generated valid TS using json.dumps for src/data/novels/misteri-mv-ibukota/index.ts")
