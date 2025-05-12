import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "NotFound" });

  return {
    title: `${t("title")} | Afonso Veloso`,
  };
}

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-4xl font-semibold mb-4">{t("title")}</h2>
      <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">{t("message")}</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-300"
      >
        {t("button")}
      </Link>
    </div>
  );
}
