"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const products = [
  {
    id: "1",
    name: "Lattafa Khamrah",
    price: 850,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f",
    desc: "عطر شرقي فاخر بثبات عالي وفخامة لا تقاوم",
  },
  {
    id: "2",
    name: "Afnan 9PM",
    price: 950,
    image: "https://images.unsplash.com/photo-1615634262417-1b5f89b6b2c3",
    desc: "عطر شبابي جذاب مناسب للسهرات",
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    setProduct(found);
  }, [id]);

  if (!product) return <div className="p-10">جاري التحميل...</div>;

  return (
    <main className="p-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
      <img src={product.image} className="w-full rounded" />

      <div>
        <h1 className="text-3xl mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.desc}</p>
        <p className="text-xl mb-6">{product.price} جنيه</p>

        <button className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition">
           اضف للسلة 
        </button>
      </div>
    </main>
  );
}