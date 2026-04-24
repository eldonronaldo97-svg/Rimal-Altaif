const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "public/products");

// الصور الأصلية (حسب ترتيبك)
const diamondNames = [
  "diamond-1.jpg",
  "diamond-2.jpg",
  "diamond-3.jpg",
  "diamond-4.jpg",
  "diamond-5.jpg",
  "diamond-6.jpg",
  "diamond-7.jpg",
  "diamond-8.jpg",
  "diamond-9.jpg",
  "diamond-10.jpg",
];

const tobaccoNames = [
  "tobacco-1.jpg",
  "tobacco-2.jpg",
  "tobacco-3.jpg",
  "tobacco-4.jpg",
  "tobacco-5.jpg",
  "tobacco-6.jpg",
  "tobacco-7.jpg",
];

// هيمسك الصور اللي عندك ويرتبها
const files = fs.readdirSync(folder);

// فلترة الصور بس
const images = files.filter((f) =>
  f.endsWith(".jpg") || f.endsWith(".png")
);

// ترتيبهم
images.sort();

console.log("Files found:", images);

// rename الدايموند
images.slice(0, 10).forEach((file, i) => {
  const oldPath = path.join(folder, file);
  const newPath = path.join(folder, diamondNames[i]);

  fs.renameSync(oldPath, newPath);
});

// rename التوباكو
images.slice(10, 17).forEach((file, i) => {
  const oldPath = path.join(folder, file);
  const newPath = path.join(folder, tobaccoNames[i]);

  fs.renameSync(oldPath, newPath);
});

console.log("✅ Done rename!");