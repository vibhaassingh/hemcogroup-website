import next from "eslint-config-next";

// eslint-config-next@16 ships a native flat-config array, so we spread it
// directly (no @eslint/eslintrc FlatCompat shim — that path hit a circular
// structure error translating the legacy "next/typescript" subconfig).
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
    ],
  },
  ...next,
  // React Compiler advisory rules (eslint-plugin-react-hooks v6) flag many
  // intentional, runtime-correct patterns — setState in a mount/session-gate
  // effect, imperative navigation on click. Surface them as warnings rather
  // than blockers; the battle-tested react-hooks/rules-of-hooks stays an error.
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
];

export default eslintConfig;
