import type { Metadata } from "next";
import { heliosextFont } from "../src/fonts/heliosext";
import "../src/styles/index.scss";
import styles from './layout.module.scss';
export const metadata: Metadata = {
  title: "My FriendLee Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${heliosextFont.variable}`} lang="ru">
      <body className={styles.page}>
        <main className={styles.container}>
          {children}
        </main>
      </body>
    </html>
  );
}
