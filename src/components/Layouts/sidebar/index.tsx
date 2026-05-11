"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";
import { useSession } from "next-auth/react";

export function Sidebar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Ambil role dari session
  const userRole = (session?.user as any)?.role;

  // Filter menu berdasarkan role
  const filteredNavData = useMemo(() => {
    return NAV_DATA.map((section) => ({
      ...section,
      items: section.items.filter((item: any) => {
        if (!item.roles) return true;

        return item.roles.includes(userRole);
      }),
    })).filter((section) => section.items.length > 0);
  }, [userRole]);

  // Toggle dropdown
  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));
  };

  // Auto expand menu aktif
  useEffect(() => {
    filteredNavData.forEach((section) => {
      section.items.forEach((item: any) => {
        if (
          item.items?.some((subItem: any) => pathname.startsWith(subItem.url))
        ) {
          if (!expandedItems.includes(item.title)) {
            setExpandedItems([item.title]);
          }
        }
      });
    });
  }, [pathname, filteredNavData, expandedItems]);

  // Tutup sidebar mobile setelah klik menu
  const handleMobileClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay Mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          {/* Logo */}
          <div className="relative pr-4.5">
            <Link
              href="/dashboard"
              onClick={handleMobileClick}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {/* Tombol close mobile */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>

                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {filteredNavData.map((section) => (
              <div key={section.label} className="mb-6">
                {/* Section Title */}
                <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {section.label}
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item: any) => (
                      <li key={item.title}>
                        {/* Dropdown Menu */}
                        {item.items && item.items.length ? (
                          <div>
                            <MenuItem
                              isActive={item.items.some(({ url }: any) =>
                                pathname.startsWith(url),
                              )}
                              onClick={() => toggleExpanded(item.title)}
                            >
                              <item.icon className="size-6 shrink-0" />

                              <span>{item.title}</span>

                              <ChevronUp
                                className={cn(
                                  "ml-auto rotate-180 transition-transform duration-200",
                                  expandedItems.includes(item.title) &&
                                    "rotate-0",
                                )}
                              />
                            </MenuItem>

                            {/* Sub Menu */}
                            {expandedItems.includes(item.title) && (
                              <ul
                                className="ml-9 mr-0 space-y-1.5 pb-[15px] pr-0 pt-2"
                                role="menu"
                              >
                                {item.items.map((subItem: any) => (
                                  <li
                                    key={subItem.title}
                                    role="none"
                                    onClick={handleMobileClick}
                                  >
                                    <MenuItem
                                      as="link"
                                      href={subItem.url}
                                      isActive={pathname.startsWith(
                                        subItem.url,
                                      )}
                                    >
                                      <span>{subItem.title}</span>
                                    </MenuItem>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          /* Menu Tunggal */
                          <div onClick={handleMobileClick}>
                            <MenuItem
                              className="flex items-center gap-3 py-3"
                              as="link"
                              href={item.url || "/"}
                              isActive={pathname === item.url}
                            >
                              <item.icon className="size-6 shrink-0" />

                              <span>{item.title}</span>
                            </MenuItem>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
