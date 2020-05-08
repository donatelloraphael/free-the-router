const axios = require('axios');
const $ = require('cheerio');

const admin = require('firebase-admin');
const serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://free-the-router-13e19.firebaseio.com"
});
const db = admin.firestore();

let docRef = db.collection("asuswrt-merlin-main-list");

docRef.doc("Asus RT-AX56U").set({
	fullName: "Asus RT-AX56U",
	company: "Asus",
	model: "RT-AX56U",
	version: "",
	specs: "16MB Flash, 256MB RAM",
	notes: "U, R and W variants are all supported"
});

docRef.doc("Asus RT-AX58U").set({
	fullName: "Asus RT-AX58U",
	company: "Asus",
	model: "RT-AX58U",
	version: "",
	specs: "256MB Flash, 512MB RAM",
	notes: "U, R and W variants are all supported"
});

docRef.doc("Asus RT-AX3000").set({
	fullName: "Asus RT-AX3000",
	company: "Asus",
	model: "RT-AX3000",
	version: "",
	specs: "256MB Flash, 512MB RAM",
	notes: "U, R and W variants are all supported"
});

docRef.doc("Asus RT-AX88U").set({
	fullName: "Asus RT-AX88U",
	company: "Asus",
	model: "RT-AX88U",
	version: "",
	specs: "256MB Flash, 1GB RAM",
	notes: "U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC66U B1").set({
	fullName: "Asus RT-AC66U B1",
	company: "Asus",
	model: "RT-AC66U",
	version: "B1",
	specs: "128MB Flash, 256MB RAM",
	notes: "same firmware as the RT-AC68U. U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC86U").set({
	fullName: "Asus RT-AC86U",
	company: "Asus",
	model: "RT-AC86U",
	version: "",
	specs: "256MB Flash, 512MB RAM",
	notes: "same firmware as the RT-AC68U. U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC86U").set({
	fullName: "Asus RT-AC86U",
	company: "Asus",
	model: "RT-AC86U",
	version: "",
	specs: "256MB Flash, 512MB RAM",
	notes: "starting with version 382.1. U, R and W variants are all supported"
});

docRef.doc("Asus RT-N66U").set({
	fullName: "Asus RT-N66U",
	company: "Asus",
	model: "RT-N66U",
	version: "",
	specs: "32MB Flash, 256MB RAM",
	notes: "supported only by older versions of firmware. U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC1900").set({
	fullName: "Asus RT-AC1900",
	company: "Asus",
	model: "RT-AC1900",
	version: "",
	specs: "128MB Flash, 256MB RAM",
	notes: "same firmware as RT-AC68U. U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC1900P").set({
	fullName: "Asus RT-AC1900P",
	company: "Asus",
	model: "RT-AC1900P",
	version: "",
	specs: "128MB Flash, 256MB RAM",
	notes: "same firmware as RT-AC68U. U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC5300").set({
	fullName: "Asus RT-AC5300",
	company: "Asus",
	model: "RT-AC5300",
	version: "",
	specs: "128MB Flash, 512MB RAM",
	notes: "U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC3200").set({
	fullName: "Asus RT-AC3200",
	company: "Asus",
	model: "RT-AC3200",
	version: "",
	specs: "128MB Flash, 256MB RAM",
	notes: "U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC3100").set({
	fullName: "Asus RT-AC3100",
	company: "Asus",
	model: "RT-AC3100",
	version: "",
	specs: "128MB Flash, 512MB RAM",
	notes: "U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC88U").set({
	fullName: "Asus RT-AC88U",
	company: "Asus",
	model: "RT-AC88U",
	version: "",
	specs: "128MB Flash, 512MB RAM",
	notes: "U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC68U").set({
	fullName: "Asus RT-AC68U",
	company: "Asus",
	model: "RT-AC68U",
	version: "",
	specs: "128MB Flash, 256MB RAM",
	notes: "Including revisions C1 and E1. U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC66U").set({
	fullName: "Asus RT-AC66U",
	company: "Asus",
	model: "RT-AC66U",
	version: "",
	specs: "128MB Flash, 256MB RAM",
	notes: "Only supported by older versions of firmware. U, R and W variants are all supported"
});

docRef.doc("Asus RT-AC56U").set({
	fullName: "Asus RT-AC56U",
	company: "Asus",
	model: "RT-AC56U",
	version: "",
	specs: "128MB Flash, 256MB RAM",
	notes: "Only supported by older versions of firmware. U, R and W variants are all supported"
});

