import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { pageTitle } = useSelector((state) => state.header);
  const [role, setRole] = useState("");
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function toggleLogin() {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  }
  //array untuk path dropdown
  const sosialisasiPaths = [
    "/app/EducationUnit",
    "/app/EducationUnit/Create",
    "/app/HealthFacility",
    "/app/HealthFacility/Create",
    "/app/PublicHousing",
    "/app/PublicHousing/Create",
    "/app/Mall",
    "/app/Mall/Create",
    "/app/Hotel",
    "/app/Hotel/Create",
    "/app/Office",
    "/app/Office/Create",
    "/app/Apartement",
    "/app/Apartement/Create",
    "/app/UrbanVillages",
    "/app/UrbanVillages/Create",
  ];

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    if (storedRole) setRole(storedRole);
    if (storedToken) setIsLoggedIn(true); // ini penting!
  }, []);

  useEffect(() => {
    themeChange(false);

    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
  }, []);

  return (
    <div className="navbar sticky top-0 bg-secondary text-white text-lg z-10 shadow-md py-4">
      <div className="flex-1 flex items-center gap-2">
        <img
          className="mask mask-squircle w-10"
          src="/logo192.png"
          alt="DashWind Logo"
        />
        <span className="text-3xl font-semibold">
          <span className="text-primary">Siaga</span>
          <span className="text-white"> Surabaya</span>
        </span>
      </div>

      <div className="flex-none flex items-center space-x-2">
        <Link
          to="/app/dashboard"
          className={`btn btn-ghost normal-case hidden md:inline-flex text-lg ${
            currentPath === "/app/dashboard" ? "font-bold text-primary" : ""
          }`}
        >
          Beranda
        </Link>

        <div className="dropdown dropdown-hover">
          <label
            tabIndex={0}
            className={`btn btn-ghost normal-case hidden md:inline-flex text-lg ${
              sosialisasiPaths.includes(currentPath)
                ? "font-bold text-primary"
                : ""
            }`}
          >
            Sosialisasi
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-52"
          >
            <li className="relative group">
              <Link
                to="/app/EducationUnit"
                className={`text-lg cursor-pointer ${
                  currentPath === "/app/EducationUnit"
                    ? "font-bold text-primary"
                    : ""
                }`}
              >
                Satuan Pendidikan
              </Link>
              {/* Submenu Create muncul di kanan saat hover */}
              {role === "admin" && (
                <ul className="absolute left-full top-0 ml-2 z-20 bg-secondary p-2 rounded shadow w-40 hidden group-hover:flex group-hover:flex-col">
                  <li>
                    <Link
                      to="/app/EducationUnit/Create"
                      className={`text-lg cursor-pointer ${
                        currentPath === "/app/EducationUnit/Create"
                          ? "font-bold text-primary"
                          : ""
                      }`}
                    >
                      Tambah Baru
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative group">
              <Link
                to="/app/HealthFacility"
                className={`text-lg cursor-pointer ${
                  currentPath === "/app/HealthFacility"
                    ? "font-bold text-primary"
                    : ""
                }`}
              >
                Fasilitas Kesehatan
              </Link>

              {/* Submenu Create muncul di kanan saat hover */}
              {role === "admin" && (
                <ul className="absolute left-full top-0 ml-2 z-20 bg-secondary p-2 rounded shadow w-40 hidden group-hover:flex group-hover:flex-col">
                  <li>
                    <Link
                      to="/app/HealthFacility/Create"
                      className={`text-lg cursor-pointer ${
                        currentPath === "/app/HealthFacility/Create"
                          ? "font-bold text-primary"
                          : ""
                      }`}
                    >
                      Tambah Baru
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative group">
              <Link
                to="/app/PublicHousing"
                className={`text-lg cursor-pointer ${
                  currentPath === "/app/PublicHousing"
                    ? "font-bold text-primary"
                    : ""
                }`}
              >
                Rusun
              </Link>
              {/* Submenu Create muncul di kanan saat hover */}
              {role === "admin" && (
                <ul className="absolute left-full top-0 ml-2 z-20 bg-secondary p-2 rounded shadow w-40 hidden group-hover:flex group-hover:flex-col">
                  <li>
                    <Link
                      to="/app/PublicHousing/Create"
                      className={`text-lg cursor-pointer ${
                        currentPath === "/app/PublicHousing/Create"
                          ? "font-bold text-primary"
                          : ""
                      }`}
                    >
                      Tambah Baru
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative group">
              <Link
                to="/app/Mall"
                className={`text-lg cursor-pointer ${
                  currentPath === "/app/Mall" ? "font-bold text-primary" : ""
                }`}
              >
                Mall
              </Link>
              {/* Submenu Create muncul di kanan saat hover */}
              {role === "admin" && (
                <ul className="absolute left-full top-0 ml-2 z-20 bg-secondary p-2 rounded shadow w-40 hidden group-hover:flex group-hover:flex-col">
                  <li>
                    <Link
                      to="/app/Mall/Create"
                      className={`text-lg cursor-pointer ${
                        currentPath === "/app/Mall/Create"
                          ? "font-bold text-primary"
                          : ""
                      }`}
                    >
                      Tambah Baru
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative group">
              <Link
                to="/app/Hotel"
                className={`text-lg cursor-pointer ${
                  currentPath === "/app/Hotel" ? "font-bold text-primary" : ""
                }`}
              >
                Hotel
              </Link>
              {/* Submenu Create muncul di kanan saat hover */}
              {role === "admin" && (
                <ul className="absolute left-full top-0 ml-2 z-20 bg-secondary p-2 rounded shadow w-40 hidden group-hover:flex group-hover:flex-col">
                  <li>
                    <Link
                      to="/app/Hotel/Create"
                      className={`text-lg cursor-pointer ${
                        currentPath === "/app/Hotel/Create"
                          ? "font-bold text-primary"
                          : ""
                      }`}
                    >
                      Tambah Baru
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative group">
              <Link
                to="/app/Office"
                className={`text-lg cursor-pointer ${
                  currentPath === "/app/Office" ? "font-bold text-primary" : ""
                }`}
              >
                Perkantoran
              </Link>
              {/* Submenu Create muncul di kanan saat hover */}
              {role === "admin" && (
                <ul className="absolute left-full top-0 ml-2 z-20 bg-secondary p-2 rounded shadow w-40 hidden group-hover:flex group-hover:flex-col">
                  <li>
                    <Link
                      to="/app/Office/Create"
                      className={`text-lg cursor-pointer ${
                        currentPath === "/app/Office/Create"
                          ? "font-bold text-primary"
                          : ""
                      }`}
                    >
                      Tambah Baru
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative group">
              <Link
                to="/app/Apartement"
                className={`text-lg cursor-pointer ${
                  currentPath === "/app/Apartement"
                    ? "font-bold text-primary"
                    : ""
                }`}
              >
                Apartement
              </Link>
              {/* Submenu Create muncul di kanan saat hover */}
              {role === "admin" && (
                <ul className="absolute left-full top-0 ml-2 z-20 bg-secondary p-2 rounded shadow w-40 hidden group-hover:flex group-hover:flex-col">
                  <li>
                    <Link
                      to="/app/Apartement/Create"
                      className={`text-lg cursor-pointer ${
                        currentPath === "/app/Apartement/Create"
                          ? "font-bold text-primary"
                          : ""
                      }`}
                    >
                      Tambah Baru
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative group">
              <Link
                to="/app/UrbanVillages"
                className={`text-lg cursor-pointer ${
                  currentPath === "/app/UrbanVillages"
                    ? "font-bold text-primary"
                    : ""
                }`}
              >
                Kelurahan Tangguh
              </Link>
              {/* Submenu Create muncul di kanan saat hover */}
              {role === "admin" && (
                <ul className="absolute left-full top-0 ml-2 z-20 bg-secondary p-2 rounded shadow w-40 hidden group-hover:flex group-hover:flex-col">
                  <li>
                    <Link
                      to="/app/UrbanVillages/Create"
                      className={`text-lg cursor-pointer ${
                        currentPath === "/app/UrbanVillages/Create"
                          ? "font-bold text-primary"
                          : ""
                      }`}
                    >
                      Tambah Baru
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <Link
          to="/app/Education"
          className={`btn btn-ghost normal-case hidden md:inline-flex text-lg ${
            currentPath === "/app/Education" ? "font-bold text-primary" : ""
          }`}
        >
          Materi
        </Link>
        {isLoggedIn && role === "admin" && (
          <Link
            to="/app/Profile"
            className={`btn btn-ghost normal-case hidden md:inline-flex text-lg ${
              currentPath === "/app/Profile" ? "font-bold text-primary" : ""
            }`}
          >
            Profile
          </Link>
        )}

        {/* Tema */}
        <label className="swap">
          <input type="checkbox" />
          <SunIcon
            data-set-theme="light"
            data-act-class="ACTIVECLASS"
            className={
              "fill-current w-6 h-6 " +
              (currentTheme === "dark" ? "swap-on" : "swap-off")
            }
          />
          <MoonIcon
            data-set-theme="dark"
            data-act-class="ACTIVECLASS"
            className={
              "fill-current w-6 h-6 " +
              (currentTheme === "light" ? "swap-on" : "swap-off")
            }
          />
        </label>

        {/* Tombol Masuk/Keluar */}
        <button onClick={toggleLogin} className="btn btn-primary ml-2">
          {isLoggedIn ? "Keluar" : "Masuk"}
        </button>
      </div>
    </div>
  );
}

export default Header;
