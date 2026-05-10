import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/dashboard",
        items: [],
      },
      // Grouping untuk Admin Konten
      {
        title: "Galeri",
        icon: Icons.FourCircle,
        // Properti custom untuk memudahkan filter di komponen Sidebar
        roles: ["ADMIN_KONTEN"],
        url: "/dashboard/galeri", // Sesuaikan dengan folder baru
      },
      {
        title: "Berita",
        icon: Icons.FourCircle,
        roles: ["ADMIN_KONTEN"],
        items: [
          {
            title: "Post",
            url: "/dashboard/berita",
          },
          {
            title: "Kategori",
            url: "/dashboard/kategori",
          },
        ],
      },
      // Grouping untuk Admin Pengaduan
      {
        title: "Layanan",
        icon: Icons.FourCircle,
        roles: ["ADMIN_PENGADUAN"],
        items: [
          {
            title: "Pengaduan",
            url: "/dashboard/pengaduan",
          },
        ],
      },
    ],
  },
];
