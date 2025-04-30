import Link from "next/link";
import SubFooter from "./subFooter";

const Footer = () => {
  return (
    <>
      <footer className="border-t bg-gray-100 dark:bg-gray-900 dark:border-gray-700">
        <div className="container mx-auto py-6 px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-3">
              <h2 className="font-bold uppercase text-sm text-gray-800 dark:text-gray-100">
                Giới thiệu
              </h2>
              <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                {[
                  "Phương thức hoạt động của Airbnb",
                  "Trang tin tức",
                  "Nhà đầu tư",
                  "Airbnb Plus",
                  "Airbnb Luxe",
                  "HotelTonight",
                  "Airbnb for Work",
                  "Nhờ có Host, mọi điều đều có thể",
                  "Cơ hội nghề nghiệp",
                  "Thư của nhà sáng lập",
                ].map((text, idx) => (
                  <li key={idx}>
                    <Link
                      href="https://www.airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-bold uppercase text-sm text-gray-800 dark:text-gray-100">
                Cộng đồng
              </h2>
              <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                {[
                  "Sự đa dạng và Cảm giác thân thuộc",
                  "Tiện nghi phù hợp cho người khuyết tật",
                  "Đối tác liên kết Airbnb",
                  "Chỗ ở cho tuyến đầu",
                  "Lượt giới thiệu của khách",
                  "Airbnb.org",
                ].map((text, idx) => (
                  <li key={idx}>
                    <Link
                      href="https://www.airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-bold uppercase text-sm text-gray-800 dark:text-gray-100">
                Đón tiếp khách
              </h2>
              <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                {[
                  "Cho thuê nhà",
                  "Tổ chức trải nghiệm trực tuyến",
                  "Tổ chức trải nghiệm",
                  "Đón tiếp khách có trách nhiệm",
                  "Trung tâm tài nguyên",
                  "Trung tâm cộng đồng",
                ].map((text, idx) => (
                  <li key={idx}>
                    <Link
                      href="https://www.airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-bold uppercase text-sm text-gray-800 dark:text-gray-100">
                Hỗ trợ
              </h2>
              <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                {[
                  "Biện pháp ứng phó với đại dịch COVID-19",
                  "Trung tâm trợ giúp",
                  "Các tùy chọn hủy",
                  "Hỗ trợ khu dân cư",
                  "Tin cậy và an toàn",
                ].map((text, idx) => (
                  <li key={idx}>
                    <Link
                      href="https://www.airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <SubFooter />
    </>
  );
};

export default Footer;
