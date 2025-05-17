import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EducationUnitEdit = () => {
  const { id } = useParams(); // Ambil id dari URL

  const [form, setForm] = useState({
    name: "",
    address: "",
    region_id: "",
    subdistrict_id: "",
    group: "",
    instance: "",
    SK: "",
    leader: "",
    activity: "",
    time: "",
    gender_man: "",
    gender_women: "",
    age_under6years: "",
    age_6to10years: "",
    age_11to18years: "",
    age_over44years: "",
    photo: "",
    video: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/education_units/${id}`
        );
        console.log("Fetched Data:", res.data);
        setForm(res.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const [regions, setRegions] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [isSubdistrictDisabled, setIsSubdistrictDisabled] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      const res = await axios.get(
        "http://localhost:5000/education_units/regions"
      );
      setRegions(res.data);
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    if (form.region_id) {
      setIsSubdistrictDisabled(false);
      const fetchSubdistricts = async () => {
        const res = await axios.get(
          `http://localhost:5000/education_units/subdistricts/${form.region_id}`
        );
        setSubdistricts(res.data);
      };
      fetchSubdistricts();
    } else {
      setIsSubdistrictDisabled(true);
      setSubdistricts([]);
      setForm({ ...form, subdistrict_id: "" }); // Reset subdistrict_id
    }
  }, [form.region_id]);

  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [sk, setSk] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (photo) formData.append("photo", photo);
    if (video) formData.append("video", video);
    if (sk) formData.append("sk", sk);

    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/education_units/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:5000/education_units", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      alert("Data berhasil disimpan");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <img src="/logo192.png" alt="Logo" className="w-24 h-24 mx-auto" />
        <h1 className="text-3xl font-bold text-primary mt-4">
          Edit Data <span className="text-secondary">Satuan Pendidikan</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* Informasi Satuan Pendidikan */}
        <div className="border rounded-lg shadow-sm">
          <div className="bg-secondary px-4 py-2 font-semibold text-white">
            📘 Data Satuan Pendidikan
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Nama Satuan Pendidikan"
              className="input"
            />

            <select
              name="group"
              value={form.group}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Pilih Kategori Pendidikan
              </option>
              <option value="TK">TK</option>
              <option value="SD/MI">SD/MI</option>
              <option value="SMP/MTS">SMP/MTS</option>
              <option value="SMA/SMK/MA">SMA/SMK/MA</option>
            </select>

            <input
              name="leader"
              value={form.leader}
              onChange={handleChange}
              placeholder="Nama Ketua"
              className="input"
            />

            <select
              name="instance"
              value={form.instance}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Pilih Instansi Pendidikan
              </option>
              <option value="Swasta">Swasta</option>
              <option value="Negeri">Negeri</option>
            </select>

            <input
              name="activity"
              value={form.activity}
              onChange={handleChange}
              placeholder="Jenis Kegiatan"
              className="input"
            />

            <input
              type="date"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Dokumen */}
        <div className="border rounded-lg shadow-sm">
          <div className="bg-secondary px-4 py-2 font-semibold text-white">
            📎 Upload Dokumen
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div>
              <label className="block mb-1 font-medium">🖼️ Foto Kegiatan</label>
              {form.photo && (
                <img
                  src={`http://localhost:5000/uploads/${form.photo}`}
                  alt="Preview Foto"
                  className="w-full h-auto mb-2 rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                🎥 Video Kegiatan
              </label>
              {form.video && (
                <video
                  src={`http://localhost:5000/uploads/${form.video}`}
                  controls
                  className="w-full h-auto mb-2 rounded"
                />
              )}
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                📄 SK (PDF, DOC, DOCX)
              </label>
              {form.SK && (
                <a
                  href={`http://localhost:5000/uploads/${form.SK}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline mb-2"
                >
                  Lihat dokumen SK
                </a>
              )}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setSk(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Alamat dan Wilayah */}
        <div className="border rounded-lg shadow-sm">
          <div className="bg-secondary px-4 py-2 font-semibold text-white">
            📍 Alamat & Wilayah
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="md:col-span-2">
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Alamat"
                className="textarea textarea-bordered w-full"
                rows={3}
              />
            </div>

            <select
              name="region_id"
              value={form.region_id}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Pilih Wilayah
              </option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>

            <select
              name="subdistrict_id"
              value={form.subdistrict_id}
              onChange={handleChange}
              required
              disabled={isSubdistrictDisabled}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Pilih Kecamatan
              </option>
              {subdistricts.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistik Demografi */}
        <div className="border rounded-lg shadow-sm">
          <div className="bg-secondary px-4 py-2 font-semibold text-white">
            📊 Statistik Demografi
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <input
              type="number"
              name="gender_man"
              value={form.gender_man}
              onChange={handleChange}
              placeholder="Jumlah Laki-laki"
              className="input"
            />
            <input
              type="number"
              name="gender_women"
              value={form.gender_women}
              onChange={handleChange}
              placeholder="Jumlah Perempuan"
              className="input"
            />
            <input
              type="number"
              name="age_under6years"
              value={form.age_under6years}
              onChange={handleChange}
              placeholder="<6 Tahun"
              className="input"
            />
            <input
              type="number"
              name="age_6to10years"
              value={form.age_6to10years}
              onChange={handleChange}
              placeholder="6-10 Tahun"
              className="input"
            />
            <input
              type="number"
              name="age_11to18years"
              value={form.age_11to18years}
              onChange={handleChange}
              placeholder="11-18 Tahun"
              className="input"
            />
            <input
              type="number"
              name="age_over44years"
              value={form.age_over44years}
              onChange={handleChange}
              placeholder=">44 Tahun"
              className="input"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md text-white bg-primary"
        >
          Simpan Data
        </button>
      </form>
    </div>
  );
};

export default EducationUnitEdit;
