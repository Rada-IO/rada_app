import Header from "../(marketing)/_components/Header";
import Footer from "../(marketing)/_components/Footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}


