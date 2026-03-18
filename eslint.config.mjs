/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      "react/display-name": "off",
      "react/prop-types": "off"
    }
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/prisma/**",
      "**/infra/stress-lab/**",
      "**/scripts/**"
    ]
  }
];
