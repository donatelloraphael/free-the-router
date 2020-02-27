<template>
	
</template>

<script>
	import {db} from '~/plugins/firebase.js';

	export default {
		name: "FillMostPopular",

		created() {
			let mostpopularRef = db.collection("most-popular");

			mostpopularRef.doc("1").set({
				company: 'TP-Link',
	      id: 'tpl1',
	      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51jCNA84pyL._SL1500_.jpg',
	      name: 'Archer C50',
	      nameDescription: 'TP-Link Archer C50 AC1200 Dual Band Wireless Cable Router, Wi-Fi Speed Up to 867 Mbps/5 GHz + 300 Mbps/2.4 GHz, Supports Parental Control, Guest Wi-Fi, VPN',
	      price: 1899,
	      productUrl: 'https://www.amazon.in/TP-Link-Archer-C50-Wireless-Router/dp/B071RSD473/ref=sr_1_3?keywords=archer+c50&qid=1582105630&sr=8-3',
	      routerPath: '1/1',
	      serialNumber: 1,
	      specs: '8MB Flash, 64MB RAM',
	      firmwares: ["openwrt"]
			});

			mostpopularRef.doc("2").set({
				company: 'TP-Link',
	      id: 'tpl2',
	      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61%2BEFQ-nFRL._SL1500_.jpg',
	      name: 'Archer C20',
	      nameDescription: 'TP-Link Archer C20 AC750 Wireless Dual Band Router (Blue, Not a Modem)',
	      price: 1599,
	      productUrl: 'https://www.amazon.in/TP-Link-Archer-C20-Wireless-Router/dp/B0759QMF85/ref=sr_1_3?keywords=archer+c20&qid=1582106754&sr=8-3',
	      routerPath: '1/2',
	      serialNumber: 2,
	      specs: '8MB Flash, 64MB RAM',
	      firmwares: ["openwrt"]

			});

			mostpopularRef.doc("3").set({
				company: 'Asus',
	      id: 'asus1',
	      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51vczTMH1EL._SL1200_.jpg',
	      name: 'RT-N 12',
	      nameDescription: 'ASUS 3-In-1 Wireless Router (RT-N12)',
	      price: 1750,
	      productUrl: 'https://www.amazon.in/Wireless-Router-Range-Extender-Environment/dp/B00QB9SPU6/ref=sr_1_1?keywords=asus+rt+n12&qid=1582107127&sr=8-1',
	      routerPath: '1/3',
	      serialNumber: 3,
	      specs: '8MB Flash, 32MB RAM',
	      firmwares: ["openwrt", "ddwrt", "tomatobyshibby"]
			});

			mostpopularRef.doc("4").set({
				company: 'D-Link',
	      id: 'dlnk1',
	      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61G8eH0o25L._SL1500_.jpg',
	      name: 'DIR-615',
	      nameDescription: 'D-Link DIR-615 Wireless-N300 Router (Black, Not a Modem)',
	      price: 929,
	      productUrl: 'https://www.amazon.in/D-Link-DIR-615-Wireless-N300-Router-Black/dp/B0085IATT6',
	      routerPath: '1/4',
	      serialNumber: 4,
	      specs: '4MB Flash, 32MB RAM',
	      firmwares: ["openwrt", "ddwrt"]
			});

			mostpopularRef.doc("5").set({
				company: 'TP-Link',
	      id: 'tpl3',
	      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51lbDxqwveL._SL1200_.jpg',
	      name: 'Archer C9 AC1900 ',
	      nameDescription: 'Tp-Link Archer C9 AC1900 Wireless Dual Band Gigabit Router',
	      price: 6290,
	      productUrl: 'https://www.amazon.in/TP-Link-Archer-C9-Wireless-Gigabit/dp/B00KO15KV4/',
	      routerPath: '1/5',
	      serialNumber: 5,
	      specs: '16MB Flash, 128MB RAM',
	      firmwares: ["openwrt", "ddwrt"]
			});

			mostpopularRef.doc("6").set({
				company: 'TP-Link',
	      id: 'tpl4',
	      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/517C14Xx-JL._SL1000_.jpg',
	      name: 'Archer C7 AC1750',
	      nameDescription: 'Tp-Link Archer C7 AC1750 Wireless Dual Band Gigabit Router (Not a Modem)',
	      price: 4999,
	      productUrl: 'https://www.amazon.in/Tp-Link-Archer-C7-Wireless-Gigabit/dp/B00CEB53MS/',
	      routerPath: '1/6',
	      serialNumber: 6,
	      specs: '16MB Flash, 128MB RAM',
	      firmwares: ["openwrt", "ddwrt"]
			});


			mostpopularRef.doc("7").set({
				company: "Tenda",
				id: "tenda1",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61fq3Xyp1vL._SL1500_.jpg",
				name: "AC15",
				nameDescription: "TENDA AC15 AC1900 Mbps Smart Wireless Dual band Gigabit High Power Router",
				price: 7029,
				productUrl: "https://www.amazon.in/AC15-AC1900-Wireless-Gigabit-Router/dp/B0143HBZMW/",
				routerPath: "1/7",
				serialNumber: 7,
				specs: "16MB Flash, 128MB RAM",
				firmwares: ["freshtomato"]
			});

			mostpopularRef.doc("8").set({
				company: "D-Link",
				id: "dlnk2",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/31OTQsd6mLL.jpg",
				name: "DIR-868L",
				nameDescription: "D-Link Wireless AC Smartbeam 1750 Mbps Home Cloud App-Enabled Dual-Band Gaming Router (DIR-868L) ",
				price: 10652,
				productUrl: "https://www.amazon.in/D-Link-Smartbeam-App-Enabled-Dual-Band-DIR-868L/dp/B00C9VB318/",
				routerPath: "1/8",
				serialNumber: 8,
				specs: "128MB Flash, 128MB RAM",
				firmwares: ["ddwrt", "freshtomato", "advancedtomato", "tomatobyshibby"]
			});

			mostpopularRef.doc("9").set({
				company: "Netgear",
				id: "ngear1",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61cypycAHsL._SL1350_.jpg",
				name: "Nighthawk R7000",
				nameDescription: "NETGEAR Nighthawk AC1900 Dual Band WiFi Gigabit Router (R7000) with Open Source Support | Circle with Disney Smart Parental Controls | Compatible with Amazon Echo/Alexa (Indian Adpater)",
				price: 9999,
				productUrl: "https://www.amazon.in/NETGEAR-Nighthawk-Parental-Controls-Compatible/dp/B00F0DD0I6/",
				routerPath: "1/9",
				serialNumber: 9,
				specs: "128MB Flash, 256MB RAM",
				firmwares: ["openwrt", "ddwrt", "freshtomato", "advancedtomato", "tomatobyshibby"]
			});

			mostpopularRef.doc("10").set({
				company: "Asus",
				id: "asus2",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41lq%2BVPpRgL.jpg",
				name: "RT N10U",
				nameDescription: "Asus N150 RT N10U_B 3-in-1 Wireless Router (Black)",
				price: 1299,
				productUrl: "https://www.amazon.in/Asus-RT-N10U_B-Wireless-Router/dp/B00OKJIG0S/",
				routerPath: "1/10",
				serialNumber: 10,
				specs: "8MB Flash, 32MB RAM",
				firmwares: ["advancedtomato", "tomatobyshibby", "ddwrt", "openwrt"]
			});

			mostpopularRef.doc("11").set({
				company: "Linksys",
				id: "lsys1",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71psjJaCZUL._SL1500_.jpg",
				name: "E2500",
				nameDescription: "Linksys E2500 Wi-Fi Dual-Band N Router (Black)",
				price: 4049,
				productUrl: "https://www.amazon.in/Linksys-E2500-Wi-Fi-Dual-Band-Router/dp/B00AAU5514/",
				routerPath: "1/11",
				serialNumber: 11,
				specs: "8MB Flash, 64MB RAM",
				firmwares: ["advancedtomato", "openwrt", "ddwrt", "freshtomato", "tomatobyshibby"]
			});

			mostpopularRef.doc("12").set({
				company: "Netgear",
				id: "ngear2",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61ua1chADfL._SL1350_.jpg",
				name: "R6400",
				nameDescription: "Netgear R6400-100INS AC1750 Dual Band Smart Wi-Fi Router",
				price: 14690,
				productUrl: "https://www.amazon.in/Netgear-R6400-100INS-AC1750-Smart-Router/dp/B00Z0V2NQ8/",
				routerPath: "1/12",
				serialNumber: 12,
				specs: "128MB Flash, 256MB RAM",
				firmwares: ["advancedtomato", "tomatobyshibby", "freshtomato", "ddwrt"]
			});

			mostpopularRef.doc("13").set({
				company: "TP-Link",
				id: "tpl5",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61qHLLTRwaL._SL1500_.jpg",
				name: "TL-WR841N",
				nameDescription: "Tp-Link TL-WR841N 300mbps Wireless N Router",
				price: 1650,
				productUrl: "https://www.amazon.in/Tp-Link-TL-WR841N-300mbps-Wireless-Router/dp/B01GS37NV6/",
				routerPath: "1/13",
				serialNumber: 13,
				specs: "8MB Flash, 64MB RAM",
				firmwares: ["gargoyle", "openwrt", "ddwrt"]
			});

			mostpopularRef.doc("14").set({
				company: "D-Link",
				id: "dlnk3",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51IgtXdoIlL._SL1500_.jpg",
				name: "DIR-825",
				nameDescription: "D-Link DIR-825 AC 1200 Wi-Fi Dual-Band Gigabit (LAN/WAN) Router (Not a Modem)",
				price: 2129,
				productUrl: "https://www.amazon.in/D-Link-DIR-825-Dual-Band-Gigabit-Router/dp/B078L5J7G1/",
				routerPath: "1/14",
				serialNumber: 14,
				specs: "8MB Flash, 64MB RAM",
				firmwares: ["gargoyle", "openwrt", "ddwrt"]
			});

			mostpopularRef.doc("15").set({
				company: "Linksys",
				id: "lsys2",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71k02T6KxML._SL1500_.jpg",
				name: "WRT54GL",
				nameDescription: "Linksys WRT54GL Wi-Fi Wireless-G Broadband Router",
				price: 6965,
				productUrl: "https://www.amazon.in/Linksys-WRT54GL-Wireless-G-Broadband-Router/dp/B000BTL0OA/",
				routerPath: "1/15",
				serialNumber: 15,
				specs: "4MB Flash, 16MB RAM",
				firmwares: ["gargoyle", "openwrt", "ddwrt", "tomatobyshibby"]
			});

			mostpopularRef.doc("16").set({
				company: "Asus",
				id: "asus3",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61i6itY8atL._SL1319_.jpg",
				name: "RT AC68U",
				nameDescription: "Asus AC1900 RT AC68U Dual-Band Wireless Gigabit Router (Black)",
				price: 12699,
				productUrl: "https://www.amazon.in/Asus-AC1900-Dual-Band-Wireless-Gigabit/dp/B00FB45SI4/",
				routerPath: "1/16",
				serialNumber: 16,
				specs: "128MB Flash, 256MB RAM",
				firmwares: ["tomatobyshibby", "advancedtomato", "freshtomato", "ddwrt", "openwrt"]
			});

			mostpopularRef.doc("17").set({
				company: "Linksys",
				id: "lsys3",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71R-GUBSOcL._SL1500_.jpg",
				name: "EA6500",
				nameDescription: "Linksys AC1750 Wi-Fi Wireless Dual-Band+ Router with Gigabit, Smart Wi-Fi App Enabled to Control Your Network from Anywhere (EA6500)",
				price: 17679,
				productUrl: "https://www.amazon.in/Linksys-Wireless-Dual-Band-Anywhere-EA6500/dp/B008I21EA2/",
				routerPath: "1/17",
				serialNumber: 17,
				specs: "128MB Flash, 256MB RAM",
				firmwares: ["tomatobyshibby", "freshtomato", "advancedtomato", "ddwrt", "openwrt"]
			});

			mostpopularRef.doc("18").set({
				company: "Netgear",
				id: "ngear3",
				imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51useAfLHVL._SL1350_.jpg",
				name: "R8000",
				nameDescription: "Netgear AC3200 Nighthawk X6 Tri-Band Wi-Fi Router",
				price: 14499,
				productUrl: "https://www.amazon.in/Netgear-AC3200-Nighthawk-Tri-Band-Router/dp/B00KWHMR6G/",
				routerPath: "1/18",
				serialNumber: 18,
				specs: "128MB Flash, 256MB RAM",
				firmwares: ["tomatobyshibby", "freshtomato", "advancedtomato", "ddwrt", "openwrt"]
			});
		}
	};
</script>