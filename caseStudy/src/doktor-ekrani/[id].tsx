import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../../styles/DoktorEkrani.css";

interface HastaData {
  ad: string;
  soyad: string;
  dogumTarihi: string;
}

const DoktorEkrani: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hastaData, setHastaData] = useState<HastaData | null>(null);

  useEffect(() => {
    if (id) {
      // Burada hasta verilerini API'den çekin
      // Örnek veri:
      setHastaData({
        ad: "Ali",
        soyad: "Yılmaz",
        dogumTarihi: "1990-01-01",
        // Diğer hasta bilgileri...
      });
    }
  }, [id]);

  const handleGuncelle = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada güncelleme işlemini gerçekleştirin
    console.log("Güncellenmiş hasta verileri:", hastaData);
  };

  if (!hastaData) return <div>Yükleniyor...</div>;

  return (
    <div className="doktor-ekrani-container">
      <h1>Hasta Detayları</h1>
      <form onSubmit={handleGuncelle}>
        <input
          name="ad"
          value={hastaData.ad}
          onChange={(e) => setHastaData({ ...hastaData, ad: e.target.value })}
        />
        <input
          name="soyad"
          value={hastaData.soyad}
          onChange={(e) =>
            setHastaData({ ...hastaData, soyad: e.target.value })
          }
        />
        <input
          name="dogumTarihi"
          type="date"
          value={hastaData.dogumTarihi}
          onChange={(e) =>
            setHastaData({ ...hastaData, dogumTarihi: e.target.value })
          }
        />
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default DoktorEkrani;
