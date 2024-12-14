import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Permitir o uso de `any` temporariamente
      "@typescript-eslint/no-explicit-any": "warn", // Muda erro para aviso
      // Permitir variáveis não utilizadas para "Image" e outras variáveis de importação
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^Image$" },
      ],
    },
  },
];

export default eslintConfig;
