"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home() {
  const [formData, setFormData] = useState({
    nama: "",
    umur: "",
    pengenMakan: "",
    selectedSakit: "",
  });

  const [selectedMenu, setSelectedMenu] = useState({
    karbohidrat: "1)",
    subKarbohidrat: "*",
    protein: "2)",  
    subProtein: "*",
    sayur: "3)",
    subSayur: "*",
    buah: "4)",
    subBuah: "*",
  });

  const [subMenuKarbohidrat, setSubMenuKarbohidrat] = useState<{ id: string; name: string }[]>([]);
  const [subMenuProtein, setSubMenuProtein] = useState<{ id: string; name: string }[]>([]);
  const [subMenuSayur, setSubMenuSayur] = useState<{ id: string; name: string }[]>([]);
  const [subMenuBuah, setSubMenuBuah] = useState<{ id: string; name: string }[]>([]);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [result, setResult] = useState<{
    inputData: string;
    menuData: string;
  } | null>(null);

  const sakitOptions = [
    { id: "(KEP)", name: "Kekurangan Energi Protein (KEP)" },
    { id: "hipertensi", name: "Hipertensi" },
    { id: "diabetes", name: "Diabetes" },
    { id: "(GERD)", name: "Gastroesofageal Reflux Disease (GERD)" },
    { id: "diare", name: "Diare" },
  ];

  const giziOptions: Record<
    string,
    {
      Karbohidrat: { id: string; name: string; subOptions?: { id: string; name: string }[] }[];
      Protein: { id: string; name: string; subOptions?: { id: string; name: string }[] }[];
      Sayur: { id: string; name: string; subOptions?: { id: string; name: string }[] }[];
      Buah: { id: string; name: string; subOptions?: { id: string; name: string }[] }[];
    }
  > = {
    "(KEP)": {
      Karbohidrat: [
        { id: "ubi", name: "Ubi Jalar", subOptions: [{ id: "ubi Rebus", name: "Ubi Jalar Rebus" }] },
        { id: "beras Putih", name: "Beras Putih", subOptions: [{ id: "nasi Putih", name: "Nasi Putih" }] },
        { id: "makaroni", name: "Makaroni", subOptions: [{ id: "makaroni Rebus", name: "Makaroni Rebus" }] },
      ],
      Protein: [
        { id: "Ayam (protein hewani)", name: "Ayam (protein hewani)", subOptions: [{ id: "Ayam bakar kecap", name: "ayam bakar kecap" }] },
        { id: "Ikan tuna protein hewani", name: "Ikan tuna (protein hewani)", subOptions: [{ id: "Ikan tuna bakar", name: "Ikan tuna bakar" }] },
        { id: "Daging sapi Protein hewani", name: "Daging sapi (protein hewani)", subOptions: [{ id: "Rolade daging kukus", name: "Rolade daging kukus" }] },
        { id: "Tempe Protein nabati", name: "Tempe (Protein nabati)", subOptions: [{ id: "Tempe bacem", name: "Tempe bacem" }] },
        { id: "Tahu Protein nabati", name: "Tahu (Protein nabati)", subOptions: [{ id: "Tahu kukus sayur", name: "Tahu kukus sayur" }] },
        { id: "Buncis Protein Nabati", name: "Buncis (Protein Nabati)", subOptions: [{ id: "Orak arik telur buncis", name: "Orak arik telur buncis" }] },
      ],
      Sayur: [
        { id: "bayam", name: "Bayam", subOptions: [{ id: "sayur Bening Bayam", name: "Sayur Bening Bayam" }] },
        { id: "labu Siam", name: "Labu Siam", subOptions: [{ id: "sup Labu Siam Tahu", name: "Sup Labu Siam dan Tahu" }] },
        { id: "wortel", name: "Wortel", subOptions: [{ id: "sup Wortel", name: "Sup Wortel" }] },
      ],
      Buah: [
        { id: "pisang", name: "Pisang", subOptions: [{ id: "pisang Potong", name: "Pisang Potong" }] },
        { id: "pepaya", name: "Pepaya", subOptions: [{ id: "pepaya Potong", name: "Pepaya Potong" }] },
        { id: "jambu Biji", name: "Jambu Biji", subOptions: [{ id: "jus Jambu Biji", name: "Jus Jambu Biji" }] },
      ],
    },
    hipertensi: {
      Karbohidrat: [
        { id: "beras Putih", name: "Beras Putih", subOptions: [{ id: "nasi Putih", name: "Nasi Putih" }] },
        { id: "kentang", name: "Kentang", subOptions: [{ id: "kentang Kukus TanpaGaram", name: "Kentang Kukus Tanpa Garam" }] },
        { id: "singkong", name: "Singkong", subOptions: [{ id: "singkong Rebus TanpaGaram", name: "Singkong Rebus Tanpa Garam" }] },
      ],
      Protein: [
        { id: "ikan Kembung", name: "Ikan Kembung (Protein hewani)", subOptions: [{ id: "ikan Kembung Goreng", name: "Ikan Kembung Goreng" }] },
        { id: "ayam Tanpa Kulit", name: "Ayam Tanpa Kulit (Protein hewani)", subOptions: [{ id: "ayam Panggang Bagian Dada", name: "Ayam Panggang Bagian Dada" }] },
        { id: "telur", name: "Telur Protein hewani", subOptions: [{ id: "telur Rebus Balado", name: "Telur Rebus Balado" }] },
        { id: "kacang Hijau", name: "Kacang Hijau (protein nabati)", subOptions: [{ id: "bakwan Kacang Hijau", name: "Bakwan Kacang Hijau" }] },
        { id: "kacang Tanah", name: "Kacang Tanah (protein nabati)", subOptions: [{ id: "sambal Kacang", name: "Sambal Kacang" }] },
        { id: "kacang Merah", name: "Kacang Merah (protein nabati)", subOptions: [{ id: "sup Kacang Merah", name: "Sup Kacang Merah" }] },
      ],
      Sayur: [
         { id: "sawi Putih", name: "Sawi Putih", subOptions: [{ id: "tumis Sawi Putih", name: "Tumis Sawi Putih" }] },
          { id: "labu Kuning", name: "Labu Kuning", subOptions: [{ id: "sup Labu Kuning Bening", name: "Sup Labu Kuning Bening" }] },
          { id: "brokoli", name: "Brokoli", subOptions: [{ id: "Sup Brokoli", name: "Sup Brokoli" }] },
      ],
      Buah: [
        { id: "mangga", name: "Mangga", subOptions: [{ id: "Mangga Potong", name: "Mangga Potong" }] },
          { id: "melon", name: "Melon", subOptions: [{ id: "Melon Potong", name: "Melon Potong" }] },
          { id: "apel", name: "Apel", subOptions: [{ id: "Apel Potong", name: "Apel Potong" }] },
     ],
    },
    diabetes: {
      Karbohidrat: [
        { id: "beras Merah", name: "Beras Merah", subOptions: [{ id: "nasi Merah", name: "Nasi Merah" }] },
        { id: "kentang", name: "Kentang", subOptions: [{ id: "kentang Kukus", name: "Kentang Kukus" }] },
        { id: "ubi Jalar", name: "Ubi Jalar", subOptions: [{ id: "ubi Rebus", name: "Ubi Rebus" }] },
      ],
      Protein: [
        { 
          id: "ikanLele", 
          name: "Ikan Lele (Protein Hewani)", 
          subOptions: [{ id: "Ikan Pepes Kemangi", name: "Ikan Pepes Kemangi" }] 
        },
        { 
          id: "Daging Rendah Lemak", 
          name: "Daging Rendah Lemak (protein hewani)", 
          subOptions: [{ id: "Tumis Daging Cabai Hijau", name: "Tumis Daging Cabai Hijau" }] 
        },
        { 
          id: "Ayam Tanpa Kulit", 
          name: "Ayam Tanpa Kulit (Protein Hewani)", 
          subOptions: [{ id: "Ayam Kukus Jahe", name: "Ayam Kukus Jahe" }] 
        },
        { 
          id: "tahu", 
          name: "Tahu (Protein Nabati)", 
          subOptions: [{ id: "Tahu Masak Jamur", name: "Tahu Masak Jamur" }] 
        },
        { 
          id: "tempe", 
          name: "Tempe (Protein Nabati)", 
          subOptions: [{ id: "Tempe Goreng", name: "Tempe Goreng" }] 
        },
        { 
          id: "Kacang Merah", 
          name: "Kacang Merah (Protein Nabati)", 
          subOptions: [{ id: "Kacang Merah Rebus", name: "Kacang Merah Rebus" }] 
        }
      ],
      Sayur: [
        { id: "kangkung", name: "Kangkung", subOptions: [{ id: "Sayur Bening Kangkung", name: "Sayur Bening Kangkung" }] },
        { id: "kol", name: "Kol", subOptions: [{ id: "Sayur Sup Kol Tomat", name: "Sayur Sup Kol Tomat" }] },
        { id: "bayam", name: "Bayam", subOptions: [{ id: "Sayur Bening Bayam", name: "Sayur Bening Bayam" }] },
      ],
      Buah: [
        { id: "jeruk", name: "Jeruk", subOptions: [{ id: "Jeruk Kupas", name: "Jeruk Kupas" }] },
        { id: "semangka", name: "Semangka", subOptions: [{ id: "Semangka Potong", name: "Semangka Potong" }] },
        { id: "pepaya", name: "Pepaya", subOptions: [{ id: "Pepaya Potong", name: "Pepaya Potong" }] },
      ],
    },
    "(GERD)": {
       Karbohidrat: [
      { id: "Beras Merah", name: "Beras Merah", subOptions: [{ id: "Nasi Merah", name: "Nasi Merah" }] },
      { id: "kentang", name: "Kentang", subOptions: [{ id: "Kentang Kukus", name: "Kentang Kukus" }] },
      { id: "Ubi Jalar", name: "Ubi Jalar", subOptions: [{ id: "Ubi Rebus", name: "Ubi Rebus" }] },
    ],
    Protein: [
      { id: "ikanLele", name: "Ikan Lele (Protein Hewani)", subOptions: [{ id: "Ikan Pepes Kemangi", name: "Ikan Pepes Kemangi" }] },
      { id: "Daging Rendah Lemak", name: "Daging Rendah Lemak (Protein Hewani)", subOptions: [{ id: "Tumis Daging Cabai Hijau", name: "Tumis Daging Cabai Hijau" }] },
      { id: "Ayam Tanpa Kulit", name: "Ayam Tanpa Kulit (Protein Hewani)", subOptions: [{ id: "Ayam Kukus Jahe", name: "Ayam Kukus Jahe" }] },
      { id: "tahu", name: "Tahu (Protein Nabati)", subOptions: [{ id: "Tahu Masak Jamur", name: "Tahu Masak Jamur" }] },
      { id: "tempe", name: "Tempe (Protein Nabati)", subOptions: [{ id: "Tempe Goreng", name: "Tempe Goreng" }] },
      { id: "Kacang Merah", name: "Kacang Merah (Protein Nabati)", subOptions: [{ id: "Kacang Merah Rebus", name: "Kacang Merah Rebus" }] }
    ],
    Sayur: [
      { id: "kangkung", name: "Kangkung", subOptions: [{ id: "Sayur Bening Kangkung", name: "Sayur Bening Kangkung" }] },
      { id: "kol", name: "Kol", subOptions: [{ id: "Sayur Sup KolTomat", name: "Sayur Sup Kol Tomat" }] },
      { id: "bayam", name: "Bayam", subOptions: [{ id: "Sayur Bening Bayam", name: "Sayur Bening Bayam" }] },
    ],
    Buah: [
      { id: "alpukat", name: "Alpukat", subOptions: [{ id: "jusal pukat", name: "Jus alpukat" }] },
      { id: "pisang", name: "Pisang", subOptions: [{ id: "pisang potong", name: "pisang potong" }] },
      { id: "pir", name: "Pir", subOptions: [{ id: "pir", name: "Jus pir" }] }
    ],
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMenuSelect = (type: string, value: string) => {
    setSelectedMenu((prev) => ({ ...prev, [type]: value }));

    if (type === "karbohidrat") {
      const selectedOption = giziOptions[formData.selectedSakit]?.Karbohidrat.find((item) => item.id === value);
      setSubMenuKarbohidrat(selectedOption?.subOptions || []);
      setSelectedMenu((prev) => ({ ...prev, subKarbohidrat: "" }));
    }

    if (type === "protein") {
      const selectedOption = giziOptions[formData.selectedSakit]?.Protein.find((item) => item.id === value);
      setSubMenuProtein(selectedOption?.subOptions || []);
      setSelectedMenu((prev) => ({ ...prev, subProtein: "" }));
    }

    if (type === "sayur") {
      const selectedOption = giziOptions[formData.selectedSakit]?.Sayur.find((item) => item.id === value);
      setSubMenuSayur(selectedOption?.subOptions || []);
      setSelectedMenu((prev) => ({ ...prev, subSayur: "" }));
    }

    if (type === "buah") {
      const selectedOption = giziOptions[formData.selectedSakit]?.Buah.find((item) => item.id === value);
      setSubMenuBuah(selectedOption?.subOptions || []);
      setSelectedMenu((prev) => ({ ...prev, subBuah: "" }));
    }
  };

  const handleSubmit = () => {
    const inputData = JSON.stringify(formData, null, 2);
    const menuData = JSON.stringify(selectedMenu, null, 2);
    setResult({ inputData, menuData });
  };

  const isFormComplete =
    formData.nama && formData.umur && formData.pengenMakan && formData.selectedSakit;

  const isMenuComplete =
    selectedMenu.karbohidrat &&
    selectedMenu.protein &&
    selectedMenu.sayur &&
    selectedMenu.buah &&
    (!subMenuKarbohidrat.length || selectedMenu.subKarbohidrat) &&
    (!subMenuProtein.length || selectedMenu.subProtein) &&
    (!subMenuSayur.length || selectedMenu.subSayur) &&
    (!subMenuBuah.length || selectedMenu.subBuah);

  return (
    <div className="container-fluid" style={{ paddingTop: "2rem" }}>
      <h1 className="text-center mb-4">Rekomendasi Menu berdasarkan penyakit yang di derita</h1>
      <div className="card shadow-lg mb-4">
        <div className="card-body">
          <h2 className="card-title">Input Data</h2>
          <div className="mb-3">
            <label className="form-label">Nama:</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Nama"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Umur:</label>
            <input
              type="number"
              name="umur"
              value={formData.umur}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Umur"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Pengen Makan:</label>
            <select
              name="pengenMakan"
              value={formData.pengenMakan}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Pilih</option>
              <option value="biasa">Biasa</option>
              <option value="diet">Diet</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Penyakit:</label>
            <select
              name="selectedSakit"
              value={formData.selectedSakit}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Pilih Penyakit</option>
              {sakitOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <button
              onClick={() => setShowMenuOptions(!showMenuOptions)}
              className="btn btn-primary"
              disabled={!isFormComplete}
            >
              {showMenuOptions ? "Sembunyikan Menu" : "Tampilkan Menu"}
            </button>
          </div>

          {showMenuOptions && formData.selectedSakit && (
            <div>
              <h3>Pilih Menu Gizi</h3>
              {/* Karbohidrat */}
              <div className="mb-3">
                <label className="form-label">Karbohidrat:</label>
                <select
                  className="form-select"
                  onChange={(e) => handleMenuSelect("karbohidrat", e.target.value)}
                >
                  <option value="">Pilih Karbohidrat</option>
                  {giziOptions[formData.selectedSakit]?.Karbohidrat.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedMenu.karbohidrat &&
                giziOptions[formData.selectedSakit]?.Karbohidrat?.find(
                  (k) => k.id === selectedMenu.karbohidrat
                )?.subOptions?.length && (
                  <div className="ms-4">
                    <label className="form-label">Sub Menu Karbohidrat:</label>
                    <select
                      className="form-select"
                      onChange={(e) => handleMenuSelect("subKarbohidrat", e.target.value)}
                    >
                      <option value="">Pilih Sub Menu Karbohidrat</option>
                      {giziOptions[formData.selectedSakit]?.Karbohidrat?.find(
                        (k) => k.id === selectedMenu.karbohidrat
                      )?.subOptions?.map((subOption) => (
                        <option key={subOption.id} value={subOption.id}>
                          {subOption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              {/* Protein */}
              <div className="mb-3">
                <label className="form-label">Protein:</label>
                <select
                  className="form-select"
                  onChange={(e) => handleMenuSelect("protein", e.target.value)}
                >
                  <option value="">Pilih Protein</option>
                  {giziOptions[formData.selectedSakit]?.Protein.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedMenu.protein &&
                giziOptions[formData.selectedSakit]?.Protein?.find(
                  (p) => p.id === selectedMenu.protein
                )?.subOptions?.length && (
                  <div className="ms-4">
                    <label className="form-label">Sub Menu Protein:</label>
                    <select
                      className="form-select"
                      onChange={(e) => handleMenuSelect("subProtein", e.target.value)}
                    >
                      <option value="">Pilih Sub Menu Protein</option>
                      {giziOptions[formData.selectedSakit]?.Protein?.find(
                        (p) => p.id === selectedMenu.protein
                      )?.subOptions?.map((subOption) => (
                        <option key={subOption.id} value={subOption.id}>
                          {subOption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              {/* Sayur */}
              <div className="mb-3">
                <label className="form-label">Sayur:</label>
                <select
                  className="form-select"
                  onChange={(e) => handleMenuSelect("sayur", e.target.value)}
                >
                  <option value="">Pilih Sayur</option>
                  {giziOptions[formData.selectedSakit]?.Sayur.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedMenu.sayur &&
                giziOptions[formData.selectedSakit]?.Sayur?.find(
                  (s) => s.id === selectedMenu.sayur
                )?.subOptions?.length && (
                  <div className="ms-4">
                    <label className="form-label">Sub Menu Sayur:</label>
                    <select
                      className="form-select"
                      onChange={(e) => handleMenuSelect("subSayur", e.target.value)}
                    >
                      <option value="">Pilih Sub Menu Sayur</option>
                      {giziOptions[formData.selectedSakit]?.Sayur?.find(
                        (s) => s.id === selectedMenu.sayur
                      )?.subOptions?.map((subOption) => (
                        <option key={subOption.id} value={subOption.id}>
                          {subOption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              {/* Buah */}
              <div className="mb-3">
                <label className="form-label">Buah:</label>
                <select
                  className="form-select"
                  onChange={(e) => handleMenuSelect("buah", e.target.value)}
                >
                  <option value="">Pilih Buah</option>
                  {giziOptions[formData.selectedSakit]?.Buah.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedMenu.buah &&
                giziOptions[formData.selectedSakit]?.Buah?.find(
                  (b) => b.id === selectedMenu.buah
                )?.subOptions?.length && (
                  <div className="ms-4">
                    <label className="form-label">Sub Menu Buah:</label>
                    <select
                      className="form-select"
                      onChange={(e) => handleMenuSelect("subBuah", e.target.value)}
                    >
                      <option value="">Pilih Sub Menu Buah</option>
                      {giziOptions[formData.selectedSakit]?.Buah?.find(
                        (b) => b.id === selectedMenu.buah
                      )?.subOptions?.map((subOption) => (
                        <option key={subOption.id} value={subOption.id}>
                          {subOption.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              {/* Submit */}
              <div className="mb-3">
                <button
                  onClick={handleSubmit}
                  className="btn btn-success"
                  disabled={!isMenuComplete}
                >
                  Submit
                </button>
              </div>
            </div>
          )}  
              {result && (
                  <div className="container mt-4">
                    {/* Row untuk hasil */}
                    <div className="row">
                      {/* Kolom untuk Hasil Input */}
                      <div className="col-12 col-md-6 mb-4">
                        <div className="p-4 rounded shadow bg-primary text-white h-100">
                          <h3 className="fw-bold fs-6">Hasil Input:</h3>
                          <pre
                            className="bg-light text-dark p-3 rounded"
                            style={{
                              fontSize: "clamp(14px, 2vw, 18px)", // Teks otomatis menyesuaikan ukuran layar
                              wordWrap: "break-word", // Memastikan teks tidak meluber
                              whiteSpace: "pre-wrap", // Mengatur teks agar bisa pindah baris
                            }}
                          >
                            {result.inputData}
                          </pre>
                        </div>
                      </div>

                      {/* Kolom untuk Hasil Menu */}
                      <div className="col-12 col-md-6">
                        <div className="p-4 rounded shadow bg-secondary text-white h-100">
                          <h3 className="fw-bold fs-4">Hasil Menu:</h3>
                          <pre
                            className="bg-light text-dark p-3 rounded"
                            style={{
                              fontSize: "clamp(14px, 2vw, 18px)", // Teks otomatis menyesuaikan ukuran layar
                              wordWrap: "break-word", // Memastikan teks tidak meluber
                              whiteSpace: "pre-wrap", // Mengatur teks agar bisa pindah baris
                            }}
                          >
                            {result.menuData}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

        </div>
      </div>
    </div>
  );
}
